// components/categoryPieChart
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const data = [
  { category: 'Work',     value: 2900 },
  { category: 'Misc',     value: 2000 },
  { category: 'Food',     value: 5600 },
  { category: 'Leisure',  value: 10000 },
  { category: 'Bills',    value: 12030 },
  { category: 'Supplies', value: 2300 },
  { category: 'School',   value: 3200 },
  { category: 'Music',    value: 12123 }
];

const COLORS = [ 
  '#2075fe', 
  '#7aadff',
  '#00378f'
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function CategoryPieChart({ selectedAccount }) {
  const [data,setData] = useState([])

  const renderPieChart = () => {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/user/pie/${id}`)
      .then(response => response.json())
      .then(data => {
        selectedAccount ? 
        setData(data.filter(item => item.transactions.account_id === selectedAccount.id)) :
        setData(data)

        console.log(data)
      })
      .catch(error => {
        console.log("Error:", error);
      });
  }

  useEffect(() => {
    renderPieChart()
   }, [])
   useEffect(() => {
    renderPieChart()
   }, [selectedAccount])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius="100%"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}


export default CategoryPieChart;