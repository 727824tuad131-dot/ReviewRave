import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Navbar />

      <main className="dashboard-content">
        {/* Header */}
        <section className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">PLATFORM ADMIN</p>
            <h1>Admin Dashboard</h1>
            <p className="dashboard-subtitle">
              Monitor products, sentiment insights, reviews, and resolution
              activities from one place.
            </p>
          </div>

          <div className="dashboard-date">
            <span>●</span>
            System Online
          </div>
        </section>

        {/* Statistics */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">▣</div>
            <div>
              <p>Total Products</p>
              <h2>24</h2>
              <span className="stat-positive">+12% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">◉</div>
            <div>
              <p>Total Reviews</p>
              <h2>1,248</h2>
              <span className="stat-positive">+18% this month</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">★</div>
            <div>
              <p>Average Sentiment</p>
              <h2>78%</h2>
              <span className="stat-positive">Positive</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">!</div>
            <div>
              <p>Open Tickets</p>
              <h2>37</h2>
              <span className="stat-warning">Needs attention</span>
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <section className="dashboard-grid">
          {/* Sentiment Overview */}
          <div className="dashboard-panel sentiment-panel">
            <div className="panel-header">
              <div>
                <h2>Sentiment Overview</h2>
                <p>Customer feedback distribution</p>
              </div>

              <select className="dashboard-select">
                <option>Last 30 Days</option>
                <option>Last 7 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div className="sentiment-content">
              <div className="sentiment-circle">
                <div className="circle-inner">
                  <strong>78%</strong>
                  <span>Positive</span>
                </div>
              </div>

              <div className="sentiment-list">
                <div className="sentiment-item">
                  <span className="sentiment-dot positive"></span>
                  <div>
                    <strong>Positive</strong>
                    <small>974 reviews</small>
                  </div>
                  <b>78%</b>
                </div>

                <div className="sentiment-item">
                  <span className="sentiment-dot neutral"></span>
                  <div>
                    <strong>Neutral</strong>
                    <small>174 reviews</small>
                  </div>
                  <b>14%</b>
                </div>

                <div className="sentiment-item">
                  <span className="sentiment-dot negative"></span>
                  <div>
                    <strong>Negative</strong>
                    <small>100 reviews</small>
                  </div>
                  <b>8%</b>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Quick Actions</h2>
                <p>Manage your platform</p>
              </div>
            </div>

            <div className="quick-actions">
              <Link to="/products" className="quick-action">
                <span className="action-icon">▣</span>
                <div>
                  <strong>Manage Products</strong>
                  <small>Add, edit or remove products</small>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/insights" className="quick-action">
                <span className="action-icon">◒</span>
                <div>
                  <strong>View Insights</strong>
                  <small>Analyze customer sentiment</small>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/tickets" className="quick-action">
                <span className="action-icon">!</span>
                <div>
                  <strong>Resolution Tickets</strong>
                  <small>Review customer issues</small>
                </div>
                <span className="arrow">→</span>
              </Link>

              <Link to="/admin" className="quick-action">
                <span className="action-icon">⚙</span>
                <div>
                  <strong>Administration</strong>
                  <small>Manage platform users</small>
                </div>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom Grid */}
        <section className="bottom-grid">
          {/* Recent Activity */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Recent Activity</h2>
                <p>Latest platform activities</p>
              </div>

              <button className="view-all-btn">View All</button>
            </div>

            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">✓</div>
                <div className="activity-info">
                  <strong>New review analyzed</strong>
                  <span>Product sentiment analysis completed</span>
                  <small>5 minutes ago</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon">+</div>
                <div className="activity-info">
                  <strong>New product added</strong>
                  <span>Product was added to monitoring</span>
                  <small>25 minutes ago</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon warning-icon">!</div>
                <div className="activity-info">
                  <strong>Resolution ticket created</strong>
                  <span>A critical issue requires attention</span>
                  <small>1 hour ago</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon">✓</div>
                <div className="activity-info">
                  <strong>Ticket resolved</strong>
                  <span>Customer issue successfully resolved</span>
                  <small>2 hours ago</small>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Health */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h2>Platform Health</h2>
                <p>Current system status</p>
              </div>
            </div>

            <div className="health-list">
              <div className="health-item">
                <div>
                  <strong>API Service</strong>
                  <span>Backend connectivity</span>
                </div>
                <div className="health-status">
                  <i></i>
                  Operational
                </div>
              </div>

              <div className="health-item">
                <div>
                  <strong>Sentiment Engine</strong>
                  <span>Analysis service</span>
                </div>
                <div className="health-status">
                  <i></i>
                  Operational
                </div>
              </div>

              <div className="health-item">
                <div>
                  <strong>Database</strong>
                  <span>MySQL connection</span>
                </div>
                <div className="health-status">
                  <i></i>
                  Operational
                </div>
              </div>

              <div className="health-item">
                <div>
                  <strong>Review Processing</strong>
                  <span>Review ingestion</span>
                </div>
                <div className="health-status">
                  <i></i>
                  Operational
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;