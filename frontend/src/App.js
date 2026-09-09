import React, { useState, useEffect } from "react";

// ======================================================
// INITIAL SEED DATA
// ======================================================

const initialUsers = [
  {
    id: "#1",
    name: "Brand Manager",
    email: "manager@gmail.com",
    company: "Brand Corp",
    role: "BRAND_MANAGER",
    status: "Active",
  },
  {
    id: "#2",
    name: "Support Agent",
    email: "agent@gmail.com",
    company: "PandaPure Support",
    role: "RESOLUTION_AGENT",
    status: "Inactive",
  },
  {
    id: "#3",
    name: "Platform Admin",
    email: "admin@gmail.com",
    company: "ReviewRave Inc",
    role: "PLATFORM_ADMIN",
    status: "Active",
  },
  {
    id: "#4",
    name: "Manager",
    email: "manager2@gmail.com",
    company: "Brand Corp",
    role: "BRAND_MANAGER",
    status: "Pending",
  },
  {
    id: "#5",
    name: "Agent",
    email: "agent2@gmail.com",
    company: "Acro",
    role: "RESOLUTION_AGENT",
    status: "Active",
  },
  {
    id: "#6",
    name: "Admin",
    email: "admin2@gmail.com",
    company: "Acro",
    role: "PLATFORM_ADMIN",
    status: "Active",
  },
  {
    id: "#7",
    name: "Manager",
    email: "manager3@gmail.com",
    company: "Manager",
    role: "BRAND_MANAGER",
    status: "Active",
  },
  {
    id: "#8",
    name: "Brand Manager",
    email: "brand@test.com",
    company: "ReviewRave",
    role: "BRAND_MANAGER",
    status: "Active",
  },
];

const initialProducts = [
  {
    id: 1,
    name: "Headset",
    category: "ELECTRONICS",
    reviews: 0,
    sentiment: 0.0,
  },
  {
    id: 2,
    name: "mouse",
    category: "SOFTWARE",
    reviews: 0,
    sentiment: 0.0,
  },
  {
    id: 3,
    name: "headset",
    category: "HOSPITALITY",
    reviews: 0,
    sentiment: 0.0,
  },
  {
    id: 4,
    name: "keyboard",
    category: "RETAIL",
    reviews: 0,
    sentiment: 0.0,
  },
];

const initialTickets = [
  {
    id: "#2",
    priority: "HIGH",
    status: "Open",
    snippet: "hello...",
    team: "my",
  },
  {
    id: "#3",
    priority: "HIGH",
    status: "Open",
    snippet: "hahaha...",
    team: "my",
  },
  {
    id: "#4",
    priority: "CRITICAL",
    status: "Open",
    snippet: "req...",
    team: "available",
  },
];

// ======================================================
// APP
// ======================================================

