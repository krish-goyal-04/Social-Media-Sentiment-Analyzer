import { parse, format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const chartColors = {
  Likes: "#ec4899",
  Shares: "#22c55e",
  Views: "#60a5fa",
  Replies: "#eab308",
  engagement: "#2196f3",
};

const EngagementChart = ({ data, dataKey }) => {
  // Defensive: avoid division by zero and NaN values for chart rendering
  const chartData = data
    .map((item) => ({
      ...item,
      Likes: item.count ? Math.round(item.Likes / item.count) : 0,
      Shares: item.count ? Math.round(item.Shares / item.count) : 0,
      Replies: item.count ? Math.round(item.Replies / item.count) : 0,
      Views: item.count ? Math.round(item.Views / item.count) : 0,
      // Engagement can be NaN if count or denominator is zero; fallback to 0
      engagement:
        item.count && isFinite(item.engagement / item.count)
          ? Math.round(item.engagement / item.count)
          : 0,
    }))
    .sort((a, b) => a.time - b.time);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart width={600} height={400} data={chartData}>
        <CartesianGrid stroke="#333" strokeDasharray="3 3" />
        <XAxis dataKey="modifiedTime" tick={{ fill: "#ccc" }} />
        <YAxis
          domain={[0, "auto"]}
          tickFormatter={(t) =>
            dataKey === "engagement" ? `${t.toFixed(1)}%` : t
          }
          tick={{ fill: "#ccc" }}
        />
        <Tooltip
          formatter={(t) => (dataKey === "engagement" ? `${t.toFixed(1)}%` : t)}
        />
        <Legend />

        <Line
          type="monotone"
          dataKey={`${dataKey}`}
          stroke={`${chartColors[dataKey]}`}
          strokeWidth={2}
          dot={false}
          name={dataKey === "engagement" ? "Engagement Rate" : dataKey}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default EngagementChart;
