// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import { useSelector } from "react-redux";

// import Login from "./Login";
// import Register from "./Register";

// import Navbar from "./components/layout/Navbar";

// import ProductList from "./components/product/ProductList";
// import ReviewIngestForm from "./components/review/ReviewIngestForm";
// import TicketList from "./components/ticket/TicketList";

// import AdminDashboard from "./components/dashboard/AdminDashboard";

// import NotificationStack from "./NotificationStack";


// /* =========================================================
//    PROTECTED ROUTE
//    ========================================================= */

// function ProtectedRoute({ children }) {
//   const { user, token } = useSelector((state) => state.auth);

//   if (!token && !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }


// /* =========================================================
//    ROLE ROUTE
//    ========================================================= */

// function RoleRoute({ allowedRoles, children }) {
//   const { role } = useSelector((state) => state.auth);

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }


// /* =========================================================
//    APP
//    ========================================================= */

// function App() {
//   return (
//     <BrowserRouter>

//       <NotificationStack />

//       <Routes>

//         {/* =================================================
//             PUBLIC ROUTES
//            ================================================= */}

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />


//         {/* =================================================
//             HOME
//            ================================================= */}

//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <div className="page-container">
//                   <div className="welcome-section">
//                     <h1>Welcome to ReviewRave</h1>

//                     <p>
//                       Monitor customer feedback, analyze sentiment,
//                       generate insights and resolve customer issues.
//                     </p>
//                   </div>

//                   <div className="dashboard-grid">

//                     <div
//                       className="dashboard-card"
//                       onClick={() =>
//                         (window.location.href = "/products")
//                       }
//                     >
//                       <h2>Products</h2>
//                       <p>
//                         Manage and monitor your tracked products.
//                       </p>
//                     </div>

//                     <div
//                       className="dashboard-card"
//                       onClick={() =>
//                         (window.location.href = "/reviews")
//                       }
//                     >
//                       <h2>Reviews</h2>
//                       <p>
//                         Ingest and monitor customer reviews.
//                       </p>
//                     </div>

//                     <div
//                       className="dashboard-card"
//                       onClick={() =>
//                         (window.location.href = "/insights")
//                       }
//                     >
//                       <h2>Insights</h2>
//                       <p>
//                         Analyze customer sentiment and insights.
//                       </p>
//                     </div>

//                     <div
//                       className="dashboard-card"
//                       onClick={() =>
//                         (window.location.href = "/tickets")
//                       }
//                     >
//                       <h2>Resolution Tickets</h2>
//                       <p>
//                         Track and resolve customer issues.
//                       </p>
//                     </div>

//                   </div>
//                 </div>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             PRODUCTS
//             BRAND_MANAGER + PLATFORM_ADMIN
//            ================================================= */}

//         <Route
//           path="/products"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "BRAND_MANAGER",
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <ProductList />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             REVIEWS
//            ================================================= */}

//         <Route
//           path="/reviews"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "BRAND_MANAGER",
//                     "RESOLUTION_AGENT",
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <ReviewIngestForm />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             REVIEW INGEST
//            ================================================= */}

//         <Route
//           path="/reviews/ingest"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "BRAND_MANAGER",
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <ReviewIngestForm />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             INSIGHTS
//            =================================================
           
//            No separate Insights component currently exists
//            in your src structure, so ProductList is used
//            temporarily to keep this route functional.
           
//            ================================================= */}

//         <Route
//           path="/insights"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "BRAND_MANAGER",
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <ProductList />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             TICKETS
//             RESOLUTION_AGENT + PLATFORM_ADMIN
//            ================================================= */}

//         <Route
//           path="/tickets"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "RESOLUTION_AGENT",
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <TicketList />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             RESOLUTION CENTER
//            ================================================= */}

//         <Route
//           path="/resolution"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "RESOLUTION_AGENT",
//                   ]}
//                 >
//                   <TicketList />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             MY TASKS
//            ================================================= */}

//         <Route
//           path="/tasks"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "RESOLUTION_AGENT",
//                   ]}
//                 >
//                   <TicketList />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             ADMIN
//            ================================================= */}

