import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductForm from "./ProductForm";
import {
  fetchProducts,
  deleteProduct,
} from "../../store/slices/productSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    items = [], 
    loading,
    error,
  } = useSelector(
    (state) => state.products || state.product || {}
  );

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const role = localStorage.getItem("role");

  const canManageProducts =
    role === "BRAND_MANAGER" ||
    role === "PLATFORM_ADMIN";

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      dispatch(deleteProduct(id));
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };

  const getSentimentClass = (score) => {
    if (score === null || score === undefined) {
      return "neutral";
    }

    if (score >= 0.7) return "positive";
    if (score >= 0.4) return "neutral";
    return "negative";
  };

  const getSentimentLabel = (score) => {
    if (score === null || score === undefined) {
      return "No data";
    }

    if (score >= 0.7) return "Positive";
    if (score >= 0.4) return "Neutral";
    return "Negative";
  };

  const formatSentiment = (score) => {
    if (score === null || score === undefined) {
      return "—";
    }

    const numericScore = Number(score);

    if (Number.isNaN(numericScore)) {
      return "—";
    }

    return numericScore.toFixed(2);
  };

  return (
    <div className="page-container">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            CUSTOMER INTELLIGENCE
          </span>

          <h1>Tracked Products</h1>

          <p>
            Monitor customer sentiment and feedback
            across your tracked products.
          </p>
        </div>

        {canManageProducts && (
          <button
            type="button"
            className="primary-button add-product-button"
            onClick={handleAddProduct}
          >
            <span className="button-plus">+</span>
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* ERROR */}
      {error && (
        <div className="inline-error" role="alert">
          <span className="inline-error-icon">!</span>
          <span>{error}</span>
        </div>
      )}

      {/* LOADING */}
      {loading && items.length === 0 ? (
        <div className="products-loading">
          <div className="loading-spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : items.length === 0 ? (
        /* EMPTY STATE */
        <div className="empty-products-state">
          <div className="empty-state-icon">
            ▦
          </div>

          <h2>No tracked products yet</h2>

          <p>
            Add your first product to start monitoring
            customer reviews and sentiment.
          </p>

          {canManageProducts && (
            <button
              type="button"
              className="primary-button"
              onClick={handleAddProduct}
            >
              <span>+ Add Product</span>
            </button>
          )}
        </div>
      ) : (
        /* PRODUCT GRID */
        <div className="product-grid">
          {items.map((product) => {
            const sentimentScore =
              product.averageSentiment;

            const sentimentClass =
              getSentimentClass(sentimentScore);

            return (
              <article
                className="product-card"
                key={product.id}
              >
                {/* CARD TOP */}
                <div className="product-card-top">
                  <div className="product-icon">
                    ▦
                  </div>

                  <span className="product-category">
                    {product.category}
                  </span>
                </div>

                {/* PRODUCT INFO */}
                <div className="product-card-content">
                  <h2>{product.name}</h2>

                  <div className="product-review-count">
                    <span className="review-icon">
                      ◇
                    </span>

                    <span>
                      {product.totalReviews ?? 0}{" "}
                      reviews
                    </span>
                  </div>
                </div>

                {/* SENTIMENT */}
                <div className="sentiment-section">
                  <div className="sentiment-heading">
                    <span>
                      Average sentiment
                    </span>

                    <span
                      className={`sentiment-label ${sentimentClass}`}
                    >
                      {getSentimentLabel(
                        sentimentScore
                      )}
                    </span>
                  </div>

                  <div className="sentiment-score-row">
                    <strong>
                      {formatSentiment(
                        sentimentScore
                      )}
                    </strong>

                    <div className="sentiment-bar">
                      <div
                        className={`sentiment-bar-fill ${sentimentClass}`}
                        style={{
                          width: `${
                            sentimentScore !==
                              null &&
                            sentimentScore !==
                              undefined
                              ? Math.max(
                                  0,
                                  Math.min(
                                    100,
                                    Number(
                                      sentimentScore
                                    ) * 100
                                  )
                                )
                              : 0
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                {canManageProducts && (
                  <div className="product-card-actions">
                    <button
                      type="button"
                      className="card-action-button edit"
                      onClick={() =>
                        handleEditProduct(product)
                      }
                    >
                      <span>✎</span>
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      className="card-action-button delete"
                      onClick={() =>
                        handleDeleteProduct(product.id)
                      }
                    >
                      <span>⌫</span>
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}

      {/* PRODUCT FORM MODAL */}
      {showForm && (
        <ProductForm
          product={selectedProduct}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
};

export default ProductList;