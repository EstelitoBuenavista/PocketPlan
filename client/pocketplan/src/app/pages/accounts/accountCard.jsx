// components/accountCard
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

function AccountCard ({ account }) {
   return (
      <div className="glass card bg-primary shadow-xl transition-transform hover:bg-blue-600">
         <div className="card-body">
            <div className="card-actions justify-end mb-4 md:md-2">
               <Square3Stack3DIcon className="w-8 h-8 text-secondary"/>
            </div>
            <h2 className="card-title ">{account.name}</h2>
            <h3 className="font-normal">₱ {account.balance}</h3>
               <p className="badge badge-secondary text-primary">{account.type}</p>
         </div>
      </div>
   )
}

export default AccountCard;