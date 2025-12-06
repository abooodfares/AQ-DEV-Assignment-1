import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([])
  const [connectionStatus, setConnectionStatus] = useState('Connecting...')

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:8080/api/transactions/stream');

    eventSource.onopen = () => {
      setConnectionStatus('Connected');
    };

    eventSource.onmessage = (event) => {
      try {
        const newTransaction = JSON.parse(event.data);
        setTransactions(prev => {
          const updated = [newTransaction, ...prev];
          return updated.slice(0, 50); // Keep last 50
        });
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    };

    eventSource.onerror = () => {
      setConnectionStatus('Connection Error');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="dashboard-container">
      <header className="top-bar">
        <div className="logo-section">
          <h2>AQAR<span className="dot">.</span>LIVE</h2>
        </div>
        <div className={`connection-badge ${connectionStatus === 'Connected' ? 'online' : 'offline'}`}>
          <span className="indicator"></span>
          {connectionStatus}
        </div>
      </header>

      <div className="main-card">
        <div className="card-header">
          <div className="tabs">
            <button className="tab active">Transactions</button>
            <button className="tab">Analytics</button>
            <button className="tab">Map View</button>
          </div>
          <div className="actions">
            <button className="btn-download">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              Export Data
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>City</th>
                <th>Property Type</th>
                <th>Price (SAR)</th>
                <th>Date & Time</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(t => (
                <tr key={t.id} className="row-animate">
                  <td className="id-cell">#{t.id}</td>
                  <td className="city-cell">
                    <div className="city-info">
                      <span className="city-name">{t.city || 'Unknown'}</span>
                      <span className="city-code">{t.cityCode}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`type-tag ${t.type ? t.type.toLowerCase() : ''}`}>{t.type}</span>
                  </td>
                  <td className="price-cell">
                    {t.price ? new Intl.NumberFormat('en-SA', { style: 'decimal', minimumFractionDigits: 2 }).format(t.price) : '0.00'} <span className="currency">SAR</span>
                  </td>
                  <td className="time-cell">
                    {t.time ? new Date(t.time).toLocaleString() : '-'}
                  </td>
                  <td>
                    <span className="trend-up">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="6" className="empty-state">
                    <div className="loader"></div>
                    <p>Waiting for real-time transactions...</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
