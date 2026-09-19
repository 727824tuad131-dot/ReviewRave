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

const initialProducts = [
  {
    id: 1,
    name: "Acme Smart Watch",
    category: "Electronics",
    status: "Active",
    totalReviews: 324,
    positiveRate: 82,
    rating: 4.3,
  },
  {
    id: 2,
    name: "Acme Wireless Earbuds",
    category: "Audio",
    status: "Active",
    totalReviews: 120,
    positiveRate: 78,
    rating: 4.1,
  },
  {
    id: 3,
    name: "SaaS Platform Pro",
    category: "Software",
    status: "Active",
    totalReviews: 45,
    positiveRate: 90,
    rating: 4.7,
  },
];

const reviews = [
  {
    id: 1,
    customer: "Alex Mercer",
    product: "Acme Smart Watch",
    rating: 5,
    sentiment: "Positive",
    comment:
      "The battery life is amazing! Lasted almost 3 days on a single charge.",
  },
  {
    id: 2,
    customer: "Samantha Paul",
    product: "Acme Wireless Earbuds",
    rating: 2,
    sentiment: "Negative",
    comment:
      "The Bluetooth connectivity keeps dropping during calls.",
  },
  {
    id: 3,
    customer: "David Miller",
    product: "SaaS Platform Pro",
    rating: 4,
    sentiment: "Positive",
    comment:
      "Great UI interface, made our team workflow 2x faster.",
  },
  {
    id: 4,
    customer: "Elena Rostova",
    product: "Acme Smart Watch",
    rating: 3,
    sentiment: "Neutral",
    comment:
      "Good design but step counter isn't very accurate.",
  },
];

