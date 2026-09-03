import React from "react";
import "./Navbar.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  logout
} from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const role = user?.role;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Brand */}
      <Link
        to="/"
        className="logo"
      >
        <span className="logo-mark">
          RR
        </span>

        <span className="logo-text">
          ReviewRave
        </span>
      </Link>

      {/* Navigation */}
      <div className="nav-links">

        <Link
          to="/"
          className="nav-link"
        >
          <span className="nav-icon">⌂</span>
          <span>Dashboard</span>
        </Link>

        {/* Brand Manager */}
        {role === "BRAND_MANAGER" && (
          <>
            <Link
              to="/products"
              className="nav-link"
            >
              <span className="nav-icon">▣</span>
              <span>My Products</span>
            </Link>

            <Link
              to="/insights"
              className="nav-link"
            >
              <span className="nav-icon">◈</span>
              <span>Insights</span>
            </Link>
          </>
        )}

        {/* Resolution Agent */}
        {role === "RESOLUTION_AGENT" && (
          <>
            <Link
              to="/tickets"
              className="nav-link"
            >
              <span className="nav-icon">✓</span>
              <span>Resolution Center</span>
            </Link>

            <Link
              to="/tickets"
              className="nav-link"
            >
              <span className="nav-icon">▤</span>
              <span>My Tasks</span>
            </Link>
          </>
        )}

        {/* Platform Admin */}
        {role === "PLATFORM_ADMIN" && (
          <>
            <Link
              to="/products"
              className="nav-link"
            >
              <span className="nav-icon">▣</span>
              <span>Products</span>
            </Link>

            <Link
              to="/insights"
              className="nav-link"
            >
              <span className="nav-icon">◈</span>
              <span>Insights</span>
            </Link>

            <Link
              to="/tickets"
              className="nav-link"
            >
              <span className="nav-icon">✓</span>
              <span>Tickets</span>
            </Link>

            <Link
              to="/admin"
              className="nav-link"
            >
              <span className="nav-icon">⚙</span>
              <span>Admin</span>
            </Link>
          </>
        )}

        {/* User Section */}
        <div className="nav-user">

          <div className="user-avatar">
            {user?.firstName
              ? user.firstName.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div className="user-info">
            <span className="user-name">
              {user?.firstName || "User"}
            </span>

            <span className="user-role">
              {role
                ? role.replace(/_/g, " ")
                : ""}
            </span>
          </div>

        </div>

        {/* Logout */}
        <button
          className="logout-btn"
          onClick={handleLogout}
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
  );
};

export default Navbar;