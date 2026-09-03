import React, {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchProducts,
  deleteProduct
} from "../store/slices/productSlice";

import ProductForm from "./ProductForm";

import {
  addNotification
} from "../store/slices/notificationSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error
  } = useSelector(
    (state) => state.products
  );

  const { user } = useSelector(
    (state) => state.auth
  );

  const [isFormOpen, setIsFormOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

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

    const result = await dispatch(
      deleteProduct(id)
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      dispatch(
        addNotification({
          message:
            "Product deleted successfully",
          type: "success"
        })
      );
    }
  };

  return (
    <section className="page-container">

      <div className="page-header">

        <div>
          <h1>Tracked Products</h1>

          <p>
            Manage your tracked products
          </p>
        </div>

        {canManage && (
          <button
            className="primary-btn"
            onClick={() => {
              setSelectedProduct(null);
              setIsFormOpen(true);
            }}
          >
            + Add Product
          </button>
        )}

      </div>

      {loading && (
        <div className="loading">
          Loading products...
        </div>
      )}

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="product-grid">

        {!loading && items.length === 0 && (
          <div className="empty-state">
            No products found.
          </div>
        )}

        {items.map((product) => (

          <div
            className="product-card"
            key={product.id}
          >

            <div className="product-card-header">

              <h3>
                {product.name}
              </h3>

              <span className="category-badge">
                {product.category}
              </span>

            </div>

            <div className="product-stat">

              <span>
                Sentiment Score
              </span>

              <strong>
                {product.sentimentScore ??
                  product.averageSentiment ??
                  product.avgSentiment ??
                  0}
              </strong>

            </div>

            <div className="product-stat">

              <span>
                Reviews
              </span>

              <strong>
                {product.totalReviews ?? 0}
              </strong>

            </div>

            {canManage && (
              <div className="action-buttons">

                <button
                  onClick={() => {
                    setSelectedProduct(
                      product
                    );

                    setIsFormOpen(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="danger-btn"
                  onClick={() =>
                    handleDelete(
                      product.id
                    )
                  }
                >
                  Delete
                </button>

              </div>
            )}

          </div>

        ))}

      </div>

      {isFormOpen && (
        <ProductForm
          product={selectedProduct}
          onClose={() =>
            setIsFormOpen(false)
          }
        />
      )}

    </section>
  );
};

export default ProductList;