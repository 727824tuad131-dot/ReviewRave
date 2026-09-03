import React, {
  useEffect,
  useState
} from "react";

import { useDispatch } from "react-redux";

import {
  createProduct,
  updateProduct,
  fetchProducts
} from "../store/slices/productSlice";

import {
  addNotification
} from "../store/slices/notificationSlice";

const ProductForm = ({
  product,
  onClose
}) => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [category, setCategory] =
    useState("ELECTRONICS");

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setCategory(
        product.category || "ELECTRONICS"
      );
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

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
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

      <div className="modal">

        <button
          type="button"
          className="close-btn"
          onClick={onClose}
        >
          ×
        </button>

        <h2>
          {product
            ? "Edit Product"
            : "Create Product"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label htmlFor="name">
              Product Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

          </div>

          <div className="form-group">

            <label>
              Category
            </label>

            <select
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

          <button
            type="submit"
            className="primary-btn"
          >
            {product
              ? "Update Product"
              : "Create Product"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ProductForm;