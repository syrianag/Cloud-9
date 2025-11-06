export default function Statistics({ data }) {
  // Defensive: if data isn't available yet, don't try to render properties from it
  if (!data) return null;
  const stats = [
    { label: 'Humidity', value: `${data?.main?.humidity ?? 'N/A'}%` },
    { label: 'Feels Like', value: `${data?.main?.feels_like ? Math.round(data.main.feels_like) + '°F' : 'N/A'}` },
    { label: 'Wind Speed', value: `${data?.wind?.speed ? Math.round(data.wind.speed) + ' mph' : 'N/A'}` },
    { label: 'Pressure', value: `${data?.main?.pressure ?? 'N/A'} hPa` },
    { label: 'Visibility', value: `${data?.visibility ? (data.visibility / 1609).toFixed(1) + ' mi' : 'N/A'}` },
    { label: 'Clouds', value: `${data?.clouds?.all ?? 'N/A'}%` }
  ];

  return (
    <div className="statistics">
      <h3>Statistics</h3>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="stat-card">
            <p className="stat-label">{stat.label}</p>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Greeting({name}) {
  return <h1>Hello, {name}!</h1>; // name was put into {} because it is a JS expression 
}