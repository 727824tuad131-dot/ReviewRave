// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { logout } from "../../store/slices/authSlice";

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const role = localStorage.getItem("role");

//   const handleLogout = () => {
//     dispatch(logout());

//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("email");

//     navigate("/login");
//   };

//   const isActive = (path) => {
//     return location.pathname === path;
//   };

//   return (
//     <header className="navbar">

//       <div className="portal-navbar">

//         {/* BRAND */}

//         <Link
//           to="/dashboard"
//           className="portal-brand"
//         >
//           ReviewRave
//         </Link>


//         {/* NAVIGATION */}

//         <nav className="portal-nav-links">

//           {/* BRAND MANAGER */}

//           {role === "BRAND_MANAGER" && (
//             <>
//               <Link
//                 to="/products"
//                 className={
//                   isActive("/products")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Products
//               </Link>

//               <Link
//                 to="/reviews"
//                 className={
//                   isActive("/reviews")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Reviews
//               </Link>

//               <Link
//                 to="/insights"
//                 className={
//                   isActive("/insights")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Insights
//               </Link>
//             </>
//           )}


//           {/* RESOLUTION AGENT */}

//           {role === "RESOLUTION_AGENT" && (
//             <>
//               <Link
//                 to="/resolution-center"
//                 className={
//                   isActive("/resolution-center")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Resolution Center
//               </Link>

//               <Link
//                 to="/tasks"
//                 className={
//                   isActive("/tasks")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Tasks
//               </Link>
//             </>
//           )}


//           {/* PLATFORM ADMIN */}

//           {role === "PLATFORM_ADMIN" && (
//             <>
//               <Link
//                 to="/admin"
//                 className={
//                   isActive("/admin")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Overview
//               </Link>

//               <Link
//                 to="/products"
//                 className={
//                   isActive("/products")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Products
//               </Link>

//               <Link
//                 to="/tickets"
//                 className={
//                   isActive("/tickets")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Tickets
//               </Link>

//               <Link
//                 to="/insights"
//                 className={
//                   isActive("/insights")
//                     ? "portal-nav-link active"
//                     : "portal-nav-link"
//                 }
//               >
//                 Insights
//               </Link>
//             </>
//           )}

//         </nav>


//         {/* LOGOUT */}

//         <button
//           className="portal-logout"
//           onClick={handleLogout}
//         >
//           Logout
//         </button>

//       </div>

//     </header>
//   );
// };

// export default Navbar;


// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';
// import './Navbar.css';

// const Navbar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user, token } = useSelector((state) => state.auth || {});
//   const isAuthenticated = !!token || !!user || !!localStorage.getItem('token') || !!localStorage.getItem('reviewrave_token');
//   const role = user?.role || localStorage.getItem('role') || localStorage.getItem('r');

//   const handleLogout = () => {
//     localStorage.clear();
//     dispatch(logout());
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar" role="navigation" data-testid="navbar">
//       <Link to="/" className="navbar-brand">
//         ReviewRave
//       </Link>

//       <div className="navbar-links">
//         {role === 'BRAND_MANAGER' && (
//           <>
//             <Link to="/products" className="nav-link">
//               My Products
//             </Link>
//             <Link to="/insights" className="nav-link">
//               Insights
//             </Link>
//           </>
//         )}

//         {role === 'RESOLUTION_AGENT' && (
//           <>
//             <Link to="/tickets" className="nav-link">
//               Resolution Center
//             </Link>
//             <Link to="/tickets" className="nav-link">
//               My Tasks
//             </Link>
//           </>
//         )}

//         {role === 'PLATFORM_ADMIN' && (
//           <>
//             <Link to="/dashboard" className="nav-link">
//               Dashboard
//             </Link>
//             <Link to="/products" className="nav-link">
//               Products
//             </Link>
//             <Link to="/tickets" className="nav-link">
//               Tickets
//             </Link>
//             <Link to="/users" className="nav-link">
//               Users
//             </Link>
//           </>
//         )}

//         {isAuthenticated ? (
//           <button onClick={handleLogout} className="btn-logout" data-testid="logout-button">
//             Logout
//           </button>
//         ) : (
//           <>
//             <Link to="/login" className="btn-login">
//               Login
//             </Link>
//             <Link to="/register" className="btn-register">
//               Register
//             </Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");

  const email =
    localStorage.getItem("email") ||
    "user@reviewrave.com";

  const getRoleName = () => {
    if (role === "PLATFORM_ADMIN") {
      return "Platform Admin";
    }

    if (role === "RESOLUTION_AGENT") {
      return "Resolution Agent";
    }

    return "Brand Manager";
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    navigate("/login", { replace: true });
  };

  const goTo = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  /* =====================================================
     BRAND MANAGER MENU
     ===================================================== */

  const brandManagerMenu = [
    {
      icon: "⌂",
      label: "Dashboard",
      path: "/",
    },
    {
      icon: "⌁",
      label: "Sentiment Analysis",
      path: "/insights",
    },
    {
      icon: "▢",
      label: "Reviews",
      path: "/reviews",
    },
    {
      icon: "◇",
      label: "Tracked Products",
      path: "/products",
    },
    {
      icon: "▤",
      label: "Reports",
      path: "/tickets",
    },
    {
      icon: "⚙",
      label: "Settings",
      path: "/settings",
    },
  ];

  /* =====================================================
     RESOLUTION AGENT MENU
     ===================================================== */

  const resolutionAgentMenu = [
    {
      icon: "⌂",
      label: "Dashboard",
      path: "/",
    },
    {
      icon: "▤",
      label: "Resolution Tickets",
      path: "/tickets",
    },
  ];

  /* =====================================================
     PLATFORM ADMIN MENU
     ===================================================== */

  const platformAdminMenu = [
    {
      icon: "⌂",
      label: "Dashboard",
      path: "/",
    },
    {
      icon: "♙",
      label: "Users",
      path: "/admin",
    },
    {
      icon: "◇",
      label: "Tracked Products",
      path: "/products",
    },
    {
      icon: "▤",
      label: "Tickets",
      path: "/tickets",
    },
    {
      icon: "⌁",
      label: "Insights",
      path: "/insights",
    },
  ];

  let menu = brandManagerMenu;

  if (role === "RESOLUTION_AGENT") {
    menu = resolutionAgentMenu;
  }

  if (role === "PLATFORM_ADMIN") {
    menu = platformAdminMenu;
  }

  return (
    <header className="rr-header">

      {/* =================================================
          TOP BRAND HEADER
          ================================================= */}

      <div className="rr-topbar">

        <div
          className="rr-brand"
          onClick={() => goTo("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              goTo("/");
            }
          }}
        >

          <div className="rr-logo-mark">
            R
          </div>

          <div className="rr-brand-text">

            <div className="rr-brand-name">
              ReviewRave
            </div>

            <div className="rr-brand-subtitle">
              SOCIAL SENTIMENT PLATFORM
            </div>

          </div>

        </div>


        {/* =================================================
            USER SECTION
            ================================================= */}

        <div className="rr-user-area">

          <button
            type="button"
            className="rr-notification"
            aria-label="Notifications"
            title="Notifications"
          >
            ♧
            <span className="notification-dot"></span>
          </button>

          <div className="rr-avatar">
            {email.charAt(0).toUpperCase()}
          </div>

          <div className="rr-user-details">

            <strong>
              {email.split("@")[0]}
            </strong>

            <span>
              {getRoleName()}
            </span>

          </div>

          <button
            type="button"
            className="rr-user-arrow"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
          >
            ⌄
          </button>

        </div>

      </div>


      {/* =================================================
          NAVIGATION
          ================================================= */}

      <nav
        className="rr-navigation"
        aria-label="Main navigation"
      >

        <div className="rr-navigation-inner">

          {menu.map((item) => (

            <button
              key={item.path}
              type="button"
              className={`rr-nav-item ${
                isActive(item.path)
                  ? "active"
                  : ""
              }`}
              onClick={() => goTo(item.path)}
            >

              <span className="rr-nav-icon">
                {item.icon}
              </span>

              <span>
                {item.label}
              </span>

            </button>

          ))}

        </div>

      </nav>

    </header>
  );
};

export default Navbar;