import axios from "axios";

// 🔹 Get 30-day historical price data
export const getStockHistory = async (ticker) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/history/${ticker}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching history for ${ticker}:`, error);
    return [];
  }
};

// 🔹 Get current live price
export const getStockPrice = async (ticker) => {
  try {
    const res = await axios.get(`http://127.0.0.1:5000/price/${ticker}`);

    // ✅ Ensure consistent return format
    let price = 0;

    // Handle different backend response formats
    if (res.data) {
      if (typeof res.data === "number") {
        price = res.data; // backend returns plain number
      } else if (res.data.price) {
        price = res.data.price; // backend returns { price: ... }
      } else if (res.data.currentPrice) {
        price = res.data.currentPrice; // backend returns { currentPrice: ... }
      }
    }

    return { ticker, price };
  } catch (error) {
    console.error(`Error fetching price for ${ticker}:`, error);
    return { ticker, price: 0 };
  }
};
