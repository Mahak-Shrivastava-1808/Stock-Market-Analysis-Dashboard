import { Menu, Settings, Search, Sun, Moon, Bell, TrendingUp, TrendingDown } from "lucide-react";
import React from "react";

function Header({ onToggleSidebar, theme, setTheme, onPageChange }) {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button onClick={onToggleSidebar} className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <Menu className="w-5 h-5" />
          </button>
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">StockScope</h1>
          </div>
        </div>

        <div className="flex-1 max-w-2xl mx-8">
          <div className="flex items-center justify-between text-sm mb-2 font-semibold">
            <div className="flex items-center text-emerald-500"><TrendingUp className="w-4 h-4 mr-1"/> NIFTY 50 <span className="ml-2 text-xs">(+0.42%)</span></div>
            <div className="flex items-center text-emerald-500"><TrendingUp className="w-4 h-4 mr-1"/> SENSEX <span className="ml-2 text-xs">(+0.39%)</span></div>
            <div className="flex items-center text-red-500"><TrendingDown className="w-4 h-4 mr-1"/> NASDAQ <span className="ml-2 text-xs">(-0.18%)</span></div>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search Stocks..." className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button onClick={() => setTheme(theme === "light" ? "dark" : "light")} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <button onClick={() => onPageChange("notifications")} className="relative p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button onClick={() => onPageChange("settings")} className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;