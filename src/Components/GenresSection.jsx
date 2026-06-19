// components/GenresSection.jsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const genres = [
  { name: "Fiction", icon: "📚", color: "from-blue-400 to-blue-600" },
  { name: "Mystery", icon: "🔍", color: "from-purple-400 to-purple-600" },
  { name: "Romance", icon: "💕", color: "from-pink-400 to-pink-600" },
  { name: "Sci-Fi", icon: "🚀", color: "from-indigo-400 to-indigo-600" },
  { name: "Fantasy", icon: "🧙", color: "from-amber-400 to-amber-600" },
  { name: "Horror", icon: "👻", color: "from-red-400 to-red-600" },
  { name: "Thriller", icon: "🎯", color: "from-teal-400 to-teal-600" },
  { name: "Poetry", icon: "🎭", color: "from-rose-400 to-rose-600" },
];

export default function GenresSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Explore <span className="text-indigo-600">Genres</span>
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {genres.map((genre, i) => (
            <motion.div
              key={genre.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link
                href={`/browse?genre=${genre.name}`}
                className={`block p-6 rounded-xl bg-gradient-to-br ${genre.color} text-white text-center shadow-lg hover:shadow-xl transition-shadow`}
              >
                <span className="text-3xl block mb-2">{genre.icon}</span>
                <span className="font-semibold">{genre.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
