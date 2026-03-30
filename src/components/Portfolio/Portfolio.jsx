import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  PieChart as PieIcon,
} from "lucide-react";
import { getStockPrice } from "../../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const portfolioConfig = [
  { name: "RELIANCE", qty: 10, buyPrice: 2300, sector: "Energy" },
  { name: "INFY", qty: 20, buyPrice: 1450, sector: "IT" },
  { name: "TCS", qty: 15, buyPrice: 3100, sector: "IT" },
  { name: "HDFCBANK", qty: 25, buyPrice: 1500, sector: "Finance" },
];

const sectorColors = {
  IT: "#3b82f6",
  Finance: "#10b981",
  Energy: "#f59e0b",
};

function Portfolio() {
  const [portfolioData, setPortfolioData] = useState([]);
  const [summaryData, setSummaryData] = useState([]);
  const [growthData, setGrowthData] = useState([]);
  const [sectorData, setSectorData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const results = await Promise.all(
        portfolioConfig.map((stock) =>
          getStockPrice(stock.name).catch(() => ({ price: 0 }))
        )
      );

      let totalInvestment = 0;
      let currentValue = 0;

      const updated = portfolioConfig.map((stock, i) => {
        const currentPrice = results[i]?.price ?? 0;
        const investment = stock.buyPrice * stock.qty;
        const value = currentPrice * stock.qty;
        const profit = value - investment;
        const percent = investment > 0 ? ((profit / investment) * 100).toFixed(2) : "0.00";

        totalInvestment += investment;
        currentValue += value;

        return {
          ...stock,
          currentPrice,
          profit,
          percent,
        };
      });

      setPortfolioData(updated);

      const roi = currentValue - totalInvestment;
      const roiPercent = totalInvestment > 0 ? ((roi / totalInvestment) * 100).toFixed(2) : "0.00";

      setSummaryData([
        {
          title: "Total Investment",
          value: `₹${totalInvestment.toLocaleString()}`,
          change: `${roi >= 0 ? "+" : ""}${roiPercent}%`,
          icon: Wallet,
          trend: roi >= 0 ? "up" : "down",
          color: "from-green-500 to-emerald-600",
        },
        {
          title: "Current Value",
          value: `₹${currentValue.toLocaleString()}`,
          change: `${roi >= 0 ? "+" : ""}${roiPercent}%`,
          icon: TrendingUp,
          trend: roi >= 0 ? "up" : "down",
          color: "from-blue-500 to-cyan-600",
        },
        {
          title: "Total ROI",
          value: `₹${roi.toLocaleString()}`,
          change: `${roi >= 0 ? "+" : ""}${roiPercent}%`,
          icon: PieIcon,
          trend: roi >= 0 ? "up" : "down",
          color: "from-purple-500 to-pink-600",
        },
      ]);

      const growth = updated.map((s) => ({
        name: s.name,
        value: s.currentPrice * s.qty,
      }));
      setGrowthData(growth);

      const sectorMap = {};
      updated.forEach((s) => {
        const value = s.currentPrice * s.qty;
        sectorMap[s.sector] = (sectorMap[s.sector] || 0) + value;
      });

      const sectorFormatted = Object.entries(sectorMap).map(([sector, value]) => ({
        name: sector,
        value: Math.round(value),
        color: sectorColors[sector] || "#ef4444",
      }));
      setSectorData(sectorFormatted);
    };

    fetchPrices();
  }, []);

  return (
    <div className="p-6 space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryData.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-6 shadow hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.title}</p>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{item.value}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    {item.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${item.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                      {item.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Portfolio Table */}
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full text-sm border-collapse border border-slate-200 dark:border-slate-700 rounded-lg">
          <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            <tr>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Buy Price</th>
              <th className="px-4 py-2 text-left">Current Price</th>
              <th className="px-4 py-2 text-left">P/L</th>
              <th className="px-4 py-2 text-left">% Change</th>
            </tr>
          </thead>
          <tbody>
            {portfolioData.map((stock, index) => (
              <tr
                key={index}
                className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
              >
                <td className="px-4 py-2 font-medium">{stock.name}</td>
                <td className="px-4 py-2">{stock.qty}</td>
                <td className="px-4 py-2">₹{stock.buyPrice}</td>
                <td className="px-4 py-2">₹{stock.currentPrice}</td>
                <td className={`px-4 py-2 ${stock.profit >= 0 ? "text-green-500" : "text-red-500"}`}>
                  ₹{stock.profit.toFixed(2)}
                </td>
                <td className={`px-4 py-2 ${stock.percent >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stock.percent}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Line Chart */}
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 h-64">
          <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.3} />
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`} />
              <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, "Value"]} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={sectorData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                innerRadius={40}
                paddingAngle={5}
              >
                {sectorData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`₹${value.toLocaleString()}`, name]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;