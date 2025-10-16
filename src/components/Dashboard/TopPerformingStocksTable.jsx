import React from 'react';

const topStocks = [
  { stock: "INFY", change: "+4.2%", price: "₹1,693", volume: "1.2M" },
  { stock: "TCS", change: "+3.1%", price: "₹3,520", volume: "900K" },
  { stock: "RELIANCE", change: "+2.5%", price: "₹2,860", volume: "1.5M" },
];

function TopPerformingStocksTable() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Top Performing Stocks</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Best performing stocks in your watchlist</p>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-700/50">
            <th className="p-2">Stock</th>
            <th className="p-2">Change</th>
            <th className="p-2">Price</th>
            <th className="p-2">Volume</th>
          </tr>
        </thead>
        <tbody>
          {topStocks.map((stock, index) => (
            <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50">
              <td className="p-2">{stock.stock}</td>
              <td className={`p-2 font-semibold ${stock.change.includes('+') ? 'text-emerald-500' : 'text-red-500'}`}>{stock.change}</td>
              <td className="p-2">{stock.price}</td>
              <td className="p-2">{stock.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopPerformingStocksTable;
