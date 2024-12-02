// components/dashboardLayout
'use client'

function DashboardLayout({ accountName, accountDetails }) {
  return (
    <div className="grid h-full grid-cols-[5fr_2fr] gap-4 w-full mt-2">
      {/* left column */}
      <div className="bg-info p-2 rounded shadow">
        <h2>LEFT COLUMN</h2>
      </div>

      {/* right column */}
      <div className="bg-success p-2 rounded shadow">
        <h2>RIGHT COLUMN</h2>
      </div>
    </div>
  );
}

export default DashboardLayout;
