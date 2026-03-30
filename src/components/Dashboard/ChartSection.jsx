import React from 'react';
import StockLineChart from './StockLineChart';
import PortfolioPieChart from './PortfolioPieChart';
import InvestmentBarChart from './InvestmentBarChart';
import LiveMarketChart from './LiveMarketChart';
import RecentTransactionsTable from './RecentTransactionsTable';
import TopPerformingStocksTable from './TopPerformingStocksTable';
import WatchlistOverviewTable from './WatchlistOverviewTable';

function ChartSection({ ticker }) {
  return (
    <div className="space-y-8">
      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <StockLineChart ticker={ticker} />
          <InvestmentBarChart ticker={ticker} />
        </div>
        <div className="space-y-6">
          <PortfolioPieChart ticker={ticker} />
          <LiveMarketChart ticker={ticker} />
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <RecentTransactionsTable />
        <TopPerformingStocksTable ticker={ticker} />
        <WatchlistOverviewTable />
      </div>
    </div>
  );
}

export default ChartSection;