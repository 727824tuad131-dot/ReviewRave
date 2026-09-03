import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createProduct,
  updateProduct,
  fetchProducts
} from "../store/slices/productSlice";

import { addNotification } from "../store/slices/notificationSlice";

const ProductForm = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("ELECTRONICS");

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

    if (!name.trim()) {
      dispatch(
        addNotification({
          message: "Product name is required",
          type: "warning"
        })
      );

      return;
    }

    let result;

    if (product) {
      result = await dispatch(
        updateProduct({
          id: product.id,
          data: {
            name: name.trim(),
            category
          }
        })
      );
    } else {
      result = await dispatch(
        createProduct({
          name: name.trim(),
          category
        })
      );
    }

    if (result.meta.requestStatus === "fulfilled") {
      dispatch(fetchProducts());

      dispatch(
        addNotification({
          message: product
            ? "Product updated successfully"
            : "Product created successfully",
          type: "success"
        })
      );

      onClose();
    }
  };

  return (
    <div className="modal-overlay">

      <div className="product-modal">

        {/* Modal Header */}
        <div className="product-modal-header">

          <div className="product-modal-title">

            <div className="modal-product-icon">
              {product ? "✎" : "+"}
            </div>

            <div>
              <span className="modal-eyebrow">
                PRODUCT MANAGEMENT
              </span>

              <h2>
                {product
                  ? "Edit Product"
                  : "Create Product"}
              </h2>

              <p>
                {product
                  ? "Update the details of your tracked product."
                  : "Add a new product to start tracking customer sentiment."}
              </p>
            </div>

          </div>

          <button
            type="button"
            className="close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

        </div>

        {/* Form */}
        <form
          className="product-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">

            <label htmlFor="name">
              Product Name
              <span>*</span>
            </label>

            <div className="input-container">

              <span className="input-icon">
                ▣
              </span>

              <input
                id="name"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
              />

            </div>

            <small>
              Enter the name of the product you want to track.
            </small>

          </div>

          <div className="form-group">

            <label htmlFor="category">
              Category
              <span>*</span>
            </label>

            <div className="select-container">

              <span className="input-icon">
                ◈
              </span>

              <select
                id="category"
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
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

            </div>

            <small>
              Select the category that best describes your product.
            </small>

          </div>

          {/* Actions */}
          <div className="product-form-actions">

            <button
              type="button"
              className="cancel-product-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="primary-btn product-submit-btn"
            >
              <span>
                {product ? "✓" : "+"}
              </span>

              {product
                ? "Update Product"
                : "Create Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;