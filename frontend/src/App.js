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



// import React, { useState } from "react";

// export default function App() {
//   // Navigation & Role States
//   const [currentPage, setCurrentPage] = useState("dashboard"); 
//   const [selectedRole, setSelectedRole] = useState("Brand Manager"); 
//   const [activeTab, setActiveTab] = useState("Sentiment Insights");

//   // Auth Form States
//   const [email, setEmail] = useState("manager@gmail.com");
//   const [password, setPassword] = useState("12345678");

//   // Toast State
//   const [toastMessage, setToastMessage] = useState("");

//   // ADD Product Modal States
//   const [isAddProductOpen, setIsAddProductOpen] = useState(false);
//   const [newProdName, setNewProdName] = useState("");
//   const [newProdCategory, setNewProdCategory] = useState("Electronics");

//   // EDIT Product Modal States
//   const [isEditProductOpen, setIsEditProductOpen] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [editProdName, setEditProdName] = useState("");
//   const [editProdCategory, setEditProdCategory] = useState("Electronics");

//   // Data States
//   const [products, setProducts] = useState([
//     { id: 1, name: "Acme Smart Watch", category: "Electronics", status: "Active", totalReviews: 324, positiveRate: "82%", rating: 4.3 },
//     { id: 2, name: "Acme Wireless Earbuds", category: "Audio", status: "Active", totalReviews: 120, positiveRate: "78%", rating: 4.1 },
//     { id: 3, name: "SaaS Platform Pro", category: "Software", status: "Active", totalReviews: 45, positiveRate: "90%", rating: 4.7 },
//   ]);

//   const [reviewsList] = useState([
//     { id: 101, user: "Alex Mercer", product: "Acme Smart Watch", rating: "5/5", sentiment: "Positive", comment: "The battery life is amazing! Lasted almost 3 days on a single charge." },
//     { id: 102, user: "Samantha Paul", product: "Acme Wireless Earbuds", rating: "2/5", sentiment: "Negative", comment: "The Bluetooth connectivity keeps dropping during calls." },
//     { id: 103, user: "David Miller", product: "SaaS Platform Pro", rating: "4/5", sentiment: "Positive", comment: "Great UI interface, made our team workflow 2x faster." },
//     { id: 104, user: "Elena Rostova", product: "Acme Smart Watch", rating: "3/5", sentiment: "Neutral", comment: "Good design but step counter isn't very accurate." }
//   ]);

//   // Toast Helper
//   const showToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(""), 3000);
//   };

//   // Handlers
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setCurrentPage("dashboard");
//     setActiveTab("Tracked Products");
//     showToast(`Logged in successfully!`);
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();
//     if (!newProdName.trim()) return;
//     const newProd = {
//       id: Date.now(),
//       name: newProdName,
//       category: newProdCategory,
//       status: "Active",
//       totalReviews: 0,
//       positiveRate: "100%",
//       rating: 5.0,
//     };
//     setProducts([...products, newProd]);
//     setNewProdName("");
//     setNewProdCategory("Electronics");
//     setIsAddProductOpen(false);
//     showToast(`Product "${newProdName}" added successfully!`);
//   };

//   const handleOpenEditModal = (product) => {
//     setEditingProductId(product.id);
//     setEditProdName(product.name);
//     setEditProdCategory(product.category);
//     setIsEditProductOpen(true);
//   };

//   const handleSaveEditProduct = (e) => {
//     e.preventDefault();
//     setProducts(
//       products.map((p) =>
//         p.id === editingProductId ? { ...p, name: editProdName, category: editProdCategory } : p
//       )
//     );
//     setIsEditProductOpen(false);
//     showToast("Product updated successfully!");
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//     showToast("Product deleted!");
//   };

//   return (
//     <div style={styles.appWrapper}>
//       {/* Toast Alert */}
//       {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

//       {/* LOGIN PAGE */}
//       {currentPage === "login" && (
//         <div style={styles.authWrapper}>
//           <div style={styles.authCard}>
//             <div style={styles.authLeft}>
//               <div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "30px" }}>
//                   <div style={styles.logoBox}>R</div>
//                   <span style={{ fontSize: "20px", fontWeight: "700" }}>ReviewRave</span>
//                 </div>
//                 <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>
//                   Turn customer feedback into action
//                 </h2>
//               </div>
//               <span style={{ fontSize: "11px", color: "#a5b4fc" }}>© 2026 ReviewRave.</span>
//             </div>

//             <div style={styles.authRight}>
//               <h3 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0" }}>Login to ReviewRave</h3>
//               <form onSubmit={handleLogin} style={styles.formStack}>
//                 <div>
//                   <label style={styles.label}>Email Address</label>
//                   <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
//                 </div>
//                 <div>
//                   <label style={styles.label}>Password</label>
//                   <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
//                 </div>
//                 <button type="submit" style={styles.primaryBtn}>
//                   Login to Dashboard
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DASHBOARD */}
//       {currentPage === "dashboard" && (
//         <div style={{ minHeight: "100vh" }}>
//           {/* Header */}
//           <header style={styles.navbar}>
//             <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>
//               <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                 <div style={styles.logoBox}>R</div>
//                 <span style={{ fontWeight: "700", fontSize: "16px" }}>ReviewRave</span>
//               </div>

//               {/* Navigation Tabs */}
//               <nav style={{ display: "flex", gap: "4px" }}>
//                 {["Tracked Products", "Sentiment Insights", "Reviews"].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     style={{
//                       ...styles.navTab,
//                       backgroundColor: activeTab === tab ? "#e0e7ff" : "transparent",
//                       color: activeTab === tab ? "#4338ca" : "#475569",
//                     }}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <span style={styles.roleBadge}>{selectedRole}</span>
//               <button onClick={() => setCurrentPage("login")} style={styles.logoutBtn}>
//                 Logout
//               </button>
//             </div>
//           </header>

//           {/* Main Body */}
//           <main style={styles.mainContainer}>
//             {/* 1. TRACKED PRODUCTS TAB */}
//             {activeTab === "Tracked Products" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>Tracked Products</h2>
//                     <span style={styles.subHeading}>Monitor customer feedback and sentiment</span>
//                   </div>
//                   <button onClick={() => setIsAddProductOpen(true)} style={styles.primaryBtnWidth}>
//                     + Add Product
//                   </button>
//                 </div>

//                 <div style={styles.statsGrid}>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Tracked Products</span>
//                     <div style={styles.statVal}>{products.length}</div>
//                   </div>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Total Reviews</span>
//                     <div style={styles.statVal}>1,240</div>
//                   </div>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Positive Sentiment</span>
//                     <div style={{ ...styles.statVal, color: "#16a34a" }}>78%</div>
//                   </div>
//                 </div>

//                 <div style={styles.gridContainer}>
//                   {products.map((p) => (
//                     <div key={p.id} style={styles.productCard}>
//                       <div>
//                         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                           <h4 style={{ margin: 0, fontWeight: "700", fontSize: "15px" }}>{p.name}</h4>
//                           <span style={styles.activeTag}>{p.status}</span>
//                         </div>
//                         <span style={{ fontSize: "12px", color: "#94a3b8" }}>{p.category}</span>
//                       </div>
//                       <div style={{ display: "flex", gap: "6px", marginTop: "15px" }}>
//                         <button onClick={() => handleOpenEditModal(p)} style={styles.secondaryBtn}>
//                           Edit
//                         </button>
//                         <button onClick={() => handleDeleteProduct(p.id)} style={styles.deleteIconBtn}>
//                           🗑️
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* 2. SENTIMENT INSIGHTS TAB */}
//             {activeTab === "Sentiment Insights" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>Sentiment Insights</h2>
//                     <span style={styles.subHeading}>AI-driven sentiment breakdown of feedback</span>
//                   </div>
//                 </div>

//                 <div style={styles.statsGrid}>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Positive Feedback</span>
//                     <div style={{ ...styles.statVal, color: "#16a34a" }}>78%</div>
//                   </div>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Neutral Feedback</span>
//                     <div style={{ ...styles.statVal, color: "#d97706" }}>14%</div>
//                   </div>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>Negative Feedback</span>
//                     <div style={{ ...styles.statVal, color: "#dc2626" }}>8%</div>
//                   </div>
//                 </div>