function App() {
  const [activePage, setActivePage] = useState("Products");
  const [products, setProducts] = useState(initialProducts);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] =
    useState("Electronics");

  const [search, setSearch] = useState("");

  const [toast, setToast] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const addProduct = (e) => {
    e.preventDefault();

    if (!productName.trim()) return;

    const newProduct = {
      id: Date.now(),
      name: productName,
      category: productCategory,
      status: "Active",
      totalReviews: 0,
      positiveRate: 100,
      rating: 5.0,
    };

    setProducts([...products, newProduct]);

    setProductName("");
    setProductCategory("Electronics");
    setShowAddModal(false);

    showToast("Product added successfully");
  };

  const openEdit = (product) => {
    setEditingProduct(product);
    setProductName(product.name);
    setProductCategory(product.category);
    setShowEditModal(true);
  };

  const updateProduct = (e) => {
    e.preventDefault();

    setProducts(
      products.map((product) =>
        product.id === editingProduct.id
          ? {
              ...product,
              name: productName,
              category: productCategory,
            }
          : product
      )
    );

    setShowEditModal(false);
    setEditingProduct(null);

    showToast("Product updated successfully");
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    showToast("Product deleted");
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      {/* TOAST */}
      {toast && <div className="toast">{toast}</div>}

      {/* SIDEBAR */}
      <aside className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
        <div className="brand">
          <div className="brand-logo">R</div>
          {sidebarOpen && (
            <div>
              <div className="brand-name">ReviewRave</div>
              <div className="brand-subtitle">Review Intelligence</div>
            </div>
          )}
        </div>

        <div className="sidebar-section">
          {sidebarOpen && (
            <div className="section-label">MAIN MENU</div>
          )}

          <SidebarItem
            icon="▦"
            label="Dashboard"
            active={activePage === "Dashboard"}
            open={sidebarOpen}
            onClick={() => setActivePage("Dashboard")}
          />

          <SidebarItem
            icon="▣"
            label="Products"
            active={activePage === "Products"}
            open={sidebarOpen}
            onClick={() => setActivePage("Products")}
          />

          <SidebarItem
            icon="▤"
            label="Reviews"
            active={activePage === "Reviews"}
            open={sidebarOpen}
            onClick={() => setActivePage("Reviews")}
          />

          <SidebarItem
            icon="◉"
            label="Sentiment Insights"
            active={activePage === "Insights"}
            open={sidebarOpen}
            onClick={() => setActivePage("Insights")}
          />

          <SidebarItem
            icon="▱"
            label="Resolution Tickets"
            active={activePage === "Tickets"}
            open={sidebarOpen}
            onClick={() => setActivePage("Tickets")}
          />
        </div>

        <div className="sidebar-bottom">
          {sidebarOpen && (
            <div className="section-label">SYSTEM</div>
          )}

          <SidebarItem
            icon="⚙"
            label="Settings"
            open={sidebarOpen}
          />

          <SidebarItem
            icon="↪"
            label="Logout"
            open={sidebarOpen}
            onClick={() => showToast("Logged out")}
          />
        </div>
      </aside>

      {/* MAIN */}
      <div className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="menu-button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <div className="breadcrumb">
              Workspace
              <span>/</span>
              <strong>{activePage}</strong>
            </div>
          </div>

          <div className="topbar-right">
            <button className="notification-button">
              ♢
              <span className="notification-dot"></span>
            </button>

            <div className="profile">
              <div className="avatar">BM</div>

              <div className="profile-info">
                <strong>Brand Manager</strong>
                <span>manager@gmail.com</span>
              </div>

              <span className="profile-arrow">⌄</span>
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="content">
          {activePage === "Products" && (
            <ProductsPage
              products={filteredProducts}
              totalProducts={products.length}
              search={search}
              setSearch={setSearch}
              onAdd={() => setShowAddModal(true)}
              onEdit={openEdit}
              onDelete={deleteProduct}
            />
          )}

          {activePage === "Dashboard" && <DashboardPage />}

          {activePage === "Reviews" && (
            <ReviewsPage reviews={reviews} />
          )}

          {activePage === "Insights" && <InsightsPage />}

          {activePage === "Tickets" && <TicketsPage />}
        </main>
      </div>

      {/* ADD MODAL */}
      {showAddModal && (
        <Modal
          title="Add New Product"
          onClose={() => setShowAddModal(false)}
        >
          <form onSubmit={addProduct}>
            <label>Product Name</label>

            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter product name"
              required
            />

            <label>Category</label>

            <select
              value={productCategory}
              onChange={(e) =>
                setProductCategory(e.target.value)
              }
            >
              <option>Electronics</option>
              <option>Audio</option>
              <option>Software</option>
              <option>Home Appliances</option>
              <option>Accessories</option>
            </select>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                Add Product
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* EDIT MODAL */}
      {showEditModal && (
        <Modal
          title="Edit Product"
          onClose={() => setShowEditModal(false)}
        >
          <form onSubmit={updateProduct}>
            <label>Product Name</label>

            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />

            <label>Category</label>

            <select
              value={productCategory}
              onChange={(e) =>
                setProductCategory(e.target.value)
              }
            >
              <option>Electronics</option>
              <option>Audio</option>
              <option>Software</option>
              <option>Home Appliances</option>
              <option>Accessories</option>
            </select>

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>

              <button type="submit" className="save-btn">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      <style>{css}</style>
    </div>
  );
}

/* ============================================================
   SIDEBAR ITEM
============================================================ */

function SidebarItem({
  icon,
  label,
  active,
  open,
  onClick,
}) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
      title={!open ? label : ""}
    >
      <span className="sidebar-icon">{icon}</span>

      {open && <span>{label}</span>}

      {open && active && <span className="active-line"></span>}
    </button>
  );
}

/* ============================================================
   PRODUCTS PAGE
============================================================ */

function ProductsPage({
  products,
  totalProducts,
  search,
  setSearch,
  onAdd,
  onEdit,
  onDelete,
}) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">PRODUCT MANAGEMENT</div>

          <h1>Tracked Products</h1>

          <p>
            Monitor products, customer reviews and sentiment
            performance.
          </p>
        </div>

        <button className="primary-button" onClick={onAdd}>
          <span>＋</span>
          Add Product
        </button>
      </div>

      {/* METRICS */}
      <div className="metrics">
        <Metric
          title="Tracked Products"
          value={totalProducts}
          icon="▣"
          iconClass="purple"
          trend="+2 this month"
        />

        <Metric
          title="Total Reviews"
          value="1,240"
          icon="▤"
          iconClass="blue"
          trend="+18.4% this month"
        />

        <Metric
          title="Positive Sentiment"
          value="78%"
          icon="↗"
          iconClass="green"
          trend="+4.2% this month"
        />

        <Metric
          title="Open Tickets"
          value="24"
          icon="!"
          iconClass="orange"
          trend="3 critical"
        />
      </div>

      {/* PRODUCT AREA */}
      <section className="products-section">
        <div className="section-toolbar">
          <div>
            <h2>All Products</h2>
            <span>
              {products.length} products currently tracked
            </span>
          </div>

          <div className="toolbar-right">
            <div className="search-box">
              <span>⌕</span>

              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button className="filter-button">
              ☷ Filter
            </button>
          </div>
        </div>

        {/* PRODUCT CARDS */}
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={() => onEdit(product)}
              onDelete={() => onDelete(product.id)}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h3>No products found</h3>
            <p>
              Try changing your search or add a new product.
            </p>
          </div>
        )}
      </section>
    </>
  );
}

