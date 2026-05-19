import os
from pathlib import Path

from dotenv import load_dotenv

# Load parent .env.local first (STREAM_API_KEY, STREAM_SECRET_KEY)
load_dotenv(Path(__file__).parent.parent / ".env.local")
# Load local .env second so it can override (GOOGLE_API_KEY, or any overrides)
load_dotenv(Path(__file__).parent / ".env")

# vision-agents expects STREAM_API_SECRET; parent .env.local uses STREAM_SECRET_KEY
if not os.getenv("STREAM_API_SECRET") and os.getenv("STREAM_SECRET_KEY"):
    os.environ["STREAM_API_SECRET"] = os.environ["STREAM_SECRET_KEY"]

from vision_agents.core import Agent, AgentLauncher, User, Runner  # noqa: E402
from vision_agents.core.instructions import Instructions  # noqa: E402
from vision_agents.plugins import gemini  # noqa: E402
from vision_agents.plugins import getstream  # noqa: E402

_BASE_INSTRUCTIONS = """\
You are a friendly AI language teacher. You ALWAYS speak English — every word you say is in English.
You teach the student their chosen language entirely through English explanations, examples, and practice.

Your teaching style:
- Warm, encouraging, and patient (like a Duolingo tutor)
- Introduce vocabulary and phrases with English context
- Ask the student to repeat or translate simple phrases
- Gently correct mistakes and explain why
- Keep lessons short and conversational — one concept at a time
- Celebrate progress with brief, genuine encouragement
"""


def _build_instructions(
    target_language: str,
    lesson_title: str = "",
    lesson_goal: str = "",
    objectives: list | None = None,
    vocabulary: list | None = None,
    phrases: list | None = None,
    ai_teacher: dict | None = None,
) -> str:
    objectives = objectives or []
    vocabulary = vocabulary or []
    phrases = phrases or []
    ai_teacher = ai_teacher or {}

    lines = [_BASE_INSTRUCTIONS]
    lines.append(f"The student is learning: {target_language}.")

    if ai_teacher.get("persona"):
        lines.append(f"Your persona: {ai_teacher['persona']}.")
    if ai_teacher.get("systemPrompt"):
        lines.append(f"\n{ai_teacher['systemPrompt']}")

    if lesson_title:
        lines.append(f"\nThis lesson is: {lesson_title}.")
    if lesson_goal:
        lines.append(f"Lesson goal: {lesson_goal}")
    if objectives:
        lines.append("Objectives:\n" + "\n".join(f"  - {o}" for o in objectives))

    if vocabulary:
        vocab_str = ", ".join(
            f"{v['word']} ({v['translation']})" for v in vocabulary if v.get("word")
        )
        lines.append(f"\nVocabulary to cover: {vocab_str}.")
    if phrases:
        phrase_str = ", ".join(
            f'"{p["text"]}" = {p["translation"]}' for p in phrases if p.get("text")
        )
        lines.append(f"Phrases to practice: {phrase_str}.")

    if ai_teacher.get("greeting"):
        lines.append(
            f"\nOpen the lesson with this greeting (adapt naturally): {ai_teacher['greeting']}"
        )

    return "\n".join(lines)


async def create_agent(**kwargs) -> Agent:
    # Use base instructions at creation time; join_call will enrich them
    # with lesson-specific context from the call's custom data.
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="Language Teacher", id="language-teacher"),
        instructions=_BASE_INSTRUCTIONS,
        llm=gemini.Realtime(),
    )


async def join_call(agent: Agent, call_type: str, call_id: str, **kwargs) -> None:
    call = await agent.create_call(call_type, call_id)

    # Read lesson context packed into the call's custom data by the mobile app
    custom = call.custom_data or {}
    rich_instructions = _build_instructions(
        target_language=custom.get("languageName", "Spanish"),
        lesson_title=custom.get("lessonTitle", ""),
        lesson_goal=custom.get("goal", ""),
        objectives=custom.get("objectives") or [],
        vocabulary=custom.get("vocabulary") or [],
        phrases=custom.get("phrases") or [],
        ai_teacher=custom.get("aiTeacher") or {},
    )

    # Update instructions before joining so Gemini Realtime uses them for the session
    agent.instructions = Instructions(input_text=rich_instructions)

    async with agent.join(call):
        await agent.simple_response(
            "Greet the student warmly using your persona, "
            "then begin the lesson following your instructions."
        )
        await agent.finish()


if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
