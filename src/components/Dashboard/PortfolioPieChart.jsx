import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Example portfolio data (replace with real API data if needed)
const portfolioData = [
  { name: "Technology", value: 35, color: "#3b82f6" },
  { name: "Finance", value: 25, color: "#8b5cf6" },
  { name: "Healthcare", value: 20, color: "#10b981" },
  { name: "Energy", value: 10, color: "#f59e0b" },
  { name: "Other", value: 10, color: "#ef4444" },
];

function PortfolioPieChart() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-b-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Portfolio Allocation
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Distribution of stocks across sectors
        </p>
      </div>

      {/* Pie Chart */}
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={portfolioData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                border: "none",
                borderRadius: "12px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              }}
              formatter={(value, name) => [`${value}%`, name]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-3 mt-4">
        {portfolioData.map((item, index) => (
          <div
            className="flex items-center justify-between"
            key={index}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {item.name}
              </span>
            </div>
            <div className="text-sm font-semibold text-slate-800 dark:text-white">
              {item.value}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PortfolioPieChart;
