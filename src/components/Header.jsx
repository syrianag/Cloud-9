// src/components/Header.jsx
import "../styles/Header.css";

export default function Header({ city, currentPage, onNavigate }) {
  return (
    <header className="app-header">
      <h1 className="app-title">CLOUD-9</h1>

      <div className="location-title">{city}</div>

      <nav className="nav-buttons">
        <button
          onClick={() => onNavigate("home")}
          className={currentPage === "home" ? "active" : ""}
        >
          Home
        </button>
        <button
          onClick={() => onNavigate("maps")}
          className={currentPage === "maps" ? "active" : ""}
        >
          Maps
        </button>
        <button
          onClick={() => onNavigate("settings")}
          className={currentPage === "settings" ? "active" : ""}
        >
          Settings
        </button>
      </nav>
    </header>
  );
}
