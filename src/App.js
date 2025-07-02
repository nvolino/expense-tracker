// App.js
import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';
import Filter from './components/Filter';

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

function App() {
  const [expenses, setExpenses] = useState(() => {
    const stored = localStorage.getItem('expenses');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense) => {
    setExpenses(prev => [...prev, { ...expense, id: Date.now() }]);
  };

  // Filter expenses by selected month
  const filteredExpenses = expenses
    .filter(exp => exp.month === selectedMonth)
    .filter(exp => !selectedCategory || exp.category === selectedCategory)
    .filter(exp => !minAmount || exp.amount >= parseFloat(minAmount))
    .filter(exp => !maxAmount || exp.amount <= parseFloat(maxAmount))
    .filter(exp => !search || exp.description.toLowerCase().includes(search.toLowerCase()));

  // Get all months for dropdown
  const months = Array.from(
    new Set(expenses.map(exp => exp.month))
  ).sort().reverse();

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Expense Tracker</h1>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <label style={{ fontWeight: 600, marginRight: 8 }}>View Month:</label>
        <select
          value={selectedMonth}
          onChange={e => setSelectedMonth(e.target.value)}
          style={{ fontSize: '1rem', padding: '0.4rem 1rem', borderRadius: 6 }}
        >
          {months.length === 0 && (
            <option value={getCurrentMonth()}>{getCurrentMonth()}</option>
          )}
          {months.map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="expense-page-container">
        <div className="expense-left-section">
          <ExpenseForm onAddExpense={handleAddExpense} />
          <Filter
  categories={[
    "Rent/Mortgage", "Utilities", "Groceries", "Transportation", "Insurance",
    "Dining Out", "Entertainment", "Shopping", "Health & Fitness", "Travel",
    "Debt Payments", "Savings & Investments",
    "Childcare/Education", "Gifts & Donations", "Pets", "Miscellaneous"
  ]}
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
  minAmount={minAmount}
  maxAmount={maxAmount}
  onAmountChange={(type, value) => {
    if (type === 'min') setMinAmount(value);
    else setMaxAmount(value);
  }}
  search={search}
  onSearchChange={setSearch}
/>
          <div className="expense-list-header">
            <div className="expense-info-label">Category</div>
            <div className="expense-info-label">Amount</div>
            <div className="expense-info-label">Description</div>
          </div>
          <ExpenseList expenses={filteredExpenses} />
        </div>
        <div className="expense-right-section">
          <ExpenseChart expenses={filteredExpenses} />
        </div>
      </div>
    </div>
  );
}

export default App;
