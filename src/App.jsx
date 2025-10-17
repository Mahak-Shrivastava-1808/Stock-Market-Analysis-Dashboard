import React, { useState, useEffect } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";
import Portfolio from "./components/Portfolio/Portfolio";
import Watchlist from "./components/Watchlist/Watchlist";
import News from "./components/News/News";
import Logout from "./components/Logout/Logout";
import Sectors from "./components/Sectors/Sectors";



function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // ✅ Load last visited page from localStorage
  useEffect(() => {
    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  // ✅ Save current page whenever it changes
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-900 transition-all duration-500">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        {/* Main Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sideBarCollapsed={sideBarCollapsed}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
          />

          <main className="flex-1 overflow-y-auto bg-transparent">
            <div className="p-6 space-y-6">
              {currentPage === "dashboard" && <Dashboard />}
              {currentPage === "settings" && <Settings />}
              {currentPage === "portfolio" && <Portfolio />}
              {currentPage === "watchlist" && <Watchlist />}
              {currentPage === "news" && <News />}
              {currentPage === "logout" && <Logout/>}
              {currentPage === "sectors" && <Sectors/>}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
