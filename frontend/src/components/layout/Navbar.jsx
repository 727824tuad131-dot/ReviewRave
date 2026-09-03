import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);

  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  const getRoleName = () => {
    switch (role) {
      case "BRAND_MANAGER":
        return "Brand Manager";

      case "RESOLUTION_AGENT":
        return "Resolution Agent";

      case "PLATFORM_ADMIN":
        return "Platform Admin";

      default:
        return "User";
    }
  };

  const getInitial = () => {
    if (!email) return "U";

    return email
      .charAt(0)
      .toUpperCase();
  };

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    navigate("/login");
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <header className="navbar">
      {/* BRAND */}
      <Link
        to="/"
        className="navbar-brand"
        onClick={closeMobileMenu}
      >
        <div className="brand-logo">
          <span className="brand-logo-mark">
            R
          </span>
        </div>

        <div className="brand-text">
          <span className="brand-name">
            ReviewRave
          </span>

          <span className="brand-tagline">
            Customer Intelligence
          </span>
        </div>
      </Link>

      {/* MOBILE MENU */}
      <button
        type="button"
        className={`mobile-menu-button ${
          mobileOpen ? "active" : ""
        }`}
        onClick={() =>
          setMobileOpen(!mobileOpen)
        }
        aria-label="Toggle navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* NAVIGATION */}
      <nav
        className={`navbar-content ${
          mobileOpen ? "mobile-open" : ""
        }`}
      >
        <div className="navbar-links">
          {/* BRAND MANAGER */}
          {role === "BRAND_MANAGER" && (
            <>
              <Link
                to="/products"
                className={`nav-link ${
                  isActive("/products")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ▦
                </span>

                <span>
                  My Products
                </span>
              </Link>

              <Link
                to="/insights"
                className={`nav-link ${
                  isActive("/insights")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ◔
                </span>

                <span>
                  Insights
                </span>
              </Link>

              <Link
                to="/reviews"
                className={`nav-link ${
                  isActive("/reviews")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ✦
                </span>

                <span>
                  Submit Review
                </span>
              </Link>
            </>
          )}

          {/* RESOLUTION AGENT */}
          {role === "RESOLUTION_AGENT" && (
            <>
              <Link
                to="/resolution-center"
                className={`nav-link ${
                  isActive(
                    "/resolution-center"
                  )
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ◎
                </span>

                <span>
                  Resolution Center
                </span>
              </Link>

              <Link
                to="/tasks"
                className={`nav-link ${
                  isActive("/tasks")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ✓
                </span>

                <span>
                  My Tasks
                </span>
              </Link>
            </>
          )}

          {/* PLATFORM ADMIN */}
          {role === "PLATFORM_ADMIN" && (
            <>
              <Link
                to="/products"
                className={`nav-link ${
                  isActive("/products")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ▦
                </span>

                <span>
                  Products
                </span>
              </Link>

              <Link
                to="/insights"
                className={`nav-link ${
                  isActive("/insights")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ◔
                </span>

                <span>
                  Insights
                </span>
              </Link>

              <Link
                to="/tickets"
                className={`nav-link ${
                  isActive("/tickets")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ◇
                </span>

                <span>
                  Tickets
                </span>
              </Link>

              <Link
                to="/admin"
                className={`nav-link ${
                  isActive("/admin")
                    ? "active"
                    : ""
                }`}
                onClick={closeMobileMenu}
              >
                <span className="nav-icon">
                  ⚙
                </span>

                <span>
                  Admin
                </span>
              </Link>
            </>
          )}
        </div>

        {/* USER AREA */}
        <div className="navbar-user">
          <div className="user-info">
            <div className="user-avatar">
              {getInitial()}
            </div>

            <div className="user-details">
              <span className="user-role">
                {getRoleName()}
              </span>

              <span className="user-email">
                {email ||
                  "reviewrave user"}
              </span>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            title="Logout"
          >
            <span className="logout-icon">
              ↪
            </span>

            <span>
              Logout
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;