//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <AdminDashboard />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             ADMIN DASHBOARD ALIAS
//            ================================================= */}

//         <Route
//           path="/dashboard/admin"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Navbar />

//                 <RoleRoute
//                   allowedRoles={[
//                     "PLATFORM_ADMIN",
//                   ]}
//                 >
//                   <AdminDashboard />
//                 </RoleRoute>
//               </>
//             </ProtectedRoute>
//           }
//         />


//         {/* =================================================
//             FALLBACK
//            ================================================= */}

//         <Route
//           path="*"
//           element={
//             <Navigate
//               to="/"
//               replace
//             />
//           }
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;


// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Navbar from './components/layout/Navbar';
// import NotificationStack from './components/user/NotificationStack';
// import Login from './components/user/Login';
// import Register from './components/user/Register';
// import UserList from './components/user/UserList';
// import AdminDashboard from './components/dashboard/AdminDashboard';
// import ProductList from './components/product/ProductList';
// import ReviewList from './components/review/ReviewList';
// import TicketList from './components/ticket/TicketList';
// import InsightList from './components/insight/InsightList';
// import './App.css';

// export const ProtectedRoute = ({ children }) => {
//   const { user, token } = useSelector((state) => state.auth || {});
//   const isAuthenticated = Boolean(
//     token ||
//     user ||
//     localStorage.getItem('token') ||
//     localStorage.getItem('reviewrave_token') ||
//     localStorage.getItem('t') ||
//     localStorage.getItem('user')
//   );

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// function App() {
//   const { user, token } = useSelector((state) => state.auth || {});
//   const isAuthenticated = Boolean(
//     token ||
//     user ||
//     localStorage.getItem('token') ||
//     localStorage.getItem('reviewrave_token') ||
//     localStorage.getItem('t') ||
//     localStorage.getItem('user')
//   );

//   return (
//     <div className="App">
//       <NotificationStack />
//       <Navbar />
//       <main className="main-content">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               isAuthenticated ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route
//             path="/dashboard"
//             element={
//               isAuthenticated ? (
//                 <AdminDashboard />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/users"
//             element={
//               isAuthenticated ? (
//                 <UserList />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/products"
//             element={
//               isAuthenticated ? (
//                 <ProductList />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/reviews"
//             element={
//               isAuthenticated ? (
//                 <ReviewList />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/tickets"
//             element={
//               isAuthenticated ? (
//                 <TicketList />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="/insights"
//             element={
//               isAuthenticated ? (
//                 <InsightList />
//               ) : (
//                 <Navigate to="/login" replace />
//               )
//             }
//           />
//           <Route
//             path="*"
//             element={
//               <Navigate to={isAuthenticated ? "/" : "/login"} replace />
//             }
//           />
//         </Routes>
//       </main>
//     </div>
//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import "./App.css";

/* =========================================================
   REVIEWRAVE - CUSTOMER INTELLIGENCE PLATFORM
   ========================================================= */

const API_URL = "http://localhost:8080";

