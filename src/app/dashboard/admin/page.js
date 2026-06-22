"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import TransactionsTable from "@/Components/TransactionsTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, txnRes, usersRes] = await Promise.all([
          fetch("https://fable-server-vygh.onrender.com/api/dashboard/stats"),
          fetch(
            "https://fable-server-vygh.onrender.com/api/dashboard/transactions",
          ),
          fetch("https://fable-server-vygh.onrender.com/api/dashboard/users"),
        ]);
        const statsData = await statsRes.json();
        const txnData = await txnRes.json();
        const usersData = await usersRes.json();

        setStats(statsData);
        setTransactions(Array.isArray(txnData) ? txnData : []);
        setUsers(Array.isArray(usersData) ? usersData : []);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const totalWriters = users.filter((u) => u.role === "writer").length;

  const statCards = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "bg-blue-500",
      change: "",
    },
    {
      label: "Total Writers",
      value: totalWriters,
      icon: Users,
      color: "bg-indigo-500",
      change: "",
    },
    {
      label: "Ebooks Sold",
      value: stats?.totalSold || 0,
      icon: BookOpen,
      color: "bg-green-500",
      change: "",
    },
    {
      label: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "bg-purple-500",
      change: "",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
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
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
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

        {/* Genre Chart */}
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

      <TransactionsTable transactions={transactions} />
    </div>
  );
}