export default function App() {
  /*
   * IMPORTANT:
   * We keep currentView architecture so your existing
   * application behaviour is not unnecessarily changed.
   */
  const [currentView, setCurrentView] = useState("login");

  const [ticketTab, setTicketTab] = useState("my");

  // Logged-in user
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("rr_current_user");

    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // ======================================================
  // LOCAL STORAGE DATA
  // ======================================================

  const [usersList, setUsersList] = useState(() => {
    const saved = localStorage.getItem("rr_users");

    try {
      return saved ? JSON.parse(saved) : initialUsers;
    } catch {
      return initialUsers;
    }
  });

  const [productsList, setProductsList] = useState(() => {
    const saved = localStorage.getItem("rr_products");

    try {
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [ticketsList, setTicketsList] = useState(() => {
    const saved = localStorage.getItem("rr_tickets");

    try {
      return saved ? JSON.parse(saved) : initialTickets;
    } catch {
      return initialTickets;
    }
  });

  // ======================================================
  // LOCAL STORAGE SYNC
  // ======================================================

  useEffect(() => {
    localStorage.setItem("rr_users", JSON.stringify(usersList));
  }, [usersList]);

  useEffect(() => {
    localStorage.setItem("rr_products", JSON.stringify(productsList));
  }, [productsList]);

  useEffect(() => {
    localStorage.setItem("rr_tickets", JSON.stringify(ticketsList));
  }, [ticketsList]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(
        "rr_current_user",
        JSON.stringify(currentUser)
      );
    } else {
      localStorage.removeItem("rr_current_user");
    }
  }, [currentUser]);

  // ======================================================
  // FORM STATES
  // ======================================================

  const [registerForm, setRegisterForm] = useState({
    firstName: "Jane",
    lastName: "Doe",
    company: "Acme Corp (Optional)",
    email: "manager@gmail.com",
    password: "••••••••",
    role: "BRAND_MANAGER",
  });

  const [loginForm, setLoginForm] = useState({
    email: "manager@gmail.com",
    password: "••••••••",
  });

  const [loginError, setLoginError] = useState("");

  // ======================================================
  // PRODUCT STATES
  // ======================================================

  const [productSearch, setProductSearch] = useState("");

  const [showAddProductModal, setShowAddProductModal] =
    useState(false);

  const [newProductData, setNewProductData] = useState({
    name: "",
    category: "ELECTRONICS",
  });

  const [editingProductId, setEditingProductId] = useState(null);

  const [editFormData, setEditFormData] = useState({
    name: "",
    category: "ELECTRONICS",
  });

  // ======================================================
  // TICKET STATES
  // ======================================================

  const [ticketStatusFilter, setTicketStatusFilter] =
    useState("All");

  // ======================================================
  // REGISTER
  // ======================================================

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    const existingUser = usersList.find(
      (user) =>
        user.email.toLowerCase() ===
        registerForm.email.toLowerCase()
    );

    if (existingUser) {
      setLoginError(
        "An account with this email already exists. Please login."
      );

      setLoginForm({
        email: registerForm.email,
        password: "",
      });

      setCurrentView("login");
      return;
    }

    const newUser = {
      id: `#${usersList.length + 1}`,
      name: `${registerForm.firstName} ${registerForm.lastName}`,
      email: registerForm.email,
      company: registerForm.company || "N/A",
      role: registerForm.role,
      status: "Active",
    };

    setUsersList((prev) => [...prev, newUser]);

    /*
     * IMPORTANT:
     * Registration now goes to LOGIN.
     *
     * This is the required flow:
     *
     * Register → Login → Role Dashboard
     */
    setLoginForm({
      email: registerForm.email,
      password: "",
    });

    setLoginError("");

    setCurrentView("login");
  };

  // ======================================================
  // LOGIN
  // ======================================================

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    setLoginError("");

    /*
     * Find the user using the email.
     * The user's role determines the dashboard.
     */
    const foundUser = usersList.find(
      (user) =>
        user.email.toLowerCase() ===
        loginForm.email.trim().toLowerCase()
    );

    if (!foundUser) {
      setLoginError(
        "User not found. Please register an account first."
      );
      return;
    }

    if (foundUser.status === "Inactive") {
      setLoginError(
        "Your account is inactive. Please contact the administrator."
      );
      return;
    }

    setCurrentUser(foundUser);

    /*
     * All roles enter through dashboard.
     * renderRoleDashboard() decides what they see.
     */
    setCurrentView("dashboard");
  };

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginError("");

    setLoginForm({
      email: "",
      password: "",
    });

    setCurrentView("login");
  };

  // ======================================================
  // USER MANAGEMENT
  // ======================================================

  const toggleUserStatus = (id) => {
    setUsersList((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status:
                u.status === "Active"
                  ? "Inactive"
                  : "Active",
            }
          : u
      )
    );
  };

  const deleteUser = (id) => {
    setUsersList((prev) =>
      prev.filter((u) => u.id !== id)
    );
  };

  // ======================================================
  // PRODUCT MANAGEMENT
  // ======================================================

  const handleAddProductSubmit = (e) => {
    e.preventDefault();

    if (!newProductData.name.trim()) return;

    const addedProduct = {
      id: Date.now(),
      name: newProductData.name,
      category: newProductData.category,
      reviews: 0,
      sentiment: 0.0,
    };

    setProductsList((prev) => [
      ...prev,
      addedProduct,
    ]);

    setNewProductData({
      name: "",
      category: "ELECTRONICS",
    });

    setShowAddProductModal(false);
  };

  const startEditProduct = (product) => {
    setEditingProductId(product.id);

    setEditFormData({
      name: product.name,
      category: product.category,
    });
  };

  const saveEditProduct = (id) => {
    setProductsList((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: editFormData.name,
              category: editFormData.category,
            }
          : p
      )
    );

    setEditingProductId(null);
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
  };

  const deleteProduct = (id) => {
    setProductsList((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };

  // ======================================================
  // TICKET MANAGEMENT
  // ======================================================

  const handleClaimTicket = (id) => {
    setTicketsList((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              team: "my",
            }
          : t
      )
    );
  };

  const toggleTicketStatus = (id) => {
    setTicketsList((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status:
                t.status === "Open"
                  ? "Resolved"
                  : "Open",
            }
          : t
      )
    );
  };

  // ======================================================
  // ROLE HELPERS
  // ======================================================

  const role = currentUser?.role;

  const isAdmin = role === "PLATFORM_ADMIN";

  const isBrandManager =
    role === "BRAND_MANAGER";

  const isResolutionAgent =
    role === "RESOLUTION_AGENT";

  // ======================================================
  // NAVIGATION
  // ======================================================

  const renderNavbar = () => {
    return (
      <nav style={styles.navbar}>
        <div style={styles.brandArea}>
          <div style={styles.logo}>
            ReviewRave
          </div>

          <div style={styles.navLinks}>
            <span
              style={styles.navItem(
                currentView === "dashboard"
              )}
              onClick={() =>
                setCurrentView("dashboard")
              }
            >
              Home
            </span>

            {/* ADMIN */}
            {isAdmin && (
              <span
                style={styles.navItem(
                  currentView === "users"
                )}
                onClick={() =>
                  setCurrentView("users")
                }
              >
                Users
              </span>
            )}

            {/* ADMIN + BRAND MANAGER */}
            {(isAdmin || isBrandManager) && (
              <span
                style={styles.navItem(
                  currentView === "products"
                )}
                onClick={() =>
                  setCurrentView("products")
                }
              >
                Products
              </span>
            )}

            {/* RESOLUTION AGENT + ADMIN */}
            {(isResolutionAgent || isAdmin) && (
              <span
                style={styles.navItem(
                  currentView === "tickets"
                )}
                onClick={() =>
                  setCurrentView("tickets")
                }
              >
                Resolution Center
              </span>
            )}
          </div>
        </div>

        <div style={styles.userArea}>
          <span style={styles.roleText}>
            {currentUser?.name || "User"}
          </span>

          <span style={styles.roleBadge}>
            {role || "USER"}
          </span>

          <button
            style={styles.logoutBtn}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    );
  };

  // ======================================================
  // ADMIN DASHBOARD
  // ======================================================

  const renderAdminDashboard = () => {
    const activeTickets = ticketsList.filter(
      (t) => t.status === "Open"
    ).length;

    const adminCount = usersList.filter(
      (u) => u.role === "PLATFORM_ADMIN"
    ).length;

    const managerCount = usersList.filter(
      (u) => u.role === "BRAND_MANAGER"
    ).length;

    const agentCount = usersList.filter(
      (u) => u.role === "RESOLUTION_AGENT"
    ).length;

    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <div style={styles.welcomeBanner}>
          <div>
            <small style={styles.eyebrow}>
              PLATFORM ADMIN
            </small>

            <h1 style={styles.heroTitle}>
              Welcome back,{" "}
              {currentUser?.name || "Admin"}
            </h1>

            <p style={styles.heroText}>
              Monitor users, products, reviews,
              sentiment and resolution activity
              from one place.
            </p>
          </div>

          <div style={styles.roleIcon}>
            🛡️
          </div>
        </div>

        <h2 style={styles.sectionHeader}>
          Platform Overview
        </h2>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <small>Total Users</small>
            <h3>{usersList.length}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Tracked Products</small>
            <h3>{productsList.length}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Active Tickets</small>
            <h3>{activeTickets}</h3>
          </div>

          <div style={styles.statCard}>
            <small>System Sentiment</small>
            <h3>2.8</h3>
          </div>
        </div>

        <div style={styles.dashGrid}>
          <div style={styles.contentCard}>
            <h4>Global User Roles</h4>

            <div style={styles.donutPlaceholder}>
              <div style={styles.donutCircle}></div>

              <div style={styles.legend}>
                <div>
                  🔴 Admin ({adminCount})
                </div>

                <div>
                  🔵 Brand Manager ({managerCount})
                </div>

                <div>
                  🟢 Agent ({agentCount})
                </div>
              </div>
            </div>
          </div>

          <div style={styles.contentCard}>
            <h4>Recent Timeline</h4>

            <ul style={styles.timelineList}>
              <li>
                🔵 New brand manager registered
                <br />
                <small>1 hour ago</small>
              </li>

              <li>
                🔵 System wide review inspection
                completed
                <br />
                <small>2 hours ago</small>
              </li>

              <li>
                🔵 Critical ticket assigned
                <br />
                <small>3 hours ago</small>
              </li>
            </ul>
          </div>
        </div>

        <div style={styles.contentCard}>
          <h3>Quick Actions</h3>

          <div style={styles.quickActions}>
            <button
              style={styles.actionCard}
              onClick={() =>
                setCurrentView("users")
              }
            >
              👥
              <strong>User Management</strong>
              <small>Manage platform users</small>
            </button>

            <button
              style={styles.actionCard}
              onClick={() =>
                setCurrentView("products")
              }
            >
              📦
              <strong>Products</strong>
              <small>Manage tracked products</small>
            </button>

            <button
              style={styles.actionCard}
              onClick={() =>
                setCurrentView("tickets")
              }
            >
              🎫
              <strong>Tickets</strong>
              <small>Monitor resolution activity</small>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ======================================================
  // BRAND MANAGER DASHBOARD
  // ======================================================

  const renderBrandDashboard = () => {
    const totalReviews = productsList.reduce(
      (total, product) =>
        total + Number(product.reviews || 0),
      0
    );

    const averageSentiment =
      productsList.length > 0
        ? productsList.reduce(
            (total, product) =>
              total +
              Number(product.sentiment || 0),
            0
          ) / productsList.length
        : 0;

    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <div style={styles.brandHero}>
          <div>
            <small style={styles.eyebrow}>
              BRAND MANAGER
            </small>

            <h1 style={styles.heroTitle}>
              Welcome back,{" "}
              {currentUser?.name || "Brand Manager"}
            </h1>

            <p style={styles.heroText}>
              Monitor your products, customer
              reviews and sentiment insights
              from one place.
            </p>

            <div style={styles.heroButtons}>
              <button
                style={styles.primaryButton}
                onClick={() =>
                  setCurrentView("products")
                }
              >
                Manage Products
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  setCurrentView("products")
                }
              >
                View Insights
              </button>
            </div>
          </div>

          <div style={styles.heroReviewIcon}>
            ⭐
          </div>
        </div>

        <h2 style={styles.sectionHeader}>
          Your Overview
        </h2>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <small>Tracked Products</small>
            <h3>{productsList.length}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Total Reviews</small>
            <h3>{totalReviews}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Average Sentiment</small>
            <h3>
              {averageSentiment.toFixed(2)}
            </h3>
          </div>

          <div style={styles.statCard}>
            <small>Open Tickets</small>
            <h3>
              {
                ticketsList.filter(
                  (t) => t.status === "Open"
                ).length
              }
            </h3>
          </div>
        </div>

        <div style={styles.featureGrid}>
          <button
            style={styles.featureCard}
            onClick={() =>
              setCurrentView("products")
            }
          >
            <span style={styles.featureIcon}>
              📦
            </span>

            <strong>Products</strong>

            <small>
              Track and manage your products
            </small>
          </button>

          <button
            style={styles.featureCard}
            onClick={() =>
              setCurrentView("products")
            }
          >
            ⭐

            <strong>Reviews</strong>

            <small>
              Monitor customer feedback
            </small>
          </button>

          <button
            style={styles.featureCard}
            onClick={() =>
              setCurrentView("products")
            }
          >
            📊

            <strong>Sentiment Insights</strong>

            <small>
              Analyze customer sentiment
            </small>
          </button>

          <button
            style={styles.featureCard}
            onClick={() =>
              setCurrentView("products")
            }
          >
            💡

            <strong>Actionable Insights</strong>

            <small>
              Make data-driven decisions
            </small>
          </button>
        </div>
      </div>
    );
  };

  // ======================================================
  // RESOLUTION AGENT DASHBOARD
  // ======================================================

  const renderAgentDashboard = () => {
    const myTickets = ticketsList.filter(
      (t) => t.team === "my"
    );

    const openTickets = myTickets.filter(
      (t) => t.status === "Open"
    );

    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <div style={styles.agentHero}>
          <div>
            <small style={styles.eyebrow}>
              RESOLUTION AGENT
            </small>

            <h1 style={styles.heroTitle}>
              Welcome back,{" "}
              {currentUser?.name || "Resolution Agent"}
            </h1>

            <p style={styles.heroText}>
              Review customer issues, manage
              assigned tickets and resolve
              critical feedback.
            </p>

            <button
              style={styles.primaryButton}
              onClick={() =>
                setCurrentView("tickets")
              }
            >
              Open Resolution Center
            </button>
          </div>

          <div style={styles.heroReviewIcon}>
            🎫
          </div>
        </div>

        <h2 style={styles.sectionHeader}>
          Resolution Overview
        </h2>

        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <small>My Tickets</small>
            <h3>{myTickets.length}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Open Tickets</small>
            <h3>{openTickets.length}</h3>
          </div>

          <div style={styles.statCard}>
            <small>Resolved</small>
            <h3>
              {
                myTickets.filter(
                  (t) => t.status === "Resolved"
                ).length
              }
            </h3>
          </div>

          <div style={styles.statCard}>
            <small>Critical Issues</small>
            <h3>
              {
                myTickets.filter(
                  (t) =>
                    t.priority === "CRITICAL" &&
                    t.status === "Open"
                ).length
              }
            </h3>
          </div>
        </div>

        <div style={styles.contentCard}>
          <div style={styles.cardHeader}>
            <div>
              <small style={styles.eyebrow}>
                TASK MANAGEMENT
              </small>

              <h3>My Resolution Tasks</h3>
            </div>

            <button
              style={styles.smallBtn}
              onClick={() =>
                setCurrentView("tickets")
              }
            >
              View All
            </button>
          </div>

          {myTickets.length === 0 ? (
            <p style={styles.emptyText}>
              No resolution tickets assigned.
            </p>
          ) : (
            <div>
              {myTickets
                .slice(0, 4)
                .map((ticket) => (
                  <div
                    key={ticket.id}
                    style={styles.ticketPreview}
                  >
                    <div>
                      <strong>
                        {ticket.id}
                      </strong>

                      <p>
                        {ticket.snippet}
                      </p>
                    </div>

                    <span
                      style={styles.priorityBadge(
                        ticket.priority
                      )}
                    >
                      {ticket.priority}
                    </span>

                    <span>
                      {ticket.status}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // ======================================================
  // ROLE DASHBOARD
  // ======================================================

  const renderRoleDashboard = () => {
    if (role === "PLATFORM_ADMIN") {
      return renderAdminDashboard();
    }

    if (role === "RESOLUTION_AGENT") {
      return renderAgentDashboard();
    }

    if (role === "BRAND_MANAGER") {
      return renderBrandDashboard();
    }

    return (
      <div style={styles.card}>
        <h2>Welcome to ReviewRave</h2>

        <p>
          Please login with a valid ReviewRave
          account.
        </p>

        <button
          style={styles.primaryButton}
          onClick={handleLogout}
        >
          Go to Login
        </button>
      </div>
    );
  };

  // ======================================================
  // USER MANAGEMENT VIEW
  // ======================================================

  const renderUsersView = () => {
    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <h2 style={styles.sectionHeader}>
          User Management
        </h2>

        <div style={styles.contentCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {usersList.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>

                  <td>{u.name}</td>

                  <td>{u.email}</td>

                  <td>{u.company}</td>

                  <td>
                    <span
                      style={styles.badgeRole}
                    >
                      {u.role}
                    </span>
                  </td>

                  <td>
                    <span
                      style={{
                        color:
                          u.status === "Active"
                            ? "green"
                            : u.status === "Pending"
                            ? "orange"
                            : "red",
                      }}
                    >
                      {u.status}
                    </span>
                  </td>

                  <td>
                    <button
                      style={styles.smallBtn}
                      onClick={() =>
                        toggleUserStatus(u.id)
                      }
                    >
                      {u.status === "Active"
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      style={{
                        ...styles.smallBtn,
                        backgroundColor: "#e74c3c",
                        marginLeft: "5px",
                      }}
                      onClick={() =>
                        deleteUser(u.id)
                      }
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
    );
  };

  // ======================================================
  // PRODUCTS VIEW
  // ======================================================

  const renderProductsView = () => {
    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div>
            <small style={styles.eyebrow}>
              PRODUCT MANAGEMENT
            </small>

            <h2 style={styles.sectionHeader}>
              Tracked Products
            </h2>
          </div>

          <button
            style={{
              ...styles.primaryButton,
              width: "auto",
              padding: "8px 16px",
            }}
            onClick={() =>
              setShowAddProductModal(
                !showAddProductModal
              )
            }
          >
            {showAddProductModal
              ? "Cancel"
              : "+ Add Product"}
          </button>
        </div>

        {showAddProductModal && (
          <form
            style={{
              ...styles.contentCard,
              marginBottom: "15px",
            }}
            onSubmit={handleAddProductSubmit}
          >
            <h4>
              Create New Tracked Product
            </h4>

            <div style={styles.formRow}>
              <input
                required
                style={styles.input}
                placeholder="Product Name"
                value={newProductData.name}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    name: e.target.value,
                  })
                }
              />

              <select
                style={styles.input}
                value={newProductData.category}
                onChange={(e) =>
                  setNewProductData({
                    ...newProductData,
                    category: e.target.value,
                  })
                }
              >
                <option value="ELECTRONICS">
                  ELECTRONICS
                </option>

                <option value="SOFTWARE">
                  SOFTWARE
                </option>

                <option value="HOSPITALITY">
                  HOSPITALITY
                </option>

                <option value="RETAIL">
                  RETAIL
                </option>
              </select>

              <button
                type="submit"
                style={{
                  ...styles.primaryButton,
                  width: "auto",
                  marginTop: 0,
                }}
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div style={styles.contentCard}>
          <input
            style={{
              ...styles.input,
              marginBottom: "15px",
            }}
            placeholder="Search products by name or category..."
            value={productSearch}
            onChange={(e) =>
              setProductSearch(e.target.value)
            }
          />

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Total Reviews</th>
                  <th>Avg Sentiment</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {productsList
                  .filter(
                    (p) =>
                      p.name
                        .toLowerCase()
                        .includes(
                          productSearch.toLowerCase()
                        ) ||
                      p.category
                        .toLowerCase()
                        .includes(
                          productSearch.toLowerCase()
                        )
                  )
                  .map((p) => (
                    <tr key={p.id}>
                      {editingProductId === p.id ? (
                        <>
                          <td>
                            <input
                              style={styles.input}
                              value={editFormData.name}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  name: e.target.value,
                                })
                              }
                            />
                          </td>

                          <td>
                            <select
                              style={styles.input}
                              value={
                                editFormData.category
                              }
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  category:
                                    e.target.value,
                                })
                              }
                            >
                              <option value="ELECTRONICS">
                                ELECTRONICS
                              </option>

                              <option value="SOFTWARE">
                                SOFTWARE
                              </option>

                              <option value="HOSPITALITY">
                                HOSPITALITY
                              </option>

                              <option value="RETAIL">
                                RETAIL
                              </option>
                            </select>
                          </td>

                          <td>{p.reviews}</td>

                          <td>{p.sentiment}</td>

                          <td>
                            <button
                              style={{
                                ...styles.smallBtn,
                                backgroundColor:
                                  "#28a745",
                              }}
                              onClick={() =>
                                saveEditProduct(
                                  p.id
                                )
                              }
                            >
                              Save
                            </button>

                            <button
                              style={{
                                ...styles.smallBtn,
                                backgroundColor:
                                  "#6c757d",
                                marginLeft: "4px",
                              }}
                              onClick={
                                cancelEditProduct
                              }
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td>{p.name}</td>

                          <td>
                            <span
                              style={
                                styles.categoryBadge
                              }
                            >
                              {p.category}
                            </span>
                          </td>

                          <td>{p.reviews}</td>

                          <td>{p.sentiment}</td>

                          <td>
                            <button
                              style={{
                                ...styles.smallBtn,
                                marginRight: "4px",
                              }}
                              onClick={() =>
                                startEditProduct(p)
                              }
                            >
                              Edit
                            </button>

                            <button
                              style={{
                                ...styles.smallBtn,
                                backgroundColor:
                                  "#e74c3c",
                              }}
                              onClick={() =>
                                deleteProduct(p.id)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ======================================================
  // TICKETS VIEW
  // ======================================================

  const renderTicketsView = () => {
    const visibleTickets = ticketsList
      .filter((t) => t.team === ticketTab)
      .filter((t) =>
        ticketStatusFilter === "All"
          ? true
          : t.status === ticketStatusFilter
      );

    return (
      <div style={styles.dashboardContainer}>
        {renderNavbar()}

        <div style={styles.ticketHeader}>
          <div>
            <small style={styles.eyebrow}>
              RESOLUTION MANAGEMENT
            </small>

            <h2 style={styles.sectionHeader}>
              Resolution Tickets
            </h2>
          </div>

          <div>
            <button
              style={styles.tabBtn(
                ticketTab === "my"
              )}
              onClick={() =>
                setTicketTab("my")
              }
            >
              My Team
            </button>

            <button
              style={styles.tabBtn(
                ticketTab === "available"
              )}
              onClick={() =>
                setTicketTab("available")
              }
            >
              Available Tickets
            </button>
          </div>
        </div>

        <div style={styles.contentCard}>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                fontSize: "12px",
                marginRight: "10px",
              }}
            >
              Filter by Status:
            </label>

            <select
              style={{
                ...styles.input,
                width: "150px",
                display: "inline-block",
              }}
              value={ticketStatusFilter}
              onChange={(e) =>
                setTicketStatusFilter(
                  e.target.value
                )
              }
            >
              <option value="All">All</option>
              <option value="Open">Open</option>
              <option value="Resolved">
                Resolved
              </option>
            </select>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Review Snippet</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {visibleTickets.map((t) => (
                  <tr key={t.id}>
                    <td>{t.id}</td>

                    <td>
                      <span
                        style={styles.badgePriority(
                          t.priority
                        )}
                      >
                        {t.priority}
                      </span>
                    </td>

                    <td>{t.status}</td>

                    <td>{t.snippet}</td>

                    <td>
                      {ticketTab === "my" ? (
                        <button
                          style={styles.smallBtn}
                          onClick={() =>
                            toggleTicketStatus(
                              t.id
                            )
                          }
                        >
                          {t.status === "Open"
                            ? "Mark Resolved"
                            : "Reopen"}
                        </button>
                      ) : (
                        <button
                          style={styles.smallBtn}
                          onClick={() =>
                            handleClaimTicket(
                              t.id
                            )
                          }
                        >
                          Claim Ticket
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {visibleTickets.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      style={styles.emptyCell}
                    >
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // ======================================================
  // MAIN RENDER
  // ======================================================

  return (
    <div style={styles.appContainer}>

      {/* TOP SEARCH BAR ONLY AFTER LOGIN */}
      {currentView !== "login" &&
        currentView !== "register" && (
          <div style={styles.topSearchBar}>
            <span>
              🔍 Search ReviewRave
            </span>

            <span style={styles.topRole}>
              {role || "USER"}
            </span>
          </div>
        )}

      <div
        style={{
          ...styles.mainContent,
          alignItems:
            currentView === "login" ||
            currentView === "register"
              ? "center"
              : "flex-start",
        }}
      >

        {/* ==================================================
            REGISTER SCREEN
        ================================================== */}

        {currentView === "register" && (
          <form
            style={styles.card}
            onSubmit={handleRegisterSubmit}
          >
            <div style={styles.authLogo}>
              ReviewRave
            </div>

            <h2 style={styles.title}>
              Register Account
            </h2>

            <p style={styles.authSubtitle}>
              Create your ReviewRave account
            </p>

            <div style={styles.formTwoColumns}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  First Name
                </label>

                <input
                  required
                  style={styles.input}
                  value={registerForm.firstName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      firstName:
                        e.target.value,
                    })
                  }
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>
                  Last Name
                </label>

                <input
                  required
                  style={styles.input}
                  value={registerForm.lastName}
                  onChange={(e) =>
                    setRegisterForm({
                      ...registerForm,
                      lastName:
                        e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Company Name
              </label>

              <input
                style={styles.input}
                value={registerForm.company}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    company: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email Address
              </label>

              <input
                required
                style={styles.input}
                type="email"
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Password (min 8 chars)
              </label>

              <input
                required
                minLength="8"
                style={styles.input}
                type="password"
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    password:
                      e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Select Role
              </label>

              <select
                style={styles.input}
                value={registerForm.role}
                onChange={(e) =>
                  setRegisterForm({
                    ...registerForm,
                    role: e.target.value,
                  })
                }
              >
                <option value="BRAND_MANAGER">
                  Brand Manager
                </option>

                <option value="RESOLUTION_AGENT">
                  Resolution Agent
                </option>

                <option value="PLATFORM_ADMIN">
                  Platform Admin
                </option>
              </select>
            </div>

            <button
              type="submit"
              style={styles.primaryButton}
            >
              Create Account
            </button>

            <p style={styles.switchText}>
              Already have an account?{" "}
              <span
                style={styles.linkText}
                onClick={() =>
                  setCurrentView("login")
                }
              >
                Login here
              </span>
            </p>
          </form>
        )}

        {/* ==================================================
            LOGIN SCREEN
        ================================================== */}

        {currentView === "login" && (
          <form
            style={styles.card}
            onSubmit={handleLoginSubmit}
          >
            <div style={styles.authLogo}>
              ReviewRave
            </div>

            <h2 style={styles.title}>
              Login to ReviewRave
            </h2>

            <p style={styles.authSubtitle}>
              Sign in to access your dashboard
            </p>

            {loginError && (
              <div style={styles.errorBox}>
                {loginError}
              </div>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Email Address
              </label>

              <input
                required
                style={styles.input}
                type="email"
                value={loginForm.email}
                onChange={(e) => {
                  setLoginError("");

                  setLoginForm({
                    ...loginForm,
                    email: e.target.value,
                  });
                }}
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Password
              </label>

              <input
                required
                style={styles.input}
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({
                    ...loginForm,
                    password:
                      e.target.value,
                  })
                }
              />
            </div>

            <button
              type="submit"
              style={styles.primaryButton}
            >
              Login
            </button>

            <p style={styles.switchText}>
              Don't have an account?{" "}
              <span
                style={styles.linkText}
                onClick={() => {
                  setLoginError("");
                  setCurrentView(
                    "register"
                  );
                }}
              >
                Register here
              </span>
            </p>
          </form>
        )}

        {/* ==================================================
            ROLE DASHBOARD
        ================================================== */}

        {currentView === "dashboard" &&
          renderRoleDashboard()}

        {/* ==================================================
            USERS
        ================================================== */}

        {currentView === "users" &&
          renderUsersView()}

        {/* ==================================================
            PRODUCTS
        ================================================== */}

        {currentView === "products" &&
          renderProductsView()}

        {/* ==================================================
            TICKETS
        ================================================== */}

        {currentView === "tickets" &&
          renderTicketsView()}
      </div>

      {/* ==================================================
          BOTTOM ACTION BAR
      ================================================== */}

      {currentView !== "login" &&
        currentView !== "register" && (
          <div style={styles.bottomBar}>
            <button
              style={styles.pullBtn}
              onClick={() =>
                alert(
                  "Pulled fresh data sync!"
                )
              }
            >
              Pull
            </button>

            <button
              style={styles.checkBtn}
              onClick={() =>
                alert(
                  "Verification check passed!"
                )
              }
            >
              Check Verify
            </button>
          </div>
        )}
    </div>
  );
}

// ======================================================
// INLINE STYLES
// ======================================================

const styles = {
  appContainer: {
    fontFamily:
      "Inter, Arial, sans-serif",
    backgroundColor: "#f6f7f9",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    color: "#1f2937",
  },

  topSearchBar: {
    padding: "10px 24px",
    backgroundColor: "#ffffff",
    borderBottom:
      "1px solid #e5e7eb",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    color: "#6b7280",
    fontSize: "13px",
  },

  topRole: {
    fontWeight: "700",
    color: "#4a90e2",
  },

  mainContent: {
    flex: 1,
    width: "100%",
    boxSizing: "border-box",
    display: "flex",
    justifyContent: "center",
    padding: "28px 20px",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: "34px",
    borderRadius: "14px",
    width: "100%",
    maxWidth: "440px",
    boxShadow:
      "0 10px 35px rgba(0,0,0,0.08)",
    boxSizing: "border-box",
  },

  authLogo: {
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "800",
    color: "#2563eb",
    marginBottom: "10px",
  },

  title: {
    textAlign: "center",
    marginBottom: "8px",
    color: "#111827",
  },

  authSubtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "13px",
    marginBottom: "24px",
  },

  inputGroup: {
    marginBottom: "14px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },

  formTwoColumns: {
    display: "flex",
    gap: "10px",
  },

  formRow: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  label: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#4b5563",
    marginBottom: "6px",
  },

  input: {
    padding: "10px 12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "7px",
    fontSize: "14px",
    boxSizing: "border-box",
    width: "100%",
    outline: "none",
    backgroundColor: "#fff",
  },

  primaryButton: {
    width: "100%",
    padding: "11px 16px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "8px",
  },

  secondaryButton: {
    padding: "11px 18px",
    backgroundColor: "#fff",
    color: "#2563eb",
    border:
      "1px solid #2563eb",
    borderRadius: "7px",
    fontWeight: "700",
    cursor: "pointer",
  },

  switchText: {
    textAlign: "center",
    fontSize: "12px",
    marginTop: "18px",
    color: "#6b7280",
  },

  linkText: {
    color: "#2563eb",
    cursor: "pointer",
    fontWeight: "700",
  },

  errorBox: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    border:
      "1px solid #fecaca",
    padding: "10px",
    borderRadius: "7px",
    fontSize: "12px",
    marginBottom: "14px",
  },

  dashboardContainer: {
    width: "100%",
    maxWidth: "1050px",
  },

  navbar: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    backgroundColor: "#111827",
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "10px",
    marginBottom: "20px",
    gap: "15px",
  },

  brandArea: {
    display: "flex",
    alignItems: "center",
    gap: "28px",
  },

  logo: {
    fontSize: "18px",
    fontWeight: "800",
  },

  navLinks: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    flexWrap: "wrap",
  },

  navItem: (active) => ({
    cursor: "pointer",
    fontWeight:
      active ? "700" : "500",
    color:
      active ? "#ffffff" : "#cbd5e1",
    paddingBottom: "3px",
    borderBottom:
      active
        ? "2px solid #60a5fa"
        : "2px solid transparent",
  }),

  userArea: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
  },

  roleText: {
    fontSize: "12px",
    color: "#e5e7eb",
  },

  roleBadge: {
    backgroundColor: "#374151",
    color: "#bfdbfe",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "9px",
    fontWeight: "700",
  },

  logoutBtn: {
    backgroundColor:
      "transparent",
    color: "#fff",
    border: "1px solid #64748b",
    borderRadius: "5px",
    padding: "6px 10px",
    cursor: "pointer",
  },

  welcomeBanner: {
    background:
      "linear-gradient(135deg, #111827, #334155)",
    borderRadius: "16px",
    padding: "32px",
    color: "#fff",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  brandHero: {
    background:
      "linear-gradient(135deg, #172554, #2563eb)",
    borderRadius: "16px",
    padding: "38px",
    color: "#fff",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  agentHero: {
    background:
      "linear-gradient(135deg, #064e3b, #047857)",
    borderRadius: "16px",
    padding: "38px",
    color: "#fff",
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  eyebrow: {
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "800",
    opacity: 0.75,
  },

  heroTitle: {
    fontSize: "32px",
    margin:
      "8px 0 10px",
    color: "#fff",
  },

  heroText: {
    maxWidth: "600px",
    color: "#dbeafe",
    lineHeight: "1.6",
    fontSize: "14px",
  },

  roleIcon: {
    fontSize: "55px",
  },

  heroReviewIcon: {
    fontSize: "65px",
  },

  heroButtons: {
    display: "flex",
    gap: "10px",
    marginTop: "20px",
  },

  sectionHeader: {
    marginBottom: "15px",
    color: "#111827",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "15px",
    marginBottom: "20px",
  },

  statCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.05)",
  },

  dashGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },

  contentCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.05)",
    marginBottom: "20px",
  },

  donutPlaceholder: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    marginTop: "20px",
  },

  donutCircle: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    border:
      "12px solid #4a90e2",
    borderTopColor:
      "#e74c3c",
  },

  legend: {
    fontSize: "12px",
    lineHeight: "2",
  },

  timelineList: {
    listStyleType: "none",
    paddingLeft: 0,
    fontSize: "13px",
    lineHeight: "2",
  },

  timelineList: {
    listStyleType: "none",
    paddingLeft: 0,
    fontSize: "13px",
    lineHeight: "2",
  },

  quickActions: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3, 1fr)",
    gap: "12px",
  },

  actionCard: {
    border:
      "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: "9px",
    padding: "18px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    textAlign: "left",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(4, 1fr)",
    gap: "14px",
  },

  featureCard: {
    border:
      "1px solid #e5e7eb",
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
    textAlign: "left",
    boxShadow:
      "0 3px 12px rgba(0,0,0,0.04)",
  },

  featureIcon: {
    fontSize: "25px",
  },

  cardHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },

  ticketPreview: {
    display: "grid",
    gridTemplateColumns:
      "1fr auto auto",
    alignItems: "center",
    gap: "15px",
    padding: "13px 0",
    borderBottom:
      "1px solid #edf0f3",
  },

  ticketPreview p: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "12px",
  },

  emptyText: {
    color: "#6b7280",
    fontSize: "13px",
  },

  priorityBadge: (priority) => ({
    backgroundColor:
      priority === "CRITICAL"
        ? "#fee2e2"
        : priority === "HIGH"
        ? "#fef3c7"
        : "#e0f2fe",
    color:
      priority === "CRITICAL"
        ? "#dc2626"
        : priority === "HIGH"
        ? "#d97706"
        : "#0369a1",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "700",
  }),

  table: {
    width: "100%",
    borderCollapse:
      "collapse",
    fontSize: "13px",
    textAlign: "left",
  },

  badgeRole: {
    backgroundColor:
      "#fef3c7",
    color: "#d97706",
    padding: "3px 7px",
    borderRadius: "4px",
    fontSize: "10px",
    fontWeight: "700",
  },

  categoryBadge: {
    backgroundColor:
      "#eff6ff",
    color: "#2563eb",
    padding: "4px 7px",
    borderRadius: "5px",
    fontSize: "10px",
    fontWeight: "700",
  },

  badgePriority: (p) => ({
    backgroundColor:
      p === "CRITICAL"
        ? "#fee2e2"
        : p === "HIGH"
        ? "#fef3c7"
        : "#e0f2fe",
    color:
      p === "CRITICAL"
        ? "#dc2626"
        : p === "HIGH"
        ? "#d97706"
        : "#0369a1",
    padding: "3px 7px",
    borderRadius: "4px",
    fontSize: "10px",
  }),

  smallBtn: {
    padding: "6px 9px",
    backgroundColor:
      "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "11px",
    fontWeight: "600",
  },

  tabBtn: (active) => ({
    padding: "7px 11px",
    backgroundColor:
      active
        ? "#2563eb"
        : "#e2e8f0",
    color:
      active
        ? "#fff"
        : "#333",
    border: "none",
    borderRadius: "5px",
    marginLeft: "5px",
    cursor: "pointer",
    fontSize: "11px",
  }),

  ticketHeader: {
    display: "flex",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: "10px",
    gap: "15px",
  },

  emptyCell: {
    textAlign: "center",
    padding: "30px",
    color: "#9ca3af",
  },

  bottomBar: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1fr",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#fff",
    borderTop:
      "1px solid #e5e7eb",
  },

  pullBtn: {
    padding: "11px",
    backgroundColor:
      "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "700",
    cursor: "pointer",
  },

  checkBtn: {
    padding: "11px",
    backgroundColor:
      "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontWeight: "700",
    cursor: "pointer",
  },
};