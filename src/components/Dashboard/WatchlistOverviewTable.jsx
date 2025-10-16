import React from 'react';

const watchlist = [
  { stock: "INFY", price: "₹1,693", target: "₹1,750", alert: "Uptrend" },
  { stock: "TCS", price: "₹3,520", target: "₹3,600", alert: "Hold" },
  { stock: "RELIANCE", price: "₹2,860", target: "₹3,000", alert: "Buy" },
];

function WatchlistOverviewTable() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Watchlist Overview</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Track your favorite stocks</p>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-700/50">
            <th className="p-2">Stock</th>
            <th className="p-2">Current Price</th>
            <th className="p-2">Target Price</th>
            <th className="p-2">Alert</th>
          </tr>
        </thead>
        <tbody>
          {watchlist.map((item, index) => (
            <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50">
              <td className="p-2">{item.stock}</td>
              <td className="p-2">{item.price}</td>
              <td className="p-2">{item.target}</td>
              <td className="p-2">{item.alert}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WatchlistOverviewTable;
