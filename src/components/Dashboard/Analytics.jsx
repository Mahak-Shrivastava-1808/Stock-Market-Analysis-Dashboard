import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { month: 'Jan', growth: 400, perf: 240 },
  { month: 'Feb', growth: 300, perf: 139 },
  { month: 'Mar', growth: 600, perf: 980 },
];

const Analytics = ({ type }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h2 className="text-2xl font-bold mb-6 capitalize text-slate-800 dark:text-white">
        {type} Analysis
      </h2>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'performance' ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1}/>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="perf" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGrowth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="growth" stroke="#10b981" fillOpacity={1} fill="url(#colorGrowth)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;