/* ============================================================
   METRIC
============================================================ */

function Metric({
  title,
  value,
  icon,
  iconClass,
  trend,
}) {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <span>{title}</span>

        <div className={`metric-icon ${iconClass}`}>
          {icon}
        </div>
      </div>

      <div className="metric-value">{value}</div>

      <div className="metric-trend">
        <span>↗</span>
        {trend}
      </div>
    </div>
  );
}

/* ============================================================
   PRODUCT CARD
============================================================ */

function ProductCard({
  product,
  onEdit,
  onDelete,
}) {
  return (
    <div className="product-card">
      <div className="product-top">
        <div className="product-icon">
          {product.category === "Audio"
            ? "♫"
            : product.category === "Software"
            ? "⌘"
            : "▣"}
        </div>

        <span className="status">
          <span></span>
          {product.status}
        </span>
      </div>

      <div className="product-info">
        <div className="product-category">
          {product.category}
        </div>

        <h3>{product.name}</h3>

        <div className="rating">
          <span className="stars">★★★★★</span>

          <strong>{product.rating}</strong>

          <span>
            ({product.totalReviews} reviews)
          </span>
        </div>
      </div>

      <div className="sentiment-row">
        <div>
          <span className="sentiment-label">
            Positive sentiment
          </span>

          <div className="progress">
            <div
              style={{
                width: `${product.positiveRate}%`,
              }}
            ></div>
          </div>
        </div>

        <strong>{product.positiveRate}%</strong>
      </div>

      <div className="product-footer">
        <div className="reviews-count">
          <strong>{product.totalReviews}</strong>
          <span>total reviews</span>
        </div>

        <div className="card-actions">
          <button onClick={onEdit}>Edit</button>

          <button
            className="delete-button"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   DASHBOARD
============================================================ */

function DashboardPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">OVERVIEW</div>
          <h1>Good evening, Brand Manager</h1>
          <p>
            Here's what's happening across your ReviewRave
            workspace.
          </p>
        </div>
      </div>

      <div className="metrics">
        <Metric
          title="Total Users"
          value="8"
          icon="♙"
          iconClass="purple"
          trend="+12.5% this month"
        />

        <Metric
          title="Products"
          value="12"
          icon="▣"
          iconClass="blue"
          trend="+8.3% this month"
        />

        <Metric
          title="Reviews"
          value="1,240"
          icon="▤"
          iconClass="green"
          trend="+18.4% this month"
        />

        <Metric
          title="Active Tickets"
          value="3"
          icon="!"
          iconClass="orange"
          trend="2 critical"
        />
      </div>

      <div className="dashboard-layout">
        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Sentiment Overview</h2>
              <span>Customer feedback distribution</span>
            </div>

            <span className="period">Last 30 days</span>
          </div>

          <div className="sentiment-chart">
            <div className="big-percentage">
              <strong>78%</strong>
              <span>Positive</span>
            </div>

            <div className="sentiment-bar">
              <div className="positive"></div>
              <div className="neutral"></div>
              <div className="negative"></div>
            </div>

            <div className="chart-legend">
              <span>
                <i className="green-dot"></i>
                Positive <strong>78%</strong>
              </span>

              <span>
                <i className="yellow-dot"></i>
                Neutral <strong>14%</strong>
              </span>

              <span>
                <i className="red-dot"></i>
                Negative <strong>8%</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="dashboard-card-header">
            <div>
              <h2>Recent Activity</h2>
              <span>Latest platform events</span>
            </div>
          </div>

          <Activity
            title="New brand manager registered"
            detail="Brand Corp"
            time="1 hour ago"
          />

          <Activity
            title="Ticket #402 resolved"
            detail="Resolution completed"
            time="3 hours ago"
          />

          <Activity
            title="Critical ticket assigned"
            detail="Support Agent"
            time="5 hours ago"
          />
        </div>
      </div>
    </>
  );
}

