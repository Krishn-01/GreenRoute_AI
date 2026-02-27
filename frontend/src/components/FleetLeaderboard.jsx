import { motion } from "framer-motion";

export default function FleetLeaderboard({ rankedFleet }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-xl 
                 border border-white/10 
                 p-6 rounded-2xl 
                 shadow-[0_0_40px_rgba(16,185,129,0.08)]"
    >
      <h3 className="text-cyan-400 text-xl font-semibold mb-6">
        🏆 Fleet Performance Ranking
      </h3>

      <div className="space-y-4">
        {rankedFleet.map((vehicle, index) => {
          const isTop = index === 0;

          return (
            <motion.div
              key={vehicle.id}
              whileHover={{ scale: 1.02 }}
              className={`flex justify-between items-center 
                         p-4 rounded-xl 
                         border transition-all duration-300
                         ${
                           isTop
                             ? "bg-emerald-500/10 border-emerald-400/40 shadow-md"
                             : "bg-black/30 border-white/10"
                         }`}
            >
              {/* LEFT SIDE */}
              <div>
                <p className={`font-semibold ${isTop ? "text-emerald-400" : ""}`}>
                  #{index + 1} {vehicle.name}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Fuel: {vehicle.fuel} km/l |
                  Temp: {vehicle.temperature}°C |
                  Speed: {vehicle.speed} km/h
                </p>
              </div>

              {/* RIGHT SCORE */}
              <div
                className={`text-2xl font-bold ${
                  vehicle.score < 50
                    ? "text-red-400"
                    : vehicle.score < 70
                    ? "text-yellow-400"
                    : "text-emerald-400"
                }`}
              >
                {vehicle.score}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}