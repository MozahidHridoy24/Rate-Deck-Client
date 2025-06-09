import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-primary">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-primary">RateDeck</h2>
          <p className="mt-2 text-gray-500">
            Your trusted service review system. Discover and rate top services
            with confidence.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-2">
          <span className="footer-title">Quick Links</span>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/all-services" className="link link-hover">
            Services
          </Link>
          <Link to="/my-reviews" className="link link-hover">
            Reviews
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
        </div>

        {/* Social Links */}
        <div>
          <span className="footer-title">Follow Us</span>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-700 text-xl"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-sky-500 text-xl"
            >
              <FaTwitter />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-600 text-xl"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center py-4 border-t border-primary text-sm text-gray-500">
        © {new Date().getFullYear()} RateDeck. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