function Activity({ title, detail, time }) {
  return (
    <div className="activity">
      <div className="activity-dot"></div>

      <div>
        <strong>{title}</strong>
        <p>{detail}</p>
        <span>{time}</span>
      </div>
    </div>
  );
}

/* ============================================================
   REVIEWS
============================================================ */

function ReviewsPage({ reviews }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">CUSTOMER FEEDBACK</div>
          <h1>Customer Reviews</h1>
          <p>
            Review customer feedback and sentiment classification.
          </p>
        </div>
      </div>

      <div className="review-list">
        {reviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="review-avatar">
              {review.customer
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>

            <div className="review-content">
              <div className="review-header">
                <div>
                  <strong>{review.customer}</strong>
                  <span>{review.product}</span>
                </div>

                <span
                  className={`sentiment ${review.sentiment.toLowerCase()}`}
                >
                  {review.sentiment}
                </span>
              </div>

              <div className="review-rating">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ============================================================
   INSIGHTS
============================================================ */

function InsightsPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">AI ANALYTICS</div>
          <h1>Sentiment Insights</h1>
          <p>
            Understand what customers like and what needs
            attention.
          </p>
        </div>
      </div>

      <div className="insight-grid">
        <InsightCard
          title="Positive Feedback"
          value="78%"
          text="Customers are generally satisfied with your products."
          type="positive"
        />

        <InsightCard
          title="Neutral Feedback"
          value="14%"
          text="Some customers provided mixed or neutral experiences."
          type="neutral"
        />

        <InsightCard
          title="Negative Feedback"
          value="8%"
          text="Negative reviews primarily mention connectivity issues."
          type="negative"
        />
      </div>

      <div className="dashboard-card insight-drivers">
        <div className="driver-column">
          <h2>Top Positive Drivers</h2>

          <Driver text="Battery performance" />
          <Driver text="Smooth user interface" />
          <Driver text="Fast customer support" />
          <Driver text="Product design" />
        </div>

        <div className="driver-column">
          <h2>Customer Pain Points</h2>

          <Driver text="Bluetooth connectivity" negative />
          <Driver text="Step tracking accuracy" negative />
          <Driver text="Shipping delays" negative />
          <Driver text="Support response time" negative />
        </div>
      </div>
    </>
  );
}

function InsightCard({
  title,
  value,
  text,
  type,
}) {
  return (
    <div className={`insight-card ${type}`}>
      <span>{title}</span>
      <strong>{value}</strong>
      <p>{text}</p>
    </div>
  );
}

function Driver({ text, negative }) {
  return (
    <div className="driver">
      <span className={negative ? "driver-red" : "driver-green"}>
        {negative ? "−" : "✓"}
      </span>

      {text}
    </div>
  );
}

/* ============================================================
   TICKETS
============================================================ */

function TicketsPage() {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">SUPPORT WORKFLOW</div>
          <h1>Resolution Tickets</h1>
          <p>
            Track customer issues and resolution progress.
          </p>
        </div>

        <button className="primary-button">
          ＋ Create Ticket
        </button>
      </div>

      <div className="metrics">
        <Metric
          title="Open Tickets"
          value="24"
          icon="!"
          iconClass="orange"
          trend="3 critical"
        />

        <Metric
          title="In Progress"
          value="11"
          icon="◌"
          iconClass="blue"
          trend="Currently assigned"
        />

        <Metric
          title="Resolved"
          value="86"
          icon="✓"
          iconClass="green"
          trend="+15 this week"
        />
      </div>

      <div className="ticket-card">
        <Ticket
          id="#402"
          title="Bluetooth connectivity issue"
          priority="Critical"
          status="In Progress"
        />

        <Ticket
          id="#398"
          title="Step counter accuracy"
          priority="Medium"
          status="Open"
        />

        <Ticket
          id="#391"
          title="Shipping delay"
          priority="Low"
          status="Resolved"
        />
      </div>
    </>
  );
}

