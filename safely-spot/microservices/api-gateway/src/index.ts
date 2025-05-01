import express from "express";
import { pino } from "pino";

const PORT = 3000;
const REGISTRY = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());

async function proxy(service: string, req: express.Request, res: express.Response) {
    const look = await fetch(`${REGISTRY}/lookup?name=${service}`);
    if (!look.ok) return res.status(502).send("service not found");
    const { url } = await look.json();

    try {
        const up = await fetch(url, {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        const data = await up.json();
        res.status(up.status).json(data);
    } catch (e) {
        log.error(e);
        res.status(500).send("upstream error");
    }
}

/* Add routes for services here:

*/

app.listen(PORT, () => {
    log.info(`API-Gateway listening on ${PORT}`);
    fetch(`${REGISTRY}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "api-gateway", url: `http://api-gateway:${PORT}` })
    });
});
