import React from "react";

function TransactionCard({ txn }) {
  return (
    <div style={{ borderBottom: "1px solid #ddd", margin: "5px 0" }}>
      <p>{txn.title} - ₹{txn.amount}</p>
    </div>
  );
}

export default TransactionCard;
