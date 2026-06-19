"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { ArrowLeft, Upload, Save } from "lucide-react";

export default function AddEbookPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    genre: "Fiction",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/ebooks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: Number(form.price),
          genre: form.genre,
          writerName:
            session?.user?.name || session?.user?.email || "Unknown Writer",
          writerEmail: session?.user?.email || "",
          writer: session?.user?.id || null,
        }),
      });

      const data = await res.json();

      if (data._id) {
        alert("Ebook published successfully!");
        router.push("/dashboard/writer");
      } else {
        setError(data.error || "Failed to publish ebook");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Link
        href="/dashboard/writer"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Add New Ebook</h1>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-6"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              className="input input-bordered w-full"
              placeholder="Enter ebook title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Description (Full Content) *
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full h-32"
              placeholder="Write your ebook content here..."
              value={form.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                className="input input-bordered w-full"
                placeholder="9.99"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Genre *
              </label>
              <select
                name="genre"
                className="select select-bordered w-full"
                value={form.genre}
                onChange={handleChange}
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
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-indigo-400 transition cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">Click to upload (imgBB)</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              <Save className="w-5 h-5" />
            )}
            {loading ? "Publishing..." : "Publish Ebook"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
