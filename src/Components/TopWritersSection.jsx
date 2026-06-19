// components/TopWritersSection.jsx
"use client";
import { motion } from "framer-motion";

const writers = [
  { name: "Sarah Johnson", avatar: "S", sales: 1230, genre: "Fiction" },
  { name: "Mike Chen", avatar: "M", sales: 980, genre: "Sci-Fi" },
  { name: "Emma Davis", avatar: "E", sales: 850, genre: "Romance" },
];

export default function TopWritersSection() {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-10"
        >
          Top <span className="text-indigo-600">Writers</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {writers.map((writer, i) => (
            <motion.div
              key={writer.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="card bg-base-100 shadow-lg"
            >
              <div className="card-body items-center text-center">
                <div className="w-20 h-20 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mb-3">
                  {writer.avatar}
                </div>
                <h3 className="font-bold text-lg">{writer.name}</h3>
                <p className="text-sm text-gray-500">{writer.genre}</p>
                <div className="badge badge-indigo badge-outline mt-2">
                  {writer.sales}+ Sales
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