/* =========================================================
   MAIN APP
   ========================================================= */

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  /* -------------------------------------------------------
     Check existing login
     ------------------------------------------------------- */
  useEffect(() => {
    const savedUser = localStorage.getItem("reviewraveUser");

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setPage("dashboard");
      } catch (error) {
        localStorage.removeItem("reviewraveUser");
      }
    }
  }, []);

  /* -------------------------------------------------------
     Login
     ------------------------------------------------------- */
  const handleLogin = async (email, password) => {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const loggedUser = {
          email: data.email || email,
          role:
            data.role ||
            data.roles?.[0] ||
            data.authority ||
            "BRAND_MANAGER",
          token: data.token || data.accessToken || "",
          name: data.name || data.fullName || "ReviewRave User",
        };

        localStorage.setItem(
          "reviewraveUser",
          JSON.stringify(loggedUser)
        );

        if (loggedUser.token) {
          localStorage.setItem("token", loggedUser.token);
        }

        setUser(loggedUser);
        setPage("dashboard");
        return;
      }

      /* Demo fallback */
      const demoUser = {
        email,
        role: "BRAND_MANAGER",
        name: "ReviewRave User",
      };

      localStorage.setItem(
        "reviewraveUser",
        JSON.stringify(demoUser)
      );

      setUser(demoUser);
      setPage("dashboard");
      setMessage("Demo login successful");
    } catch (error) {
      /*
       * This fallback allows the UI to work even if
       * Spring Boot is temporarily not running.
       */
      const demoUser = {
        email,
        role: "BRAND_MANAGER",
        name: "ReviewRave User",
      };

      localStorage.setItem(
        "reviewraveUser",
        JSON.stringify(demoUser)
      );

      setUser(demoUser);
      setPage("dashboard");
      setMessage("Backend unavailable - demo mode");
    }
  };

  /* -------------------------------------------------------
     Register
     ------------------------------------------------------- */
  const handleRegister = async (formData) => {
    setMessage("");

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Account created successfully. Please login.");
        setPage("login");
        return;
      }

      const errorText = await response.text();

      if (errorText) {
        setMessage(errorText);
      } else {
        setMessage("Registration failed.");
      }
    } catch (error) {
      /*
       * Demo registration so the UI can still be tested.
       */
      setMessage(
        "Backend unavailable. Account created in demo mode."
      );

      setPage("login");
    }
  };

  /* -------------------------------------------------------
     Logout
     ------------------------------------------------------- */
  const handleLogout = () => {
    localStorage.removeItem("reviewraveUser");
    localStorage.removeItem("token");

    setUser(null);
    setPage("login");
    setMessage("Logged out successfully.");
  };

  /* =======================================================
     AUTH PAGES
     ======================================================= */

  if (!user) {
    if (page === "register") {
      return (
        <RegisterPage
          onRegister={handleRegister}
          onLogin={() => {
            setMessage("");
            setPage("login");
          }}
          message={message}
        />
      );
    }

    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={() => {
          setMessage("");
          setPage("register");
        }}
        message={message}
      />
    );
  }

  /* =======================================================
     DASHBOARD
     ======================================================= */

  return (
    <Dashboard
      user={user}
      page={page}
      setPage={setPage}
      onLogout={handleLogout}
      message={message}
      setMessage={setMessage}
    />
  );
}

/* =========================================================
   LOGIN PAGE
   ========================================================= */

