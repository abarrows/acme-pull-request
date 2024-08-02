import { env } from '@/common/utils/envConfig';

// Define the shape of the weather data
interface WeatherData {
  city: string;
  temperature: number;
  weatherPrediction: string;
}

async function fetchWeather(cityName: string): Promise<WeatherData> {
  const { SERVICE_WEATHER_URL, SERVICE_WEATHER_SECRET } = env;

  if (!SERVICE_WEATHER_URL || !SERVICE_WEATHER_SECRET) {
    throw new Error('Weather service configuration is missing.');
  }

  const apiKey: string = SERVICE_WEATHER_SECRET;
  const apiURL: string = `${SERVICE_WEATHER_URL}/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }

    const data = await response.json();

    // Assuming the data structure returned by the API
    const c: string = data.name; // Adjust according to the actual API response
    const t: number = data.main.temp; // Adjust according to the actual API response
    const d: string = data.weather[0].description; // Adjust according to the actual API response

    // Example conditional check on temperature
    if (t === 10) {
      // Do something if temperature is exactly 10
    }

    return { city: c, temperature: t, weatherPrediction: d };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error; // Re-throw error to be handled by caller
  }
}

export default fetchWeather;
