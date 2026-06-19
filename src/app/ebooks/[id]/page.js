"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Star,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Calendar,
  Tag,
  User,
  ArrowLeft,
  ShoppingCart,
  Eye,
} from "lucide-react";

// ডামি ডাটা (পরে API থেকে আসবে)
const dummyEbooks = [
  {
    id: 1,
    title: "The Midnight Garden",
    writer: "Sarah Johnson",
    writerId: 101,
    price: 9.99,
    genre: "Fiction",
    description:
      "A hauntingly beautiful tale set in a mysterious garden that only blooms at midnight. When Clara discovers the secret behind the garden's enchanting flowers, she embarks on a journey that will change her life forever. This bestselling novel weaves together themes of love, loss, and the magic that exists in the world around us.",
    cover: "📗",
    rating: 4.8,
    readers: 2340,
    status: "Available",
    uploadedDate: "2024-03-15",
    pages: 320,
    language: "English",
  },
  {
    id: 2,
    title: "Stars Beyond",
    writer: "Mike Chen",
    writerId: 102,
    price: 12.99,
    genre: "Sci-Fi",
    description:
      "In a distant future where humanity has colonized the stars, one pilot discovers an ancient alien artifact that could change the course of history. A thrilling space adventure that explores the boundaries of human knowledge and the price of discovery.",
    cover: "📘",
    rating: 4.6,
    readers: 1890,
    status: "Sold",
    uploadedDate: "2024-02-20",
    pages: 450,
    language: "English",
  },
  {
    id: 3,
    title: "Love in Paris",
    writer: "Emma Davis",
    writerId: 103,
    price: 7.99,
    genre: "Romance",
    description:
      "A chance encounter in the City of Love leads to an unforgettable romance. Follow Sophie and Jean as they navigate the streets of Paris, discovering that true love often finds us when we least expect it.",
    cover: "📙",
    rating: 4.9,
    readers: 3200,
    status: "Available",
    uploadedDate: "2024-04-01",
    pages: 280,
    language: "English",
  },
];

export default function EbookDetailsPage() {
  const { id } = useParams();
  const [ebook, setEbook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    // সিমুলেট API call (পরে real API হবে)
    setLoading(true);
    setTimeout(() => {
      const found = dummyEbooks.find((e) => e.id === Number(id));
      setEbook(found || null);
      setLoading(false);
    }, 800);
  }, [id]);

  const handlePurchase = async () => {
    setIsPurchasing(true);
    // পরে Stripe Checkout redirect হবে
    setTimeout(() => {
      alert("Redirecting to Stripe Checkout...");
      setIsPurchasing(false);
    }, 1000);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Skeleton Loader
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl p-8 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-64 h-80 bg-gray-200 rounded-xl"></div>
              <div className="flex-1 space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-full bg-gray-200 rounded"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                <div className="h-10 w-40 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not Found
  if (!ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <span className="text-8xl block mb-4">📭</span>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Ebook Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The ebook you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
          >
            <BookOpen className="w-5 h-5" />
            Browse Ebooks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Browse
        </Link>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Cover Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="w-full md:w-64 flex-shrink-0"
              >
                <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl p-8 flex items-center justify-center shadow-lg">
                  <span className="text-8xl">{ebook.cover}</span>
                  {ebook.status === "Sold" && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                      Sold
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Details */}
              <div className="flex-1 space-y-5">
                {/* Title & Status */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                      {ebook.status}
                    </span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-200">
                      {ebook.genre}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {ebook.title}
                  </h1>
                </div>

                {/* Writer */}
                <Link
                  href={`/writer/${ebook.writerId}`}
                  className="inline-flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition"
                >
                  <User className="w-4 h-4" />
                  <span className="font-medium">{ebook.writer}</span>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(ebook.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-gray-700">
                    {ebook.rating}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({ebook.readers.toLocaleString()} readers)
                  </span>
                </div>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {ebook.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Uploaded: {ebook.uploadedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{ebook.pages} pages</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    <span>{ebook.language}</span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-3xl font-bold text-indigo-600">
                      ${ebook.price}
                    </p>
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    {/* Purchase Button */}
                    {ebook.status !== "Sold" ? (
                      <button
                        onClick={handlePurchase}
                        disabled={isPurchasing}
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50"
                      >
                        {isPurchasing ? (
                          <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Processing...
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-5 h-5" />
                            Buy Now
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-300 text-gray-500 font-semibold rounded-xl cursor-not-allowed"
                      >
                        Already Purchased
                      </button>
                    )}

                    {/* Bookmark Button */}
                    <button
                      onClick={handleBookmark}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        isBookmarked
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                          : "border-gray-200 bg-white text-gray-400 hover:border-indigo-300 hover:text-indigo-500"
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-5 h-5" />
                      ) : (
                        <Bookmark className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
