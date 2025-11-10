import { useState, useEffect } from 'react';
import { getGridData, getForecast, getAlerts, normalizeForecast } from './services/weatherAPI';
import useGeolocation from './services/geolocation';
import WeatherPanel from "./components/WeatherPanel";
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import Statistics from './components/LocationSearch';
import AlertPopup from './components/AlertPopup';

import './App.css';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [error, setError] = useState(null);

  // 🌎 Use geolocation hook (auto-detects user position)
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  // 🗺️ Default coordinates for New York City (fallback)
  const defaultLocation = {
    latitude: 40.7128,
    longitude: -74.0060,
  };

  useEffect(() => {
    if (!geoLoading) {
      fetchWeather();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [geoLoading, location]);

  useEffect(() => {
    if (weather) {
      generateAlerts(weather);
    }
  }, [weather]);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);

      // Use detected location if available, else fallback to NYC
      const coords = location || defaultLocation;

      // Fetch NOAA grid data for that location
      const gridData = await getGridData(coords.latitude, coords.longitude);
      const { properties } = gridData;

      // Fetch forecast using the grid info
      const forecast = await getForecast(properties.gridId, properties.gridX, properties.gridY);
      const normalizedForecast = normalizeForecast(forecast);

      // Get weather alerts for the state (if available)
      const stateCode = properties.relativeLocation.properties.state;
      const stateAlerts = await getAlerts(stateCode);

      // Process the forecast data into the expected format
      const processedForecast = {
        city: {
          name: properties.relativeLocation.properties.city,
          state: stateCode,
        },
        list: normalizedForecast,
      };

      setWeather(processedForecast);
      if (stateAlerts?.features?.length) {
        setAlerts(stateAlerts.features);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Unable to load weather data. Please try again later.');
      setLoading(false);
    }
  };

  // ⚠️ Generate custom alerts based on conditions
  const generateAlerts = (data) => {
    const newAlerts = [];
    const current = data.list[0];
    const nextHour = data.list[1];
    const tomorrow = data.list[8];

    // Temperature alerts
    if (current.main.temp > 85) {
      newAlerts.push({
        title: 'High Temperature Alert',
        message: `It's ${Math.round(current.main.temp)}°F. Stay hydrated and avoid prolonged sun exposure.`,
        timeframe: 'Current',
        severity: 'warning',
        icon: '🌡️',
      });
    }

    if (current.main.temp < 32) {
      newAlerts.push({
        title: 'Freezing Temperature',
        message: `Temperature is ${Math.round(current.main.temp)}°F. Bundle up and watch for ice!`,
        timeframe: 'Current',
        severity: 'danger',
        icon: '🥶',
      });
    }

    // Rain alerts
    if (nextHour.weather[0].main === 'Rain' || current.weather[0].main === 'Rain') {
      newAlerts.push({
        title: 'Rain Expected',
        message: 'Bring an umbrella! Rain is expected within the next hour.',
        timeframe: 'Next Hour',
        severity: 'info',
        icon: '☔',
      });
    }

    // Wind alerts
    if (current.wind.speed > 20) {
      newAlerts.push({
        title: 'High Wind Warning',
        message: `Wind speeds reaching ${Math.round(current.wind.speed)} mph. Secure loose objects.`,
        timeframe: 'Current',
        severity: 'warning',
        icon: '💨',
      });
    }

    // Tomorrow’s weather
    if (tomorrow.weather[0].main === 'Rain') {
      newAlerts.push({
        title: 'Rain Tomorrow',
        message: 'Plan ahead! Rain is expected tomorrow.',
        timeframe: 'Tomorrow',
        severity: 'info',
        icon: '🌧️',
      });
    }

    if (Math.abs(current.main.temp - tomorrow.main.temp) > 15) {
      newAlerts.push({
        title: 'Temperature Change',
        message: `Expect a ${Math.round(Math.abs(current.main.temp - tomorrow.main.temp))}°F temperature change tomorrow.`,
        timeframe: 'Tomorrow',
        severity: 'info',
        icon: '📊',
      });
    }

    setAlerts(newAlerts);
    if (newAlerts.length > 0) {
      setShowAlerts(true);
    }
  };

  // 🌀 Handle loading and error states
  if (loading || geoLoading) {
    return (
      <div className="app loading">
        <Header city="Loading..." />
        <div className="loading-indicator">
          {geoLoading ? 'Detecting your location...' : 'Loading weather data...'}
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="app error">
        <Header city="Error" />
        <div className="error-message">{error || 'Unable to load weather data'}</div>
      </div>
    );
  }

  // 🌤️ Main UI
  return (
    <div className="app">
      <Header city={`${weather.city.name}, ${weather.city.state}`} />

      {/* Show alert badge if active */}
      {alerts.length > 0 && (
        <button className="alert-badge" onClick={() => setShowAlerts(true)}>
          ⚠️ {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
        </button>
      )}

      <div className="main-content">
        <div className="left-section">
          <CurrentWeather data={weather.list[0]} />
        </div>
        <Statistics data={weather.list[0]} />
      </div>

      <WeatherPanel
      current={weather.list[0]}
      forecast={weather.list.slice(1, 7)}
      location={`${weather.city.name}, ${weather.city.state}`}
      alerts={alerts}
      />

      {showAlerts && <AlertPopup alerts={alerts} onClose={() => setShowAlerts(false)} />}

      {/* Show geolocation error softly */}
      {geoError && <div className="geo-warning">📍 {geoError}</div>}
    </div>
  );
}
