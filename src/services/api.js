import axios from "axios";

// 🔹 Get 30-day historical price data
export const getStockHistory = async (ticker) => {
  try {
    const res = await axios.get(`http://localhost:5000/history/${ticker}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching history for ${ticker}:`, error);
    return [];
  }
};

// 🔹 Get current live price
export const getStockPrice = async (ticker) => {
  try {
    const res = await axios.get(`http://localhost:5000/price/${ticker}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    return { price: 0 };
  }
};