//                 <div style={styles.cardBox}>
//                   <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "15px" }}>Sentiment Distribution</h3>
//                   <div style={{ height: "12px", backgroundColor: "#e2e8f0", borderRadius: "6px", display: "flex", overflow: "hidden" }}>
//                     <div style={{ width: "78%", backgroundColor: "#22c55e" }} title="78% Positive" />
//                     <div style={{ width: "14%", backgroundColor: "#f59e0b" }} title="14% Neutral" />
//                     <div style={{ width: "8%", backgroundColor: "#ef4444" }} title="8% Negative" />
//                   </div>
//                 </div>

//                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
//                   <div style={styles.cardBox}>
//                     <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#16a34a", marginBottom: "10px" }}>💚 Top Positive Drivers</h3>
//                     <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
//                       <li>Battery Performance & Fast Charging</li>
//                       <li>Smooth UI & Clean Design</li>
//                       <li>Fast Support Response Time</li>
//                     </ul>
//                   </div>

//                   <div style={styles.cardBox}>
//                     <h3 style={{ fontSize: "14px", fontWeight: "700", color: "#dc2626", marginBottom: "10px" }}>💔 Top Customer Pain Points</h3>
//                     <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "#475569", lineHeight: "1.8" }}>
//                       <li>Bluetooth Connection Drops</li>
//                       <li>Accurate Step Tracking Calibration</li>
//                       <li>Shipping Delay in Rural Areas</li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* 3. REVIEWS TAB */}
//             {activeTab === "Reviews" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>Customer Reviews</h2>
//                     <span style={styles.subHeading}>Recent review entries from connected platforms</span>
//                   </div>
//                 </div>

//                 <div style={styles.tableCard}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.tableHeader}>
//                         <th style={styles.th}>Customer</th>
//                         <th style={styles.th}>Product</th>
//                         <th style={styles.th}>Rating</th>
//                         <th style={styles.th}>Sentiment</th>
//                         <th style={styles.th}>Feedback Comment</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {reviewsList.map((r) => (
//                         <tr key={r.id} style={styles.tableRow}>
//                           <td style={{ ...styles.td, fontWeight: "700" }}>{r.user}</td>
//                           <td style={styles.td}>{r.product}</td>
//                           <td style={styles.td}>{r.rating}</td>
//                           <td style={styles.td}>
//                             <span
//                               style={
//                                 r.sentiment === "Positive"
//                                   ? styles.activeTag
//                                   : r.sentiment === "Negative"
//                                   ? styles.critBadge
//                                   : styles.highBadge
//                               }
//                             >
//                               {r.sentiment}
//                             </span>
//                           </td>
//                           <td style={styles.td}>{r.comment}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       )}

//       {/* ADD PRODUCT MODAL */}
//       {isAddProductOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalCard}>
//             <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", fontWeight: "700" }}>Add New Product</h3>
//             <form onSubmit={handleAddProduct} style={styles.formStack}>
//               <div>
//                 <label style={styles.label}>Product Name</label>
//                 <input
//                   type="text"
//                   placeholder="e.g. Acme Headphones"
//                   value={newProdName}
//                   onChange={(e) => setNewProdName(e.target.value)}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//               <div>
//                 <label style={styles.label}>Category</label>
//                 <select
//                   value={newProdCategory}
//                   onChange={(e) => setNewProdCategory(e.target.value)}
//                   style={styles.input}
//                 >
//                   <option value="Electronics">Electronics</option>
//                   <option value="Audio">Audio</option>
//                   <option value="Software">Software</option>
//                 </select>
//               </div>
//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button type="submit" style={{ ...styles.primaryBtn, flex: 1 }}>
//                   Save Product
//                 </button>
//                 <button type="button" onClick={() => setIsAddProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* EDIT PRODUCT MODAL */}
//       {isEditProductOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalCard}>
//             <h3 style={{ margin: "0 0 15px 0", fontSize: "18px", fontWeight: "700" }}>Edit Product</h3>
//             <form onSubmit={handleSaveEditProduct} style={styles.formStack}>
//               <div>
//                 <label style={styles.label}>Product Name</label>
//                 <input
//                   type="text"
//                   value={editProdName}
//                   onChange={(e) => setEditProdName(e.target.value)}
//                   style={styles.input}
//                   required
//                 />
//               </div>
//               <div>
//                 <label style={styles.label}>Category</label>
//                 <select
//                   value={editProdCategory}
//                   onChange={(e) => setEditProdCategory(e.target.value)}
//                   style={styles.input}
//                 >
//                   <option value="Electronics">Electronics</option>
//                   <option value="Audio">Audio</option>
//                   <option value="Software">Software</option>
//                 </select>
//               </div>
//               <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//                 <button type="submit" style={{ ...styles.primaryBtn, flex: 1 }}>
//                   Update
//                 </button>
//                 <button type="button" onClick={() => setIsEditProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   appWrapper: { fontFamily: "Segoe UI, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", color: "#0f172a" },
//   authWrapper: { minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f1f5f9", padding: "20px" },
//   authCard: { display: "flex", backgroundColor: "#ffffff", borderRadius: "16px", overflow: "hidden", maxWidth: "850px", width: "100%", border: "1px solid #e2e8f0" },
//   authLeft: { backgroundColor: "#4f46e5", color: "#ffffff", padding: "40px", width: "45%", display: "flex", flexDirection: "column", justifyContent: "space-between" },
//   authRight: { padding: "40px", width: "55%", display: "flex", flexDirection: "column", justify: "center" },
//   logoBox: { width: "28px", height: "28px", backgroundColor: "#4f46e5", color: "#fff", borderRadius: "6px", display: "flex", alignItems: "center", justifyCenter: "center", fontWeight: "bold" },
//   formStack: { display: "flex", flexDirection: "column", gap: "14px" },
//   label: { fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px", display: "block" },
//   input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", fontSize: "13px", boxSizing: "border-box", outline: "none" },
//   primaryBtn: { backgroundColor: "#4f46e5", color: "#ffffff", border: "none", padding: "10px 16px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "13px" },
//   primaryBtnWidth: { backgroundColor: "#4f46e5", color: "#ffffff", border: "none", padding: "10px 18px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "13px" },
//   secondaryBtn: { backgroundColor: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer", textAlign: "center" },
//   deleteIconBtn: { backgroundColor: "#fee2e2", color: "#dc2626", border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", cursor: "pointer" },
//   navbar: { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "12px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" },
//   navTab: { border: "none", padding: "6px 12px", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer" },
//   roleBadge: { backgroundColor: "#e0e7ff", color: "#3730a3", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "700" },
//   logoutBtn: { backgroundColor: "transparent", border: "1px solid #cbd5e1", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", cursor: "pointer" },
//   mainContainer: { maxWidth: "1100px", margin: "24px auto", padding: "0 20px" },
//   heading: { fontSize: "20px", fontWeight: "700", margin: "0 0 4px 0" },
//   subHeading: { fontSize: "12px", color: "#64748b" },
//   sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
//   statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
//   statCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px" },
//   statLabel: { fontSize: "12px", color: "#94a3b8", fontWeight: "600" },
//   statVal: { fontSize: "24px", fontWeight: "700", marginTop: "4px" },
//   gridContainer: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
//   productCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "16px", borderRadius: "12px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
//   cardBox: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", padding: "20px", borderRadius: "12px" },
//   tableCard: { backgroundColor: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", overflow: "hidden" },
//   table: { width: "100%", borderCollapse: "collapse", fontSize: "12px" },
//   tableHeader: { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
//   th: { padding: "12px", textAlign: "left", color: "#64748b", fontWeight: "600" },
//   tableRow: { borderBottom: "1px solid #f1f5f9" },
//   td: { padding: "12px", color: "#334155" },
//   activeTag: { backgroundColor: "#dcfce7", color: "#15803d", fontSize: "10px", fontWeight: "700", padding: "2px 6px", borderRadius: "4px" },
//   critBadge: { backgroundColor: "#fee2e2", color: "#dc2626", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" },
//   highBadge: { backgroundColor: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" },
//   toast: { position: "fixed", top: "20px", right: "20px", backgroundColor: "#0f172a", color: "#ffffff", padding: "10px 16px", borderRadius: "8px", fontSize: "13px", zIndex: 1000 },
//   modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.4)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 100 },
//   modalCard: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", width: "340px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
// };
// import React, { useState } from "react";

