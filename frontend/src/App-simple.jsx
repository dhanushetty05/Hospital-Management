function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#10b981' }}>MediCare - Healthcare System</h1>
      <p>Frontend is working! ✅</p>
      <div style={{ marginTop: '20px' }}>
        <h2>Quick Links:</h2>
        <ul>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/appointments">Appointments</a></li>
        </ul>
      </div>
      <div style={{ marginTop: '20px', padding: '15px', background: '#f0fdf4', borderRadius: '8px' }}>
        <strong>Note:</strong> If you see this, React is working. The full app with all components will load next.
      </div>
    </div>
  );
}

export default App;
