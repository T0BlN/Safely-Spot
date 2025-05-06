import React, { useState } from 'react';
import { FaCloudSun } from 'react-icons/fa';
import './WeatherWidget.css';

interface WeatherData {
    location: { city: string; country: string };
    weather: {
        temperature_c: number;
        windspeed_kph: number;
        winddirection_deg: number;
        is_day: 0 | 1;
        weathercode: number;
    };
    timestamp: string;
}

const WeatherWidget: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<WeatherData | null>(null);
    const [error, setError] = useState<string | null>(null);

    const toggle = () => setOpen(!open);

    const fetchWeather = async () => {
        if (!city.trim()) return;
        setLoading(true);
        setError(null);
        setData(null);

        try {
            const res = await fetch('http://localhost:3000/weather', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ city }),
            });
            if (!res.ok) {
                const { error } = await res.json().catch(() => ({ error: 'unknown' }));
                throw new Error(error || res.statusText);
            }
            const json = await res.json();
            setData(json);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
        <button
            className="weather-toggle-button"
            aria-label="Show weather"
            onClick={toggle}
        >
            <FaCloudSun />
        </button>

        <div className={`weather-panel ${open ? 'open' : ''}`}>
            <div className="weather-input-row">
                <input
                    type="text"
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={fetchWeather} disabled={loading}>
                    {loading ? '...' : 'Go'}
                </button>
            </div>

            {error && <p className="weather-error"> ! {error}</p>}

            {data && (
            <div className="weather-result">
                <h4>
                    {data.location.city}, {data.location.country}
                </h4>
                <p>Temp: {data.weather.temperature_c * 9 / 5 + 32} °F</p>
                <p>Wind: {data.weather.windspeed_kph} km/h</p>
                <p>Dir: {data.weather.winddirection_deg}°</p>
                <p>{data.weather.is_day ? '☀ Day' : '🌙 Night'}</p>
                <small>{new Date(data.timestamp).toLocaleString()}</small>
            </div>
            )}
        </div>
        </>
    );
};

export default WeatherWidget;
