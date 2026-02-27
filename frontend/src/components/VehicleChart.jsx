import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const weeklyData = [
  { day: "Mon", value: 60 },
  { day: "Tue", value: 45 },
  { day: "Wed", value: 75 },
  { day: "Thu", value: 50 },
  { day: "Fri", value: 85 },
];

const monthlyData = [
  { day: "W1", value: 50 },
  { day: "W2", value: 65 },
  { day: "W3", value: 40 },
  { day: "W4", value: 90 },
];

export default function VehicleChart() {
  const [mode, setMode] = useState("weekly");
  const [data, setData] = useState(weeklyData);

  // Switch data when mode changes
  useEffect(() => {
    if (mode === "weekly") {
      setData(weeklyData);
    } else {
      setData(monthlyData);
    }
  }, [mode]);

  // Real-time AI simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev =>
        prev.map(item => ({
          ...item,
          value: Math.floor(Math.random() * 100)
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const lastValue = data[data.length - 1].value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl relative"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-emerald-400 text-xl font-semibold">
          Real-Time Vehicle AI Monitoring
        </h3>

        {/* Toggle Buttons */}
        <div className="space-x-2">
          <button
            onClick={() => setMode("weekly")}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              mode === "weekly"
                ? "bg-emerald-500 text-black shadow-md"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Weekly
          </button>

          <button
            onClick={() => setMode("monthly")}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              mode === "monthly"
                ? "bg-emerald-500 text-black shadow-md"
                : "bg-white/10 text-gray-300"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />

          <XAxis
            dataKey="day"
            stroke="#6ee7b7"
            tick={{ fill: "#6ee7b7" }}
          />

          <YAxis
            stroke="#6ee7b7"
            tick={{ fill: "#6ee7b7" }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #34d399",
              borderRadius: "10px",
            }}
            labelStyle={{ color: "#34d399" }}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#34d399"
            strokeWidth={4}
            fill="url(#colorValue)"
            dot={{ r: 6, fill: "#34d399" }}
            activeDot={{ r: 10 }}
            animationDuration={800}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Animated HIGH Badge */}
      {lastValue > 80 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="absolute top-20 right-10 bg-emerald-500 text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse"
        >
          High ↑
        </motion.div>
      )}
    </motion.div>
  );
}