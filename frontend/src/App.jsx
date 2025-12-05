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
      console.log("Raw event data:", event.data);
      try {
        const newTransaction = JSON.parse(event.data);
        console.log("Parsed transaction:", newTransaction);

        setTransactions(prev => {
          const updated = [newTransaction, ...prev];
          return updated.slice(0, 20);
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
    <div className="container">
      <h1>Live Real Estate Transactions</h1>
      <div className={`status ${connectionStatus === 'Connected' ? 'connected' : 'error'}`}>
        Status: {connectionStatus}
      </div>

      <table>
        <thead>
          <tr>
            <th>City</th>
            <th>Type</th>
            <th>Price (SAR)</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.id} className="fade-in">
              <td>{t.city || 'Unknown City'}</td>
              <td>
                <span className={`badge ${t.type ? t.type.toLowerCase() : ''}`}>{t.type}</span>
              </td>
              <td className="price">
                {t.price ? new Intl.NumberFormat('en-SA', { style: 'currency', currency: 'SAR' }).format(t.price) : '0.00'}
              </td>
              <td>{t.time ? new Date(t.time).toLocaleTimeString() : 'No Time'}</td>
            </tr>
          ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: 'center' }}>Waiting for transactions...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default App
