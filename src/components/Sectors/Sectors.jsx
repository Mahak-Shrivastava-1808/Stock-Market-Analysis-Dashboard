import React, { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, PieChart } from "lucide-react";
import axios from "axios";

function Sectors() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const fetchSectorData = async () => {
      try {
        // Replace with your own backend or external API if available
        const res = await axios.get("https://api.mocki.io/v2/79f05c5e"); // 🔁 Replace with real endpoint
        const data = res.data;

        // Format data: [{ name: "Technology", change: 2.5 }, ...]
        const formatted = data.map((item) => ({
          name: item.sector,
          change: parseFloat(item.change),
        }));

        setSectors(formatted);
      } catch (error) {
        console.error("Error fetching sector data:", error);
        // Fallback dummy data
        setSectors([
          { name: "Banking", change: 1.2 },
          { name: "Infotech", change: 2.1 },
          { name: "Auto", change: -0.6 },
          { name: "Energy", change: -1.4 },
          { name: "Pharma", change: 0.9 },
        ]);
      }
    };

    fetchSectorData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
          Sector Analysis
        </h1>
        <PieChart className="w-6 h-6 text-green-500" />
      </div>

      {/* Sector Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sectors.map((sector) => (
          <div
            key={sector.name}
            className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-slate-700 dark:text-white">
                {sector.name}
              </h2>
              {sector.change >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-500" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-500" />
              )}
            </div>
            <p
              className={`mt-2 text-sm font-semibold ${
                sector.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {sector.change}%
            </p>
          </div>
        ))}
      </div>

      {/* Table of Top/Bottom Sectors */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-xl shadow p-4">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-slate-600 dark:text-slate-300">
                Sector
              </th>
              <th className="px-4 py-2 text-left text-slate-600 dark:text-slate-300">
                Change %
              </th>
              <th className="px-4 py-2 text-left text-slate-600 dark:text-slate-300">
                Trend
              </th>
            </tr>
          </thead>
          <tbody>
            {sectors.map((sector) => (
              <tr key={sector.name} className="border-b border-slate-200 dark:border-slate-700">
                <td className="px-4 py-2 text-slate-800 dark:text-white">{sector.name}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    sector.change >= 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {sector.change}%
                </td>
                <td className="px-4 py-2">
                  {sector.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sectors;