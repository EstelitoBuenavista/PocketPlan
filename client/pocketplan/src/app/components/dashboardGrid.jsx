// components/dashboardGrid
'use client';

import { 
  usePathname, 
  useRouter } 
  from 'next/navigation';
import TotalCard from './totalCard';
import TransactionsList from "@/app/components/transactionsList";
import {
  ArrowUpRightIcon
} from "@heroicons/react/24/outline";

function DashboardGrid({ selectedAccount }) {
  const isOverview = !selectedAccount;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
      {/* LEFT COLUMN */}
      <div className="border-2 border-error p flex flex-wrap gap-4">
      {/* <div className="py-2 flex flex-wrap gap-4"> */}
        <TotalCard
          title={`Balance`}
          value={isOverview ? '-' : selectedAccount.balance}
        />
        <TotalCard
          title={`Expenses`}
          // add logic for EXPENSES HERE
          value={isOverview ? '-' : selectedAccount.balance * 0.3}
        />
        
        <div className="border-2 border-primary">
        <button 
          className="text-2xl font-medium my-4 text-neutral flex gap-2 items-center hover:underline"
          onClick={() => {
            if (selectedAccount) {
              router.push(`/pages/transactions?accountId=${selectedAccount.id}`);
            } else {
              router.push('/pages/transactions');
            }
          }}
        >
          <span className="flex items-center gap-2 w-full">
            <ArrowUpRightIcon className="w-5 h-5 stroke-[2px]" />
            Recent Transactions
          </span>
        </button>

          <TransactionsList selectedAccount={ selectedAccount }/>
        </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="border-2 border-error gap-4 w-full h-full">
      {/* <div className="p-2 gap-4 w-full h-full"> */}
        
      </div>
    </div>
  );
}

export default DashboardGrid;
