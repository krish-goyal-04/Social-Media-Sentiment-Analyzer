import { motion } from "framer-motion";
import { useState } from "react";

const SentimentBar = ({ sentimentIndex = 0 }) => {
  // Normalize -1 → 0%, 0 → 50%, +1 → 100%
  const normalized = Math.max(0, Math.min(100, ((sentimentIndex + 1) / 2) * 100));

  const getLabel = (value) => {
    if (value < -0.2)
      return { text: "Negative", color: "text-red-400", glow: "shadow-red-500/50", bg: "bg-red-500/20" };
    if (value > 0.2)
      return { text: "Positive", color: "text-emerald-400", glow: "shadow-emerald-500/50", bg: "bg-emerald-500/20" };
    return { text: "Neutral", color: "text-yellow-300", glow: "shadow-yellow-400/50", bg: "bg-yellow-500/20" };
  };

  const { text, color, glow, bg } = getLabel(sentimentIndex);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="w-full max-w-lg p-5 rounded-2xl bg-gray-800/90 shadow-xl backdrop-blur relative">
      {/* Bar */}
      <div
        className="relative h-6 w-full rounded-full overflow-hidden ring-1 ring-white/10 cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Gradient zones */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(239,68,68,0.8) 0%, rgba(250,204,21,0.8) 50%, rgba(16,185,129,0.8) 100%)",
          }}
        />

        {/* Animated fill overlay */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalized}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className={`absolute top-0 left-0 h-full ${bg} backdrop-blur-sm`}
        />

        {/* Marker with glow */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `${normalized}%` }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute top-1/2 -translate-y-1/2"
        >
          <div className="relative -translate-x-1/2">
            {/* Pulse glow */}
            <motion.span
              className={`absolute inset-0 -m-2 rounded-full ${glow}`}
              initial={{ scale: 0.6, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeOut",
              }}
            />
            {/* Marker dot */}
            <div className="h-5 w-5 rounded-full bg-white shadow-md ring-2 ring-white/70" />
          </div>
        </motion.div>
      </div>

      {/* Scale labels */}
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>-1</span>
        <span>0</span>
        <span>+1</span>
      </div>

      {/* Sentiment text */}
      <motion.p
        className={`mt-3 text-center font-semibold tracking-wide ${color}`}
        initial={{ opacity: 0.6, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {text}
      </motion.p>

      {/* Hover tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1 rounded-md bg-gray-800 text-white text-xs shadow-lg"
        >
          Sentiment Score: {sentimentIndex}
        </motion.div>
      )}
    </div>
  );
};

export default SentimentBar;
