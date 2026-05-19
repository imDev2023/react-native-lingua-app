import { StreamClient } from "@stream-io/node-sdk";
import { getLessonById } from "@/data/lessons";
import { getLanguageById } from "@/data/languages";
import type { VocabularyActivity, PhraseActivity, LanguageCode } from "@/types/learning";

export async function POST(request: Request) {
  const { callId, userId, lessonId, languageId } = await request.json();

  if (!callId || !userId) {
    return Response.json({ error: "callId and userId are required" }, { status: 400 });
  }

  const apiKey = process.env.STREAM_API_KEY;
  const secret = process.env.STREAM_SECRET_KEY;

  if (!apiKey || !secret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  const lesson = getLessonById(lessonId);
  const language = getLanguageById(languageId as LanguageCode);

  const vocabulary = lesson?.activities
    .filter((a): a is VocabularyActivity => a.type === "vocabulary")
    .flatMap((a) => a.items)
    .map(({ word, translation, pronunciation }) => ({ word, translation, pronunciation })) ?? [];

  const phrases = lesson?.activities
    .filter((a): a is PhraseActivity => a.type === "phrase")
    .flatMap((a) => a.phrases)
    .map(({ text, translation, pronunciation }) => ({ text, translation, pronunciation })) ?? [];

  const client = new StreamClient(apiKey, secret);
  const call = client.video.call("audio_room", callId);

  await call.getOrCreate({
    data: {
      created_by_id: userId,
      custom: {
        lessonId,
        languageId,
        lessonTitle: lesson?.title ?? "",
        languageName: language?.name ?? languageId,
        goal: lesson?.goal?.summary ?? "",
        objectives: lesson?.goal?.objectives ?? [],
        vocabulary,
        phrases,
        aiTeacher: lesson?.aiTeacher ?? null,
      },
    },
  });

  // Grant admin role so the agent can publish audio in audio_room
  await call.updateCallMembers({
    update_members: [{ user_id: "language-teacher", role: "admin" }],
  });

  // Put the call in live mode so all participants can publish
  try {
    await call.goLive();
  } catch {
    // goLive fails if the call is already live — safe to ignore
  }

  return Response.json({ callId, callType: "audio_room" });
}