function Ticket({
  id,
  title,
  priority,
  status,
}) {
  return (
    <div className="ticket">
      <div className="ticket-id">{id}</div>

      <div className="ticket-main">
        <strong>{title}</strong>
        <span>Customer Support Request</span>
      </div>

      <span
        className={`priority ${priority.toLowerCase()}`}
      >
        {priority}
      </span>

      <span className="ticket-status">{status}</span>

      <button className="ticket-view">View</button>
    </div>
  );
}

/* ============================================================
   MODAL
============================================================ */

function Modal({ title, children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <div>
            <h2>{title}</h2>
            <span>ReviewRave product management</span>
          </div>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}

/* ============================================================
   CSS
============================================================ */

const css = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f5f7fb;
  font-family: Inter, Segoe UI, Arial, sans-serif;
  color: #172033;
}

button,
input,
select {
  font-family: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  background: #f5f7fb;
  display: flex;
}

/* SIDEBAR */

.sidebar {
  width: 245px;
  min-height: 100vh;
  background: #111827;
  color: #cbd5e1;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  padding: 22px 14px;
  transition: width .25s ease;
  z-index: 10;
}

.sidebar.closed {
  width: 76px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 4px 9px 30px;
}

.brand-logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 5px 18px rgba(79,70,229,.35);
}

.brand-name {
  color: white;
  font-size: 16px;
  font-weight: 750;
}

.brand-subtitle {
  color: #64748b;
  font-size: 9px;
  margin-top: 2px;
}

.sidebar-section {
  margin-top: 4px;
}

.section-label {
  color: #64748b;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
  padding: 0 12px 10px;
}

.sidebar-item {
  width: 100%;
  border: none;
  background: transparent;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 13px;
  padding: 11px 12px;
  margin-bottom: 4px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  position: relative;
}

.sidebar.closed .sidebar-item {
  justify-content: center;
}

.sidebar-item:hover {
  background: #1e293b;
  color: #f8fafc;
}

.sidebar-item.active {
  background: #272f58;
  color: #ffffff;
}

.sidebar-icon {
  width: 20px;
  text-align: center;
  font-size: 15px;
}

.active-line {
  position: absolute;
  right: 0;
  top: 8px;
  bottom: 8px;
  width: 3px;
  background: #818cf8;
  border-radius: 5px 0 0 5px;
}

.sidebar-bottom {
  position: absolute;
  bottom: 25px;
  left: 14px;
  right: 14px;
}

/* MAIN */

.main {
  margin-left: 245px;
  width: calc(100% - 245px);
  transition: margin .25s ease, width .25s ease;
}

.sidebar.closed ~ .main {
  margin-left: 76px;
  width: calc(100% - 76px);
}

/* TOPBAR */

.topbar {
  height: 66px;
  background: white;
  border-bottom: 1px solid #e7eaf0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
}

.topbar-left {
  gap: 20px;
}

.menu-button {
  border: none;
  background: #f1f3f8;
  width: 34px;
  height: 34px;
  border-radius: 7px;
  color: #475569;
}

.breadcrumb {
  font-size: 12px;
  color: #94a3b8;
}

.breadcrumb span {
  margin: 0 9px;
  color: #cbd5e1;
}

.breadcrumb strong {
  color: #334155;
}

.topbar-right {
  gap: 22px;
}

.notification-button {
  border: none;
  background: transparent;
  font-size: 21px;
  color: #64748b;
  position: relative;
}

.notification-dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #ef4444;
  border-radius: 50%;
  right: 0;
  top: 1px;
}

.profile {
  display: flex;
  align-items: center;
  gap: 9px;
}

.avatar {
  width: 34px;
  height: 34px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
}

.profile-info {
  display: flex;
  flex-direction: column;
}

.profile-info strong {
  font-size: 11px;
  color: #1e293b;
}

.profile-info span {
  font-size: 9px;
  color: #94a3b8;
  margin-top: 2px;
}

.profile-arrow {
  color: #94a3b8;
  margin-left: 4px;
}

/* CONTENT */

.content {
  max-width: 1450px;
  margin: 0 auto;
  padding: 34px 42px 50px;
}

.page-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 27px;
}

.eyebrow {
  color: #6366f1;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 1.2px;
  margin-bottom: 6px;
}

.page-heading h1 {
  margin: 0;
  font-size: 25px;
  font-weight: 750;
  color: #111827;
  letter-spacing: -.5px;
}

