import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = [
  { name: '9:30', value: 24200 },
  { name: '11:30', value: 24350 },
  { name: '1:30', value: 24100 },
  { name: '3:30', value: 24420 },
];

const MarketOverview = ({ type }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-4 capitalize text-slate-800 dark:text-white">
        {type.replace('-', ' ')}
      </h2>
      
      {type === "indices" && (
        <div className="h-64 w-full">
          <p className="text-emerald-500 font-bold text-xl mb-2">Nifty 50: 24,420.50 (+0.85%)</p>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dummyData}>
              <XAxis dataKey="name" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {(type === "top-gainers" || type === "top-losers") && (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 dark:border-slate-700">
                <th className="pb-3">Symbol</th>
                <th className="pb-3">LTP</th>
                <th className="pb-3">Change %</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 dark:border-slate-800/50">
                <td className="py-4 font-medium dark:text-white">RELIANCE</td>
                <td className="py-4 dark:text-slate-300">2,950.00</td>
                <td className={`py-4 font-bold ${type === 'top-gainers' ? 'text-emerald-500' : 'text-red-500'}`}>
                   {type === 'top-gainers' ? '+2.4%' : '-1.8%'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MarketOverview;