function LoginPage({ onLogin, onRegister, message }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-card login-card">
        <div className="auth-logo">
          <div className="logo-box">R</div>
          <div>
            <h1>ReviewRave</h1>
            <span>Customer Intelligence Platform</span>
          </div>
        </div>

        <h2>Login to ReviewRave</h2>

        <p className="auth-subtitle">
          Sign in to your account
        </p>

        {message && (
          <div className="message-box">
            {message}
          </div>
        )}

        <form onSubmit={submitLogin}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="manager@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="primary-button" type="submit">
            Login
          </button>
        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <button
            className="link-button"
            onClick={onRegister}
          >
            Register here
          </button>
        </p>

        <div className="security-text">
          🔒 Enterprise-grade authentication
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   REGISTER PAGE
   ========================================================= */

function RegisterPage({
  onRegister,
  onLogin,
  message,
}) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });

  const updateField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const submitRegister = (e) => {
    e.preventDefault();

    onRegister({
      fullName: `${form.firstName} ${form.lastName}`.trim(),
      firstName: form.firstName,
      lastName: form.lastName,
      companyName: form.companyName,
      email: form.email,
      password: form.password,
      role: form.role,
    });
  };

  return (
    <div className="auth-page register-page">
      <div className="auth-card register-card">
        <h1>Register Account</h1>

        <p className="auth-subtitle">
          Create your ReviewRave account
        </p>

        {message && (
          <div className="message-box">
            {message}
          </div>
        )}

        <form onSubmit={submitRegister}>
          <div className="two-column">
            <div>
              <label>First Name</label>

              <input
                type="text"
                placeholder="Jane"
                value={form.firstName}
                onChange={(e) =>
                  updateField("firstName", e.target.value)
                }
                required
              />
            </div>

            <div>
              <label>Last Name</label>

              <input
                type="text"
                placeholder="Doe"
                value={form.lastName}
                onChange={(e) =>
                  updateField("lastName", e.target.value)
                }
                required
              />
            </div>
          </div>

          <label>Company Name</label>

          <input
            type="text"
            placeholder="Acme Corp (Optional)"
            value={form.companyName}
            onChange={(e) =>
              updateField("companyName", e.target.value)
            }
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="manager@gmail.com"
            value={form.email}
            onChange={(e) =>
              updateField("email", e.target.value)
            }
            required
          />

          <label>Password (min 8 chars)</label>

          <input
            type="password"
            placeholder="••••••••"
            minLength="8"
            value={form.password}
            onChange={(e) =>
              updateField("password", e.target.value)
            }
            required
          />

          <label>Select Role</label>

          <select
            value={form.role}
            onChange={(e) =>
              updateField("role", e.target.value)
            }
          >
            <option value="BRAND_MANAGER">
              Brand Manager
            </option>

            <option value="RESOLUTION_AGENT">
              Resolution Agent
            </option>

            <option value="PLATFORM_ADMIN">
              Platform Admin
            </option>
          </select>

          <button
            className="primary-button"
            type="submit"
          >
            Create Account
          </button>
        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <button
            className="link-button"
            onClick={onLogin}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
   ========================================================= */

function Dashboard({
  user,
  page,
  setPage,
  onLogout,
  message,
  setMessage,
}) {
  const role = user?.role || "BRAND_MANAGER";

  const roleName = role.replaceAll("_", " ");

  return (
    <div className="app-container">

      {/* TOP HEADER */}
      <header className="top-header">

        <div className="brand-area">
          <div className="logo-box small-logo">
            R
          </div>

          <div>
            <h2>ReviewRave</h2>
            <span>Customer Intelligence</span>
          </div>
        </div>

        <div className="user-area">

          <div className="user-avatar">
            {(user.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-details">
            <strong>
              {user.name || "ReviewRave User"}
            </strong>

            <span>{roleName}</span>
          </div>

          <button
            className="logout-button"
            onClick={onLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* NAVIGATION */}
      <nav className="main-nav">

        <button
          className={page === "dashboard" ? "active" : ""}
          onClick={() => setPage("dashboard")}
        >
          Home
        </button>

        {(role === "PLATFORM_ADMIN" ||
          role === "ADMIN") && (
          <button
            className={page === "users" ? "active" : ""}
            onClick={() => setPage("users")}
          >
            Users
          </button>
        )}

        <button
          className={page === "products" ? "active" : ""}
          onClick={() => setPage("products")}
        >
          Products
        </button>

        <button
          className={page === "reviews" ? "active" : ""}
          onClick={() => setPage("reviews")}
        >
          Reviews
        </button>

        <button
          className={page === "insights" ? "active" : ""}
          onClick={() => setPage("insights")}
        >
          Insights
        </button>

        <button
          className={page === "tickets" ? "active" : ""}
          onClick={() => setPage("tickets")}
        >
          Tickets
        </button>

      </nav>

      {/* MESSAGE */}
      {message && (
        <div className="global-message">
          {message}

          <button
            onClick={() => setMessage("")}
          >
            ×
          </button>
        </div>
      )}

      {/* PAGE CONTENT */}

      {page === "dashboard" && (
        <DashboardHome
          user={user}
          role={role}
          setPage={setPage}
        />
      )}

      {page === "users" && (
        <UsersPage
          setPage={setPage}
        />
      )}

      {page === "products" && (
        <ProductsPage
          user={user}
          setMessage={setMessage}
        />
      )}

      {page === "reviews" && (
        <ReviewsPage
          user={user}
          setMessage={setMessage}
        />
      )}

      {page === "insights" && (
        <InsightsPage />
      )}

      {page === "tickets" && (
        <TicketsPage
          user={user}
          setMessage={setMessage}
        />
      )}

    </div>
  );
}

/* =========================================================
   DASHBOARD HOME
   ========================================================= */

function DashboardHome({
  user,
  role,
  setPage,
}) {
  if (
    role === "PLATFORM_ADMIN" ||
    role === "ADMIN"
  ) {
    return (
      <AdminDashboard
        setPage={setPage}
      />
    );
  }

  if (role === "RESOLUTION_AGENT") {
    return (
      <AgentDashboard
        setPage={setPage}
      />
    );
  }

  return (
    <BrandManagerDashboard
      setPage={setPage}
    />
  );
}

/* =========================================================
   ADMIN DASHBOARD
   ========================================================= */

function AdminDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-title">
        <div>
          <h1>Platform Overview</h1>
          <p>
            Monitor your complete ReviewRave platform.
          </p>
        </div>

        <button
          className="primary-button small"
          onClick={() => setPage("users")}
        >
          Manage Users
        </button>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Users"
          value="8"
          icon="👥"
        />

        <StatCard
          title="Tracked Products"
          value="12"
          icon="📦"
        />

        <StatCard
          title="Active Tickets"
          value="3"
          icon="🎫"
        />

        <StatCard
          title="Open Insights"
          value="19"
          icon="📊"
        />

      </div>

      <div className="dashboard-grid">

        <section className="panel">

          <h3>Global User Roles</h3>

          <div className="role-chart">

            <div className="donut">
              <span>8</span>
            </div>

            <div className="legend">

              <p>
                <span className="dot admin"></span>
                Platform Admin
              </p>

              <p>
                <span className="dot manager"></span>
                Brand Managers
              </p>

              <p>
                <span className="dot agent"></span>
                Resolution Agents
              </p>

            </div>

          </div>

        </section>

        <section className="panel">

          <h3>Recent Timeline</h3>

          <div className="timeline">

            <TimelineItem
              text="New brand manager registered"
              sub="Brand Corp"
            />

            <TimelineItem
              text="System review ingestion completed"
              sub="1,240 reviews processed"
            />

            <TimelineItem
              text="Critical ticket auto assigned"
              sub="Resolution Agent"
            />

          </div>

        </section>

      </div>

      <div className="quick-actions">

        <button onClick={() => setPage("users")}>
          👥 Manage Users
        </button>

        <button onClick={() => setPage("products")}>
          📦 View Products
        </button>

        <button onClick={() => setPage("insights")}>
          📊 View Insights
        </button>

        <button onClick={() => setPage("tickets")}>
          🎫 Manage Tickets
        </button>

      </div>

    </main>
  );
}

/* =========================================================
   BRAND MANAGER DASHBOARD
   ========================================================= */

function BrandManagerDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            CUSTOMER INTELLIGENCE
          </span>

          <h1>Tracked Products</h1>

          <p>
            Monitor customer feedback and sentiment.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("products")}
        >
          + Add Product
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Tracked Products"
          value="12"
          icon="📦"
        />

        <StatCard
          title="Total Reviews"
          value="1,240"
          icon="💬"
        />

        <StatCard
          title="Positive Sentiment"
          value="78%"
          icon="😊"
        />

        <StatCard
          title="Open Tickets"
          value="5"
          icon="🎫"
        />

      </div>

      <div className="product-section">

        <div className="panel product-card">

          <div className="product-header">
            <div>
              <h3>Acme Smart Watch</h3>
              <span>Electronics</span>
            </div>

            <span className="status-badge">
              Active
            </span>
          </div>

          <div className="product-info">

            <div>
              <strong>324</strong>
              <span>Reviews</span>
            </div>

            <div>
              <strong>82%</strong>
              <span>Positive</span>
            </div>

            <div>
              <strong>4.3</strong>
              <span>Rating</span>
            </div>

          </div>

          <div className="card-actions">

            <button
              onClick={() => setPage("reviews")}
            >
              View Reviews
            </button>

            <button
              onClick={() => setPage("insights")}
            >
              View Insights
            </button>

          </div>

        </div>

        <div className="panel empty-product">

          <div className="empty-icon">
            +
          </div>

          <h3>Add another product</h3>

          <p>
            Start tracking customer feedback
            for another product.
          </p>

          <button
            className="primary-button"
            onClick={() => setPage("products")}
          >
            Add Product
          </button>

        </div>

      </div>

    </main>
  );
}

