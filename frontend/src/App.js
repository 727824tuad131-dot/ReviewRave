import React, { useState } from "react";

// Mock Data
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
  { name: "Headset", category: "ELECTRONICS", reviews: 0, sentiment: 0.0 },
  { name: "mouse", category: "SOFTWARE", reviews: 0, sentiment: 0.0 },
  { name: "headset", category: "HOSPITALITY", reviews: 0, sentiment: 0.0 },
  { name: "keyboard", category: "RETAIL", reviews: 0, sentiment: 0.0 },
];

const initialTickets = [
  { id: "#2", priority: "HIGH", status: "OPEN", snippet: "hello...", team: "my" },
  { id: "#3", priority: "HIGH", status: "OPEN", snippet: "hahaha...", team: "my" },
  { id: "#4", priority: "CRITICAL", status: "OPEN", snippet: "req...", team: "available" },
];

export default function App() {
  const [currentView, setCurrentView] = useState("register");
  const [ticketTab, setTicketTab] = useState("my");

  // Form States
  const [registerForm, setRegisterForm] = useState({ firstName: "Jane", lastName: "Doe", company: "Acme Corp (Optional)", email: "manager@gmail.com", password: "••••••••", role: "Brand Manager" });
  const [loginForm, setLoginForm] = useState({ email: "manager@gmail.com", password: "••••••••" });

  const renderNavbar = () => (
    <nav style={styles.navbar}>
      <div style={styles.navLinks}>
        <span style={styles.navItem(currentView === "dashboard")} onClick={() => setCurrentView("dashboard")}>Home</span>
        <span style={styles.navItem(currentView === "users")} onClick={() => setCurrentView("users")}>Users</span>
        <span style={styles.navItem(currentView === "products")} onClick={() => setCurrentView("products")}>Products</span>
        <span style={styles.navItem(currentView === "tickets")} onClick={() => setCurrentView("tickets")}>Reviews</span>
        <span style={styles.navItem(false)}>Insights</span>
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
          <div style={styles.card}>
            <h2 style={styles.title}>Register Account</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First Name</label>
                <input style={styles.input} value={registerForm.firstName} onChange={(e) => setRegisterForm({ ...registerForm, firstName: e.target.value })} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last Name</label>
                <input style={styles.input} value={registerForm.lastName} onChange={(e) => setRegisterForm({ ...registerForm, lastName: e.target.value })} />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Company Name</label>
              <input style={styles.input} value={registerForm.company} onChange={(e) => setRegisterForm({ ...registerForm, company: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" value={registerForm.email} onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password (min 8 chars)</label>
              <input style={styles.input} type="password" value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Select Role</label>
              <select style={styles.input} value={registerForm.role} onChange={(e) => setRegisterForm({ ...registerForm, role: e.target.value })}>
                <option>Brand Manager</option>
                <option>Resolution Agent</option>
                <option>Platform Admin</option>
              </select>
            </div>
            <button style={styles.primaryButton} onClick={() => setCurrentView("dashboard")}>Create Account</button>
            <p style={styles.switchText}>
              Already have an account? <span style={styles.linkText} onClick={() => setCurrentView("login")}>Login here</span>
            </p>
          </div>
        )}

        {/* Login Screen */}
        {currentView === "login" && (
          <div style={styles.card}>
            <h2 style={styles.title}>Login to ReviewRave</h2>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email Address</label>
              <input style={styles.input} type="email" value={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password</label>
              <input style={styles.input} type="password" value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
            </div>
            <button style={styles.primaryButton} onClick={() => setCurrentView("dashboard")}>Login</button>
            <p style={styles.switchText}>
              Don't have an account? <span style={styles.linkText} onClick={() => setCurrentView("register")}>Register here</span>
            </p>
          </div>
        )}

        {/* Dashboard / Platform Overview */}
        {currentView === "dashboard" && (
          <div style={styles.dashboardContainer}>
            {renderNavbar()}
            <h2 style={styles.sectionHeader}>Platform Overview</h2>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}><small>Total Users</small><h3>8</h3></div>
              <div style={styles.statCard}><small>Tracked Products</small><h3>12</h3></div>
              <div style={styles.statCard}><small>Active Tickets</small><h3>3</h3></div>
              <div style={styles.statCard}><small>System Sentiment</small><h3>2.8</h3></div>
            </div>
            <div style={styles.dashGrid}>
              <div style={styles.contentCard}>
                <h4 style={{ marginBottom: "15px" }}>Global User Roles</h4>
                <div style={styles.donutPlaceholder}>
                  <div style={styles.donutCircle}></div>
                  <div style={styles.legend}>
                    <div>🔴 Admin (25%)</div>
                    <div>🔵 Brand Manager (50%)</div>
                    <div>🟢 Agent (25%)</div>
                  </div>
                </div>
              </div>
              <div style={styles.contentCard}>
                <h4 style={{ marginBottom: "15px" }}>Recent Timeline</h4>
                <ul style={styles.timelineList}>
                  <li>🔵 New brand manager registered: Brand Corp <br /><small style={{ color: "#888" }}>1 hour ago</small></li>
                  <li>🔵 System wide review inspection completed <br /><small style={{ color: "#888" }}>2 hours ago</small></li>
                  <li>🔵 Critical ticket auto assigned to Agent Smith <br /><small style={{ color: "#888" }}>3 hours ago</small></li>
                </ul>
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
                  {initialUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.company}</td>
                      <td><span style={styles.badgeRole}>{u.role}</span></td>
                      <td>{u.status}</td>
                      <td><button style={styles.smallBtn}>Deactivate</button></td>
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
              <button style={{ ...styles.primaryButton, width: "auto", padding: "8px 16px" }}>+ Add Product</button>
            </div>
            <div style={styles.contentCard}>
              <input style={{ ...styles.input, marginBottom: "15px" }} placeholder="Search products by name or category..." />
              <table style={styles.table}>
                <thead>
                  <tr><th>Name</th><th>Category</th><th>Total Reviews</th><th>Avg Sentiment</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {initialProducts.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.name}</td>
                      <td>{p.category}</td>
                      <td>{p.reviews}</td>
                      <td>{p.sentiment}</td>
                      <td><button style={styles.smallBtn}>Edit</button></td>
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
                <select style={{ ...styles.input, width: "150px", display: "inline-block" }}>
                  <option>Open</option>
                  <option>Resolved</option>
                </select>
              </div>
              <table style={styles.table}>
                <thead>
                  <tr><th>Ticket ID</th><th>Priority</th><th>Status</th><th>Review Snippet</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {initialTickets
                    .filter((t) => t.team === ticketTab)
                    .map((t) => (
                      <tr key={t.id}>
                        <td>{t.id}</td>
                        <td><span style={styles.badgePriority(t.priority)}>{t.priority}</span></td>
                        <td>{t.status}</td>
                        <td>{t.snippet}</td>
                        <td><button style={styles.smallBtn}>{ticketTab === "my" ? "Update" : "Claim Ticket"}</button></td>
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
        <button style={styles.pullBtn}>Pull</button>
        <button style={styles.checkBtn}>Check Verify</button>
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
  inputGroup: { marginBottom: "12px", display: "flex", flexDirection: "column" },
  label: { fontSize: "12px", fontWeight: "bold", color: "#555", marginBottom: "4px" },
  input: { padding: "8px 12px", border: "1px solid #ccc", borderRadius: "4px", fontSize: "14px" },
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
  timelineList: { listStyleType: "none", paddingLeft: 0, fontSize: "13px", lineHeight: "1.8" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "13px" },
  badgeRole: { backgroundColor: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px", fontWeight: "bold" },
  badgePriority: (p) => ({ backgroundColor: p === "CRITICAL" ? "#fee2e2" : "#fef3c7", color: p === "CRITICAL" ? "#dc2626" : "#d97706", padding: "2px 6px", borderRadius: "4px", fontSize: "11px" }),
  smallBtn: { padding: "4px 8px", backgroundColor: "#4a90e2", color: "#fff", border: "none", borderRadius: "3px", cursor: "pointer" },
  tabBtn: (active) => ({ padding: "6px 12px", backgroundColor: active ? "#4a90e2" : "#e2e8f0", color: active ? "#fff" : "#333", border: "none", borderRadius: "4px", marginLeft: "5px", cursor: "pointer" }),
  bottomBar: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", padding: "10px", backgroundColor: "#fff", borderTop: "1px solid #ccc" },
  pullBtn: { padding: "12px", backgroundColor: "#38a169", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
  checkBtn: { padding: "12px", backgroundColor: "#3182ce", color: "#fff", border: "none", borderRadius: "4px", fontWeight: "bold", cursor: "pointer" },
};