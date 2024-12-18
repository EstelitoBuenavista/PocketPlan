// components/categoryPieChart
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';
import { triggerContext } from '../dashboard/accountList';

const COLORS = [ 
  '#f75b8c', 
  '#d53582',
  '#ffa6cb'
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
  const [accountTrigger, setAccountTrigger, selectedAccountId] = useContext(triggerContext)

  const renderPieChart = () => {
    let id = 0
    const token = localStorage.getItem("token")
    if (token){
    id = jwtDecode(token).userId.toString()
    } else {
    router.push('/pages/login')
    }
    fetch(`http://localhost:4000/user/pie/${id}/${selectedAccountId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setData(data)
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
   }, [selectedAccount, selectedAccountId, accountTrigger])

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
          {/* {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))} */}
          {Array.isArray(data) ? (
    data.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={COLORS[index % COLORS.length]}
      />
    ))
  ) : (
    <p className="text-error text-center">Loading or no data available...</p>
  )}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}


export default CategoryPieChart;