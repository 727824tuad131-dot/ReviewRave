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


// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// import Login from "./Login";
// import Register from "./Register";

// import Navbar from "./components/layout/Navbar";
// import NotificationStack from "./NotificationStack";

// import ProductList from "./components/product/ProductList";
// import ReviewIngestForm from "./components/review/ReviewIngestForm";
// import TicketList from "./components/ticket/TicketList";
// import InsightList from "./components/insight/InsightList";
// import AdminDashboard from "./components/dashboard/AdminDashboard";

// /* =========================================================
//    PROTECTED ROUTE
//    ========================================================= */

// const ProtectedRoute = () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <>
//       <Navbar />

//       <main className="app-main">
//         <Outlet />
//       </main>

//       <NotificationStack />
//     </>
//   );
// };

// /* =========================================================
//    ROLE ROUTE
//    ========================================================= */

// const RoleRoute = ({ allowedRoles, children }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   /* User not logged in */
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   /* User does not have permission */
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// /* =========================================================
//    HOME PAGE
//    ========================================================= */

// const Home = () => {
//   const role = localStorage.getItem("role");

//   /* Platform Admin */
//   if (role === "PLATFORM_ADMIN") {
//     return <AdminDashboard />;
//   }

//   /* Resolution Agent */
//   if (role === "RESOLUTION_AGENT") {
//     return <TicketList />;
//   }

//   /* Brand Manager */
//   return <ProductList />;
// };

// /* =========================================================
//    APP
//    ========================================================= */

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* =================================================
//             PUBLIC ROUTES
//             ================================================= */}

//         <Route
//           path="/login"
//           element={<Login />}
//         />

//         <Route
//           path="/register"
//           element={<Register />}
//         />


//         {/* =================================================
//             PROTECTED ROUTES
//             ================================================= */}

//         <Route element={<ProtectedRoute />}>

//           {/* ================= HOME ================= */}

//           <Route
//             path="/"
//             element={<Home />}
//           />


//           {/* =================================================
//               PRODUCTS
//               BRAND MANAGER + PLATFORM ADMIN
//               ================================================= */}

//           <Route
//             path="/products"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "BRAND_MANAGER",
//                   "PLATFORM_ADMIN",
//                 ]}
//               >
//                 <ProductList />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               REVIEWS
//               BRAND MANAGER
//               ================================================= */}

//           <Route
//             path="/reviews"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "BRAND_MANAGER",
//                 ]}
//               >
//                 <ReviewIngestForm />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               INSIGHTS
//               BRAND MANAGER + PLATFORM ADMIN
//               ================================================= */}

//           <Route
//             path="/insights"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "BRAND_MANAGER",
//                   "PLATFORM_ADMIN",
//                 ]}
//               >
//                 <InsightList />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               TICKETS
//               RESOLUTION AGENT + PLATFORM ADMIN + BRAND MANAGER
//               ================================================= */}

//           <Route
//             path="/tickets"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "RESOLUTION_AGENT",
//                   "PLATFORM_ADMIN",
//                   "BRAND_MANAGER",
//                 ]}
//               >
//                 <TicketList />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               RESOLUTION AGENT - MY TASKS
//               ================================================= */}

//           <Route
//             path="/tasks"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "RESOLUTION_AGENT",
//                 ]}
//               >
//                 <TicketList />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               RESOLUTION AGENT - RESOLUTION CENTER
//               ================================================= */}

//           <Route
//             path="/resolution-center"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "RESOLUTION_AGENT",
//                 ]}
//               >
//                 <TicketList />
//               </RoleRoute>
//             }
//           />


//           {/* =================================================
//               PLATFORM ADMIN
//               ================================================= */}

//           <Route
//             path="/admin"
//             element={
//               <RoleRoute
//                 allowedRoles={[
//                   "PLATFORM_ADMIN",
//                 ]}
//               >
//                 <AdminDashboard />
//               </RoleRoute>
//             }
//           />

//         </Route>


//         {/* =================================================
//             UNKNOWN ROUTES
//             ================================================= */}

