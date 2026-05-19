import { spawn, ChildProcess } from "child_process";
import path from "path";

// In-process map: callId → spawned Python agent
// Persists for the lifetime of the Expo dev server process.
const processes = new Map<string, ChildProcess>();

const AGENT_DIR = path.join(process.cwd(), "vision-agent");
const PYTHON_BIN = path.join(AGENT_DIR, ".venv", "bin", "python");

export function spawnAgent(callId: string): void {
  // Clean up any stale agent for this call first
  killAgent(callId);

  const child = spawn(
    PYTHON_BIN,
    [
      "agent.py",
      "run",
      "--call-type", "audio_room",
      "--call-id", callId,
      "--no-demo",   // never open a browser — the mobile app is the human side
    ],
    {
      cwd: AGENT_DIR,
      stdio: "inherit",  // forward agent logs into the Expo server console
    }
  );

  processes.set(callId, child);
  child.on("exit", () => processes.delete(callId));
}

export function killAgent(callId: string): void {
  const child = processes.get(callId);
  if (!child) return;
  processes.delete(callId);
  try {
    child.kill("SIGTERM");
  } catch {
    // process may already be gone
  }
}
