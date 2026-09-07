import React, { useState, useEffect } from "react";

// Default Seed Data
const initialUsers = [
  { id: "#1", name: "Brand Manager", email: "manager@gmail.com", company: "Brand Corp", role: "BRAND_MANAGER", status: "Active" },
  { id: "#2", name: "Support Agent", email: "agent@gmail.com", company: "PandaPure Support", role: "RESOLUTION_AGENT", status: "Inactive" },
  { id: "#3", name: "Platform Admin", email: "admin@gmail.com", company: "ReviewRave Inc", role: "PLATFORM_ADMIN", status: "Active" },
  { id: "#4", name: "Manager", email: "manager2@gmail.com", company: "Brand Corp", role: "BRAND_MANAGER", status: "Pending" },
  { id: "#5", name: "Agent", email: "agent2@gmail.com", company: "Acro", role: "RESOLUTION_AGENT", status: "Active" },
  { id: "#6", name: "Admin", email: "admin2@gmail.com", company: "Acro", role: "PLATFORM_ADMIN", status: "Active" },
  { id: "#7", name: "Manager", email: "manager3@gmail.com", company: "Manager", role: "BRAND_MANAGER", status: "Active" },
  { id: "#8", name: "Brand Manager", email: "brand@test.com", company: "ReviewRave", role: "BRAND_MANAGER", status: "Active" },
];

const initialProducts = [
  { id: 1, name: "Headset", category: "ELECTRONICS", reviews: 10, sentiment: 4.2 },
  { id: 2, name: "mouse", category: "SOFTWARE", reviews: 5, sentiment: 3.8 },
  { id: 3, name: "headset", category: "HOSPITALITY", reviews: 2, sentiment: 2.5 },
  { id: 4, name: "keyboard", category: "RETAIL", reviews: 14, sentiment: 4.9 },
];

const initialTickets = [
  { id: "#2", priority: "HIGH", status: "Open", snippet: "hello...", team: "my" },
  { id: "#3", priority: "HIGH", status: "Open", snippet: "hahaha...", team: "my" },
  { id: "#4", priority: "CRITICAL", status: "Open", snippet: "req...", team: "available" },
];

