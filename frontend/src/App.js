import React from "react";
import TransactionCard from "./components/TransactionCard";
import Chatbot from "./components/Chatbot";

function App() {
  const transactions = [
    { id: 1, title: "Coffee", amount: 120 },
    { id: 2, title: "Book", amount: 450 },
    { id: 3, title: "Groceries", amount: 2000 }
  ];

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>💳 FinWise Dashboard</h1>
      <h2>Balance: ₹25,000</h2>
      <h3>Recent Transactions</h3>
      {transactions.map(txn => (
        <TransactionCard key={txn.id} txn={txn} />
      ))}
      <Chatbot />
    </div>
  );
}

export default App;