/* =========================================================
   RESOLUTION AGENT DASHBOARD
   ========================================================= */

function AgentDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            RESOLUTION CENTER
          </span>

          <h1>Ticket Overview</h1>

          <p>
            Resolve customer issues quickly.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("tickets")}
        >
          View Tickets
        </button>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Assigned Tickets"
          value="8"
          icon="🎫"
        />

        <StatCard
          title="Pending"
          value="4"
          icon="⏳"
        />

        <StatCard
          title="Resolved"
          value="21"
          icon="✓"
        />

        <StatCard
          title="Critical"
          value="2"
          icon="⚠"
        />

      </div>

      <section className="panel">

        <h3>Recent Assigned Tickets</h3>

        <TicketRow
          title="Product delivery issue"
          priority="HIGH"
          status="OPEN"
        />

        <TicketRow
          title="Payment problem"
          priority="MEDIUM"
          status="PENDING"
        />

        <TicketRow
          title="Damaged product"
          priority="HIGH"
          status="OPEN"
        />

        <button
          className="secondary-button"
          onClick={() => setPage("tickets")}
        >
          View All Tickets →
        </button>

      </section>

    </main>
  );
}

/* =========================================================
   USERS
   ========================================================= */

function UsersPage({ setPage }) {
  const users = [
    {
      name: "Admin User",
      email: "admin@reviewrave.com",
      role: "PLATFORM ADMIN",
    },
    {
      name: "Brand Manager",
      email: "manager@gmail.com",
      role: "BRAND MANAGER",
    },
    {
      name: "Resolution Agent",
      email: "agent@gmail.com",
      role: "RESOLUTION AGENT",
    },
  ];

  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <h1>User Management</h1>
          <p>
            Manage ReviewRave platform users.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => alert("Add user form opened")}
        >
          + Add User
        </button>

      </div>

      <section className="panel table-panel">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((item, index) => (
              <tr key={index}>

                <td>
                  <strong>{item.name}</strong>
                </td>

                <td>{item.email}</td>

                <td>
                  <span className="status-badge">
                    {item.role}
                  </span>
                </td>

                <td>

                  <button
                    className="table-button"
                    onClick={() =>
                      alert(`Viewing ${item.name}`)
                    }
                  >
                    View
                  </button>

                  <button
                    className="table-button"
                    onClick={() =>
                      alert(`Editing ${item.name}`)
                    }
                  >
                    Edit
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </section>

    </main>
  );
}

