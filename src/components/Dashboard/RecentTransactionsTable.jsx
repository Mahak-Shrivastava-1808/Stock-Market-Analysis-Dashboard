import React from 'react';

const recentTransactions = [
  { id: "#1001", stock: "INFY", type: "Buy", quantity: 50, price: "₹1,695", date: "2025-10-10" },
  { id: "#1002", stock: "TCS", type: "Sell", quantity: 20, price: "₹3,500", date: "2025-10-11" },
  { id: "#1003", stock: "RELIANCE", type: "Buy", quantity: 10, price: "₹2,850", date: "2025-10-12" },
];

function RecentTransactionsTable() {
  return (
    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-6 overflow-x-auto">
      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Recent Transactions</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Latest trades in your portfolio</p>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-slate-600 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-700/50">
            <th className="p-2">ID</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Type</th>
            <th className="p-2">Quantity</th>
            <th className="p-2">Price</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {recentTransactions.map((tx, index) => (
            <tr key={index} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-200/50 dark:border-slate-700/50">
              <td className="p-2">{tx.id}</td>
              <td className="p-2">{tx.stock}</td>
              <td className="p-2">{tx.type}</td>
              <td className="p-2">{tx.quantity}</td>
              <td className="p-2">{tx.price}</td>
              <td className="p-2">{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentTransactionsTable;
