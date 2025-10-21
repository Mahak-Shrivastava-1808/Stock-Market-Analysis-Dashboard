import React, { useState } from "react";
import {
  LayoutDashboard,
  LineChart,
  PieChart,
  Wallet,
  Star,
  Newspaper,
  Settings,
  LogOut,
  ChevronDown,
  TrendingUp,
  BarChart2,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
  {
    id: "market-overview",
    icon: LineChart,
    label: "Market Overview",
    submenu: [
      { id: "indices", label: "Indices" },
      { id: "top-gainers", label: "Top Gainers" },
      { id: "top-losers", label: "Top Losers" },
    ],
  },
  { id: "portfolio", icon: Wallet, label: "My Portfolio" },
  { id: "watchlist", icon: Star, label: "Watchlist" },
  {
    id: "analytics",
    icon: BarChart2,
    label: "Analytics",
    submenu: [
      { id: "performance", label: "Performance" },
      { id: "growth", label: "Growth Overview" },
    ],
  },
  { id: "news", icon: Newspaper, label: "Market News" },
  { id: "sectors", icon: PieChart, label: "Sector Analysis" },
  { id: "settings", icon: Settings, label: "Profile & Settings" },
  { id: "logout", icon: LogOut, label: "Logout" },
];

function Sidebar({ collapsed, currentPage, onPageChange }) {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) newExpanded.delete(itemId);
    else newExpanded.add(itemId);
    setExpandedItems(newExpanded);
  };

  // ✅ Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-72"
      } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                StockScope
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Real-Time Market Dashboard
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <div key={item.id}>
              <button
                onClick={() =>
                  item.submenu ? toggleExpanded(item.id) : onPageChange(item.id)
                }
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  {!collapsed && (
                    <span className="font-medium ml-2">{item.label}</span>
                  )}
                </div>

                {!collapsed && item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItems.has(item.id) ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {!collapsed && item.submenu && expandedItems.has(item.id) && (
                <div className="ml-8 mt-2 space-y-1">
                  {item.submenu.map((subitem) => (
                    <button
                      key={subitem.id}
                      className="w-full text-left p-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50 rounded-lg"
                    >
                      {subitem.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* ✅ User Profile Section */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="user"
              className="w-10 h-10 rounded-full ring-2 ring-green-500"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                {user?.name || "Guest User"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {user?.email || "guest@example.com"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
