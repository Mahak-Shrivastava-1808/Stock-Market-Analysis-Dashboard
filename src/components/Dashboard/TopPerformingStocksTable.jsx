import React, { useEffect, useState } from "react";
import { getStockPrice } from "../../services/api";

const topStocksList = [
  { stock: "INFY", previous: 1625, volume: "1.2M" },
  { stock: "TCS", previous: 3520, volume: "900K" },
  { stock: "RELIANCE", previous: 2850, volume: "1.5M" },
];

function TopPerformingStocksTable() {
  const [liveData, setLiveData] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const results = await Promise.all(
        topStocksList.map((s) => getStockPrice(s.stock))
      );

      const updated = topStocksList.map((s, i) => {
        const current = results[i].price;
        const changeValue = current - s.previous;
        const changePercent = ((changeValue / s.previous) * 100).toFixed(1);
        const changeText = `${changeValue >= 0 ? "+" : ""}${changePercent}%`;
        return {
          stock: s.stock,
          price: `₹${current.toLocaleString()}`,
          change: changeText,
          volume: s.volume,
        };
      });

      setLiveData(updated);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

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
          {liveData.map((stock, index) => (
            <tr
              key={index}
              className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50"
            >
              <td className="p-2">{stock.stock}</td>
              <td
                className={`p-2 font-semibold ${
                  stock.change.includes("+") ? "text-emerald-500" : "text-red-500"
                }`}
              >
                {stock.change}
              </td>
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