const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Path to JSON file
const filePath = path.join(__dirname, 'expenses.json');

// Load existing expenses or start with empty array
let expenses = [];
if (fs.existsSync(filePath)) {
  expenses = JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Function to save expenses to JSON
function saveExpenses() {
  fs.writeFileSync(filePath, JSON.stringify(expenses, null, 2));
}

// Root route
app.get('/', (req, res) => {
  res.send('FinWise Backend is running!');
});

// Get all expenses or filter by category
app.get('/expenses', (req, res) => {
  const category = req.query.category;
  if (category) {
    res.json(expenses.filter(exp => exp.category === category));
  } else {
    res.json(expenses);
  }
});

// Add a new expense
app.post('/add-expense', (req, res) => {
  const { name, amount, category } = req.body;
  if (!name || !amount || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const newExpense = { id: Date.now(), name, amount, category };
  expenses.push(newExpense);
  saveExpenses();
  res.json({ success: true, expenses });
});

// Delete an expense
app.delete('/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(exp => exp.id !== id);
  saveExpenses();
  res.json({ success: true, expenses });
});

// Update an expense
app.put('/expense/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, amount, category } = req.body;
  const index = expenses.findIndex(exp => exp.id === id);
  if (index !== -1) {
    expenses[index] = { id, name, amount, category };
    saveExpenses();
    res.json({ success: true, expenses });
  } else {
    res.status(404).json({ error: 'Expense not found' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Backend running on http://localhost:5000');
});