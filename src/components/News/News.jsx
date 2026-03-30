import React, { useState, useEffect } from "react";
import { Newspaper, Search, Filter } from "lucide-react";
import axios from "axios";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://newsapi.org/v2/everything", {
          params: {
            q: "Indian stock market",
            from: "2025-10-20",
            sortBy: "publishedAt",
            language: "en",
            apiKey: "6d1c4dcac0d54185a8c1fd9703d59347", // 🔁 Replace with your NewsAPI key
          },
        });

        const formatted = res.data.articles.map((item, index) => ({
          id: index,
          title: item.title,
          description: item.description,
          source: item.source.name,
          date: item.publishedAt.split("T")[0],
          category: categorize(item.title),
          image: item.urlToImage || "https://via.placeholder.com/400x200?text=No+Image",
        }));

        setNewsData(formatted);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // 🔍 Category detection based on title keywords
  const categorize = (title) => {
    const t = title.toLowerCase();
    if (t.includes("nifty")) return "NIFTY";
    if (t.includes("sensex")) return "SENSEX";
    if (t.includes("reliance") || t.includes("tcs") || t.includes("infosys")) return "Company";
    return "General";
  };

  // 🔎 Filter & search logic
  const filteredNews = newsData.filter((news) => {
    const matchesCategory = selectedCategory === "All" || news.category === selectedCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-blue-500" /> Market News & Updates
        </h2>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-800 text-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option>All</option>
              <option>NIFTY</option>
              <option>SENSEX</option>
              <option>Company</option>
              <option>General</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredNews.map((news) => (
          <div
            key={news.id}
            className="rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50 shadow-md hover:shadow-xl transition duration-300"
          >
            <img src={news.image} alt={news.title} className="h-40 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white line-clamp-2">
                {news.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                {news.description}
              </p>
              <div className="flex justify-between items-center pt-2 text-sm">
                <span className="text-blue-600 dark:text-blue-400 font-medium">{news.source}</span>
                <span className="text-slate-500 dark:text-slate-400">{news.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 mt-6">
          No news found for your selection.
        </p>
      )}
    </div>
  );
}

export default News;