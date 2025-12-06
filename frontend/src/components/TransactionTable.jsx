import TransactionRow from './TransactionRow';

export default function TransactionTable({ transactions }) {
    return (
        <div className="main-card">
            <div className="card-header">
                <div className="tabs">
                    <button className="tab active">Live Transactions</button>
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
                            <TransactionRow key={t.id} transaction={t} />
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
    );
}
