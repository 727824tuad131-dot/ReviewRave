import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCards from "./StatCards";
import DomainChart from "./DomainChart";
import RecentActivity from "./RecentActivity";
import SearchFilterBar from "../common/SearchFilterBar";
import EmptyState from "../common/EmptyState";

import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from "../../store/slices/productSlice";
import { fetchTickets } from "../../store/slices/ticketSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const productsState = useSelector(
    (state) => state.products || state.product || {}
  );
  const ticketsState = useSelector(
    (state) => state.tickets || state.ticket || {}
  );

  const products = productsState.items || [];
  const tickets = ticketsState.items || [];
  const loading = productsState.loading === true || ticketsState.loading === true;

  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState("ALL");
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: "", category: "ELECTRONICS" });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleStartEdit = (product) => {
    setEditingId(product.id);
    setEditFormData({
      name: product.name || "",
      category: product.category || "ELECTRONICS",
    });
  };

  const handleCancelEdit = () => setEditingId(null);

  const handleSaveEdit = (id) => {
    dispatch(updateProduct({ id, ...editFormData }));
    setEditingId(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchVal.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchVal.toLowerCase());
    const matchesFilter = filterVal === "ALL" || product.category === filterVal;
    return matchesSearch && matchesFilter;
  });

  const totalProducts = products.length;
  const totalReviews = products.reduce((total, p) => total + (Number(p.totalReviews) || 0), 0);
  const averageSentiment =
    totalProducts > 0
      ? products.reduce((total, p) => total + (Number(p.averageSentiment) || 0), 0) / totalProducts
      : 0;

  const categoryData = products.reduce((acc, product) => {
    const category = product.category || "OTHER";
    const existing = acc.find((item) => item.label === category);
    if (existing) existing.value += 1;
    else acc.push({ label: category, value: 1 });
    return acc;
  }, []);

  const recentActivities = tickets.slice(0, 5).map((ticket) => ({
    description: `Ticket #${ticket.id} requires attention`,
    time: ticket.createdAt || "Recently",
  }));

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#f8fafc", fontFamily: "sans-serif" }}>
      {/* 1. TOP NAVBAR */}
      <nav style={{ backgroundColor: "#020617", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 32px", borderBottom: "1px solid #1e293b" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ color: "#38bdf8", fontWeight: 800, fontSize: "16px", border: "1px solid #38bdf8", padding: "4px 8px", borderRadius: "6px" }}>RR</span>
          <div>
            <h2 style={{ fontSize: "15px", letterSpacing: "2px", color: "#38bdf8", margin: 0 }}>REVIEWRAVE</h2>
            <span style={{ fontSize: "9px", color: "#64748b", letterSpacing: "1px" }}>SOCIAL SENTIMENT ANALYSIS</span>
          </div>
        </div>

        <div style={{ color: "#38bdf8", fontSize: "13px" }}>Welcome back! Admin</div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "28px", height: "28px", backgroundColor: "#0284c7", color: "#fff", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "12px" }}>A</span>
          <button style={{ background: "transparent", border: "1px solid #334155", color: "#cbd5e1", padding: "4px 10px", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}>↪ Logout</button>
        </div>
      </nav>

      {/* 2. HERO BANNER */}
      <section style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)", display: "grid", gridTemplateColumns: "1fr 1fr", padding: "40px 60px", alignItems: "center", borderBottom: "1px solid #1e293b" }}>
        <div>
          <span style={{ color: "#38bdf8", fontSize: "12px", letterSpacing: "2px", fontWeight: "700" }}>WELCOME TO REVIEWRAVE</span>
          <h1 style={{ fontSize: "36px", fontWeight: "300", margin: "12px 0" }}>
            Welcome back, <br /><span style={{ color: "#818cf8", fontWeight: "700" }}>Platform Admin</span>
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "14px", maxWidth: "440px", marginBottom: "20px" }}>
            Track audience perception, analyze real-time sentiment trends, and manage brand reputation effortlessly.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, #312e81 0%, #0f172a 70%)", border: "4px solid #6366f1", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(99, 102, 241, 0.3)" }}>
            <span style={{ fontSize: "42px", fontWeight: 800, color: "#38bdf8" }}>
              {(averageSentiment * 100).toFixed(0)}%
            </span>
            <span style={{ fontSize: "10px", color: "#cbd5e1", textTransform: "uppercase", letterSpacing: "1px" }}>Avg Sentiment</span>
          </div>
        </div>
      </section>

      <div style={{ padding: "30px 60px" }}>
        {/* STATS SECTION */}
        <section style={{ marginBottom: "24px" }}>
          <StatCards totalProducts={totalProducts} totalReviews={totalReviews} averageSentiment={averageSentiment} />
        </section>

        {/* SEARCH & FILTER TOOLBAR */}
        <section style={{ marginBottom: "24px" }}>
          <SearchFilterBar
            searchVal={searchVal}
            onSearchChange={setSearchVal}
            filterVal={filterVal}
            onFilterChange={setFilterVal}
            filterOptions={[
              { value: "ALL", label: "All Categories" },
              { value: "ELECTRONICS", label: "Electronics" },
              { value: "SOFTWARE", label: "Software" },
              { value: "HOSPITALITY", label: "Hospitality" },
              { value: "RETAIL", label: "Retail" },
            ]}
          />
        </section>

        {/* CHARTS & ACTIVITY GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
          <section style={{ background: "#1e293b", borderRadius: "8px", padding: "20px", border: "1px solid #334155" }}>
            <DomainChart title="Products by Category" data={categoryData} />
          </section>

          <section style={{ background: "#1e293b", borderRadius: "8px", padding: "20px", border: "1px solid #334155" }}>
            <RecentActivity activities={recentActivities} />
          </section>
        </div>

        {/* PRODUCTS OVERVIEW TABLE */}
        <section style={{ background: "#1e293b", borderRadius: "8px", padding: "20px", border: "1px solid #334155" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <h2>Tracked Products</h2>
            <span style={{ color: "#94a3b8" }}>{filteredProducts.length} products</span>
          </div>

          {loading ? (
            <p style={{ color: "#94a3b8" }}>Loading dashboard data...</p>
          ) : filteredProducts.length === 0 ? (
            <EmptyState message="No products match your current search or filter." />
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", color: "#f8fafc" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155", textAlign: "left", color: "#94a3b8", fontSize: "12px" }}>
                  <th style={{ padding: "10px" }}>PRODUCT</th>
                  <th style={{ padding: "10px" }}>CATEGORY</th>
                  <th style={{ padding: "10px" }}>REVIEWS</th>
                  <th style={{ padding: "10px" }}>SENTIMENT</th>
                  <th style={{ padding: "10px" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #1e293b" }}>
                    {editingId === product.id ? (
                      <>
                        <td style={{ padding: "10px" }}>
                          <input type="text" value={editFormData.name} onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })} style={{ padding: "4px", borderRadius: "4px" }} />
                        </td>
                        <td style={{ padding: "10px" }}>
                          <select value={editFormData.category} onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })} style={{ padding: "4px", borderRadius: "4px" }}>
                            <option value="ELECTRONICS">ELECTRONICS</option>
                            <option value="SOFTWARE">SOFTWARE</option>
                            <option value="HOSPITALITY">HOSPITALITY</option>
                            <option value="RETAIL">RETAIL</option>
                          </select>
                        </td>
                        <td style={{ padding: "10px" }}>{product.totalReviews || 0}</td>
                        <td style={{ padding: "10px" }}>{Number(product.averageSentiment || 0).toFixed(2)}</td>
                        <td style={{ padding: "10px" }}>
                          <button onClick={() => handleSaveEdit(product.id)} style={{ backgroundColor: "#10b981", color: "#fff", border: "none", padding: "4px 8px", marginRight: "6px", borderRadius: "4px", cursor: "pointer" }}>Save</button>
                          <button onClick={handleCancelEdit} style={{ backgroundColor: "#64748b", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td style={{ padding: "10px" }}>{product.name}</td>
                        <td style={{ padding: "10px" }}>
                          <span style={{ backgroundColor: "#0f172a", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", border: "1px solid #334155" }}>
                            {product.category}
                          </span>
                        </td>
                        <td style={{ padding: "10px" }}>{product.totalReviews || 0}</td>
                        <td style={{ padding: "10px", color: "#38bdf8", fontWeight: "bold" }}>{Number(product.averageSentiment || 0).toFixed(2)}</td>
                        <td style={{ padding: "10px" }}>
                          <button onClick={() => handleStartEdit(product)} style={{ backgroundColor: "#2563eb", color: "#fff", border: "none", padding: "4px 8px", marginRight: "6px", borderRadius: "4px", cursor: "pointer" }}>Edit</button>
                          <button onClick={() => handleDeleteProduct(product.id)} style={{ backgroundColor: "#ef4444", color: "#fff", border: "none", padding: "4px 8px", borderRadius: "4px", cursor: "pointer" }}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;