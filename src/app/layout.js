import Navbar from "@/components/shared/Navbar";
import "./globals.css";
import Footer from "@/components/shared/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Navbar/>
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
        </body>
    </html>
  );
}
