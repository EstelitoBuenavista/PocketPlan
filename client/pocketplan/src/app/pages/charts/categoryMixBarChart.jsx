// components/categoryMixBarChart
import React, { useState, useEffect, useContext } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { triggerContext } from '../dashboard/accountList';
import { jwtDecode } from 'jwt-decode';

function CategoryMixBarChart() {
  const [accountTrigger, setAccountTrigger, selectedAccountId] = useContext(triggerContext)
  const [hoveredBar, setHoveredBar] = useState(null);
  const [categories, setCategories] = useState([])
  const [slicedData, setSlicedData] = useState([])
  const [upperBound, setUpperBound] = useState(0)

  

  const renderChartData = async () => {
    let id = 0;
    const token = localStorage.getItem("token");
  
    if (!token) {
      router.push('/pages/login');
      return;
    }
  
    try {
      id = jwtDecode(token).userId.toString();
  
      // Fetch categories
      const categoryResponse = await fetch(`http://localhost:4000/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!categoryResponse.ok) throw new Error("Failed to fetch categories");
  
      const categoryData = await categoryResponse.json();
      const category = categoryData.map((item) => item.name);
      setCategories(category);
  
      // Fetch pie chart data
      const chartResponse = await fetch(
        `http://localhost:4000/user/mixbar/${id}/${selectedAccountId}`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!chartResponse.ok) throw new Error("Failed to fetch pie chart data");
  
      const chartData = await chartResponse.json();
      const categoryTotals = getDailyCategoryTotals(chartData, category);
      setSlicedData(categoryTotals.slice(-10));

      const maxCategoryValue = Math.max(
        ...(categoryTotals.slice(-10)).flatMap((day) => categories.map((category) => day[category]))
      );
      setUpperBound(Math.ceil(maxCategoryValue / 10) * 10);
  
    } catch (error) {
      console.error("Error:", error);
    }
  };
  


  useEffect(() => {
    renderChartData()
   }, [])
  useEffect(() => {
    renderChartData()
   }, [selectedAccountId])

// const categories = [
//   'Work', 'Misc', 'Food', 'Leisure', 'Bills', 'Supplies', 'School', 'Music'
// ];

const categoryColors = [
  '#004e98',
  '#0068be',
  '#0086d0',
  '#2f97d5',
  '#5fc0b5',
  '#9cccd3',
  '#6a99bd',
  '#73caee',
  '#87c2d7',
  '#D7F3DE'
];


// aggregates the daily totals for each category (too eepy to even think i just gpt atp)
const getDailyCategoryTotals = (dailyExpenses, categories) => {
  return dailyExpenses.map((day) => {
    const dayTotals = categories.reduce((acc, category) => {
      acc[category] = 0;
      return acc;
    }, {});

    day.transactions.forEach(transaction => {
      if (transaction.category && dayTotals[transaction.category] !== undefined) {
        dayTotals[transaction.category] += transaction.value;
      }
    });

    return {
      name: day.date,  // Use the date from the data
      ...dayTotals
    };
  });
};


const CustomTooltip = ({ payload }) => {
  if (payload && payload.length) {
    // Filter out categories with zero values
    const filteredPayload = payload.filter(item => item.value !== 0);
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#FFF9F8', padding: '10px', borderRadius: '5px' }}>
        <h4 style={{ color: '#161515', fontSize: '12px' }}>{payload[0].payload.name}</h4> {/* Date from payload */}
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {filteredPayload.map((entry, index) => (
            <li key={index} style={{ color: entry.fill, fontSize: '12px' }}>
              <strong>{entry.name}:</strong> {entry.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

  return (
    <>
    {slicedData && slicedData.length > 0 && categories ? (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={slicedData}
          margin={{
            top: 5,
            right: 5,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis 
            tick={{ fontSize: 12 }}
            domain={[0, upperBound]}
            tickCount={10}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {categories.map((category, index) => (
            <Bar 
              key={index} 
              dataKey={category} 
              stackId="a" 
              fill={hoveredBar === category ? '#161515' : categoryColors[index]}
              onMouseEnter={() => setHoveredBar(category)}
              onMouseLeave={() => setHoveredBar(null)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    ) : (
      <p>No data available to display</p>
    )}
    </> 
  );
}

export default CategoryMixBarChart;