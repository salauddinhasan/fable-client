"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Star, Eye } from "lucide-react";

const ebooks = [
  {
    id: 1,
    title: "The Midnight Garden",
    writer: "Sarah Johnson",
    price: 9.99,
    rating: 4.8,
    readers: 2340,
    cover: "📗",
    genre: "Fiction",
  },
  {
    id: 2,
    title: "Stars Beyond",
    writer: "Mike Chen",
    price: 12.99,
    rating: 4.6,
    readers: 1890,
    cover: "📘",
    genre: "Sci-Fi",
  },
  {
    id: 3,
    title: "Love in Paris",
    writer: "Emma Davis",
    price: 7.99,
    rating: 4.9,
    readers: 3200,
    cover: "📙",
    genre: "Romance",
  },
  {
    id: 4,
    title: "The Dark Manor",
    writer: "John Black",
    price: 8.99,
    rating: 4.5,
    readers: 1560,
    cover: "📕",
    genre: "Horror",
  },
  {
    id: 5,
    title: "Dragon's Quest",
    writer: "Lisa Wong",
    price: 11.99,
    rating: 4.7,
    readers: 2100,
    cover: "📔",
    genre: "Fantasy",
  },
  {
    id: 6,
    title: "Code Zero",
    writer: "Alex Kim",
    price: 10.99,
    rating: 4.4,
    readers: 980,
    cover: "📓",
    genre: "Thriller",
  },
];

export default function FeaturedEbooksSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-indigo-600 font-semibold text-sm uppercase tracking-wider"
          >
            ✦ Curated Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mt-2"
          >
            Featured <span className="text-indigo-600">Ebooks</span>
          </motion.h2>
          <p className="text-gray-500 mt-3 max-w-md mx-auto">
            Handpicked stories from talented writers around the world
          </p>
        </div>

        {/* Ebooks Grid: 4 cards per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ebooks.slice(0, 4).map((ebook, i) => (
            <motion.div
              key={ebook.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/ebooks/${ebook.id}`}>
                <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Cover */}
                  <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-8 flex items-center justify-center relative">
                    <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                      {ebook.cover}
                    </span>
                    <div className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 transition-all duration-300 flex items-center justify-center">
                      <Eye className="w-10 h-10 text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 flex-grow">
                    <h3 className="font-semibold text-base text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                      {ebook.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{ebook.writer}</p>

                    <div className="flex items-center gap-1 mt-3">
                      <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">
                        {ebook.rating}
                      </span>
                      <span className="text-xs text-gray-400 ml-1">
                        ({ebook.readers})
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                      <span className="badge badge-sm bg-indigo-50 text-indigo-600 border-indigo-200">
                        {ebook.genre}
                      </span>
                      <span className="text-indigo-600 font-bold text-lg">
                        ${ebook.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/browse"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200"
          >
            Browse All Ebooks
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
