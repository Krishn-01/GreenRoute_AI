import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AIInsights({ vehicleData }) {

  const [aiText, setAiText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [dbHistory, setDbHistory] = useState([]);

  /* =========================
     SAFE CHECK (Prevents Crash)
  ========================== */
  if (!vehicleData) return null;

  /* =========================
     FETCH DATABASE HISTORY
  ========================== */
  const fetchHistory = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/history");
      if (!res.ok) return;
      const data = await res.json();
      setDbHistory(data);
    } catch {
      // Silent fail for production
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  /* =========================
     GENERATE AI INSIGHTS
  ========================== */
  const generateInsights = async () => {
    setLoading(true);
    setError("");
    setAiText("");

    try {
      const response = await fetch("http://127.0.0.1:8000/ai-insights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(vehicleData)
      });

      if (!response.ok) throw new Error("Server Error");

      const data = await response.json();
      setAiText(data.result);

      // Save locally
      setHistory(prev => [
        {
          text: data.result,
          time: new Date().toLocaleTimeString()
        },
        ...prev
      ]);

      // Refresh DB history
      fetchHistory();

    } catch (err) {
      setError("❌ Unable to connect to AI backend.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     RISK EXTRACTION
  ========================== */
  const extractRisk = (text) => {
    if (!text) return null;
    const match = text.match(/Risk Level:\s*(.*)/i);
    return match ? match[1].trim() : null;
  };

  const getRiskColor = (risk) => {
    if (!risk) return "bg-gray-500";
    const r = risk.toLowerCase();
    if (r.includes("high")) return "bg-red-500";
    if (r.includes("moderate")) return "bg-yellow-400";
    return "bg-emerald-500";
  };

  const riskLevel = extractRisk(aiText);

  /* =========================
     UI
  ========================== */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 
                 p-6 rounded-2xl shadow-lg mt-8"
    >
      <h3 className="text-emerald-400 text-xl font-semibold mb-6">
        🤖 AI Fleet Performance Analysis
      </h3>

      {/* Selected Vehicle Summary */}
      <div className="bg-black/30 p-4 rounded-xl border border-white/10 mb-6">
        <h4 className="text-gray-400 mb-2 text-sm uppercase tracking-wide">
          Selected Vehicle Data
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <p>
            Fuel:{" "}
            <span className="text-emerald-400">
              {vehicleData.fuel} km/l
            </span>
          </p>
          <p>
            Temp:{" "}
            <span className="text-emerald-400">
              {vehicleData.temperature}°C
            </span>
          </p>
          <p>
            Speed:{" "}
            <span className="text-emerald-400">
              {vehicleData.speed} km/h
            </span>
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateInsights}
        disabled={loading}
        className="bg-gradient-to-r from-emerald-500 to-cyan-500
                   px-5 py-2 rounded-lg text-black font-semibold
                   mb-6 hover:opacity-90 transition shadow-md
                   disabled:opacity-50"
      >
        {loading ? "Analyzing..." : "Generate AI Insights"}
      </button>

      {error && (
        <p className="text-red-400 mb-4">{error}</p>
      )}

      {/* Latest Report */}
      {aiText && (
        <div className="mb-8 space-y-4">

          {riskLevel && (
            <div
              className={`${getRiskColor(riskLevel)}
                          text-black px-4 py-2 rounded-full
                          inline-block font-semibold`}
            >
              {riskLevel}
            </div>
          )}

          <div className="bg-black/40 p-4 rounded-xl border border-white/10">
            <pre className="text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
              {aiText}
            </pre>
          </div>
        </div>
      )}

      {/* Session History */}
      {history.length > 1 && (
        <div className="mt-10">
          <h4 className="text-gray-400 mb-4">📜 Session History</h4>
          <div className="space-y-4 max-h-48 overflow-y-auto">
            {history.slice(1).map((item, index) => (
              <div
                key={index}
                className="bg-black/20 p-3 rounded-lg border border-white/10 text-sm"
              >
                <p className="text-gray-500 text-xs mb-2">
                  Generated at {item.time}
                </p>
                <pre className="text-gray-400 whitespace-pre-wrap">
                  {item.text}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Database History */}
      {dbHistory.length > 0 && (
        <div className="mt-10">
          <h4 className="text-gray-400 mb-4">💾 Saved Reports (Database)</h4>
          <div className="space-y-4 max-h-64 overflow-y-auto">
            {dbHistory.map((item, index) => (
              <div
                key={index}
                className="bg-black/20 p-3 rounded-lg border border-white/10 text-sm"
              >
                <p className="text-gray-500 text-xs mb-2">
                  {item.created_at}
                </p>
                <pre className="text-gray-400 whitespace-pre-wrap">
                  {item.result}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}