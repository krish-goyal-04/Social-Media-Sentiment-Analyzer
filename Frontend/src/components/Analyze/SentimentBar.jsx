 const SentimentBar = ({ sentimentIndex = 0 }) => {
  const normalizedValue = ((sentimentIndex + 1) / 2) * 100;

  const getColor = (value) => {
    if (value < 33) return "bg-red-500";
    if (value < 66) return "bg-yellow-400";
    return "bg-green-500";
  };

  const getLabel = (value) => {
    if (value < -0.2) return "Negative";
    if (value > 0.2) return "Positive";
    return "Neutral";
  };

  return (
    <div className="w-w-[50%]  p-6 ">
      <h2 className="text-xl text-center font-semibold text-white mb-3">Sentiment Index</h2>
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 ${getColor(normalizedValue)} transition-all`}
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
      <div className="flex justify-between mt-2 text-md text-white" style={{hover:getLabel(sentimentIndex)}}>
        <span>Negative</span>
        <span>Neutral</span>
        <span>Positive</span>
      </div>
    </div>
  );
};
export default SentimentBar