from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from groq import Groq
import sqlite3
from datetime import datetime

# =========================
# ENV & APP SETUP
# =========================

load_dotenv()
api_key = os.getenv("GROQ_API_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = Groq(api_key=api_key)

# =========================
# DATABASE SETUP
# =========================

conn = sqlite3.connect("ai_reports.db", check_same_thread=False)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fuel TEXT,
    temperature TEXT,
    speed TEXT,
    result TEXT,
    created_at TEXT
)
""")

conn.commit()

# =========================
# AI INSIGHTS ENDPOINT
# =========================

@app.post("/ai-insights")
async def get_ai(data: dict = Body(...)):

    fuel = data.get("fuel")
    temperature = data.get("temperature")
    speed = data.get("speed")

    prompt = f"""
    Vehicle Performance Analysis:

    Fuel Efficiency: {fuel}
    Engine Temperature: {temperature}
    Speed: {speed}

    Respond strictly in this format:

    Risk Level: <Low/Moderate/High>

    Performance Summary:
    <2 lines>

    Improvements:
    1. ...
    2. ...
    3. ...
    """

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are a fleet sustainability expert."},
            {"role": "user", "content": prompt}
        ]
    )

    result_text = response.choices[0].message.content

    cursor.execute(
        "INSERT INTO reports (fuel, temperature, speed, result, created_at) VALUES (?, ?, ?, ?, ?)",
        (str(fuel), str(temperature), str(speed), result_text,
         datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    )

    conn.commit()

    return {"result": result_text}

# =========================
# CHAT ASSISTANT ENDPOINT
# =========================

@app.post("/chat")
async def chat(request: dict = Body(...)):

    user_message = request.get("message")

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You are an AI fleet intelligence assistant."},
            {"role": "user", "content": user_message}
        ]
    )

    reply = response.choices[0].message.content

    return {"reply": reply}

# =========================
# HISTORY ENDPOINT
# =========================

@app.get("/history")
async def get_history():

    cursor.execute("""
        SELECT fuel, temperature, speed, result, created_at
        FROM reports
        ORDER BY id DESC
        LIMIT 10
    """)

    rows = cursor.fetchall()

    history = []
    for row in rows:
        history.append({
            "fuel": row[0],
            "temperature": row[1],
            "speed": row[2],
            "result": row[3],
            "created_at": row[4]
        })

    return history