//         <Route
//           path="*"
//           element={<Navigate to="/" replace />}
//         />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React, { useState } from "react";
import ReviewForm from "./components/review/ReviewForm";
import ReviewList from "./components/review/ReviewList";
import TicketForm from "./components/ticket/TicketForm";
import UserList from "./components/user/UserList";

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("users");

  // Form States
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("BRAND_MANAGER");

  const handleCreateAccount = () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill in all required fields!");
      return;
    }
    alert(`Account Created Successfully!`);
    setCurrentPage("login");
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please enter Email and Password!");
      return;
    }
    setCurrentPage("dashboard");
  };

  return (
    <div style={styles.pageContainer}>
      {/* 1. REGISTER PAGE */}
      {currentPage === "register" && (
        <div style={styles.glassCard}>
          <h2 style={styles.heading}>Register Account</h2>
          <div style={styles.formGroup}>
            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <label style={styles.label}>Company Name</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={styles.select}
              >
                <option value="BRAND_MANAGER">Brand Manager</option>
                <option value="RESOLUTION_AGENT">Resolution Agent</option>
                <option value="PLATFORM_ADMIN">Platform Admin</option>
              </select>
            </div>

            <button type="button" onClick={handleCreateAccount} style={styles.primaryBtn}>
              Create Account
            </button>
          </div>

          <p style={styles.footerText}>
            Already have an account?{" "}
            <span onClick={() => setCurrentPage("login")} style={styles.link}>
              Login here
            </span>
          </p>
        </div>
      )}

      {/* 2. LOGIN PAGE */}
      {currentPage === "login" && (
        <div style={styles.glassCard}>
          <h2 style={styles.heading}>Login to ReviewRave</h2>
          <div style={styles.formGroup}>
            <div>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
            </div>

            <button type="button" onClick={handleLogin} style={styles.primaryBtn}>
              Login
            </button>
          </div>

          <p style={styles.footerText}>
            Don't have an account?{" "}
            <span onClick={() => setCurrentPage("register")} style={styles.link}>
              Register here
            </span>
          </p>
        </div>
      )}

      {/* 3. MAIN WORKSPACE */}
      {currentPage === "dashboard" && (
        <div style={styles.dashboardLayout}>
          <div style={styles.navBar}>
            <h2>ReviewRave Workspace</h2>
            <button onClick={() => setCurrentPage("login")} style={styles.logoutBtn}>
              Logout
            </button>
          </div>

          {/* Tab Navigation */}
          <div style={styles.tabBar}>
            <button
              style={activeTab === "users" ? styles.activeTabBtn : styles.tabBtn}
              onClick={() => setActiveTab("users")}
            >
              User Management
            </button>
            <button
              style={activeTab === "reviews" ? styles.activeTabBtn : styles.tabBtn}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews Management
            </button>
            <button
              style={activeTab === "tickets" ? styles.activeTabBtn : styles.tabBtn}
              onClick={() => setActiveTab("tickets")}
            >
              Support Tickets
            </button>
          </div>

          {/* Workspace Views */}
          <div style={styles.contentArea}>
            {activeTab === "users" && <UserList />}
            
            {activeTab === "reviews" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <ReviewForm />
                <ReviewList />
              </div>
            )}
            
            {activeTab === "tickets" && <TicketForm />}
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    fontFamily: "'Inter', sans-serif",
    color: "#f8fafc",
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    boxSizing: "border-box",
  },
  glassCard: {
    width: "100%",
    maxWidth: "440px",
    background: "#1e293b",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid #334155",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
    marginTop: "40px",
  },
  heading: { color: "#f8fafc", textAlign: "center", marginBottom: "24px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "16px" },
  row: { display: "flex", gap: "12px" },
  label: { display: "block", color: "#94a3b8", fontSize: "13px", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    boxSizing: "border-box",
  },
  select: {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    outline: "none",
    boxSizing: "border-box",
  },
  primaryBtn: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
  },
  footerText: { textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "20px" },
  link: { color: "#38bdf8", cursor: "pointer", textDecoration: "underline" },
  dashboardLayout: { width: "100%", maxWidth: "1000px" },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  logoutBtn: {
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
  },
  tabBar: { display: "flex", gap: "12px", marginBottom: "20px" },
  tabBtn: {
    padding: "10px 18px",
    backgroundColor: "#1e293b",
    color: "#94a3b8",
    border: "1px solid #334155",
    borderRadius: "6px",
    cursor: "pointer",
  },
  activeTabBtn: {
    padding: "10px 18px",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer",
  },
  contentArea: { backgroundColor: "#1e293b", padding: "24px", borderRadius: "8px" },
};