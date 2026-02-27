import { motion } from "framer-motion";

export default function CarHero() {
  return (
    <section
      className="relative rounded-3xl overflow-hidden
                 border border-white/10
                 h-[260px] sm:h-[320px] lg:h-[380px]
                 flex items-center"
    >
      {/* Background Image (UNCHANGED) */}
      <img
        src="/car.jpeg"
        alt="AI Vehicle"
        className="absolute inset-0 w-full h-full
                   object-cover object-right scale-105"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0
                   bg-gradient-to-r
                   from-black/80 via-black/60 to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10 lg:px-16 max-w-2xl">

        {/* FIXED CLEAN TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl
                     font-bold leading-tight tracking-wide
                     bg-gradient-to-r
                     from-emerald-400 via-cyan-400 to-teal-300
                     bg-clip-text text-transparent"
        >
          <span className="block whitespace-nowrap">
            AI Powered Real-Time
          </span>
          <span className="block">
            Vehicle Monitoring
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-4 text-sm sm:text-base lg:text-lg
                     text-gray-200 max-w-lg"
        >
          Smart AI-driven vehicle tracking with advanced sustainability
          intelligence and real-time environmental analytics.
        </motion.p>

      </div>
    </section>
  );
}