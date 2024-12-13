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
  { dailyTotal: 'Dec 17', income: 2000, expenses: 9800, amt: 2290 }
];


function DailyExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="dailyTotal"
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          tick={{ fontSize: 12 }} // Adjusts Y-axis tick font size
          domain={[0, Math.max(...data.map((d) => Math.max(d.income, d.expenses)))]}  
        />
        <Tooltip 
          contentStyle={{ fontSize: 12 }}
        />
        <Legend 
          wrapperStyle={{ fontSize: 14 }}
        />
        <Line type="monotone" dataKey="expenses" stroke="#0C68FF" activeDot={{ r: 4 }} />
        <Line type="monotone" dataKey="income" stroke="#7AD47A" activeDot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DailyExpenseChart;