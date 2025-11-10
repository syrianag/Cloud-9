import WeatherPanel from "../components/WeatherPanel";
import "../styles/Home.css";

export default function Home() {
  const mockCurrent = {
    startTime: new Date().toISOString(),
    temperature: 72,
    temperatureUnit: "F",
    shortForecast: "Sunny",
    icon: "/icons/sun.png",
    windSpeed: "5 mph",
    relativeHumidity: { value: 45 },
  };

  const mockForecast = Array.from({ length: 7 }, (_, i) => ({
    startTime: new Date(Date.now() + i * 86400000).toISOString(),
    temperature: 70 + i,
    temperatureUnit: "F",
    shortForecast: "Partly Cloudy",
    icon: "/icons/cloud.png",
  }));

  const alerts = [{ message: "High UV Index today!" }];

  return (
    <div className="home-container">
      <header className="app-header">
        <h1 className="app-title">CLOUD-9</h1>
        <nav className="nav-buttons">
          <button>Home</button>
          <button>Maps</button>
          <button>Settings</button>
        </nav>
      </header>

      <main className="home-content">
        <WeatherPanel
          current={mockCurrent}
          forecast={mockForecast}
          location="New York, NY"
          alerts={alerts}
          onPlayVoiceMemo={() => alert("Playing weather summary...")}
        />

        <div className="suggestion-box">
          <span>💡 Suggestion: Go to settings to personalize your app!</span>
        </div>
      </main>
    </div>
  );
}
