import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((state) => state.auth?.user);
  const role = useSelector((state) => state.auth?.role);

  const navigate = useNavigate();

  const username =
    user?.fullName ||
    user?.name ||
    user?.username ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    "Guest";

  return (
    <main className="home-page">

      {/* Hero Section */}
      <section className="hero-section reviewrave-hero">
        <div className="hero-overlay">

          <p className="hero-tagline">
            WELCOME TO REVIEWRAVE
          </p>

          <h1>
            Welcome back, <span>{username}</span>
          </h1>

          <p className="hero-description">
            Monitor customer feedback, analyze sentiment,
            generate insights, and resolve customer issues
            through one intelligent platform.
          </p>

          <div className="hero-actions">

            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Manage Products
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/insights")}
            >
              View Insights
            </button>

          </div>

        </div>
      </section>

      {/* Feature Cards */}
      <section className="stats-section">

        {/* Products */}
        <button
          className="stat-card"
          onClick={() => navigate("/products")}
        >
          <span className="stat-icon">📦</span>

          <div>
            <h3>Products</h3>
            <p>Manage tracked products</p>
          </div>
        </button>

        {/* Reviews */}
        <button
          className="stat-card"
          onClick={() => navigate("/reviews")}
        >
          <span className="stat-icon">💬</span>

          <div>
            <h3>Reviews</h3>
            <p>Ingest customer feedback</p>
          </div>
        </button>

        {/* Insights */}
        <button
          className="stat-card"
          onClick={() => navigate("/insights")}
        >
          <span className="stat-icon">📊</span>

          <div>
            <h3>Insights</h3>
            <p>Monitor sentiment analysis</p>
          </div>
        </button>

        {/* Tickets */}
        <button
          className="stat-card"
          onClick={() => navigate("/tickets")}
        >
            <span
  onClick={() => setCurrentView("home")}
>
  Home
</span>
          <span className="stat-icon">🎫</span>

          <div>
            <h3>Resolution Tickets</h3>
            <p>Track and resolve issues</p>
          </div>
        </button>

      </section>

      {/* Role Information */}
      <section className="role-section">

        <div className="role-card">

          <div className="role-card-icon">
            👤
          </div>

          <div>
            <span className="role-label">
              CURRENT ROLE
            </span>

            <h3>
              {role || user?.role || "Guest"}
            </h3>

            <p>
              Access ReviewRave features according to your
              assigned role and permissions.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Home;