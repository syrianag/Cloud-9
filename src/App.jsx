import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import WeeklyForecast from './components/WeeklyForecast';
import Statistics from './components/Statistics';
import InfoCards from './components/InfoCards';
import AlertPopup from './components/AlertPopup';
import './App.css';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [showAlerts, setShowAlerts] = useState(false);

  
  const city = 'New York';

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    if (weather) {
      generateAlerts(weather);
    }
  }, [weather]);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${API_KEY}`
      );
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setLoading(false);
    }
  };

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
        icon: '🌡️'
      });
    }

    if (current.main.temp < 32) {
      newAlerts.push({
        title: 'Freezing Temperature',
        message: `Temperature is ${Math.round(current.main.temp)}°F. Bundle up and watch for ice!`,
        timeframe: 'Current',
        severity: 'danger',
        icon: '🥶'
      });
    }

    // Rain alerts
    if (nextHour.weather[0].main === 'Rain' || current.weather[0].main === 'Rain') {
      newAlerts.push({
        title: 'Rain Expected',
        message: 'Bring an umbrella! Rain is expected within the next hour.',
        timeframe: 'Next Hour',
        severity: 'info',
        icon: '☔'
      });
    }

    // Wind alerts
    if (current.wind.speed > 20) {
      newAlerts.push({
        title: 'High Wind Warning',
        message: `Wind speeds reaching ${Math.round(current.wind.speed)} mph. Secure loose objects.`,
        timeframe: 'Current',
        severity: 'warning',
        icon: '💨'
      });
    }

    // Tomorrow's weather
    if (tomorrow.weather[0].main === 'Rain') {
      newAlerts.push({
        title: 'Rain Tomorrow',
        message: 'Plan ahead! Rain is expected tomorrow.',
        timeframe: 'Tomorrow',
        severity: 'info',
        icon: '🌧️'
      });
    }

    if (Math.abs(current.main.temp - tomorrow.main.temp) > 15) {
      newAlerts.push({
        title: 'Temperature Change',
        message: `Expect a ${Math.round(Math.abs(current.main.temp - tomorrow.main.temp))}°F temperature change tomorrow.`,
        timeframe: 'Tomorrow',
        severity: 'info',
        icon: '📊'
      });
    }

    setAlerts(newAlerts);
    if (newAlerts.length > 0) {
      setShowAlerts(true);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!weather) return <div className="error">Unable to load weather data</div>;

  return (
    <div className="app">
      <Header city={weather.city.name} />
      
      {alerts.length > 0 && (
        <button className="alert-badge" onClick={() => setShowAlerts(true)}>
          ⚠️ {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
        </button>
      )}

      <div className="main-content">
        <div className="left-section">
          <CurrentWeather data={weather.list[0]} />
          <WeeklyForecast forecast={weather.list} />
        </div>
        <Statistics data={weather.list[0]} />
      </div>

      <InfoCards data={weather.list[0]} city={weather.city} />

      {showAlerts && (
        <AlertPopup 
          alerts={alerts} 
          onClose={() => setShowAlerts(false)}
        />
      )}
    </div>
    
  );
}
