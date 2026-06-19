"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ডামি ডাটা (পরে API থেকে আসবে)
const allEbooks = [
  {
    id: 1,
    title: "The Midnight Garden",
    writer: "Sarah Johnson",
    price: 9.99,
    genre: "Fiction",
    rating: 4.8,
    cover: "📗",
    sold: false,
  },
  {
    id: 2,
    title: "Stars Beyond",
    writer: "Mike Chen",
    price: 12.99,
    genre: "Sci-Fi",
    rating: 4.6,
    cover: "📘",
    sold: true,
  },
  {
    id: 3,
    title: "Love in Paris",
    writer: "Emma Davis",
    price: 7.99,
    genre: "Romance",
    rating: 4.9,
    cover: "📙",
    sold: false,
  },
  {
    id: 4,
    title: "The Dark Manor",
    writer: "John Black",
    price: 8.99,
    genre: "Horror",
    rating: 4.5,
    cover: "📕",
    sold: true,
  },
  {
    id: 5,
    title: "Dragon's Quest",
    writer: "Lisa Wong",
    price: 11.99,
    genre: "Fantasy",
    rating: 4.7,
    cover: "📔",
    sold: false,
  },
  {
    id: 6,
    title: "Code Zero",
    writer: "Alex Kim",
    price: 10.99,
    genre: "Thriller",
    rating: 4.4,
    cover: "📓",
    sold: false,
  },
  {
    id: 7,
    title: "Ocean's Secret",
    writer: "Maria Silva",
    price: 6.99,
    genre: "Mystery",
    rating: 4.3,
    cover: "📒",
    sold: false,
  },
  {
    id: 8,
    title: "Heart Strings",
    writer: "Emma Davis",
    price: 5.99,
    genre: "Romance",
    rating: 4.8,
    cover: "📔",
    sold: true,
  },
  {
    id: 9,
    title: "Neon Dreams",
    writer: "Mike Chen",
    price: 14.99,
    genre: "Sci-Fi",
    rating: 4.9,
    cover: "📘",
    sold: false,
  },
];

const genres = [
  "All",
  "Fiction",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Fantasy",
  "Horror",
  "Thriller",
];

export default function BrowsePage() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter & Sort Logic
  let filtered = allEbooks.filter((ebook) => {
    const matchSearch =
      ebook.title.toLowerCase().includes(search.toLowerCase()) ||
      ebook.writer.toLowerCase().includes(search.toLowerCase());
    const matchGenre = genre === "All" || ebook.genre === genre;
    const matchMinPrice = !minPrice || ebook.price >= Number(minPrice);
    const matchMaxPrice = !maxPrice || ebook.price <= Number(maxPrice);
    return matchSearch && matchGenre && matchMinPrice && matchMaxPrice;
  });

  // Sort
  if (sort === "price-low") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-high") filtered.sort((a, b) => b.price - a.price);

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedEbooks = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Browse Ebooks</h1>
          <p className="text-gray-500 mt-1">Discover your next favorite read</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or writer..."
              className="input input-bordered w-full pl-10 bg-white"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Sort */}
          <select
            className="select select-bordered bg-white"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
            {showFilters && <X className="w-4 h-4" />}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="bg-white rounded-xl p-4 mb-6 border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Genre Filter */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Genre
                </label>
                <div className="flex flex-wrap gap-2">
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => {
                        setGenre(g);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                        genre === g
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="input input-bordered input-sm w-24"
                    value={minPrice}
                    onChange={(e) => {
                      setMinPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <span className="text-gray-400">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="input input-bordered input-sm w-24"
                    value={maxPrice}
                    onChange={(e) => {
                      setMaxPrice(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>

              {/* Clear Filters */}
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setGenre("All");
                    setMinPrice("");
                    setMaxPrice("");
                    setSort("newest");
                    setCurrentPage(1);
                  }}
                  className="btn btn-sm btn-ghost text-red-500"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Results Count */}
        <p className="text-sm text-gray-500 mb-4">
          {filtered.length} ebook{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Ebooks Grid */}
        {paginatedEbooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginatedEbooks.map((ebook, i) => (
              <motion.div
                key={ebook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link href={`/ebooks/${ebook.id}`}>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden relative">
                    {/* Sold Badge */}
                    {ebook.sold && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold z-10">
                        Sold
                      </div>
                    )}

                    {/* Cover */}
                    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 flex items-center justify-center">
                      <span className="text-5xl">{ebook.cover}</span>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900 truncate">
                        {ebook.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {ebook.writer}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="badge badge-xs bg-indigo-50 text-indigo-600 border-indigo-200 text-[10px]">
                          {ebook.genre}
                        </span>
                        <span className="font-bold text-indigo-600 text-sm">
                          ${ebook.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* No Results */
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">📭</span>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No ebooks found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="btn btn-sm btn-outline"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`btn btn-sm ${
                  currentPage === page ? "btn-primary" : "btn-outline"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="btn btn-sm btn-outline"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
