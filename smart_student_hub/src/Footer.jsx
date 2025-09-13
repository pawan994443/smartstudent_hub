import { Mail, Phone, MapPin } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1e3150] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo and description */}
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <span className="bg-blue-600 p-2 rounded-lg">🎓</span>
            Smart Student Hub
          </h2>
          <p className="mt-4 text-sm text-gray-300">
            Empowering students with verified digital portfolios and enabling
            institutions to track academic excellence efficiently.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-blue-400 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-blue-400 transition"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>

        {/* Product Section */}
        <div>
          <h3 className="font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-400">Dashboard</a></li>
            <li><a href="#" className="hover:text-blue-400">Portfolio</a></li>
            <li><a href="#" className="hover:text-blue-400">Analytics</a></li>
            <li><a href="#" className="hover:text-blue-400">Integrations</a></li>
          </ul>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="#" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            <li><a href="#" className="hover:text-blue-400">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400">Press</a></li>
            <li><a href="#" className="hover:text-blue-400">Partners</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@smartstudenthub.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +1 (555) 123-4567
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> 123 Education Street, Academic City, AC 12345
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
        <p>© 2024 Smart Student Hub. All rights reserved.</p>
        <div className="flex gap-6 mt-3 md:mt-0">
          <a href="#" className="hover:text-blue-400">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400">Terms of Service</a>
          <a href="#" className="hover:text-blue-400">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}