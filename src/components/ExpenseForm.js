// components/ExpenseForm.js
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

const getCurrentMonth = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
};

const ExpenseForm = ({ onAddExpense }) => {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: '',
    month: getCurrentMonth(),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description || !form.amount || !form.category || !form.month) return;
    onAddExpense({
      ...form,
      amount: parseFloat(form.amount),
      date: new Date(),
    });
    setForm({
      description: '',
      amount: '',
      category: '',
      month: getCurrentMonth(),
    });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        name="amount"
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
      >
        <option value="" disabled>
          Select Category
        </option>
        <optgroup label="Essentials">
          <option value="Rent/Mortgage">Rent/Mortgage</option>
          <option value="Utilities">Utilities</option>
          <option value="Groceries">Groceries</option>
          <option value="Transportation">Transportation</option>
          <option value="Insurance">Insurance</option>
        </optgroup>
        <optgroup label="☕ Lifestyle & Discretionary">
          <option value="Dining Out">Dining Out</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Health & Fitness">Health & Fitness</option>
          <option value="Travel">Travel</option>
        </optgroup>
        <optgroup label="📚 Financial Obligations">
          <option value="Debt Payments">Debt Payments</option>
          <option value="Savings & Investments">Savings & Investments</option>
        </optgroup>
        <optgroup label="🧸 Family & Others">
          <option value="Childcare/Education">Childcare/Education</option>
          <option value="Gifts & Donations">Gifts & Donations</option>
          <option value="Pets">Pets</option>
        </optgroup>
        <optgroup label="🧾 Miscellaneous">
          <option value="Miscellaneous">Miscellaneous</option>
        </optgroup>
      </select>
      <input
        name="month"
        type="month"
        value={form.month}
        onChange={handleChange}
        required
        style={{ width: '90%' }}
      />
      <button type="submit">
        <FaPlus className="expense-icon" />Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
