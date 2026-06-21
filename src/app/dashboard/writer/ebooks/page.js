"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Edit, Trash2, X, Eye } from "lucide-react";

export default function WriterEbooksPage() {
  const { data: session } = authClient.useSession();
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    price: "",
    genre: "",
    status: "",
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
    if (confirm("Delete this ebook?")) {
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">📚 My Ebooks</h1>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b">
          <h2 className="font-semibold">All Ebooks</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Genre</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.length > 0 ? (
                ebooks.map((ebook) => (
                  <tr key={ebook._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium">{ebook.title}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${ebook.status === "published" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}
                      >
                        {ebook.status}
                      </span>
                    </td>
                    <td className="p-3 text-indigo-600 font-semibold">
                      ${ebook.price}
                    </td>
                    <td className="p-3 text-gray-500">{ebook.genre}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openEdit(ebook)}
                          className="text-indigo-600 hover:underline text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ebook._id)}
                          className="text-red-500 hover:underline text-xs"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-400">
                    No ebooks yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal (same as before) */}
      {editModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Edit Ebook</h2>
              <button onClick={() => setEditModal(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3">
              <input
                name="title"
                className="input input-bordered w-full"
                value={editForm.title}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <textarea
                name="description"
                className="textarea textarea-bordered w-full h-24"
                value={editForm.description}
                onChange={handleEditChange}
                placeholder="Description"
              ></textarea>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="price"
                  className="input input-bordered"
                  value={editForm.price}
                  onChange={handleEditChange}
                />
                <select
                  name="genre"
                  className="select select-bordered"
                  value={editForm.genre}
                  onChange={handleEditChange}
                >
                  <option>Fiction</option>
                  <option>Mystery</option>
                  <option>Romance</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                  <option>Horror</option>
                  <option>Thriller</option>
                  <option>Poetry</option>
                </select>
              </div>
              <select
                name="status"
                className="select select-bordered w-full"
                value={editForm.status}
                onChange={handleEditChange}
              >
                <option value="published">Published</option>
                <option value="unpublished">Unpublished</option>
              </select>
              <button
                onClick={handleUpdate}
                disabled={saving}
                className="btn btn-primary w-full"
              >
                {saving ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Update Ebook"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
