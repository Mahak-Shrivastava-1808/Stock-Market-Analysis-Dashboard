import React, { useState, useEffect } from "react";
import { Newspaper, Search, ExternalLink, Loader2, Calendar } from "lucide-react";
import axios from "axios";

function News() {
  const [newsData, setNewsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/market-news");
        setNewsData(res.data);
      } catch (error) {
        console.error("News fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredNews = newsData.filter((news) =>
    (news.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center p-32">
      <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      <p className="mt-4 text-slate-500 font-medium italic">Fetching latest global market news...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Search & Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white flex items-center gap-3">
            <span className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
              <Newspaper className="w-6 h-6 text-white" />
            </span> 
            Live Market Updates
          </h2>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <input
            type="text"
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border-none bg-white dark:bg-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none outline-none focus:ring-2 focus:ring-emerald-500/50 text-slate-700 dark:text-white"
          />
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((news) => (
          <div key={news.id} className="group flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
            {/* Image Section */}
            <div className="relative h-60 overflow-hidden">
              <img 
                src={news.thumbnail} 
                alt="market"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 bg-emerald-500 text-white text-[10px] font-black rounded-lg uppercase tracking-wider">
                  {news.publisher}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs">
                <Calendar size={14} />
                <span>{news.date}</span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                {news.title}
              </h3>
              
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6 leading-relaxed">
                {news.description}
              </p>

              <div className="mt-auto">
                <a 
                  href={news.link} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 font-bold text-sm text-emerald-500 hover:text-emerald-600 transition-all group/btn"
                >
                  FULL COVERAGE 
                  <ExternalLink size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;