import express from "express";
import { pino } from "pino";

const PORT = 3000;
const app = express();
app.use(express.json());

const log = pino({ transport: { target: "pino-pretty" } });
const services: Record<string, string> = {};

app.post("/register", (req, res) => {
    const { name, url } = req.body;
    if (!name || !url) return res.status(400).json({ error: "name & url required" });
    services[name] = url;
    log.info(`Registered ${name} -> ${url}`);
    res.json({ ok: true });
});

app.get("/lookup", (req, res) => {
    const url = services[req.query.name as string];
    if (!url) return res.status(404).json({ error: "not found" });
    res.json({ url });
});

app.listen(PORT, () => log.info(`Registry listening on ${PORT}`));