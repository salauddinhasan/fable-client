"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { PenTool, DollarSign, BookOpen, TrendingUp, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import WriterEbookTable from "@/Components/WriterEbookTable";

export default function WriterDashboard() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    genre: "Fiction",
    status: "published",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(
        `http://localhost:5000/api/dashboard/writer/ebooks?writerEmail=${session.user.email}`,
      )
        .then((res) => res.json())
        .then((data) => {
          setEbooks(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session]);

  const openEdit = (ebook) => {
    setEditModal(ebook._id);
    setEditForm({
      title: ebook.title,
      description: ebook.description,
      price: ebook.price,
      genre: ebook.genre,
      status: ebook.status,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    setSaving(true);
    await fetch(`http://localhost:5000/api/ebooks/${editModal}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setEbooks(
      ebooks.map((e) => (e._id === editModal ? { ...e, ...editForm } : e)),
    );
    setEditModal(null);
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this ebook?")) {
      await fetch(`http://localhost:5000/api/ebooks/${id}`, {
        method: "DELETE",
      });
      setEbooks(ebooks.filter((e) => e._id !== id));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const published = ebooks.filter((e) => e.status === "published").length;
  const totalSales = ebooks.reduce((sum, e) => sum + (e.salesCount || 0), 0);
  const totalRevenue = ebooks
    .filter((e) => e.sold)
    .reduce((sum, e) => sum + e.price, 0);

  const stats = [
    {
      label: "Total Ebooks",
      value: ebooks.length,
      icon: PenTool,
      color: "bg-indigo-500",
    },
    {
      label: "Published",
      value: published,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      label: "Total Sales",
      value: totalSales,
      icon: DollarSign,
      color: "bg-yellow-500",
    },
    {
      label: "Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      color: "bg-purple-500",
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

      <WriterEbookTable
        ebooks={ebooks}
        onUpdate={(updated) => {
          setEbooks(
            ebooks.map((e) =>
              e._id === updated._id ? { ...e, ...updated } : e,
            ),
          );
        }}
        onDelete={async (id) => {
          await fetch(`http://localhost:5000/api/ebooks/${id}`, {
            method: "DELETE",
          });
          setEbooks(ebooks.filter((e) => e._id !== id));
        }}
      />
    </div>
  );
}
