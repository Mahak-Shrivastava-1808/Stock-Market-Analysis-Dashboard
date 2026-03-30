import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { getStockPrice } from "../../services/api";

function StatsGrid() {
  const [liveStats, setLiveStats] = useState({
    INFY: { current: null, previous: 1625 },
    TCS: { current: null, previous: 3580 },
  });

  useEffect(() => {
    const fetchPrices = async () => {
      const infy = await getStockPrice("INFY");
      const tcs = await getStockPrice("TCS");

      setLiveStats({
        INFY: { current: infy.price, previous: 1625 },
        TCS: { current: tcs.price, previous: 3580 },
      });
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const calculateChange = (current, previous) => {
    const diff = current - previous;
    const percent = ((diff / previous) * 100).toFixed(1);
    const trend = diff >= 0 ? "up" : "down";
    return { percent, trend, changeText: `₹${previous} → ₹${current}` };
  };

  const infyStats =
    liveStats.INFY.current !== null
      ? calculateChange(liveStats.INFY.current, liveStats.INFY.previous)
      : null;

  const tcsStats =
    liveStats.TCS.current !== null
      ? calculateChange(liveStats.TCS.current, liveStats.TCS.previous)
      : null;

  const stockStats = [
    {
      title: "Portfolio Value",
      value: "₹12,45,800",
      change: "+3.25%",
      trend: "up",
      icon: Briefcase,
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "Daily Profit / Loss",
      value: "+₹15,320",
      change: "+1.8%",
      trend: "up",
      icon: DollarSign,
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Top Gainer",
      value: infyStats ? `INFY +${infyStats.percent}%` : "Loading...",
      change: infyStats ? infyStats.changeText : "",
      trend: infyStats ? infyStats.trend : "up",
      icon: TrendingUp,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      textColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Top Loser",
      value: tcsStats ? `TCS ${tcsStats.percent}%` : "Loading...",
      change: tcsStats ? tcsStats.changeText : "",
      trend: tcsStats ? tcsStats.trend : "down",
      icon: TrendingDown,
      color: "from-red-500 to-orange-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      textColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {stockStats.map((stats, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 sm:p-6 border border-slate-200 dark:border-slate-700
                       hover:shadow-lg hover:shadow-slate-200/40 dark:hover:shadow-slate-800/30
                       transition-all duration-300 group flex flex-col justify-between"
          >
            {/* TOP SECTION */}
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1 truncate">
                  {stats.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3 truncate">
                  {stats.value}
                </p>

                {/* Trend Row */}
                <div className="flex items-center space-x-2 text-sm">
                  {stats.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 flex-shrink-0" />
                  )}

                  <span
                    className={`font-semibold ${
                      stats.trend === "up"
                        ? "text-emerald-500"
                        : "text-red-500"
                    }`}
                  >
                    {stats.change}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    today
                  </span>
                </div>
              </div>

              {/* ICON */}
              <div
                className={`p-3 rounded-xl flex-shrink-0 ${stats.bgColor}
                            group-hover:scale-110 transition-all duration-300`}
              >
                <stats.icon className={`w-6 h-6 ${stats.textColor}`} />
              </div>
            </div>

            {/* PROGRESS BAR */}
            <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`bg-gradient-to-r ${stats.color} h-2 rounded-full transition-all duration-300`}
                style={{
                  width: stats.trend === "up" ? "80%" : "40%",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsGrid;