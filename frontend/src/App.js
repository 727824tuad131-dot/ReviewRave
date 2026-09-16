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
  // Navigation & Role States
  const [currentPage, setCurrentPage] = useState("dashboard"); 
  const [selectedRole, setSelectedRole] = useState("Brand Manager"); // Set to Brand Manager as in screenshot
  const [activeTab, setActiveTab] = useState("Tracked Products");

  // Auth Form States
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");

  // Toast State
  const [toastMessage, setToastMessage] = useState("");

  // ADD Product Modal States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Electronics");

  // EDIT Product Modal States
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProdName, setEditProdName] = useState("");
  const [editProdCategory, setEditProdCategory] = useState("Electronics");

  // Data States
  const [products, setProducts] = useState([
    { id: 1, name: "Acme Smart Watch", category: "Electronics", status: "Active", totalReviews: 324, positiveRate: "82%", rating: 4.3 },
    { id: 2, name: "Acme Wireless Earbuds", category: "Audio", status: "Active", totalReviews: 120, positiveRate: "78%", rating: 4.1 },
    { id: 3, name: "SaaS Platform Pro", category: "Software", status: "Active", totalReviews: 45, positiveRate: "90%", rating: 4.7 },
  ]);

  const [users, setUsers] = useState([
    { id: "#001", name: "John Doe", email: "john@reviewrave.com", role: "BRAND_MANAGER", status: "Active" },
    { id: "#002", name: "Support Agent", email: "agent@reviewrave.com", role: "RESOLUTION_AGENT", status: "Active" },
    { id: "#003", name: "Admin User", email: "admin@reviewrave.com", role: "PLATFORM_ADMIN", status: "Active" },
  ]);

  const [tickets, setTickets] = useState([
    { id: "#102", priority: "HIGH", status: "OPEN", snippet: "Hello, product stopped working after two weeks...", assignedTo: null },
    { id: "#103", priority: "HIGH", status: "OPEN", snippet: "Feedback regarding battery drainage...", assignedTo: null },
  ]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
    if (selectedRole === "Brand Manager") setActiveTab("Tracked Products");
    else if (selectedRole === "Resolution Agent") setActiveTab("Resolution Tickets");
    else setActiveTab("Overview");
    showToast(`Logged in successfully!`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentPage("login");
    showToast(`Registered successfully! Please login.`);
  };

  // HANDLE ADD PRODUCT
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const newProd = {
      id: Date.now(),
      name: newProdName,
      category: newProdCategory,
      status: "Active",
      totalReviews: 0,
      positiveRate: "100%",
      rating: 5.0,
    };
    setProducts([...products, newProd]);
    setNewProdName("");
    setNewProdCategory("Electronics");
    setIsAddProductOpen(false);
    showToast(`Product "${newProdName}" added successfully!`);
  };

  // HANDLE EDIT PRODUCT
  const handleOpenEditModal = (product) => {
    setEditingProductId(product.id);
    setEditProdName(product.name);
    setEditProdCategory(product.category);
    setIsEditProductOpen(true);
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    setProducts(
      products.map((p) =>
        p.id === editingProductId ? { ...p, name: editProdName, category: editProdCategory } : p
      )
    );
    setIsEditProductOpen(false);
    showToast("Product updated successfully!");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast("Product deleted!");
  };

  return (
    <div style={styles.appWrapper}>
      {/* Toast Alert */}
      {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

      {/* 1. LOGIN PAGE */}
      {currentPage === "login" && (
        <div style={styles.authWrapper}>
          <div style={styles.authCard}>
            <div style={styles.authLeft}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
                  <div style={styles.logoBox}>R</div>
                  <span style={{ fontSize: "20px", fontWeight: "700" }}>ReviewRave</span>
                </div>
                <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>
                  Turn customer feedback into action
                </h2>
              </div>
              <span style={{ fontSize: "11px", color: "#a5b4fc" }}>© 2026 ReviewRave.</span>
            </div>

            <div style={styles.authRight}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0" }}>Login to ReviewRave</h3>
              <form onSubmit={handleLogin} style={styles.formStack}>
                <div>
                  <label style={styles.label}>Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
                </div>
                <div>
                  <label style={styles.label}>Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
                </div>
                <button type="submit" style={styles.primaryBtn}>
                  Login to Dashboard
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 2. DASHBOARD */}
      {currentPage === "dashboard" && (
        <div style={{ minHeight: "100vh" }}>
          {/* Header */}
          <header style={styles.navbar}>
            <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={styles.logoBox}>R</div>
                <span style={{ fontWeight: "700", fontSize: "16px" }}>ReviewRave</span>
              </div>

              {/* Navigation Tabs */}
              <nav style={{ display: "flex", gap: "4px" }}>
                {["Tracked Products", "Sentiment Insights", "Reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      ...styles.navTab,
                      backgroundColor: activeTab === tab ? "#e0e7ff" : "transparent",
                      color: activeTab === tab ? "#4338ca" : "#475569",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={styles.roleBadge}>{selectedRole}</span>
              <button onClick={() => setCurrentPage("login")} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          </header>

          {/* Main Body */}
          <main style={styles.mainContainer}>
            {activeTab === "Tracked Products" && (
              <div>
                <div style={styles.sectionHeader}>
                  <div>
                    <h2 style={styles.heading}>Tracked Products</h2>
                    <span style={styles.subHeading}>Monitor customer feedback and sentiment</span>
                  </div>
                  {/* TRIGGER FOR ADD PRODUCT MODAL */}
                  <button onClick={() => setIsAddProductOpen(true)} style={styles.primaryBtnWidth}>
                    + Add Product
                  </button>
                </div>

                <div style={styles.statsGrid}>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Tracked Products</span>
                    <div style={styles.statVal}>{products.length}</div>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Total Reviews</span>
                    <div style={styles.statVal}>1,240</div>
                  </div>
                  <div style={styles.statCard}>
                    <span style={styles.statLabel}>Positive Sentiment</span>
                    <div style={{ ...styles.statVal, color: "#16a34a" }}>78%</div>
                  </div>
                </div>

                <div style={styles.gridContainer}>
                  {products.map((p) => (
                    <div key={p.id} style={styles.productCard}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <h4 style={{ margin: 0, fontWeight: "700", fontSize: "15px" }}>{p.name}</h4>
                          <span style={styles.activeTag}>{p.status}</span>
                        </div>
                        <span style={{ fontSize: "12px", color: "#94a3b8" }}>{p.category}</span>
                      </div>
                      <div style={{ display: "flex", gap: "6px", marginTop: "15px" }}>
                        <button onClick={() => handleOpenEditModal(p)} style={styles.secondaryBtn}>
                          Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(p.id)} style={styles.deleteIconBtn}>
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* 3. ADD PRODUCT MODAL (FIXED & ADDED HERE) */}
      {isAddProductOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", fontWeight: "700" }}>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={styles.formStack}>
              <div>
                <label style={styles.label}>Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Headphones"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div>
                <label style={styles.label}>Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  style={styles.input}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Audio">Audio</option>
                  <option value="Software">Software</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={{ ...styles.primaryBtn, flex: 1 }}>
                  Save Product
                </button>
                <button type="button" onClick={() => setIsAddProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. EDIT PRODUCT MODAL */}
      {isEditProductOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", fontWeight: "700" }}>Edit Product</h3>
            <form onSubmit={handleSaveEditProduct} style={styles.formStack}>
              <div>
                <label style={styles.label}>Product Name</label>
                <input
                  type="text"
                  value={editProdName}
                  onChange={(e) => setEditProdName(e.target.value)}
                  style={styles.input}
                  required
                />
              </div>
              <div>
                <label style={styles.label}>Category</label>
                <select
                  value={editProdCategory}
                  onChange={(e) => setEditProdCategory(e.target.value)}
                  style={styles.input}
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Audio">Audio</option>
                  <option value="Software">Software</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button type="submit" style={{ ...styles.primaryBtn, flex: 1 }}>
                  Update
                </button>
                <button type="button" onClick={() => setIsEditProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// STYLES
const styles = {
  appWrapper: { fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", color: "#0f172a" },
  authWrapper: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f5f9", padding: "20px" },
  authCard: { display: "flex", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", maxWidth: "850px", width: "100%", border: "1px solid #e2e8f0" },
  authLeft: { backgroundColor: "#4f46e5", color: "#ffffff", padding: "40px", width: "45%", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  authRight: { padding: "40px", width: "55%", display: "flex", flexDirection: "column", justify: "center" },
  logoBox: { width: "28px", height: "28px", backgroundColor: "#4f46e5", color: "#fff", borderRadius: "6px", display: "flex", alignItems: "center", justifyCenter: "center", fontWeight: "bold" },
  formStack: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px", display: "block" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box", outline: "none" },
  primaryBtn: { backgroundColor: "#4f46e5", color: "#ffffff", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "13px" },
  primaryBtnWidth: { backgroundColor: "#4f46e5", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "13px" },
  secondaryBtn: { backgroundColor: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", textAlign: "center" },
  deleteIconBtn: { backgroundColor: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
  navbar: { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  navTab: { border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
  roleBadge: { backgroundColor: "#e0e7ff", color: "#3730a3", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" },
  logoutBtn: { backgroundColor: "transparent", border: "1px solid #cbd5e1", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
  mainContainer: { maxWidth: "1100px", margin: "24px auto", padding: "0 20px" },
  heading: { fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0" },
  subHeading: { fontSize: "12px", color: "#64748b" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
  statCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px" },
  statLabel: { fontSize: "12px", color: "#94a3b8", fontWeight: "600" },
  statVal: { fontSize: "24px", fontWeight: "700", marginTop: "4px" },
  gridContainer: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  productCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  activeTag: { backgroundColor: "#dcfce7", color: "#15803d", fontSize: "10px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" },
  toast: { position: "fixed", top: "20px", right: "20px", backgroundColor: "#0f172a", color: "#ffffff", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", zIndex: 1000 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 },
  modalCard: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", width: "340px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
};