.page-heading p {
  margin: 7px 0 0;
  font-size: 12px;
  color: #64748b;
}

/* BUTTON */

.primary-button {
  border: none;
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
  padding: 11px 17px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 5px 12px rgba(79,70,229,.18);
}

.primary-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 7px 16px rgba(79,70,229,.25);
}

/* METRICS */

.metrics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 25px;
}

.metric-card {
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 11px;
  padding: 18px;
  box-shadow: 0 3px 12px rgba(15,23,42,.035);
}

.metric-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.metric-header > span {
  color: #64748b;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .3px;
}

.metric-icon {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
}

.metric-icon.purple {
  color: #4f46e5;
  background: #eef2ff;
}

.metric-icon.blue {
  color: #2563eb;
  background: #eff6ff;
}

.metric-icon.green {
  color: #16a34a;
  background: #f0fdf4;
}

.metric-icon.orange {
  color: #d97706;
  background: #fffbeb;
}

.metric-value {
  margin-top: 13px;
  font-size: 27px;
  font-weight: 800;
  color: #111827;
}

.metric-trend {
  margin-top: 6px;
  color: #16a34a;
  font-size: 10px;
  font-weight: 650;
}

/* PRODUCT SECTION */

.products-section {
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 13px;
  padding: 23px;
  box-shadow: 0 3px 12px rgba(15,23,42,.035);
}

.section-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-toolbar h2 {
  margin: 0;
  font-size: 15px;
  color: #111827;
}

.section-toolbar span {
  display: block;
  margin-top: 4px;
  color: #94a3b8;
  font-size: 10px;
}

.toolbar-right {
  display: flex;
  gap: 9px;
}

.search-box {
  width: 220px;
  height: 34px;
  border: 1px solid #e2e8f0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: #fafbfc;
}

.search-box span {
  margin: 0;
  font-size: 17px;
  color: #94a3b8;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  margin-left: 7px;
  font-size: 11px;
  color: #334155;
}

.filter-button {
  height: 34px;
  padding: 0 13px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #475569;
  border-radius: 7px;
  font-size: 11px;
  font-weight: 600;
}

/* PRODUCT GRID */

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 17px;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  padding: 18px;
  background: #ffffff;
  transition: .2s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 9px 24px rgba(15,23,42,.08);
  border-color: #c7d2fe;
}

.product-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #f1f5ff;
  color: #4f46e5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 700;
}

.status {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  background: #ecfdf5;
  color: #15803d;
  border-radius: 20px;
  font-size: 9px;
  font-weight: 750;
}

.status span {
  width: 5px;
  height: 5px;
  background: #22c55e;
  border-radius: 50%;
}

.product-info {
  margin-top: 16px;
}

.product-category {
  color: #6366f1;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .6px;
}

.product-info h3 {
  margin: 5px 0 9px;
  font-size: 15px;
  color: #111827;
}

.rating {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
}

.stars {
  color: #f59e0b;
  letter-spacing: 1px;
}

.rating strong {
  color: #334155;
}

.rating span:last-child {
  color: #94a3b8;
}

.sentiment-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-top: 18px;
}

.sentiment-row > div {
  flex: 1;
}

.sentiment-label {
  font-size: 9px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.progress {
  height: 5px;
  background: #edf0f4;
  border-radius: 10px;
  overflow: hidden;
}

.progress div {
  height: 100%;
  background: #22c55e;
  border-radius: 10px;
}

.sentiment-row > strong {
  color: #16a34a;
  font-size: 12px;
}

.product-footer {
  border-top: 1px solid #eef0f4;
  margin-top: 17px;
  padding-top: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reviews-count {
  display: flex;
  flex-direction: column;
}

.reviews-count strong {
  font-size: 12px;
  color: #334155;
}

.reviews-count span {
  margin-top: 2px;
  font-size: 9px;
  color: #94a3b8;
}

.card-actions {
  display: flex;
  gap: 5px;
}

.card-actions button {
  border: 1px solid #dbe1ea;
  background: white;
  color: #475569;
  border-radius: 6px;
  padding: 6px 9px;
  font-size: 9px;
  font-weight: 650;
}

.card-actions button:hover {
  background: #f8fafc;
}

.card-actions .delete-button {
  color: #dc2626;
  background: #fff7f7;
  border-color: #fee2e2;
}

/* EMPTY */

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 35px;
  color: #cbd5e1;
}

.empty-state h3 {
  margin: 10px 0 4px;
}

.empty-state p {
  color: #94a3b8;
  font-size: 11px;
}

/* DASHBOARD */

.dashboard-layout {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 18px;
}

.dashboard-card {
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 13px;
  padding: 22px;
  box-shadow: 0 3px 12px rgba(15,23,42,.035);
}

.dashboard-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 25px;
}

