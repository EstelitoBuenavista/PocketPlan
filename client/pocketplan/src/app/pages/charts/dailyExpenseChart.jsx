// components/dailyExpenseChart
import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { triggerContext } from '../dashboard/accountList';

function DailyExpenseChart({ selectedAccount }) {
    const [data,setData] = useState([])
    const [accountTrigger, setAccountTrigger, selectedAccountId] = useContext(triggerContext)
    const [slicedData, setSlicedData] = useState("")
    const [maxValue, setMaxValue] = useState(0)
  
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
          // const filteredData = selectedAccountId ? data.filter(item => item.account_id === selectedAccountId) : data;
          if (Array.isArray(data)) {
            selectedAccount
              ? setData(data.filter(item => item.account_id === selectedAccount.id))
              : setData(data);
          } else {
            setData([]);
          }
          // setData(filteredData);
          setData(data);

          const sliced = filteredData.slice(-10);
          setSlicedData(sliced);

          const maxCategoryValue = Math.max(
              ...sliced.flatMap((d) => [d.income, d.expenses])
          );
          setMaxValue(Math.ceil(maxCategoryValue / 10) * 10);
      })
        .catch(error => {
          console.log("Error:", error);
        });
    }
  
    useEffect(() => {
      renderLineChart()
     }, [])
    useEffect(() => {
      renderLineChart()
     }, [selectedAccount, selectedAccountId])

  return (
    <>
    {slicedData && slicedData.length > 0 ? (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 5,
          left: 5,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
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
  ) : (
    <p>No data available to display</p>
  )}
  </> 
  );
}

export default DailyExpenseChart;