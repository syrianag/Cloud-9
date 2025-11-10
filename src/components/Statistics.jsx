// src/components/Statistics.jsx

export default function Statistics({ data }) {
  if (!data) return null;

  return (
    <div className="statistics-panel">
      <h2 className="panel-title">Weather Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Wind Speed</span>
          <span className="stat-value">{data.windSpeed || 'N/A'}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">{data.relativeHumidity?.value || 'N/A'}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Precipitation</span>
          <span className="stat-value">{data.probabilityOfPrecipitation?.value || '0'}%</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Visibility</span>
          <span className="stat-value">{data.visibility?.value || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}