.dashboard-card-header h2 {
  margin: 0;
  font-size: 14px;
}

.dashboard-card-header span {
  display: block;
  margin-top: 4px;
  font-size: 10px;
  color: #94a3b8;
}

.period {
  padding: 6px 9px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #64748b !important;
}

.sentiment-chart {
  padding: 10px 0;
}

.big-percentage {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.big-percentage strong {
  font-size: 38px;
}

.big-percentage span {
  font-size: 11px;
  color: #16a34a;
  font-weight: 700;
}

.sentiment-bar {
  height: 14px;
  display: flex;
  border-radius: 20px;
  overflow: hidden;
  margin: 22px 0;
}

.sentiment-bar .positive {
  width: 78%;
  background: #22c55e;
}

.sentiment-bar .neutral {
  width: 14%;
  background: #f59e0b;
}

.sentiment-bar .negative {
  width: 8%;
  background: #ef4444;
}

.chart-legend {
  display: flex;
  gap: 25px;
}

.chart-legend span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 10px;
  color: #64748b;
}

.chart-legend strong {
  color: #334155;
}

.chart-legend i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.green-dot {
  background: #22c55e;
}

.yellow-dot {
  background: #f59e0b;
}

.red-dot {
  background: #ef4444;
}

.activity {
  display: flex;
  gap: 12px;
  padding-bottom: 19px;
  margin-bottom: 19px;
  border-bottom: 1px solid #f1f5f9;
}

.activity:last-child {
  border-bottom: none;
}

.activity-dot {
  width: 8px;
  height: 8px;
  background: #6366f1;
  border-radius: 50%;
  margin-top: 4px;
  flex-shrink: 0;
}

.activity strong {
  font-size: 11px;
  color: #334155;
}

.activity p {
  margin: 3px 0;
  color: #64748b;
  font-size: 10px;
}

.activity span {
  font-size: 9px;
  color: #94a3b8;
}

/* REVIEWS */

.review-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.review-card {
  display: flex;
  gap: 15px;
  padding: 18px;
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 11px;
}

.review-avatar {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: #eef2ff;
  color: #4f46e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 800;
  flex-shrink: 0;
}

.review-content {
  flex: 1;
}

.review-header {
  display: flex;
  justify-content: space-between;
}

.review-header strong {
  font-size: 12px;
  display: block;
}

.review-header span {
  display: block;
  font-size: 9px;
  color: #94a3b8;
  margin-top: 3px;
}

.review-rating {
  margin-top: 8px;
  color: #f59e0b;
  letter-spacing: 2px;
  font-size: 11px;
}

.review-content p {
  color: #475569;
  font-size: 11px;
  line-height: 1.6;
  margin: 7px 0 0;
}

.sentiment {
  height: fit-content;
  padding: 5px 8px !important;
  border-radius: 20px;
  font-size: 9px !important;
  font-weight: 700;
}

.sentiment.positive {
  background: #ecfdf5;
  color: #15803d;
}

.sentiment.negative {
  background: #fef2f2;
  color: #dc2626;
}

.sentiment.neutral {
  background: #fffbeb;
  color: #b45309;
}

/* INSIGHTS */

.insight-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 17px;
  margin-bottom: 18px;
}

.insight-card {
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 12px;
  padding: 21px;
}

.insight-card > span {
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
}

.insight-card strong {
  display: block;
  font-size: 31px;
  margin-top: 10px;
}

.insight-card p {
  color: #64748b;
  font-size: 10px;
  line-height: 1.6;
}

.insight-card.positive {
  border-top: 3px solid #22c55e;
}

.insight-card.positive strong {
  color: #16a34a;
}

.insight-card.neutral {
  border-top: 3px solid #f59e0b;
}

