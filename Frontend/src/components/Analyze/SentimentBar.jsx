import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const SentimentBar = ({ sentimentIndex = 0 }) => {
  // Normalize sentimentIndex (-1 → 0%, 0 → 50%, +1 → 100%)
  const normalizedValue = ((sentimentIndex + 1) / 2) * 100;

  const getGradient = (value) => {
    if (value < 33) return "from-red-500 to-red-600";
    if (value < 66) return "from-yellow-400 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const getLabel = (value) => {
    if (value < -0.2) return "Negative";
    if (value > 0.2) return "Positive";
    return "Neutral";
  };

  return (
    <div className="w-[50%] p-6">
      <h2 className="text-xl text-center font-semibold text-white mb-3">
        Sentiment Index
      </h2>

      {/* Bar */}
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${normalizedValue}%` }}
          transition={{ duration: 0.8 }}
          className={`h-4 bg-gradient-to-r ${getGradient(normalizedValue)}`}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2 text-md text-white">
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>

      {/* Dynamic label */}
      <p className="mt-3 text-center text-lg font-medium text-gray-300">
        Current: <span className="font-bold">{getLabel(sentimentIndex)}</span>
      </p>
    </div>
  );
};

export default SentimentBar;
