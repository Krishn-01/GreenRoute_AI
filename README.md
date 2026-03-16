# 🚀 GreenRoute AI

**AI-Powered Real-Time Vehicle Monitoring & Sustainability Intelligence Dashboard**

GreenRoute AI is a smart fleet monitoring platform that combines **real-time vehicle analytics, sustainability scoring, and AI-powered insights** to help organizations optimize fleet performance while reducing environmental impact.

🌍 **Live Demo:** https://green-route-ai-weld.vercel.app
💻 **GitHub Repository:** https://github.com/Krishn-01/GreenRoute_AI

---

# 📌 Overview

GreenRoute AI is designed to transform traditional fleet monitoring systems into an **intelligent sustainability platform**.

The system analyzes vehicle performance data, estimates carbon emissions, and generates **AI-driven insights** to improve operational efficiency and promote eco-friendly transportation decisions.

This dashboard provides a **modern analytics interface** where fleet managers can monitor vehicle health, track emissions, and receive optimization recommendations.

---

# ✨ Key Features

🚘 **Real-time Vehicle Monitoring**
Track vehicle fuel usage, speed, temperature, and system performance.

📊 **Interactive Analytics Dashboard**
Visualize fleet data through dynamic charts and real-time metrics.

🌱 **Sustainability Scoring System**
Evaluate environmental impact using a calculated carbon emission score.

📈 **Predictive Analytics Module**
Analyze vehicle performance trends and anticipate inefficiencies.

🤖 **AI-Powered Fleet Assistant**
Generate insights and optimization suggestions using AI.

🎨 **Modern UI Design**
Glassmorphism-inspired interface built for clarity and usability.

📱 **Responsive Dashboard**
Fully responsive layout optimized for desktop and tablet.

⚡ **High Performance Frontend**
Built with Vite for extremely fast development and rendering.

🌐 **Automated Deployment**
Continuous deployment with GitHub and Vercel.

---

# 🛠 Tech Stack

## 🎨 Frontend

* React (Vite)
* Tailwind CSS
* Recharts (Data Visualization)
* Framer Motion (Animations)
* Lucide React (Icons)

## ⚙️ Backend

* Python
* FastAPI / Flask-style architecture
* AI Integration with Groq API

## 🗄 Database

* SQLite

## 🚀 Deployment & DevOps

* Vercel (Frontend Hosting)
* GitHub (Version Control)
* CI/CD with GitHub integration

---

# 🏗 System Architecture

```
User
  ↓
React Frontend (Dashboard UI)
  ↓
Python Backend API
  ↓
AI Processing Layer (Groq LLM)
  ↓
Data Processing & Storage (SQLite)
```

The system processes vehicle data, calculates sustainability metrics, and generates AI-powered insights through an integrated backend pipeline.

---

# 📂 Project Structure

```
GreenRoute_AI/
│
├── frontend/                 # React + Vite Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # Python Backend
│   ├── app.py
│   ├── backend.py
│   ├── requirements.txt
│   ├── ai_reports.db
│   └── .env
│
├── .gitignore
└── README.md
```

---

# ⚙️ Getting Started

## 1️⃣ Clone the Repository

```
git clone https://github.com/Krishn-01/GreenRoute_AI.git
cd GreenRoute_AI
```

---

## 2️⃣ Run Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 3️⃣ Run Backend

```
cd backend
python -m venv venv
pip install -r requirements.txt
uvicorn backend:app --reload
```

Backend API runs at:

```
http://127.0.0.1:8000
```

API documentation available at:

```
http://127.0.0.1:8000/docs
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **backend** folder.

Example:

```
GROQ_API_KEY=your_api_key_here
```

---

# 🌍 Deployment

The frontend is deployed using **Vercel** with automatic CI/CD integration.

Every push to the **main branch** automatically triggers a production deployment.

Live Application:

https://green-route-ai-weld.vercel.app

---

# 🎯 Vision

GreenRoute AI aims to become a **smart sustainability intelligence system for fleet operations** by enabling:

* Data-driven operational decisions
* Reduced carbon footprint
* AI-assisted fleet optimization
* Predictive vehicle efficiency monitoring

Future versions will integrate **live traffic APIs, real-time data streaming, and advanced AI models** for deeper analytics.

---

# ⭐ Future Enhancements

🔐 Authentication & User Role Management
📡 Real-time Vehicle Data APIs
🧠 Advanced AI Prediction Models
📊 Admin Analytics Dashboard
🌐 Custom Domain Deployment
📈 Improved Predictive Algorithms

---

# 👨‍💻 Author

**KRISHN KUMAR PANDEY**

GitHub:
https://github.com/Krishn-01

---

⭐ If you found this project interesting, consider **starring the repository**!
