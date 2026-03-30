import React, { useEffect, useState } from "react";
import { getStockPrice } from "../../services/api";

const LiveMarketChart = ({ ticker = "AAPL" }) => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const data = await getStockPrice(ticker);
        setPrice(data.price);
      } catch (error) {
        console.error("Error fetching live price:", error);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000); // Refresh every 10 sec

    return () => clearInterval(interval);
  }, [ticker]);

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
        Live Price for {ticker}
      </h3>
      <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
        {price !== null ? `$${price}` : "Loading..."}
      </p>
    </div>
  );
};

export default LiveMarketChart;