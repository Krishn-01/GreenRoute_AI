import { motion } from "framer-motion";

export default function SustainabilityScore({ score }) {
  const rotation = (score / 100) * 180;

  const getStatus = () => {
    if (score >= 75) return "Excellent";
    if (score >= 50) return "Average";
    if (score >= 30) return "Poor";
    return "Critical";
  };

  return (
    <div className="w-full max-w-[300px] mx-auto">

      <div className="bg-white/5 backdrop-blur-xl 
                      border border-white/10 
                      rounded-2xl p-6 
                      shadow-[0_0_40px_rgba(16,185,129,0.12)]
                      flex flex-col items-center">

        <h3 className="text-lg font-semibold mb-4 text-white">
          Sustainability Score
        </h3>

        <div className="relative w-full h-[200px]">

          <svg viewBox="0 0 200 140" className="w-full h-full">

            <defs>
              <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>

            {/* Background Arc */}
            <path
              d="M 10 120 A 90 90 0 0 1 190 120"
              fill="none"
              stroke="#1f2937"
              strokeWidth="22"
              strokeLinecap="round"
            />

            {/* Gradient Arc */}
            <path
              d="M 10 120 A 90 90 0 0 1 190 120"
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth="16"
              strokeLinecap="round"
            />

            {/* Needle */}
            <motion.line
              x1="100"
              y1="120"
              x2="100"
              y2="45"
              stroke="#ffffff"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ rotate: -90 }}
              animate={{ rotate: rotation - 90 }}
              transition={{ duration: 1 }}
              style={{ originX: "100px", originY: "120px" }}
            />

            {/* Pivot */}
            <circle cx="100" cy="120" r="6" fill="#ffffff" />
          </svg>

          {/* Score */}
          <div className="absolute top-[70px] left-1/2 -translate-x-1/2 text-center">
            <div className="text-4xl font-bold text-white">
              {score.toFixed(1)}
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-[70px] left-4 text-xs text-gray-400">
            Poor
          </div>
          <div className="absolute bottom-[70px] right-4 text-xs text-gray-400">
            Good
          </div>

          {/* Status */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 
                          text-sm text-gray-300">
            {getStatus()}
          </div>

        </div>

        <button className="mt-4 bg-gradient-to-r 
                           from-emerald-500 to-cyan-500 
                           hover:opacity-90 
                           text-white px-6 py-2 rounded-lg shadow-md">
          View Insights
        </button>

      </div>
    </div>
  );
}