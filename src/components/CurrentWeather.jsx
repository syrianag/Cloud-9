export default function CurrentWeather({ data }) {
  const temp = Math.round(data.main.temp);
  const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const description = data.weather[0].description;

  return (
    <div className="current-weather">
      <img src={icon} alt={description} className="weather-icon" />
      <div className="temp-display">
        <h2 className="temperature">{temp}°F</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
}

