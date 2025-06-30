import { Link, NavLink, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
} from "react-icons/fa";
import { AuthContext } from "../contexts/AuthContext/AuthContext";
import logo from "../assets/logo.png";
import { use } from "react";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = use(AuthContext);
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `font-medium ${isActive ? "underline text-secondary" : ""}`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-services"
          className={({ isActive }) =>
            `font-medium ${isActive ? "underline text-secondary" : ""}`
          }
        >
          All Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/add-service"
              className={({ isActive }) =>
                `font-medium ${isActive ? "underline text-secondary" : ""}`
              }
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-services"
              className={({ isActive }) =>
                `font-medium ${isActive ? "underline text-secondary" : ""}`
              }
            >
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-reviews"
              className={({ isActive }) =>
                `font-medium ${isActive ? "underline text-secondary" : ""}`
              }
            >
              My Reviews
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar shadow-lg px-4 md:px-8 sticky top-0 left-0 z-30 bg-base-100">
      {/* Logo */}
      <div className="navbar-start">
        <Link
          to="/"
          className="flex items-center text-2xl font-extrabold text-primary"
        >
          <img
            src={logo}
            alt="RateDeck Logo"
            className="w-8 h-8 object-contain m-2"
          />
          Rate<span className="text-secondary">Deck</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden md:flex">
        <ul className=" menu-horizontal px-1 gap-5 text-primary">{navLinks}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-3">
        <ThemeToggle></ThemeToggle>

        {user ? (
          <div className="flex items-center gap-5">
            <div
              className="tooltip tooltip-bottom"
              data-tip={user.displayName || "User"}
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-10 h-10 rounded-full border"
                />
              ) : (
                <FaUserCircle className="text-3xl text-gray-500" />
              )}
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline text-primary hidden md:flex items-center gap-1 hover:bg-secondary hover:text-white"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex gap-2">
            <Link
              to="/login"
              className="btn btn-sm btn-outline text-primary flex items-center gap-1 hover:bg-secondary hover:text-white"
            >
              <FaSignInAlt /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm btn-primary flex items-center gap-1"
            >
              <FaUserPlus /> Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      <div className="dropdown dropdown-end md:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <FaBars className="text-xl text-primary" />
        </label>
        <ul
          tabIndex={0}
          className=" menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks}
          {user ? (
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1"
              >
                <FaSignOutAlt /> Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `flex items-center gap-1 font-medium ${
                      isActive ? "underline text-secondary" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `flex items-center gap-1 font-medium ${
                      isActive ? "underline text-secondary" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
