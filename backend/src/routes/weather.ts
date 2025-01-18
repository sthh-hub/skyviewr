import { Router, Request, Response } from 'express';
import { fetchWeather } from '../services/weatherService';

const router = Router();

router.get('ping', (req: Request, res: Response) => {
    res.send('pong');
});

/**
 * GET /api/weather/:city
 * Fetch weather data by city name.
 */
router.get('/:city', async (req: Request, res: Response): Promise<void> => {
    const city = req.params.city;

    if (!city) {
        res.status(400).json({ error: 'City name is required' });
        return; // Ensure function ends after response
    }

    try {
        const weatherData = await fetchWeather(city);
        res.json(weatherData); // Ensure fetchWeather returns a compatible type
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

export default router;