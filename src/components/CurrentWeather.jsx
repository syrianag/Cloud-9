// src/components/CurrentWeather.jsx
import VoiceMemo from './VoiceMemo';
/*import '../styles/WeatherCard.css';*/

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const temperature = data?.temperature || 72;
  const conditions = data?.shortForecast || 'Clear';
  const icon = data?.icon || '/path/to/default-icon.png';

  return (
    <div className="weather-card current-weather">
      <div className="weather-main">
        <img 
          src={icon} 
          alt={conditions} 
          className="weather-icon"
        />
        <div className="temperature-display">
          <span className="current-temp">{temperature}°F</span>
          <span className="conditions">{conditions}</span>
        </div>
      </div>
      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity:</span>
          <span className="detail-value">{data?.relativeHumidity?.value || 'N/A'}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind:</span>
          <span className="detail-value">{data?.windSpeed || 'N/A'}</span>
        </div>
      </div>
      <VoiceMemo 
        weather={{ temp: temperature, condition: conditions }}
        location="Current Location"
      />
    </div>
  );
}