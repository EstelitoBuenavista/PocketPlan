'use client';

import TotalCard from './totalCard';

function DashboardContent({ accountProp }) {
  const isOverview = !accountProp;

  return (
    <div className="grid h-full sm:grid-cols-[4fr_2fr] grid-cols-1 gap-4 w-full">
      {/* LEFT COLUMN */}
      <div className="border-2 border-error py-2 flex flex-wrap gap-4">
        <TotalCard
          title={`Balance`}
          value={isOverview ? 'TEST' : accountProp.balance}
        />
        <TotalCard
          title={`Expenses`}
          // add logic of EXPENSES HERE
          value={isOverview ? 'TEST' : accountProp.balance * 0.3}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div className="border-2 border-error p-2 gap-4 w-full h-full">
        
      </div>
    </div>
  );
}

export default DashboardContent;
