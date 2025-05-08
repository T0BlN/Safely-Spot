import express, { Request, Response } from "express";
import { pino } from "pino";

const PORT = 5001;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());

interface Comment {
  id: string;
  pinId: string;
  user: string;
  text: string;
  timestamp: string;
}

const comments: Comment[] = [];

async function registerWithRetry(name: string, url: string, max = 5) {
  for (let i = 0; i < max; i++) {
    try {
      const res = await fetch(`${REGISTRY_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url }),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      log.info("Registered with registry");
      return;
    } catch (err) {
      log.warn(`register retry ${i + 1}: ${(err as Error).message}`);
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
  log.error("Could not register after retries, exiting");
  process.exit(1);
}

app.get("/comments/:pinId", (req: Request, res: Response) => {
  const { pinId } = req.params;
  res.json(comments.filter((c) => c.pinId === pinId));
});

app.post("/comments/:pinId", (req: Request, res: Response) => {
  const { pinId } = req.params;
  const { user, text } = req.body;
  if (!user || !text) {
    return res.status(400).json({ error: "Missing user or text" });
  }
  const comment: Comment = {
    id: Date.now().toString() + Math.random().toString(36).slice(2),
    pinId,
    user,
    text,
    timestamp: new Date().toISOString(),
  };
  comments.push(comment);
  res.status(201).json(comment);
});

app.listen(PORT, () => {
  log.info(`forum-service running on ${PORT}`);
  registerWithRetry("forum-service", `http://forum-service:${PORT}`);
});