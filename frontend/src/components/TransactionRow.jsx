export default function TransactionRow({ transaction }) {
    return (
        <tr className="row-animate">
            <td className="id-cell">#{transaction.id}</td>
            <td className="city-cell">
                <div className="city-info">
                    <span className="city-name">{transaction.city || 'Unknown'}</span>
                    <span className="city-code">{transaction.cityCode}</span>
                </div>
            </td>
            <td>
                <span className={`type-tag ${transaction.type ? transaction.type.toLowerCase() : ''}`}>
                    {transaction.type}
                </span>
            </td>
            <td className="price-cell">
                {transaction.price
                    ? new Intl.NumberFormat('en-SA', { style: 'decimal', minimumFractionDigits: 2 }).format(transaction.price)
                    : '0.00'}{' '}
                <span className="currency">SAR</span>
            </td>
            <td className="time-cell">
                {transaction.time ? new Date(transaction.time).toLocaleString() : '-'}
            </td>
            <td>
                <span className="trend-up">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                        <polyline points="17 6 23 6 23 12"></polyline>
                    </svg>
                </span>
            </td>
        </tr>
    );
}
