import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import StatCards from "./StatCards";
import DomainChart from "./DomainChart";
import RecentActivity from "./RecentActivity";
import SearchFilterBar from "../common/SearchFilterBar";
import EmptyState from "../common/EmptyState";

import { fetchProducts } from "../../store/slices/productSlice";
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

  const loading =
    productsState.loading === true || ticketsState.loading === true;

  const [searchVal, setSearchVal] = React.useState("");
  const [filterVal, setFilterVal] = React.useState("ALL");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchTickets());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name?.toLowerCase().includes(searchVal.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchVal.toLowerCase());

    const matchesFilter =
      filterVal === "ALL" || product.category === filterVal;

    return matchesSearch && matchesFilter;
  });

  const totalProducts = products.length;

  const totalReviews = products.reduce(
    (total, product) => total + (Number(product.totalReviews) || 0),
    0
  );

  const averageSentiment =
    totalProducts > 0
      ? products.reduce(
          (total, product) =>
            total + (Number(product.averageSentiment) || 0),
          0
        ) / totalProducts
      : 0;

  const categoryData = products.reduce((acc, product) => {
    const category = product.category || "OTHER";

    const existing = acc.find((item) => item.label === category);

    if (existing) {
      existing.value += 1;
    } else {
      acc.push({
        label: category,
        value: 1,
      });
    }

    return acc;
  }, []);

  const recentActivities = [
    ...tickets.slice(0, 5).map((ticket) => ({
      description: `Ticket #${ticket.id} requires attention`,
      time: ticket.createdAt || "Recently",
    })),
  ];

  return (
    <div className="dashboard-page">
      <div className="page-header dashboard-header">
        <div>
          <span className="eyebrow">PLATFORM ADMIN</span>
          <h1>Admin Dashboard</h1>
          <p>
            Monitor products, reviews, sentiment and resolution activity from
            one place.
          </p>
        </div>

        <div className="dashboard-status">
          <span className="status-dot"></span>
          System Overview
        </div>
      </div>

      <section className="dashboard-stats">
        <StatCards
          totalProducts={totalProducts}
          totalReviews={totalReviews}
          averageSentiment={averageSentiment}
        />
      </section>

      <section className="dashboard-toolbar">
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

      <div className="dashboard-grid">
        <section className="dashboard-card dashboard-chart-card">
          <DomainChart
            title="Products by Category"
            data={categoryData}
          />
        </section>

        <section className="dashboard-card">
          <RecentActivity activities={recentActivities} />
        </section>
      </div>

      <section className="dashboard-card products-overview">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OVERVIEW</span>
            <h2>Tracked Products</h2>
          </div>

          <span className="result-count">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="dashboard-loading">
            <div className="loading-spinner"></div>
            <p>Loading dashboard data...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <EmptyState message="No products match your current search or filter." />
        ) : (
          <div className="admin-product-table">
            <div className="admin-table-row admin-table-head">
              <span>Product</span>
              <span>Category</span>
              <span>Reviews</span>
              <span>Sentiment</span>
            </div>

            {filteredProducts.map((product) => (
              <div className="admin-table-row" key={product.id}>
                <span className="product-name-cell">
                  {product.name}
                </span>

                <span>
                  <span className="category-badge">
                    {product.category}
                  </span>
                </span>

                <span>{product.totalReviews || 0}</span>

                <span className="sentiment-value">
                  {Number(product.averageSentiment || 0).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminDashboard;