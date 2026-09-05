import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { logout } from "../../store/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const handleLogout = () => {
    dispatch(logout());

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="navbar">

      <div className="portal-navbar">

        {/* BRAND */}

        <Link
          to="/dashboard"
          className="portal-brand"
        >
          ReviewRave
        </Link>


        {/* NAVIGATION */}

        <nav className="portal-nav-links">

          {/* BRAND MANAGER */}

          {role === "BRAND_MANAGER" && (
            <>
              <Link
                to="/products"
                className={
                  isActive("/products")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Products
              </Link>

              <Link
                to="/reviews"
                className={
                  isActive("/reviews")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Reviews
              </Link>

              <Link
                to="/insights"
                className={
                  isActive("/insights")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Insights
              </Link>
            </>
          )}


          {/* RESOLUTION AGENT */}

          {role === "RESOLUTION_AGENT" && (
            <>
              <Link
                to="/resolution-center"
                className={
                  isActive("/resolution-center")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Resolution Center
              </Link>

              <Link
                to="/tasks"
                className={
                  isActive("/tasks")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Tasks
              </Link>
            </>
          )}


          {/* PLATFORM ADMIN */}

          {role === "PLATFORM_ADMIN" && (
            <>
              <Link
                to="/admin"
                className={
                  isActive("/admin")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Overview
              </Link>

              <Link
                to="/products"
                className={
                  isActive("/products")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Products
              </Link>

              <Link
                to="/tickets"
                className={
                  isActive("/tickets")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Tickets
              </Link>

              <Link
                to="/insights"
                className={
                  isActive("/insights")
                    ? "portal-nav-link active"
                    : "portal-nav-link"
                }
              >
                Insights
              </Link>
            </>
          )}

        </nav>


        {/* LOGOUT */}

        <button
          className="portal-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
};

export default Navbar;