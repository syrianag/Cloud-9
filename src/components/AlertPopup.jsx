export default function AlertPopup({ alerts, onClose }) {
  if (!alerts || alerts.length === 0) return null;

  return (
    <div className="alert-overlay" onClick={onClose}>
      <div className="alert-popup" onClick={(e) => e.stopPropagation()}>
        <div className="alert-header">
          <h3>⚠️ Weather Alerts</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <div className="alert-content">
          {alerts.map((alert, index) => (
            <div key={index} className={`alert-item ${alert.severity}`}>
              <div className="alert-icon">{alert.icon}</div>
              <div className="alert-details">
                <h4>{alert.title}</h4>
                <p>{alert.message}</p>
                <span className="alert-time">{alert.timeframe}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}