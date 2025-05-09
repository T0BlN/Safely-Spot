import express from "express";
import { pino } from "pino";
import cors from 'cors';

const PORT = 3000;
const REGISTRY = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());

//this snippet allows for cors requests from the frontend
app.use(cors({
  origin: 'http://localhost:5173', //route we run our code on
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

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

// Add routes for services here:
app.post("/weather", (req, res) => proxy("service-weather", req, res));

// Forward GET /pins to pins-service
app.get('/pins', async (req, res) => {
    try {
        const response = await fetch('http://pins-service:4000/pins');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: 'Failed to fetch pins from pins-service' });
    }
});

app.post('/pins', async (req, res) => {
    try {
        const response = await fetch('http://pins-service:4000/pins', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: 'Failed to add pin to pins-service' });
    }
});

// Proxy GET /comments/:pinId and POST /comments/:pinId to forum-service
app.get('/comments/:pinId', async (req, res) => {
    try {
        const response = await fetch('http://forum-service:5001/comments/' + req.params.pinId);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: 'Failed to fetch comments from forum-service' });
    }
});

app.post('/comments/:pinId', async (req, res) => {
    try {
        const response = await fetch('http://forum-service:5001/comments/' + req.params.pinId, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });
        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        log.error(error);
        res.status(500).json({ error: 'Failed to add comment to forum-service' });
    }
});

app.post('/auth/login', async(req, res) => {
    try{
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ 
                error: "Username and password are required" 
            });
        }
        const response = await fetch(`http://auth-service:4001/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                username: req.body.username,
                password: req.body.password
            })
        });

        const data = await response.json();

        if(!response.ok){
            const errorData = await response.json();
            return res.status(response.status).json(errorData);
        }

        
        res.json({
            status: "success",
            user: {
                id: data.user_id,
                username: data.username
            }
        });
    } catch(err) {
        log.error(err);
        res.status(500).json({error: "Failed to authenticate user"});
    }
});

app.post('/auth/register', async (req, res) => {
    try {
        log.info(`Registration attempt - forwarding to auth-service: ${JSON.stringify(req.body)}`);
        
        const response = await fetch('http://auth-service:4001/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        log.info(`Auth service response: ${response.status} - ${JSON.stringify(data)}`);
        
        res.status(response.status).json(data);
        
    } catch (err: unknown) {  
        log.error('Registration failed:', err);
        
        if (err instanceof Error) {
            return res.status(500).json({ 
                error: "Registration service unavailable",
                details: process.env.NODE_ENV === 'development' ? err.message : undefined
            });
        }
        
        return res.status(500).json({ 
            error: "Registration service unavailable" 
        });
    }
});

app.listen(PORT, () => {
    log.info(`API-Gateway listening on ${PORT}`);
    fetch(`${REGISTRY}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "api-gateway", url: `http://api-gateway:${PORT}` })
    });
});
