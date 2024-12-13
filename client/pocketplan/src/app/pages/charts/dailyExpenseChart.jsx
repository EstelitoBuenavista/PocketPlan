// components/dailyExpenseChart
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { dailyTotal: 'Dec 6', income: 4000, expenses: 2400, amt: 2400 },
  { dailyTotal: 'Dec 7', income: 3000, expenses: 1398, amt: 2210 },
  { dailyTotal: 'Dec 8', income: 2000, expenses: 9800, amt: 2290 },
  { dailyTotal: 'Dec 9', income: 2780, expenses: 3908, amt: 2000 },
  { dailyTotal: 'Dec 10', income: 1890, expenses: 4800, amt: 2181 },
  { dailyTotal: 'Dec 11', income: 2390, expenses: 3800, amt: 2500 },
  { dailyTotal: 'Dec 13', income: 3490, expenses: 4300, amt: 2100 },
  { dailyTotal: 'Dec 14', income: 3490, expenses: 4300, amt: 2100 },
  { dailyTotal: 'Dec 15', income: 1234, expenses: 8000, amt: 200 },
  { dailyTotal: 'Dec 16', income: 2780, expenses: 3908, amt: 2000 },
  { dailyTotal: 'Dec 17', income: 2000, expenses: 9800, amt: 2290 },
  { dailyTotal: 'Dec 18', income: 3100, expenses: 2500, amt: 1900 },
  { dailyTotal: 'Dec 19', income: 4000, expenses: 3100, amt: 2000 },
  { dailyTotal: 'Dec 20', income: 5000, expenses: 1200, amt: 3800 },
  { dailyTotal: 'Dec 21', income: 1800, expenses: 2400, amt: 1500 },
  { dailyTotal: 'Dec 22', income: 2300, expenses: 1700, amt: 1900 },
  { dailyTotal: 'Dec 23', income: 2750, expenses: 2100, amt: 2000 },
  { dailyTotal: 'Dec 24', income: 2200, expenses: 3600, amt: 1800 },
  { dailyTotal: 'Dec 25', income: 3500, expenses: 2900, amt: 2500 },
  { dailyTotal: 'Dec 26', income: 2700, expenses: 1800, amt: 2200 },
  { dailyTotal: 'Dec 27', income: 3100, expenses: 2400, amt: 2300 }
];

function DailyExpenseChart() {
  const slicedData = data.slice(-10);
  const maxValue = Math.max(...slicedData.flatMap((d) => [d.income, d.expenses]));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={slicedData}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dailyTotal" tick={{ fontSize: 12 }} />
        <YAxis 
          tick={{ fontSize: 12 }} 
          domain={[0, maxValue]} 
          tickCount={10}
        />
        <Tooltip contentStyle={{ fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#0C68FF"
          activeDot={{ r: 4 }}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#7AD47A"
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DailyExpenseChart;