"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="w-full min-h-[65vh] bg-[#f3f1eb] flex items-center overflow-hidden relative py-12 px-6 sm:px-12 lg:px-20 select-none">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* ─── LEFT SIDE ─── */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-7">
          <div className="w-14 h-[3px] bg-[#4F46E5] rounded-full hidden lg:block" />

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#13131F] font-serif text-5xl sm:text-6xl lg:text-[64px] leading-[1.0] tracking-tight font-normal"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Discover & Read <br />
            <span className="text-[#4F46E5] font-bold">Original Ebooks</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#55555F] text-[15px] sm:text-base font-normal leading-relaxed max-w-sm"
          >
            Connect with fellow book lovers, discover new stories, and share
            your thoughts on the ebooks that move you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <Link
              href="/browse-ebooks"
              className="w-full sm:w-auto px-9 py-4 bg-[#13131F] hover:bg-slate-800 text-white text-sm font-bold rounded-full tracking-wide transition-all duration-300 shadow-md inline-block text-center"
            >
              Browse Ebooks
            </Link>
          </motion.div>
        </div>

        {/* ─── RIGHT SIDE ─── */}
        <div className="lg:col-span-7 relative w-full flex items-center justify-end min-h-[450px] sm:min-h-[58px]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full h-full max-w-[620px] relative flex justify-center items-center"
          >
            <Image
              src="/hero_Image.png"
              alt="Book Club Community Devices"
              width={500}
              height={500}
              className="w-full   object-contain select-none pointer-events-none drop-shadow-[-20px_25px_50px_rgba(0,0,0,0.15)]"
              priority="true"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
