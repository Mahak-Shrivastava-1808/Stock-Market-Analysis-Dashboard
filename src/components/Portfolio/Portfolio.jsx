import React from "react";
import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, PieChart } from "lucide-react";

function Portfolio() {
  // 🧠 Mock data
  const summaryData = [
    {
      title: "Total Investment",
      value: "₹2,50,000",
      change: "+5.2%",
      icon: Wallet,
      trend: "up",
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Current Value",
      value: "₹2,63,000",
      change: "+2.8%",
      icon: TrendingUp,
      trend: "up",
      color: "from-blue-500 to-cyan-600",
    },
    {
      title: "Total ROI",
      value: "₹13,000",
      change: "+5.2%",
      icon: PieChart,
      trend: "up",
      color: "from-purple-500 to-pink-600",
    },
  ];

  const portfolioData = [
    { name: "Reliance", qty: 10, buyPrice: 2300, currentPrice: 2450 },
    { name: "Infosys", qty: 20, buyPrice: 1450, currentPrice: 1420 },
    { name: "TCS", qty: 15, buyPrice: 3100, currentPrice: 3200 },
    { name: "HDFC Bank", qty: 25, buyPrice: 1500, currentPrice: 1550 },
  ];

  return (
    <div className="p-6 space-y-8">
      {/* 🔸 Summary Cards */}
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
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {item.title}
                  </p>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    {item.value}
                  </h2>
                  <div className="flex items-center space-x-2 mt-2">
                    {item.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm ${
                        item.trend === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${item.color} text-white`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔸 Filter/Search */}
      <div className="flex justify-between items-center mt-6">
        <input
          type="text"
          placeholder="Search by stock name..."
          className="w-1/3 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white"
        />
        <select className="p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white">
          <option>All</option>
          <option>Gainers</option>
          <option>Losers</option>
        </select>
      </div>

      {/* 🔸 Portfolio Table */}
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
            {portfolioData.map((stock, index) => {
              const profit = (stock.currentPrice - stock.buyPrice) * stock.qty;
              const percent =
                ((stock.currentPrice - stock.buyPrice) / stock.buyPrice) * 100;

              return (
                <tr
                  key={index}
                  className="border-t border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                >
                  <td className="px-4 py-2 font-medium">{stock.name}</td>
                  <td className="px-4 py-2">{stock.qty}</td>
                  <td className="px-4 py-2">₹{stock.buyPrice}</td>
                  <td className="px-4 py-2">₹{stock.currentPrice}</td>
                  <td
                    className={`px-4 py-2 ${
                      profit >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    ₹{profit.toFixed(2)}
                  </td>
                  <td
                    className={`px-4 py-2 ${
                      percent >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {percent.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔸 Charts Section (Placeholder) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 h-64 flex items-center justify-center text-slate-400">
          📈 Portfolio Growth Chart (Line Chart)
        </div>
        <div className="bg-white/80 dark:bg-slate-900/80 p-6 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 h-64 flex items-center justify-center text-slate-400">
          🥧 Sector Allocation Chart (Pie Chart)
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
