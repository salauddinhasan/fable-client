"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, Bookmark, TrendingUp, Eye } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function UserDashboard() {
  const { data: session } = authClient.useSession();
  const [purchasedEbooks, setPurchasedEbooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `https://fable-server-vygh.onrender.com/api/dashboard/user/purchases?email=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setPurchasedEbooks(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const stats = [
    {
      label: "Purchased",
      value: purchasedEbooks.length,
      icon: ShoppingBag,
      color: "bg-blue-500",
    },
    { label: "Bookmarks", value: "0", icon: Bookmark, color: "bg-yellow-500" },
    {
      label: "Total Spent",
      value: `$${purchasedEbooks.reduce((s, e) => s + e.price, 0).toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div>
      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
            {session?.user?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {session?.user?.name || "Reader"}
            </h2>
            <p className="text-gray-500 text-sm">{session?.user?.email}</p>
            <span className="badge bg-indigo-50 text-indigo-600 text-xs mt-1">
              Reader
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

      {/* Purchase History Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">📋 Purchase History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3 font-medium">Ebook</th>
                <th className="text-left p-3 font-medium">Writer</th>
                <th className="text-left p-3 font-medium">Price</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-left p-3 font-medium">View</th>
              </tr>
            </thead>
            <tbody>
              {purchasedEbooks.length > 0 ? (
                purchasedEbooks.map((ebook, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-50 hover:bg-gray-50"
                  >
                    <td className="p-3 font-medium text-gray-900">
                      {ebook.title}
                    </td>
                    <td className="p-3 text-gray-500">{ebook.writerName}</td>
                    <td className="p-3 font-semibold text-indigo-600">
                      ${ebook.price}
                    </td>
                    <td className="p-3 text-gray-500">
                      {formatDate(ebook.createdAt || ebook.uploadedDate)}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                        Purchased
                      </span>
                    </td>
                    <td className="p-3">
                      <Link
                        href={`/ebooks/${ebook._id}`}
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No purchase history yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
