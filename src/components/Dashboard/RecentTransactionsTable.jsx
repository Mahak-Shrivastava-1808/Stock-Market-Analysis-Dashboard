import React, { useEffect, useState } from "react";
import axios from "axios";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

// Functions to generate automatic dates
const getFormattedDate = (daysAgo = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

const recentTransactions = [
  { id: "#1001", stock: "INFY", type: "Buy", quantity: 50, date: getFormattedDate(0) }, // Aaj ki date
  { id: "#1002", stock: "TCS", type: "Sell", quantity: 20, date: getFormattedDate(1) }, // Kal ki date
  { id: "#1003", stock: "RELIANCE", type: "Buy", quantity: 10, date: getFormattedDate(2) }, // Parso ki date
];

function RecentTransactionsTable() {
  const [livePrices, setLivePrices] = useState({});

  const fetchPrices = async () => {
    try {
      const results = await Promise.all(
        recentTransactions.map((tx) =>
          axios
            .get(`http://localhost:5000/price/${tx.stock}`)
            .then((res) => ({
              ticker: tx.stock,
              price: res.data.price,
              change: res.data.change,
            }))
            .catch(() => ({ ticker: tx.stock, price: 0, change: 0 }))
        )
      );

      const priceMap = {};
      results.forEach((res) => {
        priceMap[res.ticker] = {
          price: res.price,
          change: res.change,
        };
      });

      setLivePrices(priceMap);
    } catch (err) {
      console.error("Error updating transactions prices:", err);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-x-auto shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Transactions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Live market valuation & history</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
          <Clock size={14} /> Live Updates
        </div>
      </div>
      
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-700/50">
            <th className="p-3">ID</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Type</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Live Price (₹)</th>
            <th className="p-3">Day Change</th>
            <th className="p-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((tx, index) => {
            const data = livePrices[tx.stock] || { price: 0, change: 0 };
            return (
              <tr
                key={index}
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50"
              >
                <td className="p-3 font-medium text-slate-400">{tx.id}</td>
                <td className="p-3 font-bold text-slate-700 dark:text-slate-200">{tx.stock}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${
                    tx.type === "Buy" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}>
                    {tx.type}
                  </span>
                </td>
                <td className="p-3 font-medium">{tx.quantity}</td>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-100">
                  {data.price > 0 ? `₹${data.price.toLocaleString()}` : "Fetching..."}
                </td>
                <td className={`p-3 font-medium ${data.change >= 0 ? "text-green-500" : "text-red-500"}`}>
                  <div className="flex items-center gap-1">
                    {data.change >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {Math.abs(data.change)}%
                  </div>
                </td>
                <td className="p-3 text-slate-500 dark:text-slate-400 font-mono text-xs">
                  {tx.date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactionsTable;