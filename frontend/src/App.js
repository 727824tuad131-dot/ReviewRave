import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Authentication
import Login from "./Login";
import Register from "./Register";

// Layout
import Navbar from "./components/layout/Navbar";

// Home
import Home from "./Home";

// Product
import ProductList from "./components/product/ProductList";

// Review
import ReviewIngestForm from "./components/review/ReviewIngestForm";

// Ticket
import TicketList from "./components/ticket/TicketList";

// Dashboard
import AdminDashboard from "./components/dashboard/AdminDashboard";

// Common
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
   ROLE BASED ROUTE
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

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* =================================================
            HOME
        ================================================= */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <Home />
              </>
            </ProtectedRoute>
          }
        />

        {/* =================================================
            PRODUCTS
            Brand Manager + Platform Admin
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
            Review Ingestion
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
            Explicit route for review ingestion
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
            Resolution Agent + Platform Admin
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
                  allowedRoles={["RESOLUTION_AGENT"]}
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
                  allowedRoles={["RESOLUTION_AGENT"]}
                >
                  <TicketList />
                </RoleRoute>
              </>
            </ProtectedRoute>
          }
        />

        {/* =================================================
            ADMIN DASHBOARD
        ================================================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <>
                <Navbar />

                <RoleRoute
                  allowedRoles={["PLATFORM_ADMIN"]}
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
                  allowedRoles={["PLATFORM_ADMIN"]}
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
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;