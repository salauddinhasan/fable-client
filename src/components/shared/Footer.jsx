 
 import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* ===== গ্রিড লেআউট ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* ===== কোম্পানি সম্পর্কে ===== */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">Fable</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover & Read Original Ebooks. Connect with talented writers and 
              explore a world of stories.
            </p>
          </div>

          {/* ===== দ্রুত লিংক ===== */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-indigo-400 transition duration-300">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== সোশ্যাল মিডিয়া ===== */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition duration-300"
                aria-label="Facebook"
              >
                <FaFacebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition duration-300"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition duration-300"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-indigo-600 p-3 rounded-full transition duration-300"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* ===== নিউজলেটার ===== */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">
              Subscribe to get updates on new ebooks and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-500 transition duration-300"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ===== কপিরাইট ===== */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-indigo-400">Fable</span>. 
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;