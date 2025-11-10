// src/components/WeatherPanel.jsx
import VoiceMemo from "./VoiceMemo";
import "../styles/WeatherPanel.css";

/**
 * WeatherPanel Component
 * Combines the current weather card, alerts, statistics, and weekly forecast
 * Includes an accessible voice memo button that narrates weather conditions.
 */
export default function WeatherPanel({ current, forecast = [], location, alerts = [] }) {
  if (!current) return null;

  return (
    <section className="weather-panel">
      {/* ---------- CURRENT WEATHER CARD ---------- */}
      <div className="weather-card">
        <h2 className="weather-location">{location}</h2>

        <img
          src={current.icon}
          alt={current.shortForecast}
          className="weather-icon"
        />

        <p className="weather-temp">
          {current.temperature}°{current.temperatureUnit}
        </p>
        <p className="weather-condition">{current.shortForecast}</p>

        {/* Weather Alert */}
        {alerts.length > 0 && (
          <div className="weather-alert">
            ⚠️ {alerts[0].message}
          </div>
        )}

        {/* Voice Memo Component */}
        <VoiceMemo
          weather={{
            temp: current.temperature,
            condition: current.shortForecast,
          }}
          location={location}
        />
      </div>

      {/* ---------- WEATHER STATISTICS ---------- */}
      <div className="weather-stats">
        <h3>Statistics</h3>
        <p>
          <strong>Wind:</strong> {current.windSpeed}
        </p>
        <p>
          <strong>Humidity:</strong>{" "}
          {current.relativeHumidity?.value
            ? `${current.relativeHumidity.value}%`
            : "N/A"}
        </p>
        <p>
          <strong>UV Index:</strong> {current.uvIndex || "N/A"}
        </p>
      </div>

      {/* ---------- WEEKLY FORECAST GRID ---------- */}
      <div className="forecast-grid">
        {forecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <div className="forecast-day-name">
              {new Date(day.startTime).toLocaleDateString("en-US", {
                weekday: "short",
              })}
            </div>
            <img
              src={day.icon}
              alt={day.shortForecast}
              className="weather-icon small"
            />
            <div className="forecast-temp">
              {day.temperature}°{day.temperatureUnit}
            </div>
            <div className="forecast-condition">{day.shortForecast}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