// export default function App() {
//   // Navigation & Role States
//   const [currentPage, setCurrentPage] = useState("dashboard");
//   const [selectedRole] = useState("Brand Manager");
//   const [activeTab, setActiveTab] = useState("Sentiment Insights");

//   // Auth Form States
//   const [email, setEmail] = useState("manager@gmail.com");
//   const [password, setPassword] = useState("12345678");

//   // Toast State
//   const [toastMessage, setToastMessage] = useState("");

//   // ADD Product Modal States
//   const [isAddProductOpen, setIsAddProductOpen] = useState(false);
//   const [newProdName, setNewProdName] = useState("");
//   const [newProdCategory, setNewProdCategory] = useState("Electronics");

//   // EDIT Product Modal States
//   const [isEditProductOpen, setIsEditProductOpen] = useState(false);
//   const [editingProductId, setEditingProductId] = useState(null);
//   const [editProdName, setEditProdName] = useState("");
//   const [editProdCategory, setEditProdCategory] = useState("Electronics");

//   // Data States
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "Acme Smart Watch",
//       category: "Electronics",
//       status: "Active",
//       totalReviews: 324,
//       positiveRate: "82%",
//       rating: 4.3,
//     },
//     {
//       id: 2,
//       name: "Acme Wireless Earbuds",
//       category: "Audio",
//       status: "Active",
//       totalReviews: 120,
//       positiveRate: "78%",
//       rating: 4.1,
//     },
//     {
//       id: 3,
//       name: "SaaS Platform Pro",
//       category: "Software",
//       status: "Active",
//       totalReviews: 45,
//       positiveRate: "90%",
//       rating: 4.7,
//     },
//   ]);

//   const [reviewsList] = useState([
//     {
//       id: 101,
//       user: "Alex Mercer",
//       product: "Acme Smart Watch",
//       rating: "5/5",
//       sentiment: "Positive",
//       comment:
//         "The battery life is amazing! Lasted almost 3 days on a single charge.",
//     },
//     {
//       id: 102,
//       user: "Samantha Paul",
//       product: "Acme Wireless Earbuds",
//       rating: "2/5",
//       sentiment: "Negative",
//       comment:
//         "The Bluetooth connectivity keeps dropping during calls.",
//     },
//     {
//       id: 103,
//       user: "David Miller",
//       product: "SaaS Platform Pro",
//       rating: "4/5",
//       sentiment: "Positive",
//       comment:
//         "Great UI interface, made our team workflow 2x faster.",
//     },
//     {
//       id: 104,
//       user: "Elena Rostova",
//       product: "Acme Smart Watch",
//       rating: "3/5",
//       sentiment: "Neutral",
//       comment:
//         "Good design but step counter isn't very accurate.",
//     },
//   ]);

//   // Toast Helper
//   const showToast = (msg) => {
//     setToastMessage(msg);
//     setTimeout(() => setToastMessage(""), 3000);
//   };

//   // Handlers
//   const handleLogin = (e) => {
//     e.preventDefault();
//     setCurrentPage("dashboard");
//     setActiveTab("Tracked Products");
//     showToast(`Logged in successfully!`);
//   };

//   const handleAddProduct = (e) => {
//     e.preventDefault();

//     if (!newProdName.trim()) return;

//     const newProd = {
//       id: Date.now(),
//       name: newProdName,
//       category: newProdCategory,
//       status: "Active",
//       totalReviews: 0,
//       positiveRate: "100%",
//       rating: 5.0,
//     };

//     setProducts([...products, newProd]);
//     setNewProdName("");
//     setNewProdCategory("Electronics");
//     setIsAddProductOpen(false);

//     showToast(`Product "${newProdName}" added successfully!`);
//   };

//   const handleOpenEditModal = (product) => {
//     setEditingProductId(product.id);
//     setEditProdName(product.name);
//     setEditProdCategory(product.category);
//     setIsEditProductOpen(true);
//   };

//   const handleSaveEditProduct = (e) => {
//     e.preventDefault();

//     setProducts(
//       products.map((p) =>
//         p.id === editingProductId
//           ? {
//               ...p,
//               name: editProdName,
//               category: editProdCategory,
//             }
//           : p
//       )
//     );

//     setIsEditProductOpen(false);
//     showToast("Product updated successfully!");
//   };

//   const handleDeleteProduct = (id) => {
//     setProducts(products.filter((p) => p.id !== id));
//     showToast("Product deleted!");
//   };

//   return (
//     <div style={styles.appWrapper}>
//       {/* Toast Alert */}
//       {toastMessage && (
//         <div style={styles.toast}>{toastMessage}</div>
//       )}

//       {/* LOGIN PAGE */}
//       {currentPage === "login" && (
//         <div style={styles.authWrapper}>
//           <div style={styles.authCard}>
//             <div style={styles.authLeft}>
//               <div>
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     gap: "10px",
//                     marginBottom: "30px",
//                   }}
//                 >
//                   <div style={styles.logoBox}>R</div>

//                   <span
//                     style={{
//                       fontSize: "20px",
//                       fontWeight: "700",
//                     }}
//                   >
//                     ReviewRave
//                   </span>
//                 </div>

//                 <h2
//                   style={{
//                     fontSize: "22px",
//                     fontWeight: "700",
//                     marginBottom: "20px",
//                   }}
//                 >
//                   Turn customer feedback into action
//                 </h2>
//               </div>

//               <span
//                 style={{
//                   fontSize: "11px",
//                   color: "#a5b4fc",
//                 }}
//               >
//                 © 2026 ReviewRave.
//               </span>
//             </div>

//             <div style={styles.authRight}>
//               <h3
//                 style={{
//                   fontSize: "20px",
//                   fontWeight: "700",
//                   margin: "0 0 4px 0",
//                 }}
//               >
//                 Login to ReviewRave
//               </h3>

//               <form
//                 onSubmit={handleLogin}
//                 style={styles.formStack}
//               >
//                 <div>
//                   <label style={styles.label}>
//                     Email Address
//                   </label>

//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) =>
//                       setEmail(e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label style={styles.label}>
//                     Password
//                   </label>

//                   <input
//                     type="password"
//                     value={password}
//                     onChange={(e) =>
//                       setPassword(e.target.value)
//                     }
//                     style={styles.input}
//                     required
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   style={styles.primaryBtn}
//                 >
//                   Login to Dashboard
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* DASHBOARD */}
//       {currentPage === "dashboard" && (
//         <div style={{ minHeight: "100vh" }}>
//           {/* Header */}
//           <header style={styles.navbar}>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "30px",
//               }}
//             >
//               <div
//                 style={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "8px",
//                 }}
//               >
//                 <div style={styles.logoBox}>R</div>

//                 <span
//                   style={{
//                     fontWeight: "700",
//                     fontSize: "16px",
//                   }}
//                 >
//                   ReviewRave
//                 </span>
//               </div>

//               {/* Navigation Tabs */}
//               <nav
//                 style={{
//                   display: "flex",
//                   gap: "4px",
//                 }}
//               >
//                 {[
//                   "Tracked Products",
//                   "Sentiment Insights",
//                   "Reviews",
//                 ].map((tab) => (
//                   <button
//                     key={tab}
//                     onClick={() => setActiveTab(tab)}
//                     style={{
//                       ...styles.navTab,
//                       backgroundColor:
//                         activeTab === tab
//                           ? "#e0e7ff"
//                           : "transparent",
//                       color:
//                         activeTab === tab
//                           ? "#4338ca"
//                           : "#475569",
//                     }}
//                   >
//                     {tab}
//                   </button>
//                 ))}
//               </nav>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "10px",
//               }}
//             >
//               <span style={styles.roleBadge}>
//                 {selectedRole}
//               </span>