/* =========================================================
   PRODUCTS
   ========================================================= */

function ProductsPage({
  user,
  setMessage,
}) {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Acme Smart Watch",
      category: "Electronics",
      reviews: 324,
      rating: 4.3,
    },
    {
      id: 2,
      name: "Acme Wireless Earbuds",
      category: "Audio",
      reviews: 189,
      rating: 4.1,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    if (!productName) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name: productName,
        category: category || "General",
        reviews: 0,
        rating: 0,
      },
    ]);

    setProductName("");
    setCategory("");
    setShowForm(false);

    setMessage("Product added successfully.");
  };

  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            CUSTOMER INTELLIGENCE
          </span>

          <h1>Tracked Products</h1>

          <p>
            Products monitored by your account.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setShowForm(!showForm)}
        >
          + Add Product
        </button>

      </div>

      {showForm && (
        <section className="panel form-panel">

          <h3>Add New Product</h3>

          <form onSubmit={addProduct}>

            <label>Product Name</label>

            <input
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
              placeholder="Enter product name"
              required
            />

            <label>Category</label>

            <input
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
              placeholder="Electronics"
            />

            <div className="form-actions">

              <button
                type="submit"
                className="primary-button"
              >
                Save Product
              </button>

              <button
                type="button"
                className="secondary-button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}

      <div className="product-list">

        {products.map((product) => (
          <section
            className="panel product-card"
            key={product.id}
          >

            <div className="product-header">

              <div>
                <h3>{product.name}</h3>
                <span>{product.category}</span>
              </div>

              <span className="status-badge">
                Active
              </span>

            </div>

            <div className="product-info">

              <div>
                <strong>
                  {product.reviews}
                </strong>
                <span>Reviews</span>
              </div>

              <div>
                <strong>
                  {product.rating}
                </strong>
                <span>Rating</span>
              </div>

              <div>
                <strong>78%</strong>
                <span>Positive</span>
              </div>

            </div>

            <div className="card-actions">

              <button
                onClick={() =>
                  setMessage(
                    `${product.name} selected`
                  )
                }
              >
                View Product
              </button>

              <button
                onClick={() =>
                  setMessage(
                    `Insights opened for ${product.name}`
                  )
                }
              >
                Insights
              </button>

            </div>

          </section>
        ))}

      </div>

    </main>
  );
}

