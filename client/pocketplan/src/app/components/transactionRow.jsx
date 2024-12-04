// components/transactionRow
function TransactionRow({ transaction }) {
    return (
      <tr key={transaction.id}>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold text-neutral">{transaction.accountId}</div>
              <div className="text-xs text-neutral-content">Account</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-sm p-2 text-neutral-content">{transaction.categoryId}</span>
        </td>
        <td className="text-neutral font-medium">₱ {transaction.amount.toFixed(2)}</td>
        <td className="text-neutral">{transaction.remarks}</td>
        <td className="text-neutral-content">{transaction.transactionDate}</td>
      </tr>
    );
  }
  
  export default TransactionRow;
  