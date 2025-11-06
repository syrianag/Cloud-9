export default InfoCards 
function InfoCards({ data, city }) {
  const windDirection = data.wind.deg;
  const airQuality = 'Good'; // You'd need a separate API for real AQI

  return (
    <div className="info-cards">
      <div className="info-card">
        <h4>City Weather</h4>
        <p>{city.name}, {city.country}</p>
        <p>Population: {city.population?.toLocaleString() ?? 'N/A'}</p>
      </div>
      <div className="info-card">
        <h4>Air Quality</h4>
        <p className="aqi-value">{airQuality}</p>
        <div className="aqi-bar"></div>
      </div>
      <div className="info-card">
        <h4>Wind Direction</h4>
        <p>{windDirection}°</p>
        <div className="compass">↑</div>
      </div>
    </div>
  );
}

