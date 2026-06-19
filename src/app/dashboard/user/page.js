"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, BookOpen, Bookmark, TrendingUp } from "lucide-react";

export default function UserDashboard() {
  const stats = [
    {
      label: "Purchased",
      value: "12",
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    { label: "Reading", value: "3", icon: BookOpen, color: "bg-green-500" },
    { label: "Bookmarks", value: "8", icon: Bookmark, color: "bg-yellow-500" },
    { label: "Spent", value: "$89", icon: TrendingUp, color: "bg-purple-500" },
  ];

  const recentPurchases = [
    {
      title: "The Midnight Garden",
      writer: "Sarah Johnson",
      price: "$9.99",
      date: "2024-03-20",
    },
    {
      title: "Stars Beyond",
      writer: "Mike Chen",
      price: "$12.99",
      date: "2024-03-18",
    },
    {
      title: "Love in Paris",
      writer: "Emma Davis",
      price: "$7.99",
      date: "2024-03-15",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Dashboard</h1>

      {/* Stats Cards */}
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
          </motion.div>
        ))}
      </div>

      {/* Recent Purchases */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Recent Purchases</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Ebook</th>
                <th className="text-left p-3 font-medium">Writer</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentPurchases.map((purchase, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {purchase.title}
                  </td>
                  <td className="p-3 text-gray-500">{purchase.writer}</td>
                  <td className="p-3 font-semibold text-indigo-600">
                    {purchase.price}
                  </td>
                  <td className="p-3 text-gray-500">{purchase.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
