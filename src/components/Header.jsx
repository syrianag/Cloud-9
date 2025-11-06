function Header({ city }) {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <header className="header">
      <h1 className="logo">CLOUD-9</h1>
      <div className="location">
        <p className="date">{today}</p>
        <p className="city">{city}</p>
      </div>
    </header>
  );
}

export default Header;