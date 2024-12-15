// components/categoryMixBarChart
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const categories = [
  'Work', 'Misc', 'Food', 'Leisure', 'Bills', 'Supplies', 'School', 'Music'
];

const categoryColors = [
  '#3CA857',
  '#42BC60',
  '#54C470',
  '#66CB7F',
  '#79D28F',
  '#8BD89F',
  '#9EDFAE',
  '#B1E6BE',
  '#C4ECCE',
  '#D7F3DE'
];

const dailyExpenses = [
  { transactions: [{ category: 'Work', value: 1000 }, { category: 'Food', value: 1200 }, { category: 'Bills', value: 3000 }], date: 'Dec 01' },
  { transactions: [{ category: 'Misc', value: 500 }, { category: 'Leisure', value: 800 }, { category: 'Food', value: 700 }, { category: 'School', value: 1200 }], date: 'Dec 02' },
  { transactions: [{ category: 'Bills', value: 1500 }, { category: 'Music', value: 4000 }], date: 'Dec 03' },
  { transactions: [{ category: 'Leisure', value: 1500 }, { category: 'Food', value: 2000 }, { category: 'Work', value: 900 }], date: 'Dec 04' },
  { transactions: [{ category: 'Misc', value: 600 }, { category: 'Bills', value: 2000 }, { category: 'School', value: 3000 }, { category: 'Music', value: 1800 }], date: 'Dec 05' },
  { transactions: [{ category: 'Food', value: 1000 }, { category: 'Leisure', value: 1200 }, { category: 'Supplies', value: 800 }], date: 'Dec 06' },
  { transactions: [{ category: 'Bills', value: 2500 }, { category: 'Music', value: 3500 }, { category: 'Food', value: 1500 }], date: 'Dec 07' },
  { transactions: [{ category: 'Work', value: 1300 }, { category: 'Food', value: 900 }, { category: 'Leisure', value: 700 }, { category: 'Bills', value: 1100 }], date: 'Dec 08' },
  { transactions: [{ category: 'Misc', value: 700 }, { category: 'School', value: 500 }, { category: 'Music', value: 2200 }], date: 'Dec 09' },
  { transactions: [{ category: 'Food', value: 1300 }, { category: 'Leisure', value: 1400 }, { category: 'Bills', value: 2000 }, { category: 'Work', value: 1200 }], date: 'Dec 10' }
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

const categoryTotals = getDailyCategoryTotals(dailyExpenses, categories);
const slicedData = categoryTotals.slice(-10);

const maxCategoryValue = Math.max(
  ...slicedData.flatMap((day) => categories.map((category) => day[category]))
);
const upperBound = Math.ceil(maxCategoryValue / 10) * 10;

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

function CategoryMixBarChart() {
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <ResponsiveContainer width="100%" height="100%" >
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
        <XAxis dataKey="name" tick={{ fontSize: 12 }}/>
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
            fill={hoveredBar === category ? '#89BAFD' : categoryColors[index]}
            onMouseEnter={() => setHoveredBar(category)}
            onMouseLeave={() => setHoveredBar(null)}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CategoryMixBarChart;