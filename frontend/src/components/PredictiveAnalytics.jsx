import { motion } from "framer-motion";

export default function PredictiveAnalytics({ predictedScore, status }) {
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (predictedScore / 100) * circumference;

  const getColor = () => {
    if (predictedScore < 50) return "#ef4444";
    if (predictedScore < 70) return "#facc15";
    return "#22c55e";
  };

  return (
    <div className="w-full max-w-[260px] mx-auto">

      <div className="bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      rounded-2xl p-6 
                      shadow-[0_0_40px_rgba(250,204,21,0.12)]
                      flex flex-col items-center">

        <h3 className="text-cyan-400 text-lg font-semibold mb-4">
          Prediction
        </h3>

        <div className="relative w-[180px] h-[180px]">

          {/* Glow */}
          <div className="absolute inset-0 
                          bg-yellow-400/10 blur-2xl rounded-full" />

          <svg height="180" width="180">
            {/* Background Circle */}
            <circle
              stroke="#1f2937"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="90"
              cy="90"
            />

            {/* Animated Progress */}
            <motion.circle
              stroke={getColor()}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={circumference + " " + circumference}
              style={{
                strokeDashoffset,
                transform: "rotate(-90deg)",
                transformOrigin: "50% 50%",
              }}
              r={normalizedRadius}
              cx="90"
              cy="90"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1 }}
              strokeLinecap="round"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col 
                          items-center justify-center">

            <span className="text-3xl font-bold text-white">
              {predictedScore}%
            </span>

            <span className="text-sm text-gray-400 mt-1">
              {status}
            </span>

          </div>
        </div>
      </div>
    </div>
  );
}