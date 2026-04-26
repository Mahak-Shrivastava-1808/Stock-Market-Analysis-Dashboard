import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';

const MarketOverview = ({ type }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (type === "indices") {
        const res = await axios.get("http://127.0.0.1:5000/market-indices");
        setData(res.data);
      } else {
        const res = await axios.get("http://127.0.0.1:5000/market-movers");
        setData(res.data);
      }
    } catch (err) {
      console.error("Market fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // 30 sec refresh
    return () => clearInterval(interval);
  }, [type]);

  if (loading) return (
    <div className="h-64 flex items-center justify-center bg-white dark:bg-slate-800 rounded-3xl">
      <Loader2 className="animate-spin text-emerald-500" size={32} />
    </div>
  );

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 h-full">
      <h2 className="text-xl font-bold mb-4 capitalize text-slate-800 dark:text-white">
        {type.replace('-', ' ')}
      </h2>
      
      {type === "indices" && data && (
        <div className="h-64 w-full">
          <div className="mb-4">
            <p className="text-2xl font-black dark:text-white">₹{data.price}</p>
            <p className={`text-sm font-bold ${data.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
              {data.change >= 0 ? '▲' : '▼'} {Math.abs(data.change)}% Today
            </p>
          </div>
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={data.chart}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={data.change >= 0 ? "#10b981" : "#ef4444"} 
                strokeWidth={3} 
                dot={false} 
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {(type === "top-gainers" || type === "top-losers") && data && (
        <div className="overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3 font-medium">Symbol</th>
                <th className="pb-3 font-medium">LTP</th>
                <th className="pb-3 font-medium text-right">Change %</th>
              </tr>
            </thead>
            <tbody>
  {data && (type === 'top-gainers' ? data.gainers : data.losers) ? (
    (type === 'top-gainers' ? data.gainers : data.losers).map((stock, i) => (
      <tr key={i} className="border-b border-slate-50 dark:border-slate-800/50">
        <td className="py-4 font-medium dark:text-white">{stock.symbol}</td>
        <td className="py-4 dark:text-slate-300">{stock.ltp}</td>
        <td className={`py-4 font-bold ${stock.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {stock.change >= 0 ? '+' : ''}{stock.change}%
        </td>
      </tr>
    ))
  ) : (
    <tr><td colSpan="3" className="text-center py-4">Loading Data...</td></tr>
  )}
</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;