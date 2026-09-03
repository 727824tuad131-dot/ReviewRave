import React from "react";

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
} from "../store/slices/authSlice";

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

      <Link
        to="/"
        className="logo"
      >
        ReviewRave
      </Link>

      <div className="nav-links">

        <Link to="/">
          Dashboard
        </Link>

        {role === "BRAND_MANAGER" && (
          <>
            <Link to="/products">
              My Products
            </Link>

            <Link to="/insights">
              Insights
            </Link>
          </>
        )}

        {role === "RESOLUTION_AGENT" && (
          <>
            <Link to="/tickets">
              Resolution Center
            </Link>

            <Link to="/tickets">
              My Tasks
            </Link>
          </>
        )}

        {role === "PLATFORM_ADMIN" && (
          <>
            <Link to="/products">
              Products
            </Link>

            <Link to="/insights">
              Insights
            </Link>

            <Link to="/tickets">
              Tickets
            </Link>

            <Link to="/admin">
              Admin
            </Link>
          </>
        )}

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;