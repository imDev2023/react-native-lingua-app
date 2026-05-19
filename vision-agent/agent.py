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
You're a real language teacher — warm, energetic, and completely focused on THIS lesson.

Rules you never break:
- Speak English almost entirely; introduce target-language words one at a time, always giving the English meaning right after
- Stay strictly inside this lesson's vocabulary and phrases — don't drift to other topics, other languages, or future lessons
- Keep every reply to ONE or TWO short, natural sentences (use contractions: "you're", "let's", "that's", "it's")
- After introducing each new word or phrase, ask the student to say it back or try a simple sentence with it
- Listen to their response and adapt — if they got it right, celebrate briefly with varied praise ("Nice!", "Exactly!", "You've got it!") and move on; if they didn't, gently model it again and invite another try
- Never rush; one concept at a time so the student feels confident, not overwhelmed
- Speak with natural human rhythm: vary your pace, let genuine excitement come through when a student gets it right, be warm and unhurried when explaining — never flat or robotic
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
            f"{v.get('word')} ({v.get('translation')})"
            for v in vocabulary
            if v.get("word") and v.get("translation")
        )
        lines.append(f"\nVocabulary to cover: {vocab_str}.")
    if phrases:
        phrase_str = ", ".join(
            f'"{p.get("text")}" = {p.get("translation")}'
            for p in phrases
            if p.get("text") and p.get("translation")
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
        llm=gemini.Realtime(
            config={
                "speech_config": {
                    "voice_config": {
                        "prebuilt_voice_config": {"voice_name": "Puck"},
                    },
                    "language_code": "en-US",
                },
                "enable_affective_dialog": True,
            }
        ),
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
            "Start the lesson now: deliver your persona's greeting, "
            "then immediately introduce the very first word or phrase from this lesson — "
            "say it clearly, give the English meaning, and ask the student to try saying it."
        )
        await agent.finish()


if __name__ == "__main__":
    Runner(AgentLauncher(create_agent=create_agent, join_call=join_call)).cli()