//               <button
//                 onClick={() => setCurrentPage("login")}
//                 style={styles.logoutBtn}
//               >
//                 Logout
//               </button>
//             </div>
//           </header>

//           {/* Main Body */}
//           <main style={styles.mainContainer}>
//             {/* TRACKED PRODUCTS TAB */}
//             {activeTab === "Tracked Products" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>
//                       Tracked Products
//                     </h2>

//                     <span style={styles.subHeading}>
//                       Monitor customer feedback and sentiment
//                     </span>
//                   </div>

//                   <button
//                     onClick={() =>
//                       setIsAddProductOpen(true)
//                     }
//                     style={styles.primaryBtnWidth}
//                   >
//                     + Add Product
//                   </button>
//                 </div>

//                 <div style={styles.statsGrid}>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Tracked Products
//                     </span>

//                     <div style={styles.statVal}>
//                       {products.length}
//                     </div>
//                   </div>

//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Total Reviews
//                     </span>

//                     <div style={styles.statVal}>
//                       1,240
//                     </div>
//                   </div>

//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Positive Sentiment
//                     </span>

//                     <div
//                       style={{
//                         ...styles.statVal,
//                         color: "#16a34a",
//                       }}
//                     >
//                       78%
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.gridContainer}>
//                   {products.map((p) => (
//                     <div
//                       key={p.id}
//                       style={styles.productCard}
//                     >
//                       <div>
//                         <div
//                           style={{
//                             display: "flex",
//                             justifyContent:
//                               "space-between",
//                             alignItems: "center",
//                           }}
//                         >
//                           <h4
//                             style={{
//                               margin: 0,
//                               fontWeight: "700",
//                               fontSize: "15px",
//                             }}
//                           >
//                             {p.name}
//                           </h4>

//                           <span style={styles.activeTag}>
//                             {p.status}
//                           </span>
//                         </div>

//                         <span
//                           style={{
//                             fontSize: "12px",
//                             color: "#94a3b8",
//                           }}
//                         >
//                           {p.category}
//                         </span>
//                       </div>

//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "6px",
//                           marginTop: "15px",
//                         }}
//                       >
//                         <button
//                           onClick={() =>
//                             handleOpenEditModal(p)
//                           }
//                           style={styles.secondaryBtn}
//                         >
//                           Edit
//                         </button>

//                         <button
//                           onClick={() =>
//                             handleDeleteProduct(p.id)
//                           }
//                           style={styles.deleteIconBtn}
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* SENTIMENT INSIGHTS TAB */}
//             {activeTab === "Sentiment Insights" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>
//                       Sentiment Insights
//                     </h2>

//                     <span style={styles.subHeading}>
//                       AI-driven sentiment breakdown of feedback
//                     </span>
//                   </div>
//                 </div>

//                 <div style={styles.statsGrid}>
//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Positive Feedback
//                     </span>

//                     <div
//                       style={{
//                         ...styles.statVal,
//                         color: "#16a34a",
//                       }}
//                     >
//                       78%
//                     </div>
//                   </div>

//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Neutral Feedback
//                     </span>

//                     <div
//                       style={{
//                         ...styles.statVal,
//                         color: "#d97706",
//                       }}
//                     >
//                       14%
//                     </div>
//                   </div>

//                   <div style={styles.statCard}>
//                     <span style={styles.statLabel}>
//                       Negative Feedback
//                     </span>

//                     <div
//                       style={{
//                         ...styles.statVal,
//                         color: "#dc2626",
//                       }}
//                     >
//                       8%
//                     </div>
//                   </div>
//                 </div>

//                 <div style={styles.cardBox}>
//                   <h3
//                     style={{
//                       fontSize: "15px",
//                       fontWeight: "700",
//                       marginBottom: "15px",
//                     }}
//                   >
//                     Sentiment Distribution
//                   </h3>

//                   <div
//                     style={{
//                       height: "12px",
//                       backgroundColor: "#e2e8f0",
//                       borderRadius: "6px",
//                       display: "flex",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "78%",
//                         backgroundColor: "#22c55e",
//                       }}
//                       title="78% Positive"
//                     />

//                     <div
//                       style={{
//                         width: "14%",
//                         backgroundColor: "#f59e0b",
//                       }}
//                       title="14% Neutral"
//                     />

//                     <div
//                       style={{
//                         width: "8%",
//                         backgroundColor: "#ef4444",
//                       }}
//                       title="8% Negative"
//                     />
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: "16px",
//                     marginTop: "16px",
//                   }}
//                 >
//                   <div style={styles.cardBox}>
//                     <h3
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "700",
//                         color: "#16a34a",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       💚 Top Positive Drivers
//                     </h3>

//                     <ul
//                       style={{
//                         margin: 0,
//                         paddingLeft: "18px",
//                         fontSize: "13px",
//                         color: "#475569",
//                         lineHeight: "1.8",
//                       }}
//                     >
//                       <li>
//                         Battery Performance & Fast Charging
//                       </li>
//                       <li>Smooth UI & Clean Design</li>
//                       <li>Fast Support Response Time</li>
//                     </ul>
//                   </div>

//                   <div style={styles.cardBox}>
//                     <h3
//                       style={{
//                         fontSize: "14px",
//                         fontWeight: "700",
//                         color: "#dc2626",
//                         marginBottom: "10px",
//                       }}
//                     >
//                       💔 Top Customer Pain Points
//                     </h3>

//                     <ul
//                       style={{
//                         margin: 0,
//                         paddingLeft: "18px",
//                         fontSize: "13px",
//                         color: "#475569",
//                         lineHeight: "1.8",
//                       }}
//                     >
//                       <li>Bluetooth Connection Drops</li>
//                       <li>
//                         Accurate Step Tracking Calibration
//                       </li>
//                       <li>
//                         Shipping Delay in Rural Areas
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* REVIEWS TAB */}
//             {activeTab === "Reviews" && (
//               <div>
//                 <div style={styles.sectionHeader}>
//                   <div>
//                     <h2 style={styles.heading}>
//                       Customer Reviews
//                     </h2>

//                     <span style={styles.subHeading}>
//                       Recent review entries from connected
//                       platforms
//                     </span>
//                   </div>
//                 </div>

//                 <div style={styles.tableCard}>
//                   <table style={styles.table}>
//                     <thead>
//                       <tr style={styles.tableHeader}>
//                         <th style={styles.th}>Customer</th>
//                         <th style={styles.th}>Product</th>
//                         <th style={styles.th}>Rating</th>
//                         <th style={styles.th}>Sentiment</th>
//                         <th style={styles.th}>
//                           Feedback Comment
//                         </th>
//                       </tr>
//                     </thead>

//                     <tbody>
//                       {reviewsList.map((r) => (
//                         <tr
//                           key={r.id}
//                           style={styles.tableRow}
//                         >
//                           <td
//                             style={{
//                               ...styles.td,
//                               fontWeight: "700",
//                             }}
//                           >
//                             {r.user}
//                           </td>

//                           <td style={styles.td}>
//                             {r.product}
//                           </td>

//                           <td style={styles.td}>
//                             {r.rating}
//                           </td>

//                           <td style={styles.td}>
//                             <span
//                               style={
//                                 r.sentiment === "Positive"
//                                   ? styles.activeTag
//                                   : r.sentiment ===
//                                     "Negative"
//                                   ? styles.critBadge
//                                   : styles.highBadge
//                               }
//                             >
//                               {r.sentiment}
//                             </span>
//                           </td>

//                           <td style={styles.td}>
//                             {r.comment}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </main>
//         </div>
//       )}

//       {/* ADD PRODUCT MODAL */}
//       {isAddProductOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalCard}>
//             <h3
//               style={{
//                 margin: "0 0 15px 0",
//                 fontSize: "18px",
//                 fontWeight: "700",
//               }}
//             >
//               Add New Product
//             </h3>

//             <form
//               onSubmit={handleAddProduct}
//               style={styles.formStack}
//             >
//               <div>
//                 <label style={styles.label}>
//                   Product Name
//                 </label>

