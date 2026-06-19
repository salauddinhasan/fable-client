"use client";

import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Users",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      label: "Total Writers",
      value: "456",
      icon: Users,
      color: "bg-indigo-500",
      change: "+8%",
    },
    {
      label: "Ebooks Sold",
      value: "5,678",
      icon: BookOpen,
      color: "bg-green-500",
      change: "+23%",
    },
    {
      label: "Total Revenue",
      value: "$45,678",
      icon: DollarSign,
      color: "bg-purple-500",
      change: "+18%",
    },
  ];

  const recentTransactions = [
    {
      id: "TXN-001",
      user: "john@email.com",
      type: "Purchase",
      ebook: "The Midnight Garden",
      amount: "$9.99",
      date: "2024-03-20",
    },
    {
      id: "TXN-002",
      user: "writer@email.com",
      type: "Publishing Fee",
      ebook: "-",
      amount: "$29.99",
      date: "2024-03-19",
    },
    {
      id: "TXN-003",
      user: "jane@email.com",
      type: "Purchase",
      ebook: "Stars Beyond",
      amount: "$12.99",
      date: "2024-03-18",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}
              >
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs text-green-500 mt-2">
              {stat.change} from last month
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart Placeholder */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Monthly Sales</h3>
          <div className="flex items-end gap-2 h-40">
            {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 95].map(
              (height, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-1 bg-indigo-500 rounded-t-md hover:bg-indigo-600 transition cursor-pointer"
                  title={`Month ${i + 1}: ${height} sales`}
                ></motion.div>
              ),
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Genre Chart Placeholder */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Ebooks by Genre</h3>
          <div className="space-y-3">
            {[
              { genre: "Fiction", percent: 30, color: "bg-indigo-500" },
              { genre: "Romance", percent: 25, color: "bg-pink-500" },
              { genre: "Sci-Fi", percent: 20, color: "bg-blue-500" },
              { genre: "Mystery", percent: 15, color: "bg-purple-500" },
              { genre: "Fantasy", percent: 10, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.genre} className="flex items-center gap-3">
                <span className="text-xs text-gray-600 w-16">{item.genre}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.percent}%` }}
                    transition={{ duration: 0.8 }}
                    className={`h-full ${item.color} rounded-full`}
                  ></motion.div>
                </div>
                <span className="text-xs text-gray-500 w-10">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">ID</th>
                <th className="text-left p-3 font-medium">User</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Ebook</th>
                <th className="text-left p-3 font-medium">Amount</th>
                <th className="text-left p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((txn, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 hover:bg-gray-50"
                >
                  <td className="p-3 font-mono text-xs text-gray-500">
                    {txn.id}
                  </td>
                  <td className="p-3 text-gray-700">{txn.user}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        txn.type === "Purchase"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className="p-3 text-gray-700">{txn.ebook}</td>
                  <td className="p-3 font-semibold text-indigo-600">
                    {txn.amount}
                  </td>
                  <td className="p-3 text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
