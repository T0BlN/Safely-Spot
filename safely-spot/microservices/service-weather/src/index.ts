import express, { Request, Response } from "express";
import { pino } from "pino";
import fetch from "node-fetch";

//Setting up some interface stuff for the typing issues
interface GeoResult {
    latitude: number;
    longitude: number;
    name: string;
    country: string;
}
interface GeoResponse {
    results?: GeoResult[];
}
interface CurrentWeather {
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: 0 | 1;
    time: string;
}
interface WeatherResponse {
    current_weather: CurrentWeather;
}

const PORT = 3000;
const REGISTRY_URL = "http://registry:3000";

const log = pino({ transport: { target: "pino-pretty" } });
const app = express();
app.use(express.json());

//registerWithRetry like from homework
async function registerWithRetry(name: string, url: string, max = 5) {
    for (let i = 0; i < max; i++) {
        try {
            const res = await fetch(`${REGISTRY_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, url })
            });
            if (!res.ok) throw new Error(`status ${res.status}`);
            log.info("Registered with registry");
            return;
        } catch (err) {
            log.warn(`register retry ${i + 1}: ${(err as Error).message}`);
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
    log.error("Could not register after retries, exiting");
    process.exit(1);
}

app.post("/", async (req: Request, res: Response) => {
    //takes in a city string, error if not
    const { city } = req.body as { city?: string };

    if (!city) return res.status(400).json({ error: "missing city field" });

    try {
        //uses open-mateo api to get the necessary information about the city input
        const geo = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            city
            )}&count=1`
        ).then(r => r.json() as Promise<GeoResponse>);

        if (!geo.results?.length)
        return res.status(404).json({ error: "city not found" });

        const { latitude, longitude, name, country } = geo.results[0];

        //api to get the weather information
        const weather = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        ).then(r => r.json() as Promise<WeatherResponse>);

        const cw = weather.current_weather;

        //response containes all the weather information for inputted city and timestamp
        res.json({
            from: "service-weather",
            location: { city: name, country, latitude, longitude },
            weather: {
                temperature_c: cw.temperature,
                windspeed_kph: cw.windspeed,
                winddirection_deg: cw.winddirection,
                is_day: cw.is_day,
                weathercode: cw.weathercode,
                time: cw.time
            },
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        log.error(err);
        res.status(500).json({ error: "weather lookup failed" });
    }
});

app.listen(PORT, () => {
    log.info(`service-weather listening on ${PORT}`);
    registerWithRetry("service-weather", `http://service-weather:${PORT}`);
});