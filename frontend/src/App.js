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

export default function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [activeNav, setActiveNav] = useState("Home");

  // Registration & Auth States
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("BRAND_MANAGER");

  // User Management State
  const [users, setUsers] = useState([
    { id: 1, name: "Brand Manager", email: "manager@brand.com", company: "Brand Corp", role: "BRAND_MANAGER", status: "Active" },
    { id: 2, name: "Support Agent", email: "agent@reviewrave.com", company: "ReviewRave Support", role: "RESOLUTION_AGENT", status: "Active" },
    { id: 3, name: "Platform Admin", email: "admin@reviewrave.com", company: "ReviewRave Inc", role: "PLATFORM_ADMIN", status: "Active" },
    { id: 4, name: "manager", email: "manager@gmail.com", company: "manager@gmail.com", role: "BRAND_MANAGER", status: "Active" },
    { id: 5, name: "agent", email: "agent@gmail.com", company: "Joko", role: "RESOLUTION_AGENT", status: "Active" },
    { id: 6, name: "admin", email: "admin@gmail.com", company: "Acca", role: "PLATFORM_ADMIN", status: "Active" },
  ]);

  // Tracked Products State
  const [products] = useState([
    { name: "ProBook", category: "ELECTRONICS", totalReviews: 0, avgSentiment: 0.0 },
    { name: "SaaS", category: "SOFTWARE", totalReviews: 0, avgSentiment: 0.0 },
    { name: "Resort", category: "HOSPITALITY", totalReviews: 0, avgSentiment: 0.0 },
    { name: "Tee", category: "RETAIL", totalReviews: 0, avgSentiment: 0.0 },
  ]);

  // Resolution Tickets State
  const [tickets] = useState([
    { id: "#2", priority: "HIGH", status: "OPEN", snippet: "hello..." },
    { id: "#3", priority: "HIGH", status: "OPEN", snippet: "hahaha..." },
    { id: "#4", priority: "CRITICAL", status: "OPEN", snippet: "req..." },
  ]);

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  return (
    <div style={styles.appWrapper}>
      {/* Search Header */}
      <div style={styles.topHeader}>
        <div style={styles.searchBox}>
          <span>🔍</span> Search
        </div>
      </div>

      {/* 1. REGISTER PAGE */}
      {currentPage === "register" && (
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.authTitle}>Register Account</h2>
            <div style={styles.formGroup}>
              <div style={{ display: "flex", gap: "10px" }}>
                <input style={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
                <input style={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
              </div>
              <input style={styles.input} type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company Name" />
              <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
              <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="BRAND_MANAGER">Brand Manager</option>
                <option value="RESOLUTION_AGENT">Resolution Agent</option>
                <option value="PLATFORM_ADMIN">Platform Admin</option>
              </select>
              <button style={styles.blueBtn} onClick={() => setCurrentPage("login")}>Create Account</button>
            </div>
            <p style={{ marginTop: "15px", fontSize: "13px" }}>
              Already have an account? <span style={styles.linkText} onClick={() => setCurrentPage("login")}>Login here</span>
            </p>
          </div>
        </div>
      )}

      {/* 2. LOGIN PAGE */}
      {currentPage === "login" && (
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.authTitle}>Login to ReviewRave</h2>
            <div style={styles.formGroup}>
              <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
              <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              <button style={styles.blueBtn} onClick={() => setCurrentPage("dashboard")}>Login</button>
            </div>
            <p style={{ marginTop: "15px", fontSize: "13px" }}>
              Don't have an account? <span style={styles.linkText} onClick={() => setCurrentPage("register")}>Register here</span>
            </p>
          </div>
        </div>
      )}

      {/* 3. LIGHT THEME DASHBOARD */}
      {currentPage === "dashboard" && (
        <div style={styles.dashboardContainer}>
          {/* Navigation Bar */}
          <div style={styles.navbar}>
            {["Home", "Users", "Products", "Reviews", "Insights"].map((item) => (
              <span
                key={item}
                style={{
                  ...styles.navItem,
                  borderBottom: activeNav === item ? "2px solid #2563eb" : "none",
                  fontWeight: activeNav === item ? "600" : "normal",
                }}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </span>
            ))}
          </div>

          <div style={styles.mainContent}>
            {/* TAB 1: HOME / PLATFORM OVERVIEW */}
            {activeNav === "Home" && (
              <div>
                <h2 style={styles.pageHeading}>Platform Overview</h2>
                
                {/* Metric Cards */}
                <div style={styles.metricsGrid}>
                  <div style={{ ...styles.card, borderLeft: "4px solid #2563eb" }}>
                    <span style={styles.metricLabel}>Total Users</span>
                    <h3 style={styles.metricVal}>8</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #10b981" }}>
                    <span style={styles.metricLabel}>Tracked Products</span>
                    <h3 style={styles.metricVal}>12</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #ef4444" }}>
                    <span style={styles.metricLabel}>Active Tickets</span>
                    <h3 style={styles.metricVal}>3</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #f59e0b" }}>
                    <span style={styles.metricLabel}>Active Sentiment</span>
                    <h3 style={styles.metricVal}>3.8</h3>
                  </div>
                </div>

                {/* Donut Chart & Timeline */}
                <div style={styles.rowGrid}>
                  <div style={styles.card}>
                    <h4 style={styles.cardTitle}>Global User Roles</h4>
                    <div style={styles.chartWrapper}>
                      <div style={styles.donutChart}></div>
                      <div style={styles.chartLegend}>
                        <div><span style={{ color: "#ef4444" }}>●</span> Admin (25%)</div>
                        <div><span style={{ color: "#2563eb" }}>●</span> Brand Managers (45%)</div>
                        <div><span style={{ color: "#10b981" }}>●</span> Agents (30%)</div>
                      </div>
                    </div>
                  </div>

                  <div style={styles.card}>
                    <h4 style={styles.cardTitle}>Recent Timeline</h4>
                    <ul style={styles.timelineList}>
                      <li>🔵 New brand manager registered Brand Corp <br/><small style={{color:"#94a3b8"}}>1 hour ago</small></li>
                      <li>🔵 System wide review ingestion completed <br/><small style={{color:"#94a3b8"}}>3 hours ago</small></li>
                      <li>🔵 Critical ticket auto-assigned to Agent Smith <br/><small style={{color:"#94a3b8"}}>5 hours ago</small></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: USERS MANAGEMENT */}
            {activeNav === "Users" && (
              <div style={styles.card}>
                <h2 style={styles.pageHeading}>User Management</h2>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>ID</th><th>Name</th><th>Email</th><th>Company</th><th>Role</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} style={styles.tableRow}>
                        <td>#{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company}</td>
                        <td><span style={styles.roleBadge}>{u.role}</span></td>
                        <td><span style={styles.statusActive}>{u.status}</span></td>
                        <td>
                          <button style={styles.actionBtn} onClick={() => toggleUserStatus(u.id)}>Toggle Status</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 3: PRODUCTS */}
            {activeNav === "Products" && (
              <div style={styles.card}>
                <h2 style={styles.pageHeading}>Tracked Products</h2>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Name</th><th>Category</th><th>Total Reviews</th><th>Avg Sentiment</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, idx) => (
                      <tr key={idx} style={styles.tableRow}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.totalReviews}</td>
                        <td>{p.avgSentiment}</td>
                        <td>
                          <button style={styles.actionBtn}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* TAB 4: REVIEWS & TICKETS */}
            {(activeNav === "Reviews" || activeNav === "Insights") && (
              <div style={styles.card}>
                <h2 style={styles.pageHeading}>Resolution Tickets</h2>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Ticket ID</th><th>Priority</th><th>Status</th><th>Review Snippet</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map(t => (
                      <tr key={t.id} style={styles.tableRow}>
                        <td>{t.id}</td>
                        <td><span style={{ color: t.priority === "CRITICAL" ? "red" : "orange" }}>{t.priority}</span></td>
                        <td>{t.status}</td>
                        <td>{t.snippet}</td>
                        <td>
                          <button style={styles.actionBtn}>Claim Ticket</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div style={styles.bottomBar}>
        <button style={styles.pullBtn}>Pull</button>
        <button style={styles.checkBtn}>Check Verify</button>
      </div>
    </div>
  );
}

const styles = {
  appWrapper: { backgroundColor: "#e2e8f0", minHeight: "100vh", fontFamily: "sans-serif", paddingBottom: "70px" },
  topHeader: { backgroundColor: "#ffffff", padding: "10px 20px", display: "flex", justifyContent: "center", borderBottom: "1px solid #cbd5e1" },
  searchBox: { color: "#64748b", fontSize: "14px", backgroundColor: "#f1f5f9", padding: "6px 20px", borderRadius: "6px", width: "300px", textAlign: "center" },
  authContainer: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" },
  authCard: { backgroundColor: "#ffffff", padding: "30px", borderRadius: "8px", width: "360px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" },
  authTitle: { textAlign: "center", marginBottom: "20px", color: "#1e293b" },
  formGroup: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "10px", borderRadius: "4px", border: "1px solid #cbd5e1", outline: "none", fontSize: "14px" },
  blueBtn: { backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "10px", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
  linkText: { color: "#2563eb", cursor: "pointer", textDecoration: "underline" },
  dashboardContainer: { width: "95%", maxWidth: "1100px", margin: "20px auto" },
  navbar: { backgroundColor: "#1e293b", color: "#f8fafc", display: "flex", gap: "25px", padding: "12px 20px", borderRadius: "4px 4px 0 0" },
  navItem: { cursor: "pointer", fontSize: "14px", paddingBottom: "2px" },
  mainContent: { backgroundColor: "#f8fafc", padding: "20px", borderRadius: "0 0 4px 4px", border: "1px solid #cbd5e1" },
  pageHeading: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "20px" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px", marginBottom: "20px" },
  card: { backgroundColor: "#ffffff", padding: "18px", borderRadius: "6px", border: "1px solid #e2e8f0" },
  metricLabel: { color: "#64748b", fontSize: "12px", textTransform: "uppercase" },
  metricVal: { margin: "8px 0 0 0", fontSize: "24px", color: "#0f172a" },
  rowGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  cardTitle: { margin: "0 0 15px 0", color: "#334155" },
  chartWrapper: { display: "flex", alignItems: "center", gap: "20px" },
  donutChart: { width: "100px", height: "100px", borderRadius: "50%", background: "conic-gradient(#ef4444 0% 25%, #2563eb 25% 70%, #10b981 70% 100%)" },
  chartLegend: { fontSize: "13px", lineHeight: "1.8", color: "#475569" },
  timelineList: { listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "1.8", color: "#334155" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  tableHeader: { backgroundColor: "#f1f5f9", textAlign: "left", color: "#475569" },
  tableRow: { borderBottom: "1px solid #e2e8f0", color: "#334155" },
  roleBadge: { backgroundColor: "#fef3c7", color: "#d97706", padding: "3px 6px", borderRadius: "4px", fontSize: "11px" },
  statusActive: { backgroundColor: "#dcfce7", color: "#15803d", padding: "3px 6px", borderRadius: "4px", fontSize: "11px" },
  actionBtn: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, height: "50px", backgroundColor: "#ffffff", display: "flex", gap: "15px", padding: "8px 20px", borderTop: "1px solid #cbd5e1" },
  pullBtn: { flex: 1, backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
  checkBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" }
};