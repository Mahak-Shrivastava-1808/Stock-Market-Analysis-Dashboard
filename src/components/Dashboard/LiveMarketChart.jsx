import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Simulated real-time market data
const generateInitialData = () => {
  const data = [];
  let value = 18000; // Starting index value
  for (let i = 0; i < 20; i++) {
    value += Math.floor(Math.random() * 200 - 100); // random fluctuation
    data.push({ time: `T-${20 - i}`, index: value });
  }
  return data;
};

function LiveMarketChart() {
  const [data, setData] = useState(generateInitialData());

  // Simulate live updates every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const lastValue = prevData[prevData.length - 1].index;
        const newValue = lastValue + Math.floor(Math.random() * 200 - 100);
        const newData = [...prevData.slice(1), { time: `T-${prevData.length}`, index: newValue }];
        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Live Market Movement
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time index values
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
            <XAxis
              dataKey="time"
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
              formatter={(value) => [`₹${value.toLocaleString()}`, "Index"]}
            />
            <defs>
              <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#facc15" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="index"
              stroke="url(#marketGradient)"
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

export default LiveMarketChart;
