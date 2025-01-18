import axios from 'axios';

/**
 * Fetch weather data by city name.
 * @param city - Name of the city
 * @returns Weather data from OpenWeatherMap API
 */
export const fetchWeather = async (city: string) => {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
};