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
  const [activeNav, setActiveNav] = useState("Products");

  // Auth States
  const [firstName, setFirstName] = useState("Jane");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [role, setRole] = useState("Brand Manager");

  // Filter & Modal States
  const [productSearch, setProductSearch] = useState("");
  const [ticketTab, setTicketTab] = useState("available");
  const [ticketStatusFilter, setTicketStatusFilter] = useState("ALL");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("ELECTRONICS");
  const [toastMessage, setToastMessage] = useState("");

  // Users Table Data
  const [users, setUsers] = useState([
    { id: "#1", name: "Brand Manager", email: "manager@brandcorp.com", company: "Brand Corp", role: "BRAND_MANAGER", status: "Active" },
    { id: "#2", name: "Support Agent", email: "agent@reviewrave.com", company: "ReviewRave Support", role: "RESOLUTION_AGENT", status: "Inactive" },
    { id: "#3", name: "Platform Admin", email: "admin@reviewrave.com", company: "ReviewRave Inc", role: "PLATFORM_ADMIN", status: "Active" },
    { id: "#4", name: "manager", email: "manager@gmail.com", company: "manager@gmail.com", role: "BRAND_MANAGER", status: "Inactive" },
    { id: "#5", name: "agent", email: "agent@gmail.com", company: "Joko", role: "RESOLUTION_AGENT", status: "Active" },
    { id: "#6", name: "admin", email: "admin@gmail.com", company: "Acca", role: "PLATFORM_ADMIN", status: "Active" },
    { id: "#7", name: "manager", email: "manager@gmail.com", company: "manager", role: "BRAND_MANAGER", status: "Active" },
    { id: "#8", name: "Brand Manager", email: "brand@test.com", company: "TestingTest", role: "BRAND_MANAGER", status: "Active" },
  ]);

  // Tracked Products Data
  const [products, setProducts] = useState([
    { id: 1, name: "ProBook", category: "ELECTRONICS", totalReviews: 0, avgSentiment: 0.0 },
    { id: 2, name: "SaaS", category: "SOFTWARE", totalReviews: 0, avgSentiment: 0.0 },
    { id: 3, name: "Resort", category: "HOSPITALITY", totalReviews: 0, avgSentiment: 0.0 },
    { id: 4, name: "Tee", category: "RETAIL", totalReviews: 0, avgSentiment: 0.0 },
  ]);

  // Resolution Tickets Data
  const [tickets, setTickets] = useState([
    { id: "#2", priority: "HIGH", status: "OPEN", snippet: "hello...", assignedTo: null },
    { id: "#3", priority: "HIGH", status: "OPEN", snippet: "hahaha...", assignedTo: null },
    { id: "#4", priority: "CRITICAL", status: "OPEN", snippet: "req...", assignedTo: null },
  ]);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Button Handlers
  const handleToggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          const newStatus = user.status === "Active" ? "Inactive" : "Active";
          showNotification(`User ${user.name} status updated to ${newStatus}`);
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
  };

  const handleDeleteProduct = (productId, name) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showNotification(`Product "${name}" deleted successfully!`);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const newProd = {
      id: Date.now(),
      name: newProdName,
      category: newProdCategory,
      totalReviews: 0,
      avgSentiment: 0.0,
    };
    setProducts([...products, newProd]);
    setNewProdName("");
    setIsAddProductOpen(false);
    showNotification(`Product "${newProdName}" added successfully!`);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    setProducts((prev) =>
      prev.map((p) => (p.id === editingProduct.id ? editingProduct : p))
    );
    showNotification(`Product "${editingProduct.name}" updated!`);
    setEditingProduct(null);
  };

  const handleClaimTicket = (ticketId) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          showNotification(`Ticket ${ticketId} claimed!`);
          return { ...t, assignedTo: "Current User", status: "IN_PROGRESS" };
        }
        return t;
      })
    );
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredTickets = tickets.filter((t) => {
    if (ticketTab === "my" && t.assignedTo !== "Current User") return false;
    if (ticketTab === "available" && t.assignedTo === "Current User") return false;
    if (ticketStatusFilter !== "ALL" && t.status !== ticketStatusFilter) return false;
    return true;
  });

  return (
    <div style={styles.appWrapper}>
      {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

      <div style={styles.topHeader}>
        <div style={styles.searchBox}>🔍 Search</div>
        {currentPage === "dashboard" && (
          <button style={styles.logoutBtn} onClick={() => { setCurrentPage("login"); showNotification("Logged out"); }}>
            Logout
          </button>
        )}
      </div>

      {currentPage === "register" && (
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.authTitle}>Register Account</h2>
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage("dashboard"); showNotification("Account Created!"); }}>
              <div style={styles.formGroup}>
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>First Name</label>
                    <input style={styles.input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={styles.label}>Last Name</label>
                    <input style={styles.input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div>
                  <label style={styles.label}>Company Name</label>
                  <input style={styles.input} type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Acme Corp (Optional)" />
                </div>
                <div>
                  <label style={styles.label}>Email Address</label>
                  <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label style={styles.label}>Password (min 8 chars)</label>
                  <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} />
                </div>
                <div>
                  <label style={styles.label}>Select Role</label>
                  <select style={styles.input} value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Brand Manager">Brand Manager</option>
                    <option value="Resolution Agent">Resolution Agent</option>
                    <option value="Platform Admin">Platform Admin</option>
                  </select>
                </div>
                <button type="submit" style={styles.blueBtn}>Create Account</button>
              </div>
            </form>
            <p style={{ marginTop: "18px", fontSize: "13px", textAlign: "center", color: "#64748b" }}>
              Already have an account? <span style={styles.linkText} onClick={() => setCurrentPage("login")}>Login here</span>
            </p>
          </div>
        </div>
      )}

      {currentPage === "login" && (
        <div style={styles.authContainer}>
          <div style={styles.authCard}>
            <h2 style={styles.authTitle}>Login to ReviewRave</h2>
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage("dashboard"); showNotification("Welcome back!"); }}>
              <div style={styles.formGroup}>
                <div>
                  <label style={styles.label}>Email Address</label>
                  <input style={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label style={styles.label}>Password</label>
                  <input style={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" style={styles.blueBtn}>Login</button>
              </div>
            </form>
            <p style={{ marginTop: "18px", fontSize: "13px", textAlign: "center", color: "#64748b" }}>
              Don't have an account? <span style={styles.linkText} onClick={() => setCurrentPage("register")}>Register here</span>
            </p>
          </div>
        </div>
      )}

      {currentPage === "dashboard" && (
        <div style={styles.dashboardContainer}>
          <div style={styles.navbar}>
            {["Home", "Users", "Products", "Reviews", "Insights"].map((tab) => (
              <span
                key={tab}
                style={{
                  ...styles.navItem,
                  borderBottom: activeNav === tab ? "2px solid #ffffff" : "none",
                  fontWeight: activeNav === tab ? "600" : "normal",
                  color: activeNav === tab ? "#ffffff" : "#94a3b8",
                }}
                onClick={() => setActiveNav(tab)}
              >
                {tab}
              </span>
            ))}
          </div>

          <div style={styles.mainContent}>
            {activeNav === "Home" && (
              <div>
                <h2 style={styles.pageHeading}>Platform Overview</h2>
                <div style={styles.metricsGrid}>
                  <div style={{ ...styles.card, borderLeft: "4px solid #2563eb" }}>
                    <span style={styles.metricLabel}>TOTAL USERS</span>
                    <h3 style={styles.metricVal}>{users.length}</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #10b981" }}>
                    <span style={styles.metricLabel}>TRACKED PRODUCTS</span>
                    <h3 style={styles.metricVal}>{products.length}</h3>
                  </div>
                  <div style={{ ...styles.card, borderLeft: "4px solid #ef4444" }}>
                    <span style={styles.metricLabel}>ACTIVE TICKETS</span>
                    <h3 style={styles.metricVal}>{tickets.length}</h3>
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
                    {users.map((u) => (
                      <tr key={u.id} style={styles.tableRow}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.company}</td>
                        <td><span style={styles.roleBadge}>{u.role}</span></td>
                        <td>
                          <span style={u.status === "Active" ? styles.statusActive : styles.statusInactive}>
                            {u.status}
                          </span>
                        </td>
                        <td>
                          <button style={styles.actionBtn} onClick={() => handleToggleUserStatus(u.id)}>
                            Toggle Status
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeNav === "Products" && (
              <div style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ ...styles.pageHeading, margin: 0 }}>Tracked Products</h2>
                  <button style={styles.addBtn} onClick={() => setIsAddProductOpen(true)}>
                    + Add Product
                  </button>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <input
                    style={{ ...styles.input, width: "320px" }}
                    type="text"
                    placeholder="Search products by name or category..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </div>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Name</th><th>Category</th><th>Total Reviews</th><th>Avg Sentiment</th><th style={{ textAlign: "right", paddingRight: "20px" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p) => (
                      <tr key={p.id} style={styles.tableRow}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.totalReviews}</td>
                        <td>{p.avgSentiment.toFixed(1)}</td>
                        <td style={{ textAlign: "right" }}>
                          <div style={{ display: "inline-flex", gap: "6px" }}>
                            <button style={styles.actionBtn} onClick={() => setEditingProduct(p)}>
                              Edit
                            </button>
                            <button style={styles.deleteBtn} onClick={() => handleDeleteProduct(p.id, p.name)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {(activeNav === "Reviews" || activeNav === "Insights") && (
              <div style={styles.card}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                  <h2 style={styles.pageHeading}>Resolution Tickets</h2>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      style={ticketTab === "my" ? styles.tabToggleActive : styles.tabToggle}
                      onClick={() => setTicketTab("my")}
                    >
                      My Tickets
                    </button>
                    <button
                      style={ticketTab === "available" ? styles.tabToggleActive : styles.tabToggle}
                      onClick={() => setTicketTab("available")}
                    >
                      Available Tickets
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "13px", color: "#64748b" }}>Filter by Status:</span>
                  <select style={{ ...styles.input, width: "150px" }} value={ticketStatusFilter} onChange={(e) => setTicketStatusFilter(e.target.value)}>
                    <option value="ALL">All Statuses</option>
                    <option value="OPEN">OPEN</option>
                    <option value="IN_PROGRESS">IN_PROGRESS</option>
                  </select>
                </div>

                <table style={styles.table}>
                  <thead>
                    <tr style={styles.tableHeader}>
                      <th>Ticket ID</th><th>Priority</th><th>Status</th><th>Review Snippet</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map((t) => (
                      <tr key={t.id} style={styles.tableRow}>
                        <td>{t.id}</td>
                        <td style={{ color: t.priority === "CRITICAL" ? "#ef4444" : "#f59e0b", fontWeight: "600" }}>{t.priority}</td>
                        <td>{t.status}</td>
                        <td>{t.snippet}</td>
                        <td>
                          {t.assignedTo ? (
                            <span style={{ color: "#16a34a", fontSize: "12px", fontWeight: "600" }}>Claimed</span>
                          ) : (
                            <button style={styles.actionBtn} onClick={() => handleClaimTicket(t.id)}>
                              Claim Ticket
                            </button>
                          )}
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

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div style={styles.formGroup}>
                <div>
                  <label style={styles.label}>Product Name</label>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="e.g. Laptop Pro"
                    value={newProdName}
                    onChange={(e) => setNewProdName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label style={styles.label}>Category</label>
                  <select
                    style={styles.input}
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value)}
                  >
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="SOFTWARE">SOFTWARE</option>
                    <option value="HOSPITALITY">HOSPITALITY</option>
                    <option value="RETAIL">RETAIL</option>
                  </select>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" style={styles.blueBtn}>Add Product</button>
                  <button type="button" style={{ ...styles.blueBtn, backgroundColor: "#64748b" }} onClick={() => setIsAddProductOpen(false)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "16px" }}>Edit Product: {editingProduct.name}</h3>
            <form onSubmit={handleSaveProduct}>
              <div style={styles.formGroup}>
                <div>
                  <label style={styles.label}>Category</label>
                  <input
                    style={styles.input}
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                  />
                </div>
                <div>
                  <label style={styles.label}>Avg Sentiment</label>
                  <input
                    style={styles.input}
                    type="number"
                    step="0.1"
                    value={editingProduct.avgSentiment}
                    onChange={(e) => setEditingProduct({ ...editingProduct, avgSentiment: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button type="submit" style={styles.blueBtn}>Save Changes</button>
                  <button type="button" style={{ ...styles.blueBtn, backgroundColor: "#64748b" }} onClick={() => setEditingProduct(null)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.bottomBar}>
        <button style={styles.pullBtn} onClick={() => showNotification("Data Sync Completed!")}>Pull</button>
        <button style={styles.checkBtn} onClick={() => showNotification("System Verification Passed!")}>Check Verify</button>
      </div>
    </div>
  );
}

const styles = {
  appWrapper: { backgroundColor: "#eef2f6", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", paddingBottom: "60px", position: "relative" },
  topHeader: { backgroundColor: "#ffffff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #e2e8f0" },
  searchBox: { color: "#64748b", fontSize: "14px", backgroundColor: "#f1f5f9", padding: "6px 20px", borderRadius: "6px", width: "320px", textAlign: "center", margin: "0 auto" },
  logoutBtn: { backgroundColor: "#ef4444", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  authContainer: { display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "40px" },
  authCard: { backgroundColor: "#ffffff", padding: "32px", borderRadius: "8px", width: "400px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", border: "1px solid #e2e8f0" },
  authTitle: { textAlign: "center", marginBottom: "24px", color: "#1e293b", fontSize: "22px", fontWeight: "600" },
  formGroup: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px", display: "block" },
  input: { width: "100%", padding: "8px 12px", borderRadius: "4px", border: "1px solid #cbd5e1", backgroundColor: "#f8fafc", fontSize: "14px", outline: "none", boxSizing: "border-box" },
  blueBtn: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "8px 14px", borderRadius: "4px", fontWeight: "600", cursor: "pointer", fontSize: "13px", flex: 1 },
  addBtn: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", fontWeight: "600", cursor: "pointer", fontSize: "12px" },
  linkText: { color: "#2563eb", cursor: "pointer", fontWeight: "500" },
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
  donutChart: { width: "110px", height: "110px", borderRadius: "50%", background: "conic-gradient(#ef4444 0% 25%, #2563eb 25% 70%, #10b981 70% 100%)" },
  chartLegend: { fontSize: "13px", lineHeight: "2", color: "#475569" },
  timelineList: { listStyle: "none", padding: 0, margin: 0, fontSize: "13px", lineHeight: "1.6", color: "#334155" },
  timeText: { color: "#94a3b8", fontSize: "12px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  tableHeader: { backgroundColor: "#f8fafc", textAlign: "left", color: "#475569", borderBottom: "1px solid #e2e8f0", padding: "10px 8px" },
  tableRow: { borderBottom: "1px solid #f1f5f9", color: "#334155" },
  roleBadge: { backgroundColor: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  statusActive: { backgroundColor: "#dcfce7", color: "#16a34a", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  statusInactive: { backgroundColor: "#fee2e2", color: "#ef4444", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "600" },
  actionBtn: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "500" },
  deleteBtn: { backgroundColor: "#ef4444", color: "#ffffff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "500" },
  tabToggleActive: { backgroundColor: "#2563eb", color: "#ffffff", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  tabToggle: { backgroundColor: "#f1f5f9", color: "#475569", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 },
  modalCard: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px", width: "350px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" },
  toast: { position: "fixed", top: "20px", right: "20px", backgroundColor: "#0f172a", color: "#ffffff", padding: "12px 20px", borderRadius: "6px", fontSize: "14px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 1000 },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, height: "48px", backgroundColor: "#ffffff", display: "flex", gap: "12px", padding: "8px 16px", borderTop: "1px solid #cbd5e1", boxSizing: "border-box" },
  pullBtn: { flex: 1, backgroundColor: "#16a34a", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer" },
  checkBtn: { flex: 1, backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "600", cursor: "pointer" }
};