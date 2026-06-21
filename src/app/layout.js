 


import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import "./globals.css";

export const metadata = {
  title: "Fable - Ebook Sharing Platform",
  description: "Discover & Read Original Ebooks",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}