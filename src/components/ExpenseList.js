import React from 'react';

const ExpenseList = ({ expenses }) => (
  <div className="expense-list-table">
    {expenses.map(exp => (
      <div className="expense-list-row" key={exp.id}>
        <div className="expense-list-cell">{exp.category}</div>
        <div className="expense-list-cell">${exp.amount}</div>
        <div className="expense-list-cell">{exp.description}</div>
      </div>
    ))}
  </div>
);

export default ExpenseList;
