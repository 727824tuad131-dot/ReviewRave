import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import Login from "./Login";
import Register from "./Register";

import Navbar from "./components/layout/Navbar";
import NotificationStack from "./NotificationStack";

import ProductList from "./components/product/ProductList";
import ReviewIngestForm from "./components/review/ReviewIngestForm";
import TicketList from "./components/ticket/TicketList";
import AdminDashboard from "./components/dashboard/AdminDashboard";

/* -------------------------------------------------------
   Protected Route
------------------------------------------------------- */

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <NotificationStack />
    </>
  );
};

/* -------------------------------------------------------
   Role Based Route
------------------------------------------------------- */

const RoleRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* -------------------------------------------------------
   Home Dashboard
------------------------------------------------------- */

const Home = () => {
  const role = localStorage.getItem("role");

  if (role === "PLATFORM_ADMIN") {
    return <AdminDashboard />;
  }

  if (role === "RESOLUTION_AGENT") {
    return <TicketList />;
  }

  return <ProductList />;
};

/* -------------------------------------------------------
   App
------------------------------------------------------- */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />


        {/* ================= PROTECTED ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          {/* Home */}
          <Route path="/" element={<Home />} />


          {/* ---------------- PRODUCTS ---------------- */}

          <Route
            path="/products"
            element={
              <RoleRoute
                allowedRoles={[
                  "BRAND_MANAGER",
                  "PLATFORM_ADMIN",
                ]}
              >
                <ProductList />
              </RoleRoute>
            }
          />


          {/* ---------------- REVIEWS ---------------- */}

          <Route
            path="/reviews"
            element={
              <RoleRoute
                allowedRoles={[
                  "BRAND_MANAGER",
                ]}
              >
                <ReviewIngestForm />
              </RoleRoute>
            }
          />


          {/* ---------------- INSIGHTS ---------------- */}

          <Route
            path="/insights"
            element={
              <RoleRoute
                allowedRoles={[
                  "BRAND_MANAGER",
                  "PLATFORM_ADMIN",
                ]}
              >
                <ProductList />
              </RoleRoute>
            }
          />


          {/* ---------------- TICKETS ---------------- */}

          <Route
            path="/tickets"
            element={
              <RoleRoute
                allowedRoles={[
                  "RESOLUTION_AGENT",
                  "PLATFORM_ADMIN",
                  "BRAND_MANAGER",
                ]}
              >
                <TicketList />
              </RoleRoute>
            }
          />


          {/* Agent Tasks */}

          <Route
            path="/tasks"
            element={
              <RoleRoute
                allowedRoles={[
                  "RESOLUTION_AGENT",
                ]}
              >
                <TicketList />
              </RoleRoute>
            }
          />


          {/* Resolution Center */}

          <Route
            path="/resolution-center"
            element={
              <RoleRoute
                allowedRoles={[
                  "RESOLUTION_AGENT",
                ]}
              >
                <TicketList />
              </RoleRoute>
            }
          />


          {/* ---------------- ADMIN ---------------- */}

          <Route
            path="/admin"
            element={
              <RoleRoute
                allowedRoles={[
                  "PLATFORM_ADMIN",
                ]}
              >
                <AdminDashboard />
              </RoleRoute>
            }
          />

        </Route>


        {/* ================= FALLBACK ================= */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;