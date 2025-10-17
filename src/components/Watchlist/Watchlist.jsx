import React, { useState } from "react";
import { Star, TrendingUp, TrendingDown, Trash2, Plus } from "lucide-react";

function Watchlist() {
  // Dummy stock data
  const [watchlist, setWatchlist] = useState([
    { id: 1, name: "TCS", price: 3820.5, change: +1.2 },
    { id: 2, name: "Reliance", price: 2480.75, change: -0.8 },
    { id: 3, name: "Infosys", price: 1560.4, change: +0.5 },
  ]);

  const [newStock, setNewStock] = useState("");

  // Add stock
  const handleAdd = () => {
    if (!newStock.trim()) return;
    const newItem = {
      id: Date.now(),
      name: newStock.toUpperCase(),
      price: (Math.random() * 2000 + 500).toFixed(2),
      change: (Math.random() * 4 - 2).toFixed(2), // random % change
    };
    setWatchlist([...watchlist, newItem]);
    setNewStock("");
  };

  // Remove stock
  const handleRemove = (id) => {
    setWatchlist(watchlist.filter((s) => s.id !== id));
  };

  // Sort by gain/loss
  const sortByChange = () => {
    const sorted = [...watchlist].sort((a, b) => b.change - a.change);
    setWatchlist(sorted);
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-500" /> Watchlist
        </h2>
        <button
          onClick={sortByChange}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl shadow-md transition"
        >
          Sort by Gain/Loss
        </button>
      </div>

      {/* Add Stock Section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newStock}
          onChange={(e) => setNewStock(e.target.value)}
          placeholder="Enter Stock Symbol (e.g. INFY)"
          className="flex-1 px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-md transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {/* Watchlist Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-slate-700 dark:text-slate-300">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800/60 text-left">
              <th className="py-3 px-4">Stock</th>
              <th className="py-3 px-4">Price (₹)</th>
              <th className="py-3 px-4">% Change</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => (
              <tr
                key={stock.id}
                className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
              >
                <td className="py-3 px-4 font-semibold">{stock.name}</td>
                <td className="py-3 px-4">{stock.price}</td>
                <td
                  className={`py-3 px-4 flex items-center gap-2 ${
                    stock.change >= 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-500 dark:text-red-400"
                  }`}
                >
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stock.change}%
                </td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleRemove(stock.id)}
                    className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;
