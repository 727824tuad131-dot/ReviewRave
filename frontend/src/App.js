import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./Login";
import Register from "./Register";

import Navbar from "./components/layout/Navbar";

import ProductList from "./components/product/ProductList";
import ReviewIngestForm from "./components/review/ReviewIngestForm";
import TicketList from "./components/ticket/TicketList";

import AdminDashboard from "./components/dashboard/AdminDashboard";

import NotificationStack from "./NotificationStack";


/* =========================================================
   PROTECTED ROUTE
   ========================================================= */

function ProtectedRoute({ children }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token && !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


/* =========================================================
   ROLE ROUTE
   ========================================================= */

function RoleRoute({ allowedRoles, children }) {
  const { role } = useSelector((state) => state.auth);

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}


/* =========================================================
   APP
   ========================================================= */

function App() {
  return (
    <BrowserRouter>

      <NotificationStack />

      <Routes>

        {/* =================================================
            PUBLIC ROUTES
           ================================================= */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =================================================
            HOME
           ================================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <div className="page-container">
                  <div className="welcome-section">
                    <h1>Welcome to ReviewRave</h1>

                    <p>
                      Monitor customer feedback, analyze sentiment,
                      generate insights and resolve customer issues.
                    </p>
                  </div>

                  <div className="dashboard-grid">

                    <div
                      className="dashboard-card"
                      onClick={() =>
                        (window.location.href = "/products")
                      }
                    >
                      <h2>Products</h2>
                      <p>
                        Manage and monitor your tracked products.
                      </p>
                    </div>

                    <div
                      className="dashboard-card"
                      onClick={() =>
                        (window.location.href = "/reviews")
                      }
                    >
                      <h2>Reviews</h2>
                      <p>
                        Ingest and monitor customer reviews.
                      </p>
                    </div>

                    <div
                      className="dashboard-card"
                      onClick={() =>
                        (window.location.href = "/insights")
                      }
                    >
                      <h2>Insights</h2>
                      <p>
                        Analyze customer sentiment and insights.
                      </p>
                    </div>

                    <div
                      className="dashboard-card"
                      onClick={() =>
                        (window.location.href = "/tickets")
                      }
                    >
                      <h2>Resolution Tickets</h2>
                      <p>
                        Track and resolve customer issues.
                      </p>
                    </div>

                  </div>
                </div>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            PRODUCTS
            BRAND_MANAGER + PLATFORM_ADMIN
           ================================================= */}

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "BRAND_MANAGER",
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <ProductList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            REVIEWS
           ================================================= */}

        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "BRAND_MANAGER",
                    "RESOLUTION_AGENT",
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <ReviewIngestForm />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            REVIEW INGEST
           ================================================= */}

        <Route
          path="/reviews/ingest"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "BRAND_MANAGER",
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <ReviewIngestForm />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            INSIGHTS
           =================================================
           
           No separate Insights component currently exists
           in your src structure, so ProductList is used
           temporarily to keep this route functional.
           
           ================================================= */}

        <Route
          path="/insights"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "BRAND_MANAGER",
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <ProductList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            TICKETS
            RESOLUTION_AGENT + PLATFORM_ADMIN
           ================================================= */}

        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "RESOLUTION_AGENT",
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <TicketList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            RESOLUTION CENTER
           ================================================= */}

        <Route
          path="/resolution"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "RESOLUTION_AGENT",
                  ]}
                >
                  <TicketList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            MY TASKS
           ================================================= */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "RESOLUTION_AGENT",
                  ]}
                >
                  <TicketList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN
           ================================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <AdminDashboard />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            ADMIN DASHBOARD ALIAS
           ================================================= */}

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={[
                    "PLATFORM_ADMIN",
                  ]}
                >
                  <AdminDashboard />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />


        {/* =================================================
            FALLBACK
           ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;