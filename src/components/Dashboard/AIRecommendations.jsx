import React, { useState, useEffect } from "react";
import axios from "axios"; // Axios import karein
import { Sparkles, TrendingUp, Newspaper, Target, BrainCircuit, RefreshCw } from "lucide-react";

const AIRecommendations = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      // Backend API call
      const response = await axios.get("http://127.0.0.1:5000/ai-recommendations");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching AI data", error);
    } finally {
      setLoading(false);
    }
  };

  // Pehli baar load hone par fetch karein
  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BrainCircuit className="text-emerald-500" /> AI Stock Insights
          </h1>
          <p className="text-slate-500 text-sm">Real-time Technical & Sentiment Analysis</p>
        </div>
        <button 
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {loading ? "Analyzing Market..." : "Refresh AI Picks"}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-2xl border border-slate-200 dark:border-slate-700"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((stock, index) => (
            <div key={index} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 hover:border-emerald-500/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">{stock.stockName}</h2>
                  <span className="text-xs font-mono text-emerald-500 font-bold uppercase">{stock.ticker}:NSE</span>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${
                  stock.action === 'Buy' ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {stock.action}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 mb-1">Live Price</p>
                  <p className="text-lg font-bold dark:text-white">₹{stock.price}</p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                  <p className="text-[10px] uppercase tracking-widest text-emerald-600 mb-1">AI Target</p>
                  <p className="text-lg font-bold text-emerald-700 dark:text-emerald-400">₹{stock.targetPrice}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                    <Newspaper size={16} className="text-slate-500" />
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{stock.newsSummary}</p>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <Target size={16} className="text-emerald-600" />
                  </div>
                  <p className="text-xs font-semibold leading-relaxed dark:text-slate-200">{stock.reasoning}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;