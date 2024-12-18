// components/transactionRow
import { jwtDecode } from "jwt-decode"
function TransactionRow({ transaction, isOpen, toggleDetails, update, setUpdateTransaction }) {
  const handleDelete = ()=>{
    let id = 0
      const token = localStorage.getItem("token")
      if (token){
      id = jwtDecode(token).userId.toString()
      } else {
      router.push('/pages/login')
      }
    fetch(`http://localhost:4000/transaction/${transaction.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(()=>toggleDetails())
    .catch(error => {
        console.log("Error:", error);
      });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Main Row Info */}
      <tr 
        className={`cursor-pointer ${isOpen ? 'bg-gray-100 border-none' : 'hover:bg-gray-200'}`}
        onClick={toggleDetails}>
        <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold text-neutral">{transaction.title}</div>
              <div className="text-xs text-neutral-content">{transaction.Account.name}</div>
            </div>
          </div>
        </td>
        <td>
          <span className="badge badge-sm p-2 text-neutral-content">{transaction.Category.name}</span>
        </td>
        <td className={`font-medium ${transaction.type === "Income" ? "text-success" : "text-primary"}`}>
          ₱ {transaction.amount.toFixed(2)}
        </td>
        <td className="text-neutral">{transaction.remarks}</td>
        <td className="text-neutral-content">{formatDate(transaction.transaction_date)}</td>
      </tr>

      {/* Collapsible Section for Edit Button */}
      {isOpen && (
        <tr>
          <td colSpan="5" className="bg-gray-100 p-2">
            <div className="flex gap-3 pr-2 justify-end">
              <button
                className="bg-error text-base-100 px-4 py-2 rounded hover:bg-orange-600"
                onClick={() => handleDelete()}
              >
                Delete
              </button>
              <button
                className="bg-primary text-base-100 px-4 py-2 rounded hover:bg-blue-600"
                onClick={()=>{update(); setUpdateTransaction(transaction)}}
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
  
  export default TransactionRow;
  