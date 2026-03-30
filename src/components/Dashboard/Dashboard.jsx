import React, { useState } from 'react';
import StatsGrid from './StatsGrid';
import ChartSection from './ChartSection';

function Dashboard() {
  const [selectedTicker, setSelectedTicker] = useState("AAPL");

  return (
    <div className='space-y-6'>
      {/* Ticker Selection */}
      <div className="flex items-center gap-4">
        <label htmlFor="ticker">Select Stock:</label>
        <select
          id="ticker"
          value={selectedTicker}
          onChange={(e) => setSelectedTicker(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="AAPL">Apple (AAPL)</option>
          <option value="GOOGL">Google (GOOGL)</option>
          <option value="MSFT">Microsoft (MSFT)</option>
          <option value="TSLA">Tesla (TSLA)</option>
        </select>
      </div>

      {/* Stats Grid */}
      <StatsGrid ticker={selectedTicker} />

      {/* Chart Section */}
      <ChartSection ticker={selectedTicker} />
    </div>
  );
}

export default Dashboard;