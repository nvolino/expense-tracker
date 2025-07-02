// ExpenseChart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const chartColors = [
  '#FF6384', '#36A2EB', '#FFCE56', '#9ACD32', '#FF8C00', '#8A2BE2', '#00CED1', '#FF69B4'
];

const ExpenseChart = ({ expenses = [] }) => {
  if (!expenses.length) {
    return (
      <div className="expense-chart-card">
        <div className="expense-chart-title">No expenses to display.</div>
      </div>
    );
  }

  const categoryTotals = expenses.reduce((acc, { category, amount }) => {
    acc[category] = (acc[category] || 0) + amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: chartColors,
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { size: 14, family: 'Segoe UI, Arial, sans-serif' },
          color: '#333'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: $${context.parsed}`;
          }
        }
      }
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="expense-chart-card">
      <h2 className="expense-chart-title">Expense Breakdown</h2>
      <div className="expense-chart-pie">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
