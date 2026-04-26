import React, { useState, useEffect } from "react";
import { Star, TrendingUp, TrendingDown, Trash2, Plus } from "lucide-react";
import axios from "axios";

function Watchlist() {
  const [watchlist, setWatchlist] = useState([
    { id: 1, name: "TCS" },
    { id: 2, name: "RELIANCE" },
    { id: 3, name: "INFY" },
  ]);
  const [newStock, setNewStock] = useState("");
  const [liveData, setLiveData] = useState({});

  // 🔄 Fetch live prices
 const fetchLivePrices = async () => {
  try {
    const results = await Promise.all(
      watchlist.map((stock) =>
        axios
          .get(`http://localhost:5000/price/${stock.name}`)
          .then((res) => ({ 
            name: stock.name, 
            price: res.data.price,
            dailyChange: res.data.change // Backend se ye data mangwayenge
          }))
          .catch(() => ({ name: stock.name, price: 0, dailyChange: 0 }))
      )
    );

    const newLiveData = {};
    results.forEach((item) => {
      newLiveData[item.name] = {
        price: item.price,
        // Agar live update nahi hua, toh backend wala default change dikhao
        change: item.dailyChange || 0 
      };
    });

    setLiveData(newLiveData);
  } catch (err) {
    console.error("Polling error:", err);
  }
};

  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 10000);
    return () => clearInterval(interval);
  }, [watchlist]);

  // ➕ Add stock
  const handleAdd = () => {
    const symbol = newStock.trim().toUpperCase();
    if (!symbol || watchlist.find((s) => s.name === symbol)) return;
    const newItem = { id: Date.now(), name: symbol };
    setWatchlist([...watchlist, newItem]);
    setNewStock("");
  };

  // ❌ Remove stock
  const handleRemove = (id) => {
    setWatchlist(watchlist.filter((s) => s.id !== id));
  };

  // 🔃 Sort by % change
  const sortByChange = () => {
    const sorted = [...watchlist].sort((a, b) => {
      const changeA = liveData[a.name]?.change || 0;
      const changeB = liveData[b.name]?.change || 0;
      return changeB - changeA;
    });
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
            {watchlist.map((stock) => {
              const data = liveData[stock.name] || { price: 0, change: 0 };
              return (
                <tr
                  key={stock.id}
                  className="border-b border-slate-200/50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition"
                >
                  <td className="py-3 px-4 font-semibold">{stock.name}</td>
                  <td className="py-3 px-4">₹{data.price.toLocaleString()}</td>
                  <td
                    className={`py-3 px-4 flex items-center gap-2 ${
                      data.change >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {data.change >= 0 ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {data.change}%
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Watchlist;