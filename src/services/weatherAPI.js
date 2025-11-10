// --- CONFIGURATION ---
const API_CONFIG = {
  BASE_URL: 'https://api.weather.gov',
  HEADERS: {
    'User-Agent': '(Cloud-9 Weather App, contact@example.com)',
    'Accept': 'application/geo+json'
  }
};

/**
 * Generic function to handle the fetch request and check for errors.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<object>} The parsed JSON data.
 */
async function _fetcher(url) {
  const response = await fetch(url, {
    headers: API_CONFIG.HEADERS
  });
  
  if (!response.ok) {
    throw new Error(`API Request Failed: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

/**
 * Gets the grid data for a location using lat/lon
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 */
export async function getGridData(lat, lon) {
  try {
    const url = `${API_CONFIG.BASE_URL}/points/${lat},${lon}`;
    return await _fetcher(url);
  } catch (err) {
    console.error('getGridData error:', err);
    throw err;
  }
}

/**
 * Gets the forecast for a specific grid
 * @param {string} office - Weather office code
 * @param {number} gridX - Grid X coordinate
 * @param {number} gridY - Grid Y coordinate
 */
export async function getForecast(office, gridX, gridY) {
  try {
    const url = `${API_CONFIG.BASE_URL}/gridpoints/${office}/${gridX},${gridY}/forecast`;
    return await _fetcher(url);
  } catch (err) {
    console.error('getForecast error:', err);
    throw err;
  }
}

/**
 * Gets the hourly forecast for a specific grid
 * @param {string} office - Weather office code
 * @param {number} gridX - Grid X coordinate
 * @param {number} gridY - Grid Y coordinate
 */
export async function getHourlyForecast(office, gridX, gridY) {
  try {
    const url = `${API_CONFIG.BASE_URL}/gridpoints/${office}/${gridX},${gridY}/forecast/hourly`;
    return await _fetcher(url);
  } catch (err) {
    console.error('getHourlyForecast error:', err);
    throw err;
  }
}

/**
 * Gets alerts for a specific state
 * @param {string} state - State code (e.g., 'CA', 'NY')
 */
export async function getAlerts(state) {
  try {
    const url = `${API_CONFIG.BASE_URL}/alerts/active/area/${state}`;
    return await _fetcher(url);
  } catch (err) {
    console.error('getAlerts error:', err);
    throw err;
  }
}

/**
 * Searches for locations using Nominatim (OpenStreetMap geocoding).
 * Returns US-only results for NOAA compatibility.
 * @param {string} query - Search query (e.g., 'New York')
 * @param {number} [limit=5] - Max results
 * @returns {Promise<Array<{name: string, lat: number, lon: number}>>}
 */
export async function searchLocations(query, limit = 5) {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&countrycodes=us&limit=${limit}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Geocoding Failed: ${response.status} - ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.map(item => ({
      name: `${item.address.city || item.address.town || item.address.village || item.address.hamlet || item.display_name}, ${item.address.state || ''}`.trim(),
      lat: parseFloat(item.lat),
      lon: parseFloat(item.lon),
    }));
  } catch (err) {
    console.error('searchLocations error:', err);
    throw err;
  }
}

/**
 * Normalizes NOAA forecast data to match OpenWeather-style structure.
 * @param {object} forecast - The NOAA forecast response.
 * @returns {Array} Normalized forecast periods.
 */
export function normalizeForecast(forecast) {
  if (!forecast?.properties?.periods) return [];

  return forecast.properties.periods.map(period => {
    // Improved wind speed parsing (handles "5 to 10 mph" → 5)
    const windSpeedMatch = period.windSpeed.match(/(\d+)/);
    const windSpeed = windSpeedMatch ? parseInt(windSpeedMatch[0]) : 0;

    return {
      dt_txt: period.startTime,
      main: {
        temp: period.temperature,
        temp_max: period.temperature, // NOAA periods are aggregates; refine if using hourly
        temp_min: period.temperature,
      },
      weather: [
        {
          main: period.shortForecast,
          description: period.detailedForecast,
          icon: period.icon || '',
        },
      ],
      wind: {
        speed: windSpeed,
        direction: period.windDirection,
      },
      name: period.name,
    };
  });
}