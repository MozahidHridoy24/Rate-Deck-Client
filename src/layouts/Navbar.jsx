import { Link, NavLink, useNavigate } from "react-router";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
} from "react-icons/fa";
import { use } from "react";
import { AuthContext } from "../contexts/AuthContext/AuthContext";

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
        <NavLink to="/" className="font-medium">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/services" className="font-medium">
          Services
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-service" className="font-medium">
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-services" className="font-medium">
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-reviews" className="font-medium">
              My Reviews
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 md:px-8 sticky top-0 z-50">
      {/* Logo */}
      <div className="navbar-start">
        <Link to="/" className="text-xl font-bold text-primary">
          RateDeck
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">{navLinks}</ul>
      </div>

      {/* Right Section */}
      <div className="navbar-end gap-3">
        {user ? (
          <div className="flex items-center gap-3">
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
              className="btn btn-sm btn-outline flex items-center gap-1"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              to="/login"
              className="btn btn-sm btn-outline flex items-center gap-1"
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
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <FaBars className="text-xl" />
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
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
                <Link to="/login" className="flex items-center gap-1">
                  <FaSignInAlt /> Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="flex items-center gap-1">
                  <FaUserPlus /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
