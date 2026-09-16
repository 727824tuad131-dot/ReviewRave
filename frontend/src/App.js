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
  const [currentPage, setCurrentPage] = useState("register"); // Default to register page to view forms
  const [activeNav, setActiveNav] = useState("Home");

  // Registration & Auth States
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("Brand Manager");

  // User Management State
  const [users] = useState([
    { id: "#1", name: "Brand Manager", email: "manager@brand.com", company: "Brand Corp", role: "BRAND_MANAGER", status: "Active" },
    { id: "#2", name: "Support Agent", email: "agent@reviewrave.com", company: "ReviewRave Support", role: "RESOLUTION_AGENT", status: "Active" },
    { id: "#3", name: "Platform Admin", email: "admin@reviewrave.com", company: "ReviewRave Inc", role: "PLATFORM_ADMIN", status: "Active" },
    { id: "#4", name: "manager", email: "manager@gmail.com", company: "manager@gmail.com", role: "BRAND_MANAGER", status: "Active" },
    { id: "#5", name: "agent", email: "agent@gmail.com", company: "Joko", role: "RESOLUTION_AGENT", status: "Active" },
    { id: "#6", name: "admin", email: "admin@gmail.com", company: "Acca", role: "PLATFORM_ADMIN", status: "Active" },
  ]);

  // Tracked Products State
  const [products] = useState([
    { name: "ProBook", category: "ELECTRONICS", totalReviews: 0, avgSentiment: 0 },
    { name: "SaaS", category: "SOFTWARE", totalReviews: 0, avgSentiment: 0 },
    { name: "Resort", category: "HOSPITALITY", totalReviews: 0, avgSentiment: 0 },
    { name: "Tee", category: "RETAIL", totalReviews: 0, avgSentiment: 0 },
  ]);

  // Resolution Tickets State
  const [tickets] = useState([
    { id: "#2", priority: "HIGH", status: "OPEN", snippet: "hello..." },
    { id: "#3", priority: "HIGH", status: "OPEN", snippet: "hahaha..." },
    { id: "#4", priority: "CRITICAL", status: "OPEN", snippet: "req..." },
  ]);

  return (
    <div style={styles.appWrapper}>
      {/* Search Header */}
      <div style={styles.topHeader}>
        <div style={styles.searchBox}>
          🔍 Search
        </div>
      </div>

      {/* 1. REGISTER PAGE */}
      {currentPage === "register" && (
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.authTitle}>Register Account</h2>
            
            <div style={styles.formGroup}>
              <div style={{ display: "flex", gap: "12px" }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>First Name</label>
                  <input style={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Jane" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Last Name</label>
                  <input style={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
                </div>
              </div>

              <div>
                <label style={styles.label}>Company Name</label>
                <input style={styles.input} type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp (Optional)" />
              </div>

              <div>
                <label style={styles.label}>Email Address</label>
                <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="manager@gmail.com" />
              </div>

              <div>
                <label style={styles.label}>Password (min 8 chars)</label>
                <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>

              <div>
                <label style={styles.label}>Select Role</label>
                <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Resolution Agent">Resolution Agent</option>
                  <option value="Platform Admin">Platform Admin</option>
                </select>
              </div>

              <button style={styles.blueBtn} onClick={() => setCurrentPage("dashboard")}>Create Account</button>
            </div>

            <p style={{ marginTop: "18px", fontSize: "13px", textAlign: "center", color: "#64748b" }}>
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
              <div>
                <label style={styles.label}>Email Address</label>
                <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="manager@gmail.com" />
              </div>

              <div>
                <label style={styles.label}>Password</label>
                <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>

              <button style={styles.blueBtn} onClick={() => setCurrentPage("dashboard")}>Login</button>
            </div>

            <p style={{ marginTop: "18px", fontSize: "13px", textAlign: "center", color: "#64748b" }}>
              Don't have an account? <span style={styles.linkText} onClick={() => setCurrentPage("register")}>Register here</span>
            </p>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD PAGE */}
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
                  color: activeNav === item ? "#ffffff" : "#94a3b8",
                }}
                onClick={() => setActiveNav(item)}
              >
                {item}
              </span>
            ))}
          </div>

          <div style={styles.mainContent}>
            {/* HOME / OVERVIEW */}
            {activeNav === "Home" && (
              <div>
                <h2 style={styles.pageHeading}>Platform Overview</h2>
                
                <div style={styles.metricsGrid}>
                  <div style={{ ...styles.card, borderLeft: "4px solid #2563eb" }}>
                    <span style={styles.metricLabel}>TOTAL USERS</span>
                    <h3 style={styles.metricVal}>8</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #10b981" }}>
                    <span style={styles.metricLabel}>TRACKED PRODUCTS</span>
                    <h3 style={styles.metricVal}>12</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #ef4444" }}>
                    <span style={styles.metricLabel}>ACTIVE TICKETS</span>
                    <h3 style={styles.metricVal}>3</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #f59e0b" }}>
                    <span style={styles.metricLabel}>ACTIVE SENTIMENT</span>
                    <h3 style={styles.metricVal}>3.8</h3>
                  </div>
                </div>

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
                      <li><span style={{ color: "#2563eb" }}>●</span> New brand manager registered Brand Corp<br/><span style={styles.timeText}>1 hour ago</span></li>
                      <li><span style={{ color: "#2563eb" }}>●</span> System wide review ingestion completed<br/><span style={styles.timeText}>3 hours ago</span></li>
                      <li><span style={{ color: "#2563eb" }}>●</span> Critical ticket auto-assigned to Agent Smith<br/><span style={styles.timeText}>5 hours ago</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* USERS TAB */}
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
                    {users.map((u, i) => (
                      <tr key={i} style={styles.tableRow}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company}</td>
                        <td><span style={styles.roleBadge}>{u.role}</span></td>
                        <td><span style={styles.statusBadge}>{u.status}</span></td>
                        <td><button style={styles.actionBtn}>Toggle Status</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeNav === "Products" && (
              <div style={styles.card}>
                <h2 style={styles.pageHeading}>Tracked Products</h2>
                <div style={{ marginBottom: "15px" }}>
                  <input style={{ ...styles.input, width: "300px" }} type="text" placeholder="Search products by name or category..." />
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Name</th><th>Category</th><th>Total Reviews</th><th>Avg Sentiment</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p, i) => (
                      <tr key={i} style={styles.tableRow}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.totalReviews}</td>
                        <td>{p.avgSentiment}</td>
                        <td><button style={styles.actionBtn}>Edit</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* REVIEWS & TICKETS TAB */}
            {(activeNav === "Reviews" || activeNav === "Insights") && (
              <div style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <h2 style={styles.pageHeading}>Resolution Tickets</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button style={styles.tabToggleActive}>My Tickets</button>
                    <button style={styles.tabToggle}>Available Tickets</button>
                  </div>
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Ticket ID</th><th>Priority</th><th>Status</th><th>Review Snippet</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets.map((t, i) => (
                      <tr key={i} style={styles.tableRow}>
                        <td>{t.id}</td>
                        <td style={{ color: t.priority === "CRITICAL" ? "#ef4444" : "#f59e0b", fontWeight: "600" }}>{t.priority}</td>
                        <td>{t.status}</td>
                        <td>{t.snippet}</td>
                        <td><button style={styles.actionBtn}>Claim Ticket</button></td>
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
  appWrapper: { backgroundColor: "#eef2f6", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", paddingBottom: "60px" },
  topHeader: { backgroundColor: "#ffffff", padding: "10px 20px", display: "flex", justifyContent: "center", borderBottom: "1px solid #e2e8f0" },
  searchBox: { color: "#64748b", fontSize: "14px", backgroundColor: "#f1f5f9", padding: "6px 20px", borderRadius: "6px", width: "320px", textAlign: "center" },
  authContainer: { display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "40px" },
  authCard: { backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px", width: "400px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" },
  authTitle: { textAlign: "center", marginBottom: "24px", color: "#1e293b", fontSize: "22px", fontWeight: "600" },
  formGroup: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px", display: "block" },
  input: { width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  blueBtn: { backgroundColor: "#3b82f6", color: "#ffffff", border: "none", padding: "10px", borderRadius: "4px", fontWeight: "600", cursor: "pointer", marginTop: "10px", fontSize: "14px" },
  linkText: { color: "#3b82f6", cursor: "pointer", fontWeight: "500" },
  dashboardContainer: { width: "95%", maxWidth: "1100px", margin: "20px auto" },
  navbar: { backgroundColor: "#1e293b", display: "flex", gap: "25px", padding: "12px 24px", borderRadius: "6px 6px 0 0" },
  navItem: { cursor: "pointer", fontSize: "14px", paddingBottom: "4px" },
  mainContent: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "0 0 6px 6px", border: "1px solid #e2e8f0", borderTop: "none" },
  pageHeading: { margin: "0 0 20px 0", color: "#1e293b", fontSize: "18px", fontWeight: "600" },
  metricsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "24px" },
  card: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "6px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" },
  metricLabel: { color: "#64748b", fontSize: "11px", fontWeight: "600", letterSpacing: "0.5px" },
  metricVal: { margin: "10px 0 0 0", fontSize: "26px", color: "#0f172a", fontWeight: "700" },
  rowGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  cardTitle: { margin: "0 0 16px 0", color: "#334155", fontSize: "15px" },
  chartWrapper: { display: "flex", alignItems: "center", gap: "24px" },
  donutChart: { width: "110px", height: "110px", borderRadius: "50%", background: "conic-gradient(#ef4444 0% 25%, #3b82f6 25% 70%, #10b981 70% 100%)" },
  chartLegend: { fontSize: "13px", lineHeight: "2", color: "#475569" },
  timelineList: { listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#334155" },
  timeText: { color: "#94a3b8", fontSize: "12px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  tableHeader: { backgroundColor: "#f8fafc", textAlign: "left", color: "#475569", borderBottom: "1px solid #e2e8f0" },
  tableRow: { borderBottom: "1px solid #f1f5f9", color: "#334155" },
  roleBadge: { backgroundColor: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  statusBadge: { backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  actionBtn: { backgroundColor: "#3b82f6", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "500" },
  tabToggleActive: { backgroundColor: "#3b82f6", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  tabToggle: { backgroundColor: "#f1f5f9", color: "#475569", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, height: "48px", backgroundColor: "#ffffff", display: "flex", gap: "12px", padding: "8px 16px", borderTop: "1px solid #cbd5e1", boxSizing: "border-box" },
  pullBtn: { flex: 1, backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer" },
  checkBtn: { flex: 1, backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }
};