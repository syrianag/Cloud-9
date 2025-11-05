import "../styles/WeatherCard.css";

const WeatherCard = ({ weather, location, alerts = [], onPlayVoiceMemo }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-location">{location}</h2>
      <img
        src={weather.icon}
        alt={weather.condition}
        className="weather-icon"
      />
      <p className="weather-temp">{weather.temp}°</p>
      <p className="weather-condition">{weather.condition}</p>

      {alerts.length > 0 && (
        <div className="weather-alert">
          ⚠️ {alerts[0].message}
        </div>
      )}

      <button
        onClick={onPlayVoiceMemo}
        className="weather-voice-btn"
        aria-label="Play weather summary"
      >
        🔊 Listen
      </button>
    </div>
  );
};

export default WeatherCard;
