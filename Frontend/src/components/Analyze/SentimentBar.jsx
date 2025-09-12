import { motion } from "framer-motion";

const SentimentBar = ({ sentimentIndex = 0 }) => {
  // Map -1 → -90°, 0 → 0°, +1 → +90°
  const angleDeg = ((sentimentIndex + 1) / 2) * 180 - 90;
  const radius = 90;
  const center = { x: 120, y: 120 };

  const getLabel = (value) => {
    if (value < -0.2) return { text: "Negative", color: "text-red-400" };
    if (value > 0.2) return { text: "Positive", color: "text-emerald-400" };
    return { text: "Neutral", color: "text-yellow-300" };
  };

  const { text, color } = getLabel(sentimentIndex);

  // Simple semicircle arc
  const arcPath = () => {
    const start = { x: center.x - radius, y: center.y };
    const end = { x: center.x + radius, y: center.y };
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full max-w-sm px-3">
      <svg viewBox="0 0 240 140" className="w-full h-auto">
        <defs>
          <linearGradient id="sentimentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Base arc */}
        <path
          d={arcPath()}
          stroke="#1f2937"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Gradient arc */}
        <path
          d={arcPath()}
          stroke="url(#sentimentGradient)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />

        {/* Needle */}
        <g transform={`translate(${center.x}, ${center.y})`}>
  <motion.line
    initial={{ rotate: -90 }} // Start from left side (-1 sentiment)
    animate={{ rotate: angleDeg }}
    transition={{ type: "spring", stiffness: 140, damping: 18 }}
    style={{ transformOrigin: "0px 0px" }}
    x1="0"
    y1="0"
    x2={radius - 10}   // extend rightward from center
    y2="0"
    stroke="#f9fafb"
    strokeWidth="4"
    strokeLinecap="round"
  />
  <circle cx="0" cy="0" r="6" fill="#f9fafb" />
</g>
      </svg>

      {/* Label */}
      <div className="mt-3 text-center text-base font-semibold text-gray-200">
        Sentiment: <span className={color}>{text}</span>
      </div>
    </div>
  );
};

export default SentimentBar;
