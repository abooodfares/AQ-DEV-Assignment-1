import { useState, useEffect } from 'react';

export function useTransactionStream() {
    const [transactions, setTransactions] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('Connecting...');

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:8080/api/transactions/latestTransactions');

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

    return { transactions, connectionStatus };
}