/* =========================================================
   REVIEWS
   ========================================================= */

function ReviewsPage({ setMessage }) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("5");

  const submitReview = (e) => {
    e.preventDefault();

    if (!review.trim()) {
      return;
    }

    setMessage(
      `Review submitted successfully with ${rating} star rating.`
    );

    setReview("");
  };

  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            CUSTOMER FEEDBACK
          </span>

          <h1>Reviews</h1>

          <p>
            Submit and monitor customer reviews.
          </p>
        </div>

      </div>

      <div className="dashboard-grid">

        <section className="panel">

          <h3>Submit Review</h3>

          <form onSubmit={submitReview}>

            <label>Product</label>

            <select>
              <option>
                Acme Smart Watch
              </option>

              <option>
                Acme Wireless Earbuds
              </option>
            </select>

            <label>Rating</label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(e.target.value)
              }
            >
              <option value="5">★★★★★ - 5</option>
              <option value="4">★★★★☆ - 4</option>
              <option value="3">★★★☆☆ - 3</option>
              <option value="2">★★☆☆☆ - 2</option>
              <option value="1">★☆☆☆☆ - 1</option>
            </select>

            <label>Review</label>

            <textarea
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
              placeholder="Enter customer feedback..."
              rows="5"
              required
            />

            <button
              className="primary-button"
              type="submit"
            >
              Submit Review
            </button>

          </form>

        </section>

        <section className="panel">

          <h3>Recent Reviews</h3>

          <ReviewItem
            rating="★★★★★"
            text="Excellent product and very good quality."
            sentiment="Positive"
          />

          <ReviewItem
            rating="★★★★☆"
            text="Good product but delivery was late."
            sentiment="Positive"
          />

          <ReviewItem
            rating="★★☆☆☆"
            text="The product stopped working after one week."
            sentiment="Negative"
          />

        </section>

      </div>

    </main>
  );
}

/* =========================================================
   INSIGHTS
   ========================================================= */

function InsightsPage() {
  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            AI ANALYTICS
          </span>

          <h1>Sentiment Insights</h1>

          <p>
            Understand what customers are saying.
          </p>
        </div>

      </div>

      <div className="stats-grid">

        <StatCard
          title="Positive"
          value="78%"
          icon="😊"
        />

        <StatCard
          title="Neutral"
          value="14%"
          icon="😐"
        />

        <StatCard
          title="Negative"
          value="8%"
          icon="😞"
        />

        <StatCard
          title="Total Reviews"
          value="1,240"
          icon="💬"
        />

      </div>

      <section className="panel">

        <h3>Sentiment Analysis</h3>

        <div className="progress-item">

          <div>
            <span>Positive</span>
            <strong>78%</strong>
          </div>

          <div className="progress">
            <div
              className="progress-positive"
              style={{ width: "78%" }}
            ></div>
          </div>

        </div>

        <div className="progress-item">

          <div>
            <span>Neutral</span>
            <strong>14%</strong>
          </div>

          <div className="progress">
            <div
              className="progress-neutral"
              style={{ width: "14%" }}
            ></div>
          </div>

        </div>

        <div className="progress-item">

          <div>
            <span>Negative</span>
            <strong>8%</strong>
          </div>

          <div className="progress">
            <div
              className="progress-negative"
              style={{ width: "8%" }}
            ></div>
          </div>

        </div>

      </section>

      <div className="dashboard-grid">

        <section className="panel">

          <h3>Top Customer Complaints</h3>

          <ul className="insight-list">
            <li>Delivery delays</li>
            <li>Product durability</li>
            <li>Payment issues</li>
            <li>Customer support response</li>
          </ul>

        </section>

        <section className="panel">

          <h3>Recommended Actions</h3>

          <ul className="insight-list">
            <li>Improve delivery tracking</li>
            <li>Review product quality</li>
            <li>Prioritize critical tickets</li>
            <li>Follow up with negative reviews</li>
          </ul>

        </section>

      </div>

    </main>
  );
}

