"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import "./globals.css";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <html lang="en" data-theme="light" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {!isDashboard && <Navbar />}
        <main className="flex-1">{children}</main>
        {!isDashboard && <Footer />}
      </body>
    </html>
  );
}
