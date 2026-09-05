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

  // If user is not logged in → go to Register page
  if (!token) {
    return <Navigate to="/register" replace />;
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

  // If user is not logged in → go to Register page
  if (!token) {
    return <Navigate to="/register" replace />;
  }

  // If user doesn't have permission → go home
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

        {/* ================================================
            PUBLIC ROUTES
        ================================================= */}

        {/* DEFAULT PAGE → REGISTER PAGE */}
        <Route
          path="/"
          element={<Navigate to="/register" replace />}
        />

        {/* REGISTER PAGE */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* LOGIN PAGE */}
        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================================================
            PROTECTED ROUTES
        ================================================= */}

        <Route element={<ProtectedRoute />}>

          {/* HOME AFTER LOGIN */}
          <Route
            path="/dashboard"
            element={<Home />}
          />


          {/* PRODUCTS */}

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


          {/* REVIEWS */}

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


          {/* INSIGHTS */}

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


          {/* TICKETS */}

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


          {/* TASKS */}

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


          {/* RESOLUTION CENTER */}

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


          {/* ADMIN */}

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


        {/* ================================================
            ANY UNKNOWN PAGE → REGISTER
        ================================================= */}

        <Route
          path="*"
          element={<Navigate to="/register" replace />}
        />

      </Routes>
    </BrowserRouter>
  );
}


export default App;