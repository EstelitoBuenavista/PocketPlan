// components/dailyExpenseChart
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';


function DailyExpenseChart({ selectedAccount }) {
    const [data,setData] = useState([])
  
    const renderLineChart = () => {
      let id = 0
      const token = localStorage.getItem("token")
      if (token){
      id = jwtDecode(token).userId.toString()
      } else {
      router.push('/pages/login')
      }
      fetch(`http://localhost:4000/user/daily/${id}`)
        .then(response => response.json())
        .then(data => {
          selectedAccount ? 
          setData(data.filter(item => item.account_id === selectedAccount.id)) :
          setData(data)
        })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  
    useEffect(() => {
      renderLineChart()
     }, [])

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