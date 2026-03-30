import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getStockHistory } from "../../services/api";

function InvestmentBarChart({ ticker = "AAPL" }) {
  const [investmentData, setInvestmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const history = await getStockHistory(ticker);

        // Simulate investment growth — assume starting with ₹50,000
        let baseInvestment = 50000;
        const growthData = history.map((item, index) => {
          const growthFactor = item.price / history[0].price;
          return {
            month: new Date(item.date).toLocaleString("default", { month: "short" }),
            investment: Math.round(baseInvestment * growthFactor),
          };
        });

        setInvestmentData(growthData);
      } catch (error) {
        console.error("Error fetching investment data:", error);
      }
    };

    fetchData();
  }, [ticker]);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Monthly Investment Growth
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Based on 30-day stock performance of {ticker}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={investmentData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
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
              tickFormatter={(value) => `₹${(value / 1000).toLocaleString()}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value) => [`₹${value.toLocaleString()}`, "Investment"]}
            />
            <defs>
              <linearGradient id="investmentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <Bar
              dataKey="investment"
              fill="url(#investmentGradient)"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default InvestmentBarChart;