export default function App() {
  const [currentView, setCurrentView] = useState("login");
  const [ticketTab, setTicketTab] = useState("my");

  // --- LOCALSTORAGE INITIALIZATION ---
  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("rr_users");
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem("rr_products");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [ticketsList, setTicketsList] = useState(() => {
    const saved = localStorage.getItem("rr_tickets");
    return saved ? JSON.parse(saved) : initialTickets;
  });

  // --- LOCALSTORAGE PERSISTENCE EFFECTS ---
  useEffect(() => {
    localStorage.setItem("rr_users", JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem("rr_products", JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem("rr_tickets", JSON.stringify(ticketsList));
  }, [ticketsList]);

  // Form & UI States
  const [registerForm, setRegisterForm] = useState({ firstName: "Jane", lastName: "Doe", company: "Acme Corp (Optional)", email: "manager@gmail.com", password: "••••••••", role: "BRAND_MANAGER" });
  const [loginForm, setLoginForm] = useState({ email: "manager@gmail.com", password: "••••••••" });
  
  const [productSearch, setProductSearch] = useState("");
  const [ticketStatusFilter, setTicketStatusFilter] = useState("All");
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [newProductData, setNewProductData] = useState({ name: "", category: "ELECTRONICS" });

  // --- INTERACTIVE EVENT HANDLERS ---
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      id: `#${usersList.length + 1}`,
      name: `${registerForm.firstName} ${registerForm.lastName}`,
      email: registerForm.email,
      company: registerForm.company || "N/A",
      role: registerForm.role,
      status: "Active"
    };
    setUsersList([...usersList, newUser]);
    alert("Account Registered & Saved to LocalStorage!");
    setCurrentView("dashboard");
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert(`Logged in as ${loginForm.email}`);
    setCurrentView("dashboard");
  };

  const toggleUserStatus = (id) => {
    setUsersList(usersList.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Inactive" : "Active" } : u));
  };

  const deleteUser = (id) => {
    setUsersList(usersList.filter(u => u.id !== id));
  };

  const handleAddProductSubmit = (e) => {
    e.preventDefault();
    if (!newProductData.name) return;
    const addedProduct = {
      id: Date.now(),
      name: newProductData.name,
      category: newProductData.category,
      reviews: 0,
      sentiment: 0.0
    };
    setProductsList([...productsList, addedProduct]);
    setNewProductData({ name: "", category: "ELECTRONICS" });
    setShowAddProductModal(false);
  };

  const deleteProduct = (id) => {
    setProductsList(productsList.filter(p => p.id !== id));
  };

  const handleClaimTicket = (id) => {
    setTicketsList(ticketsList.map(t => t.id === id ? { ...t, team: "my" } : t));
  };

  const toggleTicketStatus = (id) => {
    setTicketsList(ticketsList.map(t => t.id === id ? { ...t, status: t.status === "Open" ? "Resolved" : "Open" } : t));
  };

  const handleResetStorage = () => {
    if (window.confirm("Reset all stored data back to defaults?")) {
      localStorage.clear();
      setUsersList(initialUsers);
      setProductsList(initialProducts);
      setTicketsList(initialTickets);
    }
  };

  const renderNavbar = () => (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <span style={styles.navItem(currentView === "dashboard")} onClick={() => setCurrentView("dashboard")}>Home</span>
        <span style={styles.navItem(currentView === "users")} onClick={() => setCurrentView("users")}>Users</span>
        <span style={styles.navItem(currentView === "products")} onClick={() => setCurrentView("products")}>Products</span>
        <span style={styles.navItem(currentView === "tickets")} onClick={() => setCurrentView("tickets")}>Reviews</span>
      </div>
      <button style={styles.logoutBtn} onClick={() => setCurrentView("login")}>Logout</button>
    </nav>
  );

  return (
    <div style={styles.appContainer}>
      <div style={styles.topSearchBar}>
        <span style={{ fontSize: "14px", color: "#666" }}>🔍 Search</span>
      </div>

      <div style={styles.mainContent}>
        {/* Register Screen */}
        {currentView === "register" && (
          <form style={styles.card} onSubmit={handleRegisterSubmit}>
            <h2 style={styles.title}>Register Account</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input required style={styles.input} value={registerForm.firstName} onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input required style={styles.input} value={registerForm.lastName} onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Company Name</label>
              <input style={styles.input} value={registerForm.company} onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input required style={styles.input} type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password (min 8 chars)</label>
              <input required style={styles.input} type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Role</label>
              <select style={styles.input} value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}>
                <option value="BRAND_MANAGER">Brand Manager</option>
                <option value="RESOLUTION_AGENT">Resolution Agent</option>
                <option value="PLATFORM_ADMIN">Platform Admin</option>
              </select>
            </div>
            <button type="submit" style={styles.primaryButton}>Create Account</button>
            <p style={styles.switchText}>
              Already have an account? <span style={styles.linkText} onClick={() => setCurrentView("login")}>Login here</span>
            </p>
          </form>
        )}

        {/* Login Screen */}
        {currentView === "login" && (
          <form style={styles.card} onSubmit={handleLoginSubmit}>
            <h2 style={styles.title}>Login to ReviewRave</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input required style={styles.input} type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input required style={styles.input} type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            </div>
            <button type="submit" style={styles.primaryButton}>Login</button>
            <p style={styles.switchText}>
              Don't have an account? <span style={styles.linkText} onClick={() => setCurrentView("register")}>Register here</span>
            </p>
          </form>
        )}

        {/* Dashboard View */}
        {currentView === "dashboard" && (
          <div style={styles.dashboardContainer}>
            {renderNavbar()}
            <h2 style={styles.sectionHeader}>Platform Overview</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}><small>Total Users</small><h3>{usersList.length}</h3></div>
              <div style={styles.statCard}><small>Tracked Products</small><h3>{productsList.length}</h3></div>
              <div style={styles.statCard}><small>Active Tickets</small><h3>{ticketsList.filter(t => t.status === "Open").length}</h3></div>
              <div style={styles.statCard}><small>System Sentiment</small><h3>2.8</h3></div>
            </div>
            <div style={styles.dashGrid}>
              <div style={styles.contentCard}>
                <h4 style={{ marginBottom: "15px" }}>Global User Roles</h4>
                <div style={styles.donutPlaceholder}>
                  <div style={styles.donutCircle}></div>
                  <div style={styles.legend}>
                    <div>🔴 Admin ({usersList.filter(u => u.role === "PLATFORM_ADMIN").length})</div>
                    <div>🔵 Brand Manager ({usersList.filter(u => u.role === "BRAND_MANAGER").length})</div>
                    <div>🟢 Agent ({usersList.filter(u => u.role === "RESOLUTION_AGENT").length})</div>
                  </div>
                </div>
              </div>
              <div style={styles.contentCard}>
                <h4 style={{ marginBottom: "15px" }}>Storage Settings</h4>
                <p style={{ fontSize: "12px", color: "#666" }}>Data persistent state is active through browser LocalStorage.</p>
                <button style={{ ...styles.smallBtn, backgroundColor: "#e74c3c", marginTop: "10px" }} onClick={handleResetStorage}>
                  Clear & Reset LocalStorage
                </button>
              </div>
            </div>
          </div>
        )}

        {/* User Management View */}
        {currentView === "users" && (
          <div style={styles.dashboardContainer}>
            {renderNavbar()}
            <h2 style={styles.sectionHeader}>User Management</h2>
            <div style={styles.contentCard}>
              <table style={styles.table}>
                <thead>
                  <tr><th>ID</th><th>Name</th><th>Email</th><th>Company</th><th>Role</th><th>Status</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {usersList.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.company}</td>
                      <td><span style={styles.badgeRole}>{u.role}</span></td>
                      <td><span style={{ color: u.status === "Active" ? "green" : u.status === "Pending" ? "orange" : "red" }}>{u.status}</span></td>
                      <td>
                        <button style={styles.smallBtn} onClick={() => toggleUserStatus(u.id)}>
                          {u.status === "Active" ? "Deactivate" : "Activate"}
                        </button>
                        <button style={{ ...styles.smallBtn, backgroundColor: "#e74c3c", marginLeft: "5px" }} onClick={() => deleteUser(u.id)}>
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

        {/* Tracked Products View */}
        {currentView === "products" && (
          <div style={styles.dashboardContainer}>
            {renderNavbar()}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={styles.sectionHeader}>Tracked Products</h2>
              <button style={{ ...styles.primaryButton, width: "auto", padding: "8px 16px" }} onClick={() => setShowAddProductModal(!showAddProductModal)}>
                {showAddProductModal ? "Cancel" : "+ Add Product"}
              </button>
            </div>

            {showAddProductModal && (
              <form style={{ ...styles.contentCard, marginBottom: "15px" }} onSubmit={handleAddProductSubmit}>
                <h4 style={{ marginBottom: "10px" }}>Create New Tracked Product</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    required
                    style={styles.input}
                    placeholder="Product Name"
                    value={newProductData.name}
                    onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                  />
                  <select style={styles.input} value={newProductData.category} onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}>
                    <option value="ELECTRONICS">ELECTRONICS</option>
                    <option value="SOFTWARE">SOFTWARE</option>
                    <option value="HOSPITALITY">HOSPITALITY</option>
                    <option value="RETAIL">RETAIL</option>
                  </select>
                  <button type="submit" style={{ ...styles.primaryButton, width: "auto", marginTop: 0 }}>Save</button>
                </div>
              </form>
            )}

            <div style={styles.contentCard}>
              <input
                style={{ ...styles.input, marginBottom: "15px" }}
                placeholder="Search products by name or category..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
              <table style={styles.table}>
                <thead>
                  <tr><th>Name</th><th>Category</th><th>Total Reviews</th><th>Avg Sentiment</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {productsList
                    .filter((p) => p.name.toLowerCase().includes(productSearch.toLowerCase()) || p.category.toLowerCase().includes(productSearch.toLowerCase()))
                    .map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.category}</td>
                        <td>{p.reviews}</td>
                        <td>{p.sentiment}</td>
                        <td>
                          <button style={{ ...styles.smallBtn, backgroundColor: "#e74c3c" }} onClick={() => deleteProduct(p.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Resolution Tickets View */}
        {currentView === "tickets" && (
          <div style={styles.dashboardContainer}>
            {renderNavbar()}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={styles.sectionHeader}>Resolution Tickets</h2>
              <div>
                <button style={styles.tabBtn(ticketTab === "my")} onClick={() => setTicketTab("my")}>My Team</button>
                <button style={styles.tabBtn(ticketTab === "available")} onClick={() => setTicketTab("available")}>Available Tickets</button>
              </div>
            </div>
            <div style={styles.contentCard}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ fontSize: "12px", marginRight: "10px" }}>Filter by Status:</label>
                <select style={{ ...styles.input, width: "150px", display: "inline-block" }} value={ticketStatusFilter} onChange={(e) => setTicketStatusFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="Open">Open</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr><th>Ticket ID</th><th>Priority</th><th>Status</th><th>Review Snippet</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {ticketsList
                    .filter((t) => t.team === ticketTab)
                    .filter((t) => (ticketStatusFilter === "All" ? true : t.status === ticketStatusFilter))
                    .map((t) => (
                      <tr key={t.id}>
                        <td>{t.id}</td>
                        <td><span style={styles.badgePriority(t.priority)}>{t.priority}</span></td>
                        <td>{t.status}</td>
                        <td>{t.snippet}</td>
                        <td>
                          {ticketTab === "my" ? (
                            <button style={styles.smallBtn} onClick={() => toggleTicketStatus(t.id)}>
                              {t.status === "Open" ? "Mark Resolved" : "Reopen"}
                            </button>
                          ) : (
                            <button style={styles.smallBtn} onClick={() => handleClaimTicket(t.id)}>Claim Ticket</button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div style={styles.bottomBar}>
        <button style={styles.pullBtn} onClick={() => alert("Pulled fresh data sync!")}>Pull</button>
        <button style={styles.checkBtn} onClick={() => alert("Verification check passed!")}>Check Verify</button>
      </div>
    </div>
  );
}

// Inline Styles Object
const styles = {
  appContainer: { fontFamily: "Arial, sans-serif", backgroundColor: "#f4f5f7", minHeight: "100vh", display: "flex", flexDirection: "column" },
  topSearchBar: { padding: "10px 20px", backgroundColor: "#e0e0e0", textAlign: "center", borderBottom: "1px solid #ccc" },
  mainContent: { flex: 1, display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" },
  card: { backgroundColor: "#fff", padding: "30px", borderRadius: "8px", width: "100%", maxWidth: "420px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" },
  title: { textAlign: "center", marginBottom: "20px", color: "#333" },
  inputGroup: { marginBottom: "12px", display: "flex", flexDirection: "column", flex: 1 },
  label: { fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "4px" },
  input: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px", boxSizing: "border-box", width: "100%" },
  primaryButton: { width: "100%", padding: "10px", backgroundColor: "#4a90e2", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer", marginTop: "10px" },
  switchText: { textAlign: "center", fontSize: "12px", marginTop: "15px", color: "#666" },
  linkText: { color: "#4a90e2", cursor: "pointer", fontWeight: "bold" },
  dashboardContainer: { width: "100%", maxWidth: "900px" },
  navbar: { display: "flex", justifyContent: "space-between", backgroundColor: "#2d3748", color: "#fff", padding: "10px 20px", borderRadius: "6px", marginBottom: "20px" },
  navLinks: { display: "flex", gap: "20px", alignItems: "center" },
  navItem: (active) => ({ cursor: "pointer", fontWeight: active ? "bold" : "normal", borderBottom: active ? "2px solid #4a90e2" : "none" }),
  logoutBtn: { backgroundColor: "transparent", color: "#fff", border: "none", cursor: "pointer" },
  sectionHeader: { marginBottom: "15px", color: "#333" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "15px", marginBottom: "20px" },
  statCard: { backgroundColor: "#fff", padding: "15px", borderRadius: "6px", textAlign: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  dashGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  contentCard: { backgroundColor: "#fff", padding: "20px", borderRadius: "6px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" },
  donutPlaceholder: { display: "flex", gap: "20px", alignItems: "center" },
  donutCircle: { width: "80px", height: "80px", borderRadius: "50%", border: "12px solid #4a90e2", borderTopColor: "#e74c3c" },
  legend: { fontSize: "12px", lineHeight: "1.8" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" },
  badgeRole: { backgroundColor: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
  badgePriority: (p) => ({ backgroundColor: p === "CRITICAL" ? "#fee2e2" : "#fef3c7", color: p === "CRITICAL" ? "#dc2626" : "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }),
  smallBtn: { padding: "4px 8px", backgroundColor: "#4a90e2", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" },
  tabBtn: (active) => ({ padding: "6px 12px", backgroundColor: active ? "#4a90e2" : "#e2e8f0", color: active ? "#fff" : "#333", border: "none", borderRadius: "4px", marginLeft: "5px", cursor: "pointer" }),
  bottomBar: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px", backgroundColor: "#fff", borderTop: "1px solid #ccc" },
  pullBtn: { padding: "12px", backgroundColor: "#38a169", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
  checkBtn: { padding: "12px", backgroundColor: "#3182ce", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
};