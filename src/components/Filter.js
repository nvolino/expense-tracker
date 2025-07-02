import React from 'react';  

const Filter = ({
  categories = [],
  selectedCategory,
  onCategoryChange,
  minAmount,
  maxAmount,
  onAmountChange,
  search,
  onSearchChange,
}) => (
  <div className="expense-filter">
    <select value={selectedCategory} onChange={e => onCategoryChange(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map(cat => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
    <input
      type="number"
      placeholder="Min Amount"
      value={minAmount}
      onChange={e => onAmountChange('min', e.target.value)}
    />
    <input
      type="number"
      placeholder="Max Amount"
      value={maxAmount}
      onChange={e => onAmountChange('max', e.target.value)}
    />
    <input
      type="text"
      placeholder="Search Description"
      value={search}
      onChange={e => onSearchChange(e.target.value)}
    />
  </div>
);

export default Filter;