import React, { useState, useEffect } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Header from "./components/Layout/Header";
import Dashboard from "./components/Dashboard/Dashboard";
import Settings from "./components/Settings/Settings";
import Notifications from "./components/Notifications/Notifications";
import Portfolio from "./components/Portfolio/Portfolio";
import Watchlist from "./components/Watchlist/Watchlist";
import News from "./components/News/News";
import Logout from "./components/Logout/Logout";
import Sectors from "./components/Sectors/Sectors";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import MarketOverview from "./components/Dashboard/MarketOverview";
import Analytics from "./components/Dashboard/Analytics";
import AIRecommendations from "./components/Dashboard/AIRecommendations";

function App() {
  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  // Theme Logic
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const firstLoad = sessionStorage.getItem("firstLoadDone");
    if (!firstLoad) {
      localStorage.removeItem("user");
      sessionStorage.setItem("firstLoadDone", "true");
    }
    const savedUser = localStorage.getItem("user");
    if (savedUser) setIsAuthenticated(true);

    const savedPage = localStorage.getItem("currentPage");
    if (savedPage) setCurrentPage(savedPage);
    
    window.onPageChange = setCurrentPage;
  }, []);

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("firstLoadDone");
    setIsAuthenticated(false);
    setCurrentPage("dashboard");
  };

  if (!isAuthenticated) {
    return showSignup ? (
      <Signup onSwitchToLogin={() => setShowSignup(false)} />
    ) : (
      <Login onLogin={() => setIsAuthenticated(true)} onSwitchToSignup={() => setShowSignup(true)} />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${theme === 'dark' ? 'dark bg-slate-900' : 'bg-slate-50'}`}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar
          collapsed={sideBarCollapsed}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            theme={theme}
            setTheme={setTheme}
            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
            onPageChange={setCurrentPage}
          />

          <main className="flex-1 overflow-y-auto bg-transparent p-6">
            <div className="max-w-7xl mx-auto">
              {currentPage === "dashboard" && <Dashboard />}
              {currentPage === "ai-recommendations" && <AIRecommendations />}
              {currentPage === "settings" && <Settings />}
              {currentPage === "notifications" && <Notifications />}
              {currentPage === "portfolio" && <Portfolio />}
              {currentPage === "watchlist" && <Watchlist />}
              {currentPage === "news" && <News />}
              {currentPage === "sectors" && <Sectors />}
              {currentPage === "logout" && <Logout onLogout={handleLogout} />}
              {(currentPage === "indices" || currentPage === "top-gainers" || currentPage === "top-losers") && <MarketOverview type={currentPage} />}
              {(currentPage === "performance" || currentPage === "growth") && <Analytics type={currentPage} />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;