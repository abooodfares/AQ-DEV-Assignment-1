import './App.css';
import Header from './components/Header';
import TransactionTable from './components/TransactionTable';
import { useTransactionStream } from './hooks/useTransactionStream';

function App() {
  const { transactions, connectionStatus } = useTransactionStream();

  return (
    <div className="dashboard-container">
      <Header connectionStatus={connectionStatus} />
      <TransactionTable transactions={transactions} />
    </div>
  );
}

export default App;
