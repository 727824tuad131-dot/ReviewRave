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
  const [currentPage, setCurrentPage] = useState("login"); // 'login' | 'register' | 'dashboard'
  const [selectedRole, setSelectedRole] = useState("Brand Manager"); // 'Brand Manager' | 'Resolution Agent' | 'Platform Admin'
  const [activeTab, setActiveTab] = useState("Dashboard");

  // Auth Form States
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Acme Corp");
  const [email, setEmail] = useState("manager@gmail.com");
  const [password, setPassword] = useState("12345678");

  // Filter & Search States
  const [productSearch, setProductSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("Acme Smart Watch");
  const [ticketTab, setTicketTab] = useState("Available Tickets"); // 'Available Tickets' | 'My Tasks' | 'Resolved'
  const [ticketStatusFilter, setTicketStatusFilter] = useState("ALL");
  const [toastMessage, setToastMessage] = useState("");

  // Modal States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProdName, setNewProdName] = useState("");
  const [newProdCategory, setNewProdCategory] = useState("Electronics");

  // Selected Ticket for Agent Resolution Note
  const [activeTicketForResolution, setActiveTicketForResolution] = useState(null);
  const [resolutionNote, setResolutionNote] = useState("");

  // Sample Data States
  const [products, setProducts] = useState([
    { id: 1, name: "Acme Smart Watch", category: "Electronics", status: "Active", totalReviews: 324, positiveRate: "82%", rating: 4.3 },
    { id: 2, name: "Acme Wireless Earbuds", category: "Audio", status: "Active", totalReviews: 120, positiveRate: "78%", rating: 4.1 },
    { id: 3, name: "SaaS Platform Pro", category: "Software", status: "Active", totalReviews: 45, positiveRate: "90%", rating: 4.7 },
  ]);

  const [users, setUsers] = useState([
    { id: "#001", name: "John Doe", email: "john@reviewrave.com", role: "BRAND_MANAGER", status: "Active" },
    { id: "#002", name: "Support Agent", email: "agent@reviewrave.com", role: "RESOLUTION_AGENT", status: "Active" },
    { id: "#003", name: "Admin User", email: "admin@reviewrave.com", role: "PLATFORM_ADMIN", status: "Active" },
    { id: "#004", name: "Sarah Smith", email: "sarah@acme.com", role: "BRAND_MANAGER", status: "Inactive" },
  ]);

  const [tickets, setTickets] = useState([
    { id: "#102", priority: "HIGH", status: "OPEN", snippet: "Hello, product stopped working after two weeks...", assignedTo: null, resolutionNote: "" },
    { id: "#103", priority: "HIGH", status: "OPEN", snippet: "Feedback regarding battery drainage...", assignedTo: null, resolutionNote: "" },
    { id: "#104", priority: "CRITICAL", status: "OPEN", snippet: "Bad build quality and late delivery...", assignedTo: null, resolutionNote: "" },
  ]);

  // Utility Toast Notification
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    setCurrentPage("dashboard");
    setActiveTab(selectedRole === "Brand Manager" ? "Tracked Products" : selectedRole === "Resolution Agent" ? "Resolution Tickets" : "Overview");
    showToast(`Logged in as ${selectedRole}`);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setCurrentPage("login");
    showToast("Registration successful! Please login.");
  };

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
    setIsAddProductOpen(false);
    showToast(`Product "${newProdName}" added successfully!`);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    showToast("Product deleted!");
  };

  const handleToggleUserStatus = (id) => {
    setUsers(
      users.map((u) => (u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u))
    );
    showToast("User status updated!");
  };

  const handleClaimTicket = (ticketId) => {
    setTickets(
      tickets.map((t) => (t.id === ticketId ? { ...t, assignedTo: "Current Agent", status: "INVESTIGATING" } : t))
    );
    showToast(`Ticket ${ticketId} assigned to you!`);
  };

  const handleResolveTicket = (ticketId) => {
    if (!resolutionNote.trim()) {
      showToast("Please enter resolution notes before resolving.");
      return;
    }
    setTickets(
      tickets.map((t) =>
        t.id === ticketId ? { ...t, status: "RESOLVED", resolutionNote: resolutionNote } : t
      )
    );
    setResolutionNote("");
    setActiveTicketForResolution(null);
    showToast(`Ticket ${ticketId} marked as Resolved!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center gap-2">
          <span>ℹ️</span> {toastMessage}
        </div>
      )}

      {/* 1. LOGIN PAGE (IMAGE MATCHING SPLIT LAYOUT) */}
      {currentPage === "login" && (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
          <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row max-w-4xl w-full overflow-hidden border border-slate-200">
            {/* Left Hero Panel */}
            <div className="bg-indigo-600 p-8 text-white md:w-5/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-white text-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">R</div>
                  <span className="font-bold text-xl tracking-tight">ReviewRave</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">Turn customer feedback into action</h2>
                <div className="space-y-4 text-indigo-100 text-sm">
                  <div className="flex items-center gap-3 bg-indigo-500/30 p-2.5 rounded-lg">
                    <span>📊</span> Sentiment Insights
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-500/30 p-2.5 rounded-lg">
                    <span>⚡</span> Smart Ticket Routing
                  </div>
                  <div className="flex items-center gap-3 bg-indigo-500/30 p-2.5 rounded-lg">
                    <span>🎯</span> Track What Matters
                  </div>
                </div>
              </div>
              <div className="text-xs text-indigo-200 mt-8">© 2026 ReviewRave. Customer Intelligence Platform</div>
            </div>

            {/* Right Login Form */}
            <div className="p-8 md:w-7/12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-1">Login to ReviewRave</h3>
              <p className="text-sm text-slate-500 mb-6">Sign in to your account</p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Select Role to Enter</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 bg-indigo-50 border border-indigo-300 text-indigo-900 font-medium rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Brand Manager">Brand Manager</option>
                    <option value="Resolution Agent">Resolution Agent</option>
                    <option value="Platform Admin">Platform Admin</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition">
                  Login to {selectedRole} Dashboard
                </button>
              </form>

              <p className="text-xs text-slate-500 text-center mt-6">
                Don't have an account?{" "}
                <button onClick={() => setCurrentPage("register")} className="text-indigo-600 font-semibold hover:underline">
                  Register here
                </button>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. REGISTER PAGE */}
      {currentPage === "register" && (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Register Account</h3>
            <p className="text-sm text-slate-500 mb-6">Create a new ReviewRave user profile</p>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Company Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Select Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium"
                >
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Resolution Agent">Resolution Agent</option>
                  <option value="Platform Admin">Platform Admin</option>
                </select>
              </div>

              <button type="submit" className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm">
                Create Account
              </button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-6">
              Already have an account?{" "}
              <button onClick={() => setCurrentPage("login")} className="text-indigo-600 font-semibold hover:underline">
                Login here
              </button>
            </p>
          </div>
        </div>
      )}

      {/* 3. DASHBOARD (MAIN SYSTEM ACCORDING TO IMAGE) */}
      {currentPage === "dashboard" && (
        <div className="min-h-screen flex flex-col">
          {/* Top Navbar */}
          <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold text-sm">R</div>
                <span className="font-bold text-lg text-slate-900">ReviewRave</span>
              </div>

              {/* Dynamic Role Navigation Tabs */}
              <nav className="hidden md:flex items-center gap-1">
                {selectedRole === "Brand Manager" &&
                  ["Tracked Products", "Sentiment Insights", "Reviews", "Settings"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                        activeTab === tab ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                {selectedRole === "Resolution Agent" &&
                  ["Resolution Tickets", "My Tasks", "Resolved"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setTicketTab(tab);
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                        activeTab === tab ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}

                {selectedRole === "Platform Admin" &&
                  ["Overview", "User Management", "Products"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
                        activeTab === tab ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
              </nav>
            </div>

            {/* User Info & Switcher Header */}
            <div className="flex items-center gap-3">
              <span className="text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-bold">
                {selectedRole}
              </span>
              <button
                onClick={() => setCurrentPage("login")}
                className="text-xs text-slate-500 hover:text-red-600 font-semibold border border-slate-300 px-2.5 py-1 rounded-md"
              >
                Logout
              </button>
            </div>
          </header>

          {/* MAIN ROLE DASHBOARD CONTAINER */}
          <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">
            
            {/* -------------------------------------------------------------------------------- */}
            {/* ROLE 1: BRAND MANAGER DASHBOARD VIEWS */}
            {/* -------------------------------------------------------------------------------- */}
            {selectedRole === "Brand Manager" && (
              <>
                {/* 1. Tracked Products View */}
                {activeTab === "Tracked Products" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900">Tracked Products</h1>
                        <p className="text-xs text-slate-500">Monitor customer feedback and sentiment</p>
                      </div>
                      <button
                        onClick={() => setIsAddProductOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition"
                      >
                        + Add Product
                      </button>
                    </div>

                    {/* Metrics Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-400">Tracked Products</span>
                        <div className="text-2xl font-bold text-slate-900 mt-1">{products.length}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-400">Total Reviews</span>
                        <div className="text-2xl font-bold text-slate-900 mt-1">1,240</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-400">Positive Sentiment</span>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">78%</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                        <span className="text-xs font-semibold text-slate-400">Open Tickets</span>
                        <div className="text-2xl font-bold text-amber-600 mt-1">5</div>
                      </div>
                    </div>

                    {/* Product Cards Grid */}
                    <div className="grid md:grid-cols-3 gap-4">
                      {products.map((p) => (
                        <div key={p.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-bold text-slate-900">{p.name}</h3>
                              <span className="text-xs bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded">
                                {p.status}
                              </span>
                            </div>
                            <span className="text-xs text-slate-400">{p.category}</span>

                            <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-3 rounded-lg">
                              <div>
                                <div className="text-xs text-slate-400">Reviews</div>
                                <div className="font-bold text-slate-800 text-sm">{p.totalReviews}</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-400">Positive</div>
                                <div className="font-bold text-emerald-600 text-sm">{p.positiveRate}</div>
                              </div>
                              <div>
                                <div className="text-xs text-slate-400">Rating</div>
                                <div className="font-bold text-indigo-600 text-sm">{p.rating}</div>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => setActiveTab("Reviews")}
                              className="flex-1 py-1.5 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              View Reviews
                            </button>
                            <button
                              onClick={() => setActiveTab("Sentiment Insights")}
                              className="flex-1 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-semibold hover:bg-indigo-100"
                            >
                              View Insights
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(p.id)}
                              className="px-2 text-xs text-red-500 hover:bg-red-50 rounded"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      ))}

                      {/* Add another product quick box */}
                      <div
                        onClick={() => setIsAddProductOpen(true)}
                        className="border-2 border-dashed border-slate-300 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 transition min-h-[200px]"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold mb-2">+</div>
                        <span className="font-semibold text-sm text-slate-700">Add Another Product</span>
                        <span className="text-xs text-slate-400">Track a new product line</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Sentiment Insights View */}
                {activeTab === "Sentiment Insights" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Sentiment Insights</h1>
                      <p className="text-xs text-slate-500">Understand customer sentiment across product lines</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <label className="block text-xs font-semibold text-slate-500 mb-1">Select Product</label>
                      <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="w-full md:w-64 px-3 py-2 border border-slate-300 rounded-lg text-sm"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Positive</div>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">78%</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Neutral</div>
                        <div className="text-2xl font-bold text-amber-500 mt-1">12%</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Negative</div>
                        <div className="text-2xl font-bold text-red-500 mt-1">10%</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                        <div className="text-xs text-slate-400 font-semibold">Total Reviews</div>
                        <div className="text-2xl font-bold text-slate-800 mt-1">324</div>
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200">
                      <h3 className="font-bold text-slate-900 mb-2">Recommendation</h3>
                      <p className="text-sm text-slate-600">Focus on improving battery life and increasing product durability based on negative sentiment trends.</p>
                    </div>
                  </div>
                )}

                {/* 3. Customer Reviews View */}
                {activeTab === "Reviews" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Customer Reviews</h1>
                      <p className="text-xs text-slate-500">Ingest customer feedback from supported platforms</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 max-w-2xl">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Product</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          {products.map((p) => (
                            <option key={p.id}>{p.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Source Platform</label>
                        <select className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm">
                          <option>Google Reviews</option>
                          <option>Amazon</option>
                          <option>Trustpilot</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Review Text</label>
                        <textarea
                          placeholder="Enter customer review..."
                          rows={4}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                        ></textarea>
                      </div>

                      <button
                        onClick={() => showToast("Review submitted for processing!")}
                        className="px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-lg text-xs hover:bg-indigo-700"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* -------------------------------------------------------------------------------- */}
            {/* ROLE 2: RESOLUTION AGENT DASHBOARD VIEWS */}
            {/* -------------------------------------------------------------------------------- */}
            {selectedRole === "Resolution Agent" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Resolution Dashboard</h1>
                  <p className="text-xs text-slate-500">Process customer escalation tickets, assign ownership, and record resolution notes</p>
                </div>

                {/* Agent Sub-tabs */}
                <div className="flex gap-2 border-b border-slate-200 pb-2">
                  {["Available Tickets", "My Tasks", "Resolved"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setTicketTab(tab);
                      }}
                      className={`px-4 py-2 text-xs font-bold rounded-lg transition ${
                        ticketTab === tab ? "bg-indigo-600 text-white" : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500">Filter by Status:</span>
                  <select
                    value={ticketStatusFilter}
                    onChange={(e) => setTicketStatusFilter(e.target.value)}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-xs bg-slate-50"
                  >
                    <option value="ALL font-semibold">ALL</option>
                    <option value="OPEN">OPEN</option>
                    <option value="INVESTIGATING">INVESTIGATING</option>
                    <option value="RESOLVED">RESOLVED</option>
                  </select>
                </div>

                {/* Ticket Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                        <th className="p-3">Ticket ID</th>
                        <th className="p-3">Priority</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Review Snippet</th>
                        <th className="p-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {tickets
                        .filter((t) => {
                          if (ticketTab === "My Tasks") return t.assignedTo === "Current Agent" && t.status !== "RESOLVED";
                          if (ticketTab === "Resolved") return t.status === "RESOLVED";
                          return t.assignedTo === null && t.status !== "RESOLVED";
                        })
                        .map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-slate-800">{t.id}</td>
                            <td className="p-3">
                              <span
                                className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                                  t.priority === "CRITICAL"
                                    ? "bg-red-100 text-red-700"
                                    : t.priority === "HIGH"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {t.priority}
                              </span>
                            </td>
                            <td className="p-3 font-semibold text-slate-600">{t.status}</td>
                            <td className="p-3 max-w-xs truncate text-slate-500">{t.snippet}</td>
                            <td className="p-3 text-right">
                              {ticketTab === "Available Tickets" && (
                                <button
                                  onClick={() => handleClaimTicket(t.id)}
                                  className="px-3 py-1 bg-indigo-600 text-white rounded font-semibold text-xs hover:bg-indigo-700"
                                >
                                  Assign / Claim
                                </button>
                              )}
                              {ticketTab === "My Tasks" && (
                                <button
                                  onClick={() => setActiveTicketForResolution(t)}
                                  className="px-3 py-1 bg-emerald-600 text-white rounded font-semibold text-xs hover:bg-emerald-700"
                                >
                                  Resolve Ticket
                                </button>
                              )}
                              {ticketTab === "Resolved" && (
                                <span className="text-emerald-600 font-bold">✓ Resolved</span>
                              )}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                {/* Resolution Notes Drawer / Card */}
                {activeTicketForResolution && (
                  <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-xl space-y-3">
                    <h3 className="font-bold text-slate-900 text-sm">
                      Resolve Ticket {activeTicketForResolution.id}
                    </h3>
                    <p className="text-xs text-slate-600">"{activeTicketForResolution.snippet}"</p>
                    <textarea
                      value={resolutionNote}
                      onChange={(e) => setResolutionNote(e.target.value)}
                      placeholder="Enter resolution details..."
                      rows={3}
                      className="w-full p-2.5 bg-white border border-indigo-200 rounded-lg text-xs"
                    ></textarea>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleResolveTicket(activeTicketForResolution.id)}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700"
                      >
                        Resolve Ticket
                      </button>
                      <button
                        onClick={() => setActiveTicketForResolution(null)}
                        className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* -------------------------------------------------------------------------------- */}
            {/* ROLE 3: PLATFORM ADMIN DASHBOARD VIEWS */}
            {/* -------------------------------------------------------------------------------- */}
            {selectedRole === "Platform Admin" && (
              <>
                {/* Admin Overview */}
                {activeTab === "Overview" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">Platform Overview</h1>
                      <p className="text-xs text-slate-500">Manage users, products, tickets, and platform-wide activity</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-400">Total Users</span>
                        <div className="text-2xl font-bold text-slate-900 mt-1">{users.length}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-400">Total Products</span>
                        <div className="text-2xl font-bold text-indigo-600 mt-1">{products.length}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-400">Active Tickets</span>
                        <div className="text-2xl font-bold text-amber-500 mt-1">{tickets.length}</div>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-semibold text-slate-400">Resolved Today</span>
                        <div className="text-2xl font-bold text-emerald-600 mt-1">14</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 text-sm mb-4">Global User Roles</h3>
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Brand Managers</span>
                            <span className="font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">60%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Resolution Agents</span>
                            <span className="font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">25%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600">Platform Admins</span>
                            <span className="font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">15%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-xl border border-slate-200">
                        <h3 className="font-bold text-slate-900 text-sm mb-4">Recent Timeline</h3>
                        <ul className="space-y-2 text-xs text-slate-600">
                          <li>• New brand manager registered 2h ago</li>
                          <li>• System review ingestion completed 4h ago</li>
                          <li>• Critical ticket assigned to agent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* Admin User Management */}
                {activeTab === "User Management" && (
                  <div className="space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-slate-900">User Management</h1>
                      <p className="text-xs text-slate-500">Manage platform users and account status</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                      <input
                        type="text"
                        placeholder="Search users by name or email..."
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="w-full md:w-80 px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="p-3">ID</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {users
                            .filter(
                              (u) =>
                                u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                                u.email.toLowerCase().includes(userSearch.toLowerCase())
                            )
                            .map((u) => (
                              <tr key={u.id} className="hover:bg-slate-50">
                                <td className="p-3 text-slate-400">{u.id}</td>
                                <td className="p-3 font-bold text-slate-800">{u.name}</td>
                                <td className="p-3 text-slate-500">{u.email}</td>
                                <td className="p-3">
                                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[10px]">
                                    {u.role}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span
                                    className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                      u.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                                    }`}
                                  >
                                    {u.status}
                                  </span>
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => handleToggleUserStatus(u.id)}
                                    className="px-3 py-1 border border-slate-300 rounded text-slate-700 font-semibold text-xs hover:bg-slate-100"
                                  >
                                    Toggle Status
                                  </button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Admin Products View */}
                {activeTab === "Products" && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h1 className="text-xl font-bold text-slate-900">Tracked Products</h1>
                        <p className="text-xs text-slate-500">Manage all tracked products across the platform</p>
                      </div>
                      <button
                        onClick={() => setIsAddProductOpen(true)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700"
                      >
                        + Add Product
                      </button>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Reviews</th>
                            <th className="p-3">Rating</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50">
                              <td className="p-3 font-bold text-slate-800">{p.name}</td>
                              <td className="p-3 text-slate-500">{p.category}</td>
                              <td className="p-3 font-semibold">{p.totalReviews}</td>
                              <td className="p-3 text-indigo-600 font-bold">{p.rating}</td>
                              <td className="p-3">
                                <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold text-[10px]">
                                  {p.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="px-3 py-1 bg-red-50 text-red-600 rounded font-semibold hover:bg-red-100"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      )}

      {/* ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Add New Product</h3>
            <form onSubmit={handleAddProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Product Name</label>
                <input
                  type="text"
                  placeholder="e.g. Acme Smart Headphones"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Category</label>
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Audio">Audio</option>
                  <option value="Software">Software</option>
                  <option value="Retail">Retail</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700">
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-200"
                >
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