import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Example monthly investment growth data
const investmentData = [
  { month: "Jan", investment: 50000 },
  { month: "Feb", investment: 55000 },
  { month: "Mar", investment: 60000 },
  { month: "Apr", investment: 67000 },
  { month: "May", investment: 72000 },
  { month: "Jun", investment: 75000 },
  { month: "Jul", investment: 80000 },
  { month: "Aug", investment: 85000 },
  { month: "Sep", investment: 90000 },
  { month: "Oct", investment: 95000 },
  { month: "Nov", investment: 100000 },
  { month: "Dec", investment: 110000 },
];

function InvestmentBarChart() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Monthly Investment Growth
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your investments month by month
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
