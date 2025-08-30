# 💰 FinWise - Smart Expense Tracker  

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)  
![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)  
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)  

---

## 📌 Overview
FinWise is a **personal finance management app** built for the Buildathon.  
It helps users **track expenses, visualize spending habits, and gain insights** to improve financial decisions.

The project is a **working prototype** with a simple **backend (Node.js + Express)** and a **frontend (React)** showing expense tracking and charts.

---

## ✨ Features
- 📊 Add and view expenses (date, category, amount)
- 📂 Data stored in a JSON file (acts as a database)
- 📉 Simple charts to visualize spending trends
- ⚡ Fast and lightweight backend server
- 🎨 Minimal UI to demonstrate concept

---

## 🛠️ Tech Stack
- **Frontend**: React + Recharts (for graphs)
- **Backend**: Node.js + Express
- **Database**: JSON file (sample data)
- **Version Control**: Git + GitHub

---

## 🚀 Getting Started

### 1️⃣ Clone Repository

git clone https://github.com/Vinothini/FinWise-Buildathon.git
cd FinWise-Buildathon

2️⃣ Setup Backend
bash

cd backend
npm install
node server.js
👉 Backend runs on http://localhost:5000

3️⃣ Setup Frontend
bash

cd frontend
npm install
npm start
👉 Frontend runs on http://localhost:3000

📂 Folder Structure
bash

FinWise-Buildathon/
│── frontend/     # React UI (Dashboard + Charts)
│── backend/      # Node.js + Express server
│── data/         # Mock expenses.json
│── README.md

📌 Notes
Make sure Node.js (>=14) is installed before running.

Start the backend first, then the frontend.

Modify data/expenses.json for custom transactions.


🔮 Future Improvements:

🔑 Add user authentication (login/signup)

☁️ Store expenses in a cloud database (MongoDB / Firebase)

📱 Develop a mobile-friendly UI (React Native / PWA)

📊 Advanced analytics with AI-driven financial insights

🔔 Add notifications & reminders for budget tracking.

