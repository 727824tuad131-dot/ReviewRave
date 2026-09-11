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

const API_URL = "http://localhost:8080";

/* =========================================================
   MAIN APP
========================================================= */

function App() {
  const [page, setPage] = useState("login");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  /* Check existing session */
  useEffect(() => {
    const savedUser = localStorage.getItem("reviewraveUser");

    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);

        if (parsed && parsed.email) {
          setUser(parsed);
          setPage("dashboard");
        }
      } catch {
        localStorage.removeItem("reviewraveUser");
        localStorage.removeItem("token");
      }
    }
  }, []);

  /* =======================================================
     LOGIN
  ======================================================= */

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

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Invalid email or password."
        );
        return;
      }

      const loggedUser = {
        id: data.id,
        email: data.email || email,
        name:
          data.name ||
          data.fullName ||
          data.username ||
          "ReviewRave User",
        role:
          data.role ||
          data.roles?.[0] ||
          data.authority ||
          "BRAND_MANAGER",
        token:
          data.token ||
          data.accessToken ||
          "",
        companyName:
          data.companyName ||
          data.company ||
          "",
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
      setMessage("");
    } catch (error) {
      setMessage(
        "Unable to connect to server. Please start Spring Boot."
      );
    }
  };

  /* =======================================================
     REGISTER
  ======================================================= */

  const handleRegister = async (formData) => {
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setMessage(
          data.message ||
            data.error ||
            "Registration failed."
        );
        return;
      }

      /*
       * Very important:
       * Do NOT automatically login after registration.
       */
      localStorage.removeItem("reviewraveUser");
      localStorage.removeItem("token");

      setUser(null);
      setPage("login");
      setMessage(
        "Account created successfully. Please login."
      );
    } catch (error) {
      setMessage(
        "Unable to connect to server. Please start Spring Boot."
      );
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem("reviewraveUser");
    localStorage.removeItem("token");

    setUser(null);
    setPage("login");
    setMessage("");
  };

  /* =======================================================
     AUTH
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

  const submit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-card login-card">

        <h1>Login to ReviewRave</h1>

        <p className="auth-subtitle">
          Customer Intelligence Platform
        </p>

        {message && (
          <div className="message-box">
            {message}
          </div>
        )}

        <form onSubmit={submit}>

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
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="primary-button full"
          >
            Login
          </button>

        </form>

        <p className="switch-text">
          Don't have an account?{" "}
          <button
            className="link-button"
            type="button"
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

  const update = (field, value) => {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    if (form.password.length < 8) {
      return;
    }

    /*
     * Send fullName because backend user normally stores
     * the complete name.
     */
    onRegister({
      fullName:
        `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      password: form.password,
      role: form.role,
      companyName: form.companyName,
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

        <form onSubmit={submit}>

          <div className="two-column">

            <div>
              <label>First Name</label>

              <input
                type="text"
                placeholder="Jane"
                value={form.firstName}
                onChange={(e) =>
                  update("firstName", e.target.value)
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
                  update("lastName", e.target.value)
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
              update("companyName", e.target.value)
            }
          />

          <label>Email Address</label>

          <input
            type="email"
            placeholder="manager@gmail.com"
            value={form.email}
            onChange={(e) =>
              update("email", e.target.value)
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
              update("password", e.target.value)
            }
            required
          />

          <label>Select Role</label>

          <select
            value={form.role}
            onChange={(e) =>
              update("role", e.target.value)
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
            type="submit"
            className="primary-button full"
          >
            Create Account
          </button>

        </form>

        <p className="switch-text">
          Already have an account?{" "}
          <button
            type="button"
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
   DASHBOARD LAYOUT
========================================================= */

function Dashboard({
  user,
  page,
  setPage,
  onLogout,
  message,
  setMessage,
}) {
  const role = String(
    user?.role || "BRAND_MANAGER"
  ).toUpperCase();

  const isAdmin =
    role === "PLATFORM_ADMIN" ||
    role === "ADMIN";

  const isAgent =
    role === "RESOLUTION_AGENT";

  return (
    <div className="app-container">

      {/* HEADER */}

      <header className="top-header">

        <div className="header-brand">
          <div className="header-logo">R</div>

          <div>
            <h2>ReviewRave</h2>
            <span>Customer Intelligence</span>
          </div>
        </div>

        <div className="header-user">

          <div className="avatar">
            {(user.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">
            <strong>
              {user.name || "ReviewRave User"}
            </strong>

            <span>
              {role.replaceAll("_", " ")}
            </span>
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

        {isAdmin && (
          <button
            className={page === "users" ? "active" : ""}
            onClick={() => setPage("users")}
          >
            Users
          </button>
        )}

        {!isAgent && (
          <button
            className={page === "products" ? "active" : ""}
            onClick={() => setPage("products")}
          >
            Products
          </button>
        )}

        {!isAgent && (
          <button
            className={page === "reviews" ? "active" : ""}
            onClick={() => setPage("reviews")}
          >
            Reviews
          </button>
        )}

        {!isAgent && (
          <button
            className={page === "insights" ? "active" : ""}
            onClick={() => setPage("insights")}
          >
            Insights
          </button>
        )}

        <button
          className={page === "tickets" ? "active" : ""}
          onClick={() => setPage("tickets")}
        >
          Tickets
        </button>

      </nav>

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

      {/* ONLY ONE PAGE IS SHOWN */}

      {page === "dashboard" && (
        <DashboardHome
          role={role}
          setPage={setPage}
        />
      )}

      {page === "users" && isAdmin && (
        <UsersPage setMessage={setMessage} />
      )}

      {page === "products" && !isAgent && (
        <ProductsPage setMessage={setMessage} />
      )}

      {page === "reviews" && !isAgent && (
        <ReviewsPage setMessage={setMessage} />
      )}

      {page === "insights" && !isAgent && (
        <InsightsPage />
      )}

      {page === "tickets" && (
        <TicketsPage
          role={role}
          setMessage={setMessage}
        />
      )}

    </div>
  );
}

/* =========================================================
   DASHBOARD HOME
========================================================= */

function DashboardHome({ role, setPage }) {

  if (
    role === "PLATFORM_ADMIN" ||
    role === "ADMIN"
  ) {
    return <AdminDashboard setPage={setPage} />;
  }

  if (role === "RESOLUTION_AGENT") {
    return <AgentDashboard setPage={setPage} />;
  }

  return <BrandManagerDashboard setPage={setPage} />;
}

/* =========================================================
   PLATFORM ADMIN
========================================================= */

function AdminDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-heading">
        <div>
          <h1>Platform Overview</h1>
          <p>
            Monitor your complete ReviewRave platform.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={() => setPage("users")}
        >
          Manage Users
        </button>
      </div>

      <div className="stats-grid">

        <StatCard
          title="Total Users"
          value="8"
        />

        <StatCard
          title="Tracked Products"
          value="12"
        />

        <StatCard
          title="Active Tickets"
          value="3"
        />

        <StatCard
          title="Open Insights"
          value="19"
        />

      </div>

      <div className="two-panel-grid">

        <section className="panel">

          <h3>Global User Roles</h3>

          <div className="role-area">

            <div className="donut">
              <span>8</span>
            </div>

            <div className="role-list">

              <div>
                <span className="role-dot admin"></span>
                Platform Admin
              </div>

              <div>
                <span className="role-dot manager"></span>
                Brand Managers
              </div>

              <div>
                <span className="role-dot agent"></span>
                Resolution Agents
              </div>

            </div>

          </div>

        </section>

        <section className="panel">

          <h3>Recent Timeline</h3>

          <Timeline
            text="New brand manager registered"
            sub="Brand Corp"
          />

          <Timeline
            text="System review ingestion completed"
            sub="1,240 reviews processed"
          />

          <Timeline
            text="Critical ticket auto assigned"
            sub="Resolution Agent"
          />

        </section>

      </div>

    </main>
  );
}

/* =========================================================
   BRAND MANAGER
========================================================= */

function BrandManagerDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-heading">

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
        />

        <StatCard
          title="Total Reviews"
          value="1,240"
        />

        <StatCard
          title="Positive Sentiment"
          value="78%"
        />

        <StatCard
          title="Open Tickets"
          value="5"
        />

      </div>

      <section className="panel table-panel">

        <div className="table-header">
          <h2>Tracked Products</h2>

          <button
            className="primary-button small"
            onClick={() => setPage("products")}
          >
            Add Product
          </button>
        </div>

        <ProductTable setMessage={() => {}} />

      </section>

    </main>
  );
}

/* =========================================================
   RESOLUTION AGENT
========================================================= */

function AgentDashboard({ setPage }) {
  return (
    <main className="dashboard">

      <div className="page-heading">

        <div>
          <span className="eyebrow">
            SMART TICKET ROUTING
          </span>

          <h1>Resolution Tickets</h1>

          <p>
            Manage and resolve assigned customer issues.
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
        />

        <StatCard
          title="Pending"
          value="4"
        />

        <StatCard
          title="Resolved"
          value="21"
        />

        <StatCard
          title="Critical"
          value="2"
        />

      </div>

      <section className="panel table-panel">

        <div className="table-header">
          <h2>Resolution Tickets</h2>

          <button
            className="secondary-button"
            onClick={() => setPage("tickets")}
          >
            My Tickets
          </button>
        </div>

        <TicketTable />

      </section>

    </main>
  );
}

/* =========================================================
   USERS
========================================================= */

function UsersPage({ setMessage }) {

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Brand Manager",
      email: "manager@reviewrave.com",
      company: "Brand Corp",
      role: "BRAND MANAGER",
      status: "Active",
    },
    {
      id: 2,
      name: "Support Agent",
      email: "agent@reviewrave.com",
      company: "ReviewRave Support",
      role: "RESOLUTION AGENT",
      status: "Active",
    },
    {
      id: 3,
      name: "Platform Admin",
      email: "admin@reviewrave.com",
      company: "ReviewRave Inc",
      role: "PLATFORM ADMIN",
      status: "Active",
    },
    {
      id: 4,
      name: "John Doe",
      email: "john@gmail.com",
      company: "Acme Digital",
      role: "BRAND MANAGER",
      status: "Disabled",
    },
  ]);

  const toggleUser = (id) => {
    setUsers((old) =>
      old.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === "Active"
                  ? "Disabled"
                  : "Active",
            }
          : u
      )
    );

    setMessage("User status updated.");
  };

  return (
    <main className="dashboard">

      <div className="page-heading">

        <div>
          <h1>User Management</h1>
          <p>
            Manage ReviewRave platform users.
          </p>
        </div>

      </div>

      <section className="panel table-panel">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (
              <tr key={user.id}>

                <td>#{user.id}</td>

                <td>
                  <strong>{user.name}</strong>
                </td>

                <td>{user.email}</td>

                <td>{user.company}</td>

                <td>
                  <span className="role-badge">
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={
                      user.status === "Active"
                        ? "status active"
                        : "status disabled"
                    }
                  >
                    {user.status}
                  </span>
                </td>

                <td>
                  <button
                    className="table-button"
                    onClick={() =>
                      toggleUser(user.id)
                    }
                  >
                    {user.status === "Active"
                      ? "Disable"
                      : "Enable"}
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

function ProductsPage({ setMessage }) {

  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Smartwatch",
      category: "ELECTRONICS",
      reviews: 0,
      sentiment: "88",
    },
    {
      id: 2,
      name: "Word",
      category: "SOFTWARE",
      reviews: 0,
      sentiment: "82",
    },
    {
      id: 3,
      name: "Singed",
      category: "HOSPITALITY",
      reviews: 0,
      sentiment: "80",
    },
    {
      id: 4,
      name: "Rice",
      category: "RETAIL",
      reviews: 0,
      sentiment: "79",
    },
  ]);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const addProduct = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    setProducts((old) => [
      ...old,
      {
        id: Date.now(),
        name,
        category:
          category.toUpperCase() || "GENERAL",
        reviews: 0,
        sentiment: "0",
      },
    ]);

    setName("");
    setCategory("");
    setShowForm(false);

    setMessage("Product added successfully.");
  };

  return (
    <main className="dashboard">

      <div className="page-heading">

        <div>
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

          <h2>Add Product</h2>

          <form onSubmit={addProduct}>

            <label>Product Name</label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
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

            <div className="form-buttons">

              <button
                className="primary-button"
                type="submit"
              >
                Save Product
              </button>

              <button
                className="secondary-button"
                type="button"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </div>

          </form>

        </section>
      )}

      <section className="panel table-panel">

        <div className="search-row">
          <input
            placeholder="Search products by name or category..."
          />
        </div>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Total Reviews</th>
              <th>Avg Sentiment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {products.map((product) => (
              <tr key={product.id}>

                <td>
                  <strong>{product.name}</strong>
                </td>

                <td>{product.category}</td>

                <td>{product.reviews}</td>

                <td>{product.sentiment}</td>

                <td>

                  <button
                    className="table-button"
                    onClick={() =>
                      setMessage(
                        `${product.name} selected`
                      )
                    }
                  >
                    View
                  </button>

                  <button
                    className="table-button danger"
                    onClick={() =>
                      setProducts((old) =>
                        old.filter(
                          (p) =>
                            p.id !== product.id
                        )
                      )
                    }
                  >
                    Delete
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
   PRODUCT TABLE
========================================================= */

function ProductTable({ setMessage }) {

  const products = [
    {
      name: "Smartwatch",
      category: "ELECTRONICS",
      reviews: 0,
      sentiment: "88",
    },
    {
      name: "Word",
      category: "SOFTWARE",
      reviews: 0,
      sentiment: "82",
    },
    {
      name: "Singed",
      category: "HOSPITALITY",
      reviews: 0,
      sentiment: "80",
    },
    {
      name: "Rice",
      category: "RETAIL",
      reviews: 0,
      sentiment: "79",
    },
  ];

  return (
    <table>

      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Total Reviews</th>
          <th>Avg Sentiment</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>

        {products.map((product, index) => (
          <tr key={index}>

            <td>{product.name}</td>

            <td>{product.category}</td>

            <td>{product.reviews}</td>

            <td>{product.sentiment}</td>

            <td>
              <button
                className="table-button"
                onClick={() =>
                  setMessage(
                    `${product.name} opened`
                  )
                }
              >
                View
              </button>

              <button className="table-button">
                Edit
              </button>
            </td>

          </tr>
        ))}

      </tbody>

    </table>
  );
}

/* =========================================================
   REVIEWS
========================================================= */

function ReviewsPage({ setMessage }) {

  const [review, setReview] = useState("");

  const submitReview = (e) => {
    e.preventDefault();

    if (!review.trim()) return;

    setMessage("Review submitted successfully.");
    setReview("");
  };

  return (
    <main className="dashboard">

      <div className="page-heading">

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

      <div className="two-panel-grid">

        <section className="panel">

          <h2>Submit Review</h2>

          <form onSubmit={submitReview}>

            <label>Product</label>

            <select>
              <option>Smartwatch</option>
              <option>Word</option>
              <option>Rice</option>
            </select>

            <label>Rating</label>

            <select>
              <option>5</option>
              <option>4</option>
              <option>3</option>
              <option>2</option>
              <option>1</option>
            </select>

            <label>Review</label>

            <textarea
              rows="5"
              placeholder="Enter customer feedback..."
              value={review}
              onChange={(e) =>
                setReview(e.target.value)
              }
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

          <h2>Recent Reviews</h2>

          <Review
            rating="★★★★★"
            text="Excellent product and very good quality."
            sentiment="Positive"
          />

          <Review
            rating="★★★★☆"
            text="Good product but delivery was late."
            sentiment="Positive"
          />

          <Review
            rating="★★☆☆☆"
            text="The product stopped working."
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

      <div className="page-heading">

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
        />

        <StatCard
          title="Neutral"
          value="14%"
        />

        <StatCard
          title="Negative"
          value="8%"
        />

        <StatCard
          title="Total Reviews"
          value="1,240"
        />

      </div>

      <section className="panel">

        <h2>Sentiment Analysis</h2>

        <Progress
          name="Positive"
          value={78}
        />

        <Progress
          name="Neutral"
          value={14}
        />

        <Progress
          name="Negative"
          value={8}
        />

      </section>

      <div className="two-panel-grid">

        <section className="panel">

          <h2>Top Customer Complaints</h2>

          <ul>
            <li>Delivery delays</li>
            <li>Product durability</li>
            <li>Payment issues</li>
            <li>Customer support response</li>
          </ul>

        </section>

        <section className="panel">

          <h2>Recommended Actions</h2>

          <ul>
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

function TicketsPage({ role, setMessage }) {

  const [tickets, setTickets] = useState([
    {
      id: "#2",
      priority: "HIGH",
      status: "OPEN",
      snippet: "hello..",
    },
    {
      id: "#3",
      priority: "HIGH",
      status: "OPEN",
      snippet: "hahaha..",
    },
    {
      id: "#4",
      priority: "CRITICAL",
      status: "OPEN",
      snippet: "sick..",
    },
  ]);

  const resolve = (id) => {

    setTickets((old) =>
      old.map((ticket) =>
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

  const isAgent =
    role === "RESOLUTION_AGENT";

  return (
    <main className="dashboard">

      <div className="page-heading">

        <div>
          <h1>Resolution Tickets</h1>

          <p>
            Manage customer issues and resolutions.
          </p>
        </div>

        <div className="ticket-tabs">

          <button className="secondary-button">
            My Tickets
          </button>

          {isAgent && (
            <button className="primary-button">
              Available Tickets
            </button>
          )}

        </div>

      </div>

      <section className="filter-panel">

        <label>Filter by Status</label>

        <select>
          <option>OPEN</option>
          <option>PENDING</option>
          <option>RESOLVED</option>
          <option>ALL</option>
        </select>

      </section>

      <section className="panel table-panel">

        <table>

          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Review Snippet</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {tickets.map((ticket) => (
              <tr key={ticket.id}>

                <td>{ticket.id}</td>

                <td>
                  <span
                    className={`priority ${ticket.priority.toLowerCase()}`}
                  >
                    {ticket.priority}
                  </span>
                </td>

                <td>
                  <span className="status active">
                    {ticket.status}
                  </span>
                </td>

                <td>{ticket.snippet}</td>

                <td>

                  {ticket.status !== "RESOLVED" ? (
                    <button
                      className="table-button"
                      onClick={() =>
                        resolve(ticket.id)
                      }
                    >
                      Resolve
                    </button>
                  ) : (
                    <span className="resolved-text">
                      Resolved
                    </span>
                  )}

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

function StatCard({ title, value }) {
  return (
    <div className="stat-card">
      <span>{title}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Timeline({ text, sub }) {
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

function Progress({ name, value }) {
  return (
    <div className="progress-item">

      <div className="progress-label">
        <span>{name}</span>
        <strong>{value}%</strong>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{ width: `${value}%` }}
        ></div>
      </div>

    </div>
  );
}

function Review({
  rating,
  text,
  sentiment,
}) {
  return (
    <div className="review-item">

      <strong>{rating}</strong>

      <p>{text}</p>

      <span>{sentiment}</span>

    </div>
  );
}

export default App;                                             