.insight-card.neutral strong {
  color: #d97706;
}

.insight-card.negative {
  border-top: 3px solid #ef4444;
}

.insight-card.negative strong {
  color: #dc2626;
}

.insight-drivers {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.driver-column h2 {
  font-size: 14px;
  margin: 0 0 15px;
}

.driver {
  padding: 11px 0;
  border-bottom: 1px solid #f1f5f9;
  font-size: 11px;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 9px;
}

.driver-green,
.driver-red {
  width: 21px;
  height: 21px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.driver-green {
  background: #dcfce7;
  color: #16a34a;
}

.driver-red {
  background: #fee2e2;
  color: #dc2626;
}

/* TICKETS */

.ticket-card {
  background: white;
  border: 1px solid #e7eaf0;
  border-radius: 12px;
  overflow: hidden;
}

.ticket {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 18px 20px;
  border-bottom: 1px solid #f1f5f9;
}

.ticket:last-child {
  border-bottom: none;
}

.ticket-id {
  font-size: 11px;
  color: #6366f1;
  font-weight: 750;
  width: 40px;
}

.ticket-main {
  flex: 1;
}

.ticket-main strong {
  display: block;
  font-size: 11px;
}

.ticket-main span {
  display: block;
  font-size: 9px;
  color: #94a3b8;
  margin-top: 4px;
}

.priority,
.ticket-status {
  font-size: 9px;
  font-weight: 700;
  padding: 5px 8px;
  border-radius: 20px;
}

.priority.critical {
  background: #fee2e2;
  color: #dc2626;
}

.priority.medium {
  background: #fef3c7;
  color: #b45309;
}

.priority.low {
  background: #e0f2fe;
  color: #0369a1;
}

.ticket-status {
  color: #475569;
  background: #f1f5f9;
}

.ticket-view {
  border: 1px solid #e2e8f0;
  background: white;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 9px;
}

/* MODAL */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(3px);
}

.modal {
  width: 420px;
  background: white;
  border-radius: 14px;
  padding: 23px;
  box-shadow: 0 25px 70px rgba(15,23,42,.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 23px;
}

.modal-header h2 {
  margin: 0;
  font-size: 17px;
}

.modal-header span {
  display: block;
  margin-top: 4px;
  font-size: 9px;
  color: #94a3b8;
}

.modal-close {
  border: none;
  background: #f1f5f9;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 18px;
  color: #64748b;
}

.modal label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  margin: 14px 0 6px;
}

.modal input,
.modal select {
  width: 100%;
  height: 39px;
  border: 1px solid #dbe1ea;
  border-radius: 7px;
  padding: 0 11px;
  outline: none;
  font-size: 11px;
  background: white;
}

.modal input:focus,
.modal select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px #eef2ff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 22px;
}

.cancel-btn,
.save-btn {
  padding: 9px 14px;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 700;
}

.cancel-btn {
  border: 1px solid #dbe1ea;
  background: white;
  color: #475569;
}

.save-btn {
  border: none;
  background: #4f46e5;
  color: white;
}

/* TOAST */

.toast {
  position: fixed;
  right: 25px;
  top: 80px;
  background: #111827;
  color: white;
  padding: 11px 17px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  z-index: 500;
  box-shadow: 0 10px 25px rgba(0,0,0,.15);
}

/* RESPONSIVE */

@media (max-width: 1100px) {
  .metrics {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .dashboard-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 750px) {
  .sidebar {
    width: 76px;
  }

  .sidebar .brand-name,
  .sidebar .brand-subtitle,
  .sidebar .section-label,
  .sidebar-item span:not(.sidebar-icon) {
    display: none;
  }

  .sidebar-item {
    justify-content: center;
  }

  .main,
  .sidebar.closed ~ .main {
    margin-left: 76px;
    width: calc(100% - 76px);
  }

  .content {
    padding: 25px 18px;
  }

  .product-grid,
  .metrics,
  .insight-grid {
    grid-template-columns: 1fr;
  }

  .section-toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .toolbar-right {
    width: 100%;
  }

  .search-box {
    flex: 1;
  }

  .topbar {
    padding: 0 16px;
  }

  .profile-info,
  .profile-arrow {
    display: none;
  }

  .insight-drivers {
    grid-template-columns: 1fr;
  }
}
`;

export default App;