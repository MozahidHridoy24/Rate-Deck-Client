import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content border-t border-primary">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand Info */}
        <div>
          <h2 className="text-3xl font-extrabold text-primary">
            Rate<span className="text-secondary">Deck</span>
          </h2>
          <p className="mt-4  leading-relaxed max-w-sm">
            Your trusted service review system. Discover and rate top services
            with confidence.
          </p>
          <p className="mt-4  font-medium">
            Email:{" "}
            <a
              href="mailto:hridoy1407@gmail.com"
              className="text-primary hover:text-secondary underline"
            >
              hridoy1407@gmail.com
            </a>
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="footer-title text-lg font-semibold mb-4 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className=" hover:text-secondary transition-colors duration-300 font-medium"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-services"
                className=" hover:text-secondary transition-colors duration-300 font-medium"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/my-reviews"
                className=" hover:text-secondary transition-colors duration-300 font-medium"
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className=" hover:text-secondary transition-colors duration-300 font-medium"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title text-lg font-semibold mb-4 text-primary">
            Follow Us
          </h3>
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/mujahidulislam.hridoy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-600 text-2xl transition-colors duration-300"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://linkedin.com/in/mozahidul-islam-hridoy-118576228"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-blue-500 text-2xl transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/mozahid_hridoy?igsh=MWNucW5pNXh6M2FoZA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-pink-600 text-2xl transition-colors duration-300"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/MozahidHridoy24"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-gray-800 text-2xl transition-colors duration-300"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-primary py-6 text-center text-gray-500 text-sm select-none">
        © {new Date().getFullYear()} RateDeck. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
