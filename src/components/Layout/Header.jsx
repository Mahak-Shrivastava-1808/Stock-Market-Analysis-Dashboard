import {
  Menu,
  Settings,
  Search,
  Sun,
  Bell,
  ChevronDown,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import React, { useState } from "react";

function Header({ sidebarCollapsed, onToggleSidebar }) {
  const [theme, setTheme] = useState("light"); // theme state
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log("Searching for:", e.target.value);
    // TODO: integrate with stock search API
  };

  const handleProfileClick = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleLogout = () => {
    alert("Logged out!");
    // TODO: logout logic
  };

  const handleSettings = () => {
    window.location.href = "/settings"; // navigate to profile/settings page
  };

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <button
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={onToggleSidebar}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Project name */}
          <div className="hidden md:block">
            <h1 className="text-2xl font-black text-slate-800 dark:text-white">
              StockScope
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Real-Time Market Insights
            </p>
          </div>
        </div>

        {/* Center Section — Market Summary + Search */}
        <div className="flex-1 max-w-2xl mx-8">
          {/* Live Indices Row */}
          <div className="flex items-center justify-between text-sm mb-2">
            <div className="flex items-center space-x-2 text-emerald-500 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>NIFTY 50</span>
              <span>22,550</span>
              <span className="text-xs text-emerald-600">(+0.42%)</span>
            </div>
            <div className="flex items-center space-x-2 text-emerald-500 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>SENSEX</span>
              <span>74,890</span>
              <span className="text-xs text-emerald-600">(+0.39%)</span>
            </div>
            <div className="flex items-center space-x-2 text-red-500 font-semibold">
              <TrendingDown className="w-4 h-4" />
              <span>NASDAQ</span>
              <span>15,120</span>
              <span className="text-xs text-red-500">(-0.18%)</span>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search Stocks, Companies or Symbols..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Sun className="w-5 h-5" />
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 right-0 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* Settings */}
          <button
            onClick={handleSettings}
            className="p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={handleProfileClick}
              className="flex items-center space-x-3 pl-3 border-l border-slate-200 dark:border-slate-700"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt="User"
                className="w-8 h-8 rounded-full ring-2 ring-emerald-500"
              />
              <div className="hidden md:block">
                <p className="text-sm font-medium text-slate-800 dark:text-white">
                  Sheikh Nikhat
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  User
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {/* Dropdown menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-50">
                <button
                  onClick={handleSettings}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Profile / Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
