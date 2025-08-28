import React, { useState } from "react";

function Chatbot() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    // Mock API call (replace with Flask backend later)
    const mockResponse = "💡 Try saving 10% more this month to boost your savings!";
    setResponse(mockResponse);
    setInput("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>🤖 FinWise AI Chatbot</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask for financial advice..."
      />
      <button onClick={handleSend}>Send</button>
      <p>{response}</p>
    </div>
  );
}

export default Chatbot;
