import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getStockHistory } from "../../services/api";

function StockLineChart({ ticker = "AAPL" }) {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getStockHistory(ticker);

        const formatted = history.map((item) => ({
          month: new Date(item.date).toLocaleDateString("default", {
            month: "short",
            day: "numeric",
          }),
          price: item.price,
        }));

        setStockData(formatted);
      } catch (error) {
        console.error("Error fetching stock history:", error);
      }
    };

    fetchData();
  }, [ticker]);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl border border-slate-200/50 dark:border-slate-700/50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Stock Price Chart
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            30-day price trend for {ticker}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
            <span className="text-sm text-slate-600 dark:text-slate-400">Price</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stockData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis
              dataKey="month"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Price"]}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="price"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default StockLineChart;