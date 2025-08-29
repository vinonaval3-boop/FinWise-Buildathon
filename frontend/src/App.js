import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts";
import "./styles.css";

const categoryColors = {
  Food: "#f44336",
  Transport: "#2196F3",
  Bills: "#FF9800",
  Entertainment: "#9C27B0",
};

function App() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ name: "", amount: "", category: "" });
  const [editId, setEditId] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch expenses from backend
  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    let url = "http://localhost:5000/expenses";
    if (filterCategory) url += `?category=${filterCategory}`;
    const res = await fetch(url);
    const data = await res.json();
    let sorted = data.sort((a, b) =>
      sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount
    );
    setExpenses(sorted);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.amount || !form.category) return;

    if (editId) {
      const res = await fetch(`http://localhost:5000/expense/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setExpenses(data.expenses);
      setEditId(null);
    } else {
      const res = await fetch("http://localhost:5000/add-expense", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setExpenses(data.expenses);
    }

    setForm({ name: "", amount: "", category: "" });
  };

  const handleDelete = async (id) => {
    const res = await fetch(`http://localhost:5000/expense/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    setExpenses(data.expenses);
  };

  const handleEdit = (exp) => {
    setForm({ name: exp.name, amount: exp.amount, category: exp.category });
    setEditId(exp.id);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Re-fetch whenever filter or sort changes
  useEffect(() => {
    fetchExpenses();
  }, [filterCategory, sortOrder]);

  const totalExpense = expenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  );

  return (
    <div>
      <header>
        <h1>FinWise Dashboard</h1>
      </header>

      <main>
        <section className="expense-form">
          <h2>{editId ? "Edit Expense" : "Add Expense"}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="name"
              placeholder="Expense Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              id="amount"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
              required
            />
            <select
              id="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
            </select>
            <button type="submit">{editId ? "Update Expense" : "Add Expense"}</button>
          </form>
        </section>

        <section className="expense-summary">
          <h2>Total Expense: ₹{totalExpense}</h2>
        </section>

        <section className="expense-filter">
          <label>
            Filter by Category:{" "}
            <select value={filterCategory} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </label>
          <label>
            Sort by Amount:{" "}
            <select value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </section>

        <section className="expense-list">
          <h2>Expenses</h2>
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id} style={{ color: categoryColors[exp.category] }}>
                {exp.name} - ₹{exp.amount} ({exp.category})
                <button onClick={() => handleEdit(exp)}>Edit</button>
                <button onClick={() => handleDelete(exp.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </section>

        <section className="expense-chart">
          <h2>Expenses by Category</h2>
          <PieChart width={400} height={300}>
            <Pie
              data={expenses}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={(entry) => entry.category}
            >
              {expenses.map((exp, index) => (
                <Cell key={index} fill={categoryColors[exp.category]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </section>
      </main>
    </div>
  );
}

export default App;