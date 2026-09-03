import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchProducts,
  deleteProduct
} from "../store/slices/productSlice";

import ProductForm from "./ProductForm";

import { addNotification } from "../store/slices/notificationSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const canManage =
    user?.role === "BRAND_MANAGER" ||
    user?.role === "PLATFORM_ADMIN";

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    const result = await dispatch(deleteProduct(id));

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(
        addNotification({
          message: "Product deleted successfully",
          type: "success"
        })
      );
    }
  };

  return (
    <section className="products-page">

      {/* Header */}
      <div className="products-page-header">
        <div className="products-title-area">
          <span className="products-eyebrow">
            PRODUCT MANAGEMENT
          </span>

          <h1>Tracked Products</h1>

          <p>
            Manage your tracked products and monitor customer sentiment.
          </p>
        </div>

        {canManage && (
          <button
            className="product-add-btn"
            onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}
          >
            <span className="add-icon">+</span>
            Add Product
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <span>Loading products...</span>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="products-error">
          <span className="error-icon">!</span>

          <div>
            <strong>Unable to load products</strong>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="product-grid">

        {/* Empty State */}
        {!loading && items.length === 0 && (
          <div className="products-empty-state">

            <div className="empty-product-icon">
              ▣
            </div>

            <h3>No products found</h3>

            <p>
              Start tracking a product to monitor customer
              reviews and sentiment.
            </p>

            {canManage && (
              <button
                className="empty-add-btn"
                onClick={() => {
                  setSelectedProduct(null);
                  setIsFormOpen(true);
                }}
              >
                + Add Your First Product
              </button>
            )}

          </div>
        )}

        {/* Products */}
        {items.map((product) => {
          const sentiment =
            product.sentimentScore ??
            product.averageSentiment ??
            product.avgSentiment ??
            0;

          return (
            <div
              className="product-card"
              key={product.id}
            >

              {/* Card Header */}
              <div className="product-card-header">

                <div className="product-name-wrapper">

                  <div className="product-icon">
                    {product.name
                      ? product.name.charAt(0).toUpperCase()
                      : "P"}
                  </div>

                  <div>
                    <h3>{product.name}</h3>

                    <span className="product-id">
                      Product #{product.id}
                    </span>
                  </div>

                </div>

                <span className="category-badge">
                  {product.category}
                </span>

              </div>

              {/* Sentiment */}
              <div className="product-sentiment">

                <div className="sentiment-header">
                  <span>Sentiment Score</span>

                  <strong>{sentiment}</strong>
                </div>

                <div className="sentiment-progress">
                  <div
                    className="sentiment-progress-fill"
                    style={{
                      width: `${Math.min(
                        Math.max(Number(sentiment), 0),
                        100
                      )}%`
                    }}
                  ></div>
                </div>

              </div>

              {/* Stats */}
              <div className="product-stats">

                <div className="product-stat-box">

                  <span className="stat-symbol">
                    ◉
                  </span>

                  <div>
                    <small>Reviews</small>

                    <strong>
                      {product.totalReviews ?? 0}
                    </strong>
                  </div>

                </div>

                <div className="product-stat-box">

                  <span className="stat-symbol">
                    ★
                  </span>

                  <div>
                    <small>Sentiment</small>

                    <strong>
                      {Number(sentiment) >= 70
                        ? "Positive"
                        : Number(sentiment) >= 40
                        ? "Neutral"
                        : "Negative"}
                    </strong>
                  </div>

                </div>

              </div>

              {/* Actions */}
              {canManage && (
                <div className="product-actions">

                  <button
                    className="edit-product-btn"
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsFormOpen(true);
                    }}
                  >
                    <span>✎</span>
                    Edit
                  </button>

                  <button
                    className="delete-product-btn"
                    onClick={() =>
                      handleDelete(product.id)
                    }
                  >
                    <span>⌫</span>
                    Delete
                  </button>

                </div>
              )}

            </div>
          );
        })}

      </div>

      {/* Product Form */}
      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setIsFormOpen(false)}
        />
      )}

    </section>
  );
};

export default ProductList;