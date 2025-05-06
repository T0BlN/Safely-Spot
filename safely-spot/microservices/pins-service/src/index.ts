import express, { Request, Response } from 'express';

const app = express();
const PORT = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Placeholder for storing pins in memory
interface Pin {
  location: string;
  description: string;
}
const pins: Pin[] = [];

// Endpoint to fetch all pins
app.get('/pins', (req: Request, res: Response) => {
  res.json(pins);
});

// Endpoint to add a new pin
app.post('/pins', (req: Request<{}, {}, Pin>, res: Response): void => {
  const pin: Pin = req.body;
  if (!pin || !pin.location || !pin.description) {
    res.status(400).json({ error: 'Invalid pin data' });
    return;
  }
  pins.push(pin);
  res.status(201).json(pin);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Pins service is running on port ${PORT}`);
});