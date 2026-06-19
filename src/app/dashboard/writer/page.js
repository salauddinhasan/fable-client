"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, DollarSign, BookOpen, TrendingUp } from "lucide-react";

export default function WriterDashboard() {
  const stats = [
    {
      label: "Total Ebooks",
      value: "8",
      icon: PenTool,
      color: "bg-indigo-500",
    },
    { label: "Published", value: "5", icon: BookOpen, color: "bg-green-500" },
    {
      label: "Total Sales",
      value: "230",
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      label: "Revenue",
      value: "$1,234",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const myEbooks = [
    {
      title: "The Midnight Garden",
      status: "Published",
      price: "$9.99",
      sales: 120,
      date: "2024-03-15",
    },
    {
      title: "Garden Secrets",
      status: "Draft",
      price: "$14.99",
      sales: 0,
      date: "2024-03-10",
    },
    {
      title: "Night Blooms",
      status: "Published",
      price: "$7.99",
      sales: 85,
      date: "2024-02-28",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Writer Dashboard</h1>
        <Link
          href="/dashboard/writer/add-ebook"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition"
        >
          + Add New Ebook
        </Link>
      </div>

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
          </motion.div>
        ))}
      </div>

      {/* My Ebooks Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">My Ebooks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Title</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Sales</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {myEbooks.map((ebook, i) => (
                <tr
                  key={i}
                  className="border-t border-gray-50 hover:bg-gray-50"
                >
                  <td className="p-3 font-medium text-gray-900">
                    {ebook.title}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        ebook.status === "Published"
                          ? "bg-green-50 text-green-700"
                          : "bg-yellow-50 text-yellow-700"
                      }`}
                    >
                      {ebook.status}
                    </span>
                  </td>
                  <td className="p-3 text-indigo-600 font-semibold">
                    {ebook.price}
                  </td>
                  <td className="p-3">{ebook.sales}</td>
                  <td className="p-3 text-gray-500">{ebook.date}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-indigo-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-xs text-red-500 hover:underline">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