//                 <input
//                   type="text"
//                   placeholder="e.g. Acme Headphones"
//                   value={newProdName}
//                   onChange={(e) =>
//                     setNewProdName(e.target.value)
//                   }
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               <div>
//                 <label style={styles.label}>
//                   Category
//                 </label>

//                 <select
//                   value={newProdCategory}
//                   onChange={(e) =>
//                     setNewProdCategory(e.target.value)
//                   }
//                   style={styles.input}
//                 >
//                   <option value="Electronics">
//                     Electronics
//                   </option>

//                   <option value="Audio">Audio</option>

//                   <option value="Software">
//                     Software
//                   </option>
//                 </select>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   marginTop: "10px",
//                 }}
//               >
//                 <button
//                   type="submit"
//                   style={{
//                     ...styles.primaryBtn,
//                     flex: 1,
//                   }}
//                 >
//                   Save Product
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIsAddProductOpen(false)
//                   }
//                   style={{
//                     ...styles.secondaryBtn,
//                     flex: 1,
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* EDIT PRODUCT MODAL */}
//       {isEditProductOpen && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modalCard}>
//             <h3
//               style={{
//                 margin: "0 0 15px 0",
//                 fontSize: "18px",
//                 fontWeight: "700",
//               }}
//             >
//               Edit Product
//             </h3>

//             <form
//               onSubmit={handleSaveEditProduct}
//               style={styles.formStack}
//             >
//               <div>
//                 <label style={styles.label}>
//                   Product Name
//                 </label>

//                 <input
//                   type="text"
//                   value={editProdName}
//                   onChange={(e) =>
//                     setEditProdName(e.target.value)
//                   }
//                   style={styles.input}
//                   required
//                 />
//               </div>

//               <div>
//                 <label style={styles.label}>
//                   Category
//                 </label>

//                 <select
//                   value={editProdCategory}
//                   onChange={(e) =>
//                     setEditProdCategory(e.target.value)
//                   }
//                   style={styles.input}
//                 >
//                   <option value="Electronics">
//                     Electronics
//                   </option>

//                   <option value="Audio">Audio</option>

//                   <option value="Software">
//                     Software
//                   </option>
//                 </select>
//               </div>

//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   marginTop: "10px",
//                 }}
//               >
//                 <button
//                   type="submit"
//                   style={{
//                     ...styles.primaryBtn,
//                     flex: 1,
//                   }}
//                 >
//                   Update
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     setIsEditProductOpen(false)
//                   }
//                   style={{
//                     ...styles.secondaryBtn,
//                     flex: 1,
//                   }}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // STYLES
// const styles = {
//   appWrapper: {
//     fontFamily: "Segoe UI, sans-serif",
//     backgroundColor: "#f8fafc",
//     minHeight: "100vh",
//     color: "#0f172a",
//   },

//   authWrapper: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#f1f5f9",
//     padding: "20px",
//   },

//   authCard: {
//     display: "flex",
//     backgroundColor: "#ffffff",
//     borderRadius: "16px",
//     overflow: "hidden",
//     maxWidth: "850px",
//     width: "100%",
//     border: "1px solid #e2e8f0",
//   },

//   authLeft: {
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     padding: "40px",
//     width: "45%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },

//   authRight: {
//     padding: "40px",
//     width: "55%",
//     display: "flex",
//     flexDirection: "column",
//     justify: "center",
//   },

//   logoBox: {
//     width: "28px",
//     height: "28px",
//     backgroundColor: "#4f46e5",
//     color: "#fff",
//     borderRadius: "6px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontWeight: "bold",
//   },

//   formStack: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "14px",
//   },

//   label: {
//     fontSize: "12px",
//     fontWeight: "600",
//     color: "#475569",
//     marginBottom: "4px",
//     display: "block",
//   },

//   input: {
//     width: "100%",
//     padding: "10px 14px",
//     borderRadius: "8px",
//     border: "1px solid #cbd5e1",
//     fontSize: "13px",
//     boxSizing: "border-box",
//     outline: "none",
//   },

//   primaryBtn: {
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     fontSize: "13px",
//   },

//   primaryBtnWidth: {
//     backgroundColor: "#4f46e5",
//     color: "#ffffff",
//     border: "none",
//     padding: "10px 18px",
//     borderRadius: "8px",
//     fontWeight: "600",
//     cursor: "pointer",
//     fontSize: "13px",
//   },

//   secondaryBtn: {
//     backgroundColor: "#f1f5f9",
//     color: "#334155",
//     border: "1px solid #cbd5e1",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     fontSize: "12px",
//     fontWeight: "600",
//     cursor: "pointer",
//     textAlign: "center",
//   },

//   deleteIconBtn: {
//     backgroundColor: "#fee2e2",
//     color: "#dc2626",
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     fontSize: "12px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },

//   navbar: {
//     backgroundColor: "#ffffff",
//     borderBottom: "1px solid #e2e8f0",
//     padding: "12px 24px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   navTab: {
//     border: "none",
//     padding: "6px 12px",
//     borderRadius: "6px",
//     fontSize: "13px",
//     fontWeight: "600",
//     cursor: "pointer",
//   },

//   roleBadge: {
//     backgroundColor: "#e0e7ff",
//     color: "#3730a3",
//     padding: "4px 10px",
//     borderRadius: "12px",
//     fontSize: "12px",
//     fontWeight: "700",
//   },

//   logoutBtn: {
//     backgroundColor: "transparent",
//     border: "1px solid #cbd5e1",
//     padding: "4px 10px",
//     borderRadius: "6px",
//     fontSize: "12px",
//     cursor: "pointer",
//   },

//   mainContainer: {
//     maxWidth: "1100px",
//     margin: "24px auto",
//     padding: "0 20px",
//   },

//   heading: {
//     fontSize: "20px",
//     fontWeight: "700",
//     margin: "0 0 4px 0",
//   },

//   subHeading: {
//     fontSize: "12px",
//     color: "#64748b",
//   },

//   sectionHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "20px",
//   },

//   statsGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "16px",
//     marginBottom: "24px",
//   },

//   statCard: {
//     backgroundColor: "#ffffff",
//     border: "1px solid #e2e8f0",
//     padding: "16px",
//     borderRadius: "12px",
//   },

//   statLabel: {
//     fontSize: "12px",
//     color: "#94a3b8",
//     fontWeight: "600",
//   },

//   statVal: {
//     fontSize: "24px",
//     fontWeight: "700",
//     marginTop: "4px",
//   },

//   gridContainer: {
//     display: "grid",
//     gridTemplateColumns: "repeat(3, 1fr)",
//     gap: "16px",
//   },

//   productCard: {
//     backgroundColor: "#ffffff",
//     border: "1px solid #e2e8f0",
//     padding: "16px",
//     borderRadius: "12px",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "space-between",
//   },

//   cardBox: {
//     backgroundColor: "#ffffff",
//     border: "1px solid #e2e8f0",
//     padding: "20px",
//     borderRadius: "12px",
//   },

//   tableCard: {
//     backgroundColor: "#ffffff",
//     border: "1px solid #e2e8f0",
//     borderRadius: "12px",
//     overflow: "hidden",
//   },

//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     fontSize: "12px",
//   },

//   tableHeader: {
//     backgroundColor: "#f8fafc",
//     borderBottom: "1px solid #e2e8f0",
//   },

//   th: {
//     padding: "12px",
//     textAlign: "left",
//     color: "#64748b",
//     fontWeight: "600",
//   },

//   tableRow: {
//     borderBottom: "1px solid #f1f5f9",
//   },

//   td: {
//     padding: "12px",
//     color: "#334155",
//   },

//   activeTag: {
//     backgroundColor: "#dcfce7",
//     color: "#15803d",
//     fontSize: "10px",
//     fontWeight: "700",
//     padding: "2px 6px",
//     borderRadius: "4px",
//   },

//   critBadge: {
//     backgroundColor: "#fee2e2",
//     color: "#dc2626",
//     padding: "2px 6px",
//     borderRadius: "4px",
//     fontSize: "10px",
//     fontWeight: "700",
//   },

