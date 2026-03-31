import React, { useState, useEffect } from "react";
import { Sparkles, TrendingUp, Newspaper, Target, BrainCircuit } from "lucide-react";

const AIRecommendations = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      // Jab aapka teammate backend URL de de, tab yahan 'fetch' lagayein
      // Abhi ke liye hum dummy data use kar rahe hain
      setTimeout(() => {
        setData([
          {
            stockName: "Reliance Industries",
            ticker: "RELIANCE",
            action: "Buy",
            price: "2,945",
            targetPrice: "3,100",
            sentiment: "Positive",
            newsSummary: "Reliance expanding its green energy footprint with new plant announcements.",
            reasoning: "Strong technical support at 2900 and positive RSI crossover."
          },
          {
            stockName: "Tata Consultancy Services",
            ticker: "TCS",
            action: "Hold",
            price: "4,120",
            targetPrice: "4,250",
            sentiment: "Neutral",
            newsSummary: "Quarterly results meet expectations, but global IT spending remains cautious.",
            reasoning: "Stock is consolidating near all-time highs. Wait for a breakout."
          }
        ]);
        setLoading(false);
      }, 3000); 
    } catch (error) {
      console.error("Error fetching AI data", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <BrainCircuit className="text-green-500" /> AI Stock Insights
          </h1>
          <p className="text-slate-500 text-sm">Powered by Multi-Agent Stock Analysis</p>
        </div>
        <button 
          onClick={fetchRecommendations}
          disabled={loading}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-xl shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
        >
          {loading ? "AI is Thinking..." : <><Sparkles size={18} /> Get New Picks</>}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((stock, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold dark:text-white">{stock.stockName}</h2>
                  <span className="text-xs font-mono text-blue-500 uppercase">{stock.ticker}:NSE</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  stock.action === 'Buy' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {stock.action}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl">
                  <p className="text-xs text-slate-500 mb-1">Current Price</p>
                  <p className="font-bold dark:text-white">₹{stock.price}</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/30">
                  <p className="text-xs text-green-600 mb-1">Target Price</p>
                  <p className="font-bold text-green-700 dark:text-green-400">₹{stock.targetPrice}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <Newspaper size={16} className="text-slate-400 shrink-0" />
                  <p className="text-xs text-slate-600 dark:text-slate-400">{stock.newsSummary}</p>
                </div>
                <div className="flex gap-3">
                  <Target size={16} className="text-slate-400 shrink-0" />
                  <p className="text-xs font-medium dark:text-slate-300">{stock.reasoning}</p>
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