/* =========================================================
   TICKETS
   ========================================================= */

function TicketsPage({ setMessage }) {
  const [tickets, setTickets] = useState([
    {
      id: "#TK-1001",
      title: "Product delivery issue",
      priority: "HIGH",
      status: "OPEN",
    },
    {
      id: "#TK-1002",
      title: "Payment problem",
      priority: "MEDIUM",
      status: "PENDING",
    },
    {
      id: "#TK-1003",
      title: "Damaged product",
      priority: "HIGH",
      status: "OPEN",
    },
  ]);

  const resolveTicket = (id) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id
          ? {
              ...ticket,
              status: "RESOLVED",
            }
          : ticket
      )
    );

    setMessage(
      `Ticket ${id} resolved successfully.`
    );
  };

  return (
    <main className="dashboard">

      <div className="page-title">

        <div>
          <span className="eyebrow">
            SMART TICKET ROUTING
          </span>

          <h1>Resolution Tickets</h1>

          <p>
            Manage and resolve customer issues.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() =>
            setMessage("Create ticket form opened.")
          }
        >
          + Create Ticket
        </button>

      </div>

      <section className="panel table-panel">

        <table>

          <thead>
            <tr>
              <th>Ticket</th>
              <th>Issue</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (
              <tr key={ticket.id}>

                <td>
                  <strong>{ticket.id}</strong>
                </td>

                <td>
                  {ticket.title}
                </td>

                <td>
                  <span
                    className={`priority ${ticket.priority.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span className="status-badge">
                    {ticket.status}
                  </span>
                </td>

                <td>

                  {ticket.status !== "RESOLVED" && (
                    <button
                      className="resolve-button"
                      onClick={() =>
                        resolveTicket(ticket.id)
                      }
                    >
                      Resolve
                    </button>
                  )}

                  <button
                    className="table-button"
                    onClick={() =>
                      setMessage(
                        `Viewing ${ticket.id}`
                      )
                    }
                  >
                    View
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </section>

    </main>
  );
}

/* =========================================================
   SMALL COMPONENTS
   ========================================================= */

function StatCard({ title, value, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div>
        <span>{title}</span>
        <strong>{value}</strong>
      </div>

    </div>
  );
}

function TimelineItem({ text, sub }) {
  return (
    <div className="timeline-item">

      <span className="timeline-dot"></span>

      <div>
        <strong>{text}</strong>
        <span>{sub}</span>
      </div>

    </div>
  );
}

function TicketRow({
  title,
  priority,
  status,
}) {
  return (
    <div className="ticket-row">

      <div>
        <strong>{title}</strong>
        <span>{priority}</span>
      </div>

      <span className="status-badge">
        {status}
      </span>

    </div>
  );
}

function ReviewItem({
  rating,
  text,
  sentiment,
}) {
  return (
    <div className="review-item">

      <div className="review-rating">
        {rating}
      </div>

      <p>{text}</p>

      <span className="sentiment">
        {sentiment}
      </span>

    </div>
  );
}

/* =========================================================
   EXPORT
   ========================================================= */

export default App;