//   highBadge: {
//     backgroundColor: "#fef3c7",
//     color: "#d97706",
//     padding: "2px 6px",
//     borderRadius: "4px",
//     fontSize: "10px",
//     fontWeight: "700",
//   },

//   toast: {
//     position: "fixed",
//     top: "20px",
//     right: "20px",
//     backgroundColor: "#0f172a",
//     color: "#ffffff",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     fontSize: "13px",
//     zIndex: 1000,
//   },

//   modalOverlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 100,
//   },

//   modalCard: {
//     backgroundColor: "#ffffff",
//     padding: "24px",
//     borderRadius: "12px",
//     width: "340px",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//   },
// };

import React, { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("login");
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [reviewFilter, setReviewFilter] = useState("All");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [selectedRole, setSelectedRole] = useState("Brand Manager");

  const [toastMessage, setToastMessage] = useState("");

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const [products, setProducts] = useState([
    { id: 1, name: "Acme Smart Watch", category: "Electronics", status: "Active" },
    { id: 2, name: "Acme Wireless Earbuds", category: "Audio", status: "Active" },
    { id: 3, name: "SaaS Platform Pro", category: "Software", status: "Active" },
  ]);

  const [reviewsList, setReviewsList] = useState([
    { id: 101, user: "Alex Mercer", product: "Acme Smart Watch", rating: 5, sentiment: "Positive", comment: "The battery life is amazing! Lasted almost 3 days." },
    { id: 102, user: "Samantha Paul", product: "Acme Wireless Earbuds", rating: 2, sentiment: "Negative", comment: "Bluetooth drops frequently during calls." },
    { id: 103, user: "David Miller", product: "SaaS Platform Pro", rating: 4, sentiment: "Positive", comment: "Great UI interface, made our workflow 2x faster." },
    { id: 104, user: "Elena Rostova", product: "Acme Smart Watch", rating: 3, sentiment: "Neutral", comment: "Good design but step counter isn't accurate." }
  ]);

  const [ticketsList, setTicketsList] = useState([
    { id: 201, title: "Connectivity drop issue", product: "Acme Wireless Earbuds", priority: "High", status: "Pending", assignedTo: "Resolution Agent" },
    { id: 202, title: "Step counter calibration error", product: "Acme Smart Watch", priority: "Medium", status: "In Progress", assignedTo: "Brand Manager" }
  ]);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Electronics");

  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editProdName, setEditProdName] = useState("");
  const [editProdCategory, setEditProdCategory] = useState("Electronics");

  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [revUser, setRevUser] = useState("");
  const [revProduct, setRevProduct] = useState("Acme Smart Watch");
  const [revRating, setRevRating] = useState(5);
  const [revComment, setRevComment] = useState("");

  const [isAddTicketOpen, setIsAddTicketOpen] = useState(false);
  const [ticTitle, setTicTitle] = useState("");
  const [ticProduct, setTicProduct] = useState("Acme Smart Watch");
  const [ticPriority, setTicPriority] = useState("Medium");

  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
    showToast("Logged in successfully!");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentPage("login");
    showToast("Account created! Please login.");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) return;
    const newProd = { id: Date.now(), name: newProdName, category: newProdCategory, status: "Active" };
    setProducts([...products, newProd]);
    setNewProdName("");
    setIsAddProductOpen(false);
    showToast(`Product "${newProdName}" added!`);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setEditProdName(prod.name);
    setEditProdCategory(prod.category);
    setIsEditProductOpen(true);
  };

  const handleSaveEditProduct = (e) => {
    e.preventDefault();
    setProducts(products.map(p => p.id === editingProductId ? { ...p, name: editProdName, category: editProdCategory } : p));
    setIsEditProductOpen(false);
    showToast("Product updated!");
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
    showToast("Product deleted!");
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!revUser.trim() || !revComment.trim()) return;

    let sentiment = "Neutral";
    if (revRating >= 4) sentiment = "Positive";
    else if (revRating <= 2) sentiment = "Negative";

    const newRev = { id: Date.now(), user: revUser, product: revProduct, rating: Number(revRating), sentiment, comment: revComment };
    setReviewsList([newRev, ...reviewsList]);
    setRevUser("");
    setRevComment("");
    setIsAddReviewOpen(false);
    showToast("Review submitted successfully!");
  };

  const handleAddTicket = (e) => {
    e.preventDefault();
    if (!ticTitle.trim()) return;
    const newTic = { id: Date.now(), title: ticTitle, product: ticProduct, priority: ticPriority, status: "Pending", assignedTo: selectedRole };
    setTicketsList([newTic, ...ticketsList]);
    setTicTitle("");
    setIsAddTicketOpen(false);
    showToast("Resolution ticket created!");
  };

  const handleUpdateTicketStatus = (id, newStatus) => {
    setTicketsList(ticketsList.map(t => t.id === id ? { ...t, status: newStatus } : t));
    showToast(`Ticket status changed to ${newStatus}`);
  };

  const posReviews = reviewsList.filter(r => r.sentiment === "Positive").length;
  const neuReviews = reviewsList.filter(r => r.sentiment === "Neutral").length;
  const negReviews = reviewsList.filter(r => r.sentiment === "Negative").length;
  const totalReviews = reviewsList.length || 1;

  const posPct = Math.round((posReviews / totalReviews) * 100);
  const neuPct = Math.round((neuReviews / totalReviews) * 100);
  const negPct = Math.round((negReviews / totalReviews) * 100);

  const filteredReviews = reviewsList.filter(r => reviewFilter === "All" ? true : r.sentiment === reviewFilter);

  return (
    <div style={styles.appWrapper}>
      {toastMessage && <div style={styles.toast}>{toastMessage}</div>}

      {/* 1. REGISTER PAGE */}
      {currentPage === "register" && (
        <div style={styles.centerAuthBg}>
          <div style={styles.cardBoxModal}>
            <h2 style={styles.cardTitle}>Register Account</h2>
            <form onSubmit={handleRegister} style={styles.formStack}>
              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>First Name</label>
                  <input type="text" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={styles.input} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Last Name</label>
                  <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} style={styles.input} required />
                </div>
              </div>

              <div>
                <label style={styles.label}>Company Name</label>
                <input type="text" placeholder="Acme Corp (Optional)" value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={styles.input} />
              </div>

              <div>
                <label style={styles.label}>Email Address</label>
                <input type="email" placeholder="manager@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
              </div>

              <div>
                <label style={styles.label}>Password (min 8 chars)</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
              </div>

              <div>
                <label style={styles.label}>Select Role</label>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} style={styles.input}>
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Resolution Agent">Resolution Agent</option>
                  <option value="Platform Admin">Platform Admin</option>
                </select>
              </div>

              <button type="submit" style={styles.purpleBtn}>Create Account</button>
            </form>

            <div style={styles.authSubText}>
              Already have an account?{" "}
              <button onClick={() => setCurrentPage("login")} style={styles.linkBtn}>Login here</button>
            </div>
          </div>
        </div>
      )}

      {/* 2. LOGIN PAGE */}
      {currentPage === "login" && (
        <div style={styles.centerAuthBg}>
          <div style={styles.cardBoxModal}>
            <h2 style={styles.cardTitle}>Login to ReviewRave</h2>
            <form onSubmit={handleLogin} style={styles.formStack}>
              <div>
                <label style={styles.label}>Email Address</label>
                <input type="email" placeholder="manager@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
              </div>

              <div>
                <label style={styles.label}>Password</label>
                <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
              </div>

              <button type="submit" style={styles.purpleBtn}>Login</button>
            </form>

            <div style={styles.authSubText}>
              Don't have an account?{" "}
              <button onClick={() => setCurrentPage("register")} style={styles.linkBtn}>Register here</button>
            </div>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD */}
      {currentPage === "dashboard" && (
        <div style={styles.dashboardLayout}>
          <aside style={styles.sidebar}>
            <div>
              <div style={styles.sidebarHeader}>
                <div style={styles.sidebarLogoBox}>R</div>
                <div>
                  <div style={styles.sidebarBrandName}>ReviewRave</div>
                  <div style={styles.sidebarBrandSub}>Review Intelligence</div>
                </div>
              </div>

              <div style={styles.navSectionLabel}>MAIN MENU</div>
              <nav style={styles.sideNav}>
                {[
                  { name: "Dashboard", icon: "📊" },
                  { name: "Products", icon: "📦" },
                  { name: "Reviews", icon: "💬" },
                  { name: "Sentiment Insights", icon: "🎯" },
                  { name: "Resolution Tickets", icon: "🎟️" },
                ].map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setActiveMenu(item.name)}
                    style={{
                      ...styles.sideNavItem,
                      backgroundColor: activeMenu === item.name ? "rgba(147, 51, 234, 0.25)" : "transparent",
                      color: activeMenu === item.name ? "#ffffff" : "#94a3b8",
                      borderLeft: activeMenu === item.name ? "3px solid #a855f7" : "3px solid transparent",
                    }}
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <div style={styles.navSectionLabel}>SYSTEM</div>
              <button onClick={() => setActiveMenu("Settings")} style={{ ...styles.sideNavItem, backgroundColor: activeMenu === "Settings" ? "rgba(147, 51, 234, 0.25)" : "transparent" }}>
                <span>⚙️</span>
                <span>Settings</span>
              </button>
              <button onClick={() => setCurrentPage("login")} style={{ ...styles.sideNavItem, color: "#f87171" }}>
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </aside>

          <div style={styles.mainContent}>
            <header style={styles.topbar}>
              <div style={{ fontSize: "13px", color: "#64748b" }}>
                Workspace / <strong style={{ color: "#0f172a" }}>{activeMenu}</strong>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={styles.userAvatar}>{firstName ? firstName[0] : "B"}M</div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>{selectedRole}</div>
                  <div style={{ fontSize: "11px", color: "#64748b" }}>{email}</div>
                </div>
              </div>
            </header>

            <main style={{ padding: "30px" }}>
              {activeMenu === "Dashboard" && (
                <div>
                  <div style={{ marginBottom: "20px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: "#9333ea" }}>OVERVIEW</span>
                    <h2 style={{ fontSize: "22px", fontWeight: "700", margin: "4px 0" }}>Good day, {selectedRole}</h2>
                    <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Workspace operations and stats overview.</p>
                  </div>

                  <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>PRODUCTS TRACKED</span>
                      <div style={styles.statVal}>{products.length}</div>
                    </div>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>TOTAL REVIEWS</span>
                      <div style={styles.statVal}>{reviewsList.length}</div>
                    </div>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>POSITIVE SENTIMENT</span>
                      <div style={{ ...styles.statVal, color: "#16a34a" }}>{posPct}%</div>
                    </div>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>OPEN TICKETS</span>
                      <div style={styles.statVal}>{ticketsList.filter(t => t.status !== "Resolved").length}</div>
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "Products" && (
                <div>
                  <div style={styles.sectionHeader}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Product Catalog</h2>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Manage tracked brand items</span>
                    </div>
                    <button onClick={() => setIsAddProductOpen(true)} style={styles.primaryBtnWidth}>+ Add Product</button>
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
                        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
                          <button onClick={() => handleOpenEditProduct(p)} style={styles.secondaryBtn}>Edit</button>
                          <button onClick={() => handleDeleteProduct(p.id)} style={styles.deleteIconBtn}>🗑️ Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeMenu === "Reviews" && (
                <div>
                  <div style={styles.sectionHeader}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Customer Reviews</h2>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Live feeds and sentiments</span>
                    </div>
                    <button onClick={() => setIsAddReviewOpen(true)} style={styles.primaryBtnWidth}>+ Add Review</button>
                  </div>

                  <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
                    {["All", "Positive", "Neutral", "Negative"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setReviewFilter(f)}
                        style={{
                          ...styles.secondaryBtn,
                          backgroundColor: reviewFilter === f ? "#9333ea" : "#f1f5f9",
                          color: reviewFilter === f ? "#ffffff" : "#334155",
                        }}
                      >
                        {f}
                      </button>
                    ))}
                  </div>

                  <div style={styles.tableCard}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.tableHeader}>
                          <th style={styles.th}>Customer</th>
                          <th style={styles.th}>Product</th>
                          <th style={styles.th}>Rating</th>
                          <th style={styles.th}>Sentiment</th>
                          <th style={styles.th}>Comment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReviews.map((r) => (
                          <tr key={r.id} style={styles.tableRow}>
                            <td style={{ ...styles.td, fontWeight: "700" }}>{r.user}</td>
                            <td style={styles.td}>{r.product}</td>
                            <td style={styles.td}>{"⭐".repeat(r.rating)}</td>
                            <td style={styles.td}>
                              <span style={r.sentiment === "Positive" ? styles.activeTag : r.sentiment === "Negative" ? styles.critBadge : styles.neuBadge}>
                                {r.sentiment}
                              </span>
                            </td>
                            <td style={styles.td}>{r.comment}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeMenu === "Sentiment Insights" && (
                <div>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", margin: "0 0 16px 0" }}>Sentiment Insights</h2>
                  <div style={styles.statsGrid}>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>POSITIVE FEEDBACK</span>
                      <div style={{ ...styles.statVal, color: "#16a34a" }}>{posPct}% ({posReviews})</div>
                    </div>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>NEUTRAL FEEDBACK</span>
                      <div style={{ ...styles.statVal, color: "#d97706" }}>{neuPct}% ({neuReviews})</div>
                    </div>
                    <div style={styles.statCard}>
                      <span style={styles.statLabel}>NEGATIVE FEEDBACK</span>
                      <div style={{ ...styles.statVal, color: "#dc2626" }}>{negPct}% ({negReviews})</div>
                    </div>
                  </div>

                  <div style={styles.cardBox}>
                    <h3 style={{ fontSize: "15px", fontWeight: "700", marginBottom: "12px" }}>Sentiment Ratio</h3>
                    <div style={{ height: "16px", backgroundColor: "#e2e8f0", borderRadius: "8px", display: "flex", overflow: "hidden" }}>
                      <div style={{ width: `${posPct}%`, backgroundColor: "#22c55e" }} />
                      <div style={{ width: `${neuPct}%`, backgroundColor: "#f59e0b" }} />
                      <div style={{ width: `${negPct}%`, backgroundColor: "#ef4444" }} />
                    </div>
                  </div>
                </div>
              )}

              {activeMenu === "Resolution Tickets" && (
                <div>
                  <div style={styles.sectionHeader}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Resolution Tickets</h2>
                      <span style={{ fontSize: "12px", color: "#64748b" }}>Resolve customer issues</span>
                    </div>
                    <button onClick={() => setIsAddTicketOpen(true)} style={styles.primaryBtnWidth}>+ Create Ticket</button>
                  </div>

                  <div style={styles.tableCard}>
                    <table style={styles.table}>
                      <thead>
                        <tr style={styles.tableHeader}>
                          <th style={styles.th}>Issue Title</th>
                          <th style={styles.th}>Product</th>
                          <th style={styles.th}>Priority</th>
                          <th style={styles.th}>Status</th>
                          <th style={styles.th}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticketsList.map((t) => (
                          <tr key={t.id} style={styles.tableRow}>
                            <td style={{ ...styles.td, fontWeight: "700" }}>{t.title}</td>
                            <td style={styles.td}>{t.product}</td>
                            <td style={styles.td}>
                              <span style={t.priority === "High" ? styles.critBadge : styles.neuBadge}>{t.priority}</span>
                            </td>
                            <td style={styles.td}>
                              <strong>{t.status}</strong>
                            </td>
                            <td style={styles.td}>
                              <select
                                value={t.status}
                                onChange={(e) => handleUpdateTicketStatus(t.id, e.target.value)}
                                style={{ padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeMenu === "Settings" && (
                <div style={{ maxWidth: "500px" }}>
                  <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "16px" }}>Workspace Settings</h2>
                  <div style={styles.cardBox}>
                    <form onSubmit={(e) => { e.preventDefault(); showToast("Settings updated!"); }} style={styles.formStack}>
                      <div>
                        <label style={styles.label}>Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} />
                      </div>
                      <div>
                        <label style={styles.label}>Role</label>
                        <input type="text" value={selectedRole} disabled style={{ ...styles.input, backgroundColor: "#f1f5f9" }} />
                      </div>
                      <button type="submit" style={styles.purpleBtn}>Save Settings</button>
                    </form>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      )}

      {/* MODALS */}
      {isAddProductOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0" }}>Add New Product</h3>
            <form onSubmit={handleAddProduct} style={styles.formStack}>
              <input type="text" placeholder="Product Name" value={newProdName} onChange={(e) => setNewProdName(e.target.value)} style={styles.input} required />
              <select value={newProdCategory} onChange={(e) => setNewProdCategory(e.target.value)} style={styles.input}>
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Software">Software</option>
              </select>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ ...styles.purpleBtn, flex: 1 }}>Save</button>
                <button type="button" onClick={() => setIsAddProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isEditProductOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0" }}>Edit Product</h3>
            <form onSubmit={handleSaveEditProduct} style={styles.formStack}>
              <input type="text" value={editProdName} onChange={(e) => setEditProdName(e.target.value)} style={styles.input} required />
              <select value={editProdCategory} onChange={(e) => setEditProdCategory(e.target.value)} style={styles.input}>
                <option value="Electronics">Electronics</option>
                <option value="Audio">Audio</option>
                <option value="Software">Software</option>
              </select>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ ...styles.purpleBtn, flex: 1 }}>Update</button>
                <button type="button" onClick={() => setIsEditProductOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddReviewOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0" }}>Add Review</h3>
            <form onSubmit={handleAddReview} style={styles.formStack}>
              <input type="text" placeholder="Customer Name" value={revUser} onChange={(e) => setRevUser(e.target.value)} style={styles.input} required />
              <select value={revProduct} onChange={(e) => setRevProduct(e.target.value)} style={styles.input}>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              <select value={revRating} onChange={(e) => setRevRating(e.target.value)} style={styles.input}>
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                <option value={3}>⭐⭐⭐ (3 Stars)</option>
                <option value={2}>⭐⭐ (2 Stars)</option>
                <option value={1}>⭐ (1 Star)</option>
              </select>
              <textarea placeholder="Write review..." value={revComment} onChange={(e) => setRevComment(e.target.value)} style={{ ...styles.input, height: "60px" }} required />
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ ...styles.purpleBtn, flex: 1 }}>Submit</button>
                <button type="button" onClick={() => setIsAddReviewOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isAddTicketOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalCard}>
            <h3 style={{ margin: "0 0 15px 0" }}>Create Ticket</h3>
            <form onSubmit={handleAddTicket} style={styles.formStack}>
              <input type="text" placeholder="Issue Title" value={ticTitle} onChange={(e) => setTicTitle(e.target.value)} style={styles.input} required />
              <select value={ticProduct} onChange={(e) => setTicProduct(e.target.value)} style={styles.input}>
                {products.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              <select value={ticPriority} onChange={(e) => setTicPriority(e.target.value)} style={styles.input}>
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>
              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit" style={{ ...styles.purpleBtn, flex: 1 }}>Create</button>
                <button type="button" onClick={() => setIsAddTicketOpen(false)} style={{ ...styles.secondaryBtn, flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ATTRACTIVE VIBRANT PURPLE STYLES
const styles = {
  appWrapper: { fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh", color: "#0f172a" },
  
  centerAuthBg: { 
    minHeight: "100vh", 
    background: "linear-gradient(135deg, #1e0b36 0%, #3b0764 45%, #581c87 80%, #6b21a8 100%)", 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "center", 
    padding: "20px" 
  },
  
  cardBoxModal: { 
    backgroundColor: "#ffffff", 
    padding: "36px 32px", 
    borderRadius: "16px", 
    width: "100%", 
    maxWidth: "400px", 
    boxShadow: "0 25px 50px -12px rgba(88, 28, 135, 0.45)",
    boxSizing: "border-box" 
  },
  
  cardTitle: { fontSize: "22px", fontWeight: "700", textAlign: "center", color: "#2e1065", margin: "0 0 22px 0" },
  formStack: { display: "flex", flexDirection: "column", gap: "14px" },
  label: { fontSize: "12px", fontWeight: "600", color: "#475569", marginBottom: "4px", display: "block" },
  input: { width: "100%", padding: "10px 12px", borderRadius: "8px", border: "1px solid #d8b4fe", fontSize: "13px", boxSizing: "border-box", outline: "none", backgroundColor: "#ffffff" },
  
  purpleBtn: { 
    background: "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)", 
    color: "#ffffff", 
    border: "none", 
    padding: "11px", 
    borderRadius: "8px", 
    fontWeight: "600", 
    fontSize: "13px", 
    cursor: "pointer", 
    width: "100%",
    boxShadow: "0 4px 12px rgba(147, 51, 234, 0.3)"
  },
  
  authSubText: { fontSize: "12px", color: "#64748b", textAlign: "center", marginTop: "18px" },
  linkBtn: { background: "none", border: "none", color: "#9333ea", fontWeight: "600", cursor: "pointer", padding: 0, fontSize: "12px" },
  
  toast: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#3b0764",
    color: "#ffffff",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "13px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    zIndex: 1000
  },
  dashboardLayout: { display: "flex", minHeight: "100vh" },
  sidebar: { width: "240px", backgroundColor: "#1e1b4b", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  sidebarHeader: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" },
  sidebarLogoBox: { width: "32px", height: "32px", backgroundColor: "#a855f7", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", fontWeight: "bold" },
  sidebarBrandName: { color: "#fff", fontWeight: "bold", fontSize: "14px" },
  sidebarBrandSub: { color: "#c084fc", fontSize: "11px" },
  navSectionLabel: { color: "#6b21a8", fontSize: "10px", fontWeight: "700", marginBottom: "8px" },
  sideNav: { display: "flex", flexDirection: "column", gap: "4px" },
  sideNavItem: { display: "flex", alignItems: "center", gap: "10px", width: "100%", padding: "8px 12px", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", textAlign: "left" },
  mainContent: { flex: 1, backgroundColor: "#f8fafc" },
  topbar: { backgroundColor: "#ffffff", borderBottom: "1px solid #e2e8f0", padding: "12px 30px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  userAvatar: { width: "32px", height: "32px", backgroundColor: "#f3e8ff", color: "#7e22ce", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "bold" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "20px" },
  statCard: { backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0" },
  statLabel: { fontSize: "10px", fontWeight: "700", color: "#64748b" },
  statVal: { fontSize: "22px", fontWeight: "700", marginTop: "4px" },
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" },
  primaryBtnWidth: { backgroundColor: "#9333ea", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "6px", fontWeight: "600", fontSize: "12px", cursor: "pointer" },
  secondaryBtn: { backgroundColor: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" },
  deleteIconBtn: { backgroundColor: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", padding: "6px 12px", borderRadius: "4px", fontSize: "12px", cursor: "pointer" },
  gridContainer: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" },
  productCard: { backgroundColor: "#ffffff", padding: "16px", borderRadius: "8px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", justifyContent: "space-between" },
  activeTag: { backgroundColor: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
  critBadge: { backgroundColor: "#fee2e2", color: "#b91c1c", padding: "2px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
  neuBadge: { backgroundColor: "#fef3c7", color: "#b45309", padding: "2px 8px", borderRadius: "12px", fontSize: "10px", fontWeight: "700" },
  tableCard: { backgroundColor: "#ffffff", borderRadius: "8px", border: "1px solid #e2e8f0", overflow: "hidden" },
  table: { width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" },
  tableHeader: { backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  th: { padding: "12px 16px", color: "#64748b", fontWeight: "600", fontSize: "12px" },
  tableRow: { borderBottom: "1px solid #f1f5f9" },
  td: { padding: "12px 16px", color: "#334155" },
  cardBox: { backgroundColor: "#ffffff", padding: "20px", borderRadius: "8px", border: "1px solid #e2e8f0", marginTop: "16px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(15, 23, 42, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 999 },
  modalCard: { backgroundColor: "#ffffff", padding: "24px", borderRadius: "12px", width: "100%", maxWidth: "400px", boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)" }
};