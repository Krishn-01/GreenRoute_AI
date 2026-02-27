import streamlit as st
import random
import pandas as pd
import os
from dotenv import load_dotenv
from groq import Groq
from datetime import datetime

# -------------------------------------------------
# PAGE CONFIG
# -------------------------------------------------

st.set_page_config(
    page_title="GreenRoute AI",
    layout="wide",
    page_icon="🚗"
)

# -------------------------------------------------
# LOAD ENV
# -------------------------------------------------

load_dotenv()
API_KEY = os.getenv("GROQ_API_KEY")

if not API_KEY:
    st.error("❌ GROQ_API_KEY not found in .env file")
    st.stop()

client = Groq(api_key=API_KEY)

# -------------------------------------------------
# PREMIUM UI STYLING
# -------------------------------------------------

st.markdown("""
<style>
.stApp {
    background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
}

.main-title {
    font-size: 34px;
    font-weight: 700;
    color: white;
}

.subtitle {
    color: #cfd8dc;
    font-size: 15px;
}

.card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 255, 200, 0.2);
    margin-bottom: 20px;
}

.stButton>button {
    background: linear-gradient(45deg, #00c6ff, #0072ff);
    color: white;
    border-radius: 10px;
    font-weight: 600;
    padding: 10px 20px;
    border: none;
}

section[data-testid="stSidebar"] {
    background: #111827;
}
</style>
""", unsafe_allow_html=True)

# -------------------------------------------------
# SIDEBAR
# -------------------------------------------------

st.sidebar.title("🌱 GreenRoute AI")
page = st.sidebar.radio("Navigation", ["Dashboard", "About"])

# -------------------------------------------------
# FUNCTIONS
# -------------------------------------------------

def generate_vehicle_data():
    return {
        "vehicle_id": f"V{random.randint(1,5)}",
        "fuel": round(random.uniform(5, 50), 2),
        "temperature": round(random.uniform(30, 95), 2),
        "speed": round(random.uniform(20, 130), 2)
    }

def calculate_emission(fuel):
    return round(fuel * 2.31, 2)

def sustainability_score(co2):
    score = max(0, 100 - (co2 * 0.75))
    return round(score, 2)

def get_ai_suggestion(data):

    prompt = f"""
    Vehicle Performance Report:

    Fuel Consumption: {data['fuel']} liters
    Engine Temperature: {data['temperature']} °C
    Speed: {data['speed']} km/h
    CO2 Emission: {data['co2_emission']} kg
    Sustainability Score: {data['score']}

    Provide:
    1. Performance evaluation (2 lines)
    2. Risk level (Low / Moderate / High)
    3. 3 sustainability improvements
    4. One optimization recommendation
    """

    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an AI fleet sustainability analyst."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"AI Error: {e}"

# -------------------------------------------------
# SESSION STATE
# -------------------------------------------------

if "data" not in st.session_state:
    st.session_state.data = generate_vehicle_data()

if "history" not in st.session_state:
    st.session_state.history = []

# -------------------------------------------------
# DASHBOARD
# -------------------------------------------------

if page == "Dashboard":

    st.markdown('<div class="main-title">🚗 Smart Fleet Sustainability Dashboard</div>', unsafe_allow_html=True)
    st.markdown('<div class="subtitle">AI-Powered Real-Time Vehicle Monitoring</div>', unsafe_allow_html=True)
    st.write("")

    if st.button("🔄 Refresh Data"):
        st.session_state.data = generate_vehicle_data()

    data = st.session_state.data
    data["co2_emission"] = calculate_emission(data["fuel"])
    data["score"] = sustainability_score(data["co2_emission"])

    # Limit history to last 30 records
    st.session_state.history.append({
        "Time": datetime.now().strftime("%H:%M:%S"),
        "Emission": data["co2_emission"]
    })
    st.session_state.history = st.session_state.history[-30:]

    col1, col2 = st.columns([2,1])

    # ---------------- LEFT PANEL ----------------
    with col1:
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.subheader("Vehicle Overview")

        m1, m2, m3 = st.columns(3)
        m1.metric("Vehicle ID", data["vehicle_id"])
        m2.metric("Fuel (L)", data["fuel"])
        m3.metric("Speed (km/h)", data["speed"])

        m4, m5 = st.columns(2)
        m4.metric("Temperature (°C)", data["temperature"])
        m5.metric("CO2 Emission (kg)", data["co2_emission"])

        st.markdown('</div>', unsafe_allow_html=True)

    # ---------------- RIGHT PANEL ----------------
    with col2:
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.subheader("Sustainability Score")
        st.metric("Score", data["score"])

        if data["score"] > 75:
            st.success("🟢 Highly Efficient")
        elif data["score"] > 50:
            st.warning("🟡 Moderate Efficiency")
        else:
            st.error("🔴 Poor Performance")

        st.markdown('</div>', unsafe_allow_html=True)

    # ---------------- GRAPH ----------------
    if len(st.session_state.history) > 1:
        df = pd.DataFrame(st.session_state.history)
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.subheader("Emission Trend (Live)")
        st.line_chart(df.set_index("Time"))
        st.markdown('</div>', unsafe_allow_html=True)

    # ---------------- AI SECTION ----------------
    if st.button("🤖 Generate AI Insights"):
        st.markdown('<div class="card">', unsafe_allow_html=True)
        st.subheader("AI Sustainability Analysis")

        with st.spinner("Analyzing vehicle performance..."):
            suggestion = get_ai_suggestion(data)
            st.write(suggestion)

        st.markdown('</div>', unsafe_allow_html=True)

# -------------------------------------------------
# ABOUT
# -------------------------------------------------

if page == "About":
    st.markdown('<div class="main-title">About GreenRoute AI</div>', unsafe_allow_html=True)
    st.write("""
    GreenRoute AI is an AI-powered sustainable fleet monitoring platform.

    🔹 Real-time vehicle simulation  
    🔹 CO2 emission analysis  
    🔹 AI-based sustainability insights  
    🔹 Dynamic performance scoring  
    🔹 Groq LLM integration  

    Built for intelligent eco-friendly fleet optimization.
    """)