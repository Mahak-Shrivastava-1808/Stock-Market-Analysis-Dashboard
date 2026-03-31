import React from "react";
import { Bell, Info, AlertTriangle, CheckCircle, Clock } from "lucide-react";

const notifications = [
  { id: 1, title: "Target Reached", desc: "Zomato touched ₹180 target", time: "2m ago", icon: AlertTriangle, color: "text-amber-500 bg-amber-50" },
  { id: 2, title: "Portfolio Update", desc: "Your portfolio is up 5% today!", time: "1h ago", icon: CheckCircle, color: "text-emerald-500 bg-emerald-50" },
  { id: 3, title: "Market Alert", desc: "Nifty 50 showing bullish trend", time: "3h ago", icon: Info, color: "text-blue-500 bg-blue-50" },
];

function Notifications() {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Recent Notifications</h2>
      <div className="space-y-4">
        {notifications.map(n => (
          <div key={n.id} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 flex items-start space-x-4">
            <div className={`p-2 rounded-lg ${n.color} dark:bg-opacity-10`}><n.icon className="w-5 h-5" /></div>
            <div className="flex-1">
              <div className="flex justify-between items-center"><h4 className="font-bold dark:text-white">{n.title}</h4><span className="text-xs text-slate-400">{n.time}</span></div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{n.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notifications;