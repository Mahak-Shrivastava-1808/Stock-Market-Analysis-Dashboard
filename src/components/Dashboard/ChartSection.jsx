import React from 'react';
import StockLineChart from './StockLineChart';
import PortfolioPieChart from './PortfolioPieChart';
import InvestmentBarChart from './InvestmentBarChart';
import LiveMarketChart from './LiveMarketChart';
import RecentTransactionsTable from './RecentTransactionsTable';
import TopPerformingStocksTable from './TopPerformingStocksTable';
import WatchlistOverviewTable from './WatchlistOverviewTable';

function ChartSection() {
  return (
    <div className="space-y-8"> {/* Wrap everything inside a single parent div */}
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StockLineChart />
          <InvestmentBarChart />
        </div>
        <div className="space-y-6">
          <PortfolioPieChart />
          <LiveMarketChart />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols- gap-6 mt-6">
  <RecentTransactionsTable />
  <TopPerformingStocksTable />
  <WatchlistOverviewTable />
</div>
    </div>
  );
}

export default ChartSection;

