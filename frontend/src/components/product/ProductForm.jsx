import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  fetchProducts,
} from "../../store/slices/productSlice";

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const { loading } = useSelector(
    (state) => state.products || state.product || {}
  );

  const [name, setName] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");

  const isEditMode = Boolean(product);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCategory(product.category || "ELECTRONICS");
    } else {
      setName("");
      setCategory("ELECTRONICS");
    }
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      category,
    };

    try {
      if (isEditMode) {
        await dispatch(
          updateProduct({
            id: product.id,
            productData,
          })
        ).unwrap();
      } else {
        await dispatch(
          createProduct(productData)
        ).unwrap();
      }

      dispatch(fetchProducts());
      onClose();
    } catch (error) {
      // Redux slice handles the error state.
      console.error("Product operation failed:", error);
    }
  };

  return (
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="modal-card product-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
      >
        {/* HEADER */}
        <div className="modal-header">
          <div>
            <span className="modal-eyebrow">
              {isEditMode
                ? "PRODUCT MANAGEMENT"
                : "NEW TRACKED PRODUCT"}
            </span>

            <h2 id="product-form-title">
              {isEditMode
                ? "Edit Product"
                : "Add Product"}
            </h2>

            <p>
              {isEditMode
                ? "Update the details of your tracked product."
                : "Add a product to start monitoring customer feedback."}
            </p>
          </div>

          <button
            type="button"
            className="modal-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form
          className="modal-form"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="product-name">
              Product name
            </label>

            <div className="input-wrapper">
              <span className="input-icon">
                ▦
              </span>

              <input
                id="product-name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product-category">
              Category
            </label>

            <div className="select-wrapper">
              <span className="input-icon">
                ◆
              </span>

              <select
                id="product-category"
                name="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                required
                disabled={loading}
              >
                <option value="ELECTRONICS">
                  Electronics
                </option>

                <option value="SOFTWARE">
                  Software
                </option>

                <option value="HOSPITALITY">
                  Hospitality
                </option>

                <option value="RETAIL">
                  Retail
                </option>
              </select>

              <span className="select-arrow">
                ▾
              </span>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="modal-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  <span>
                    {isEditMode
                      ? "Updating..."
                      : "Creating..."}
                  </span>
                </>
              ) : (
                <>
                  <span>
                    {isEditMode
                      ? "Update Product"
                      : "Create Product"}
                  </span>

                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;