// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createProduct,
//   updateProduct,
//   fetchProducts,
// } from "../../store/slices/productSlice";

// const ProductForm = ({ product, onClose }) => {
//   const dispatch = useDispatch();

//   const { loading } = useSelector(
//     (state) => state.products || state.product || {}
//   );

//   const [name, setName] = useState("");
//   const [category, setCategory] = useState("ELECTRONICS");

//   const isEditMode = Boolean(product);

//   useEffect(() => {
//     if (product) {
//       setName(product.name || "");
//       setCategory(product.category || "ELECTRONICS");
//     } else {
//       setName("");
//       setCategory("ELECTRONICS");
//     }
//   }, [product]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = {
//       name,
//       category,
//     };

//     try {
//       if (isEditMode) {
//         await dispatch(
//           updateProduct({
//             id: product.id,
//             productData,
//           })
//         ).unwrap();
//       } else {
//         await dispatch(
//           createProduct(productData)
//         ).unwrap();
//       }

//       dispatch(fetchProducts());
//       onClose();
//     } catch (error) {
//       // Redux slice handles the error state.
//       console.error("Product operation failed:", error);
//     }
//   };

//   return (
//     <div
//       className="modal-overlay"
//       role="presentation"
//       onMouseDown={(e) => {
//         if (e.target === e.currentTarget) {
//           onClose();
//         }
//       }}
//     >
//       <div
//         className="modal-card product-form-modal"
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby="product-form-title"
//       >
//         {/* HEADER */}
//         <div className="modal-header">
//           <div>
//             <span className="modal-eyebrow">
//               {isEditMode
//                 ? "PRODUCT MANAGEMENT"
//                 : "NEW TRACKED PRODUCT"}
//             </span>

//             <h2 id="product-form-title">
//               {isEditMode
//                 ? "Edit Product"
//                 : "Add Product"}
//             </h2>

//             <p>
//               {isEditMode
//                 ? "Update the details of your tracked product."
//                 : "Add a product to start monitoring customer feedback."}
//             </p>
//           </div>

//           <button
//             type="button"
//             className="modal-close-button"
//             onClick={onClose}
//             aria-label="Close"
//           >
//             ×
//           </button>
//         </div>

//         {/* FORM */}
//         <form
//           className="modal-form"
//           onSubmit={handleSubmit}
//         >
//           <div className="form-group">
//             <label htmlFor="product-name">
//               Product name
//             </label>

//             <div className="input-wrapper">
//               <span className="input-icon">
//                 ▦
//               </span>

//               <input
//                 id="product-name"
//                 name="name"
//                 type="text"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 placeholder="Enter product name"
//                 required
//                 disabled={loading}
//               />
//             </div>
//           </div>

//           <div className="form-group">
//             <label htmlFor="product-category">
//               Category
//             </label>

//             <div className="select-wrapper">
//               <span className="input-icon">
//                 ◆
//               </span>

//               <select
//                 id="product-category"
//                 name="category"
//                 value={category}
//                 onChange={(e) =>
//                   setCategory(e.target.value)
//                 }
//                 required
//                 disabled={loading}
//               >
//                 <option value="ELECTRONICS">
//                   Electronics
//                 </option>

//                 <option value="SOFTWARE">
//                   Software
//                 </option>

//                 <option value="HOSPITALITY">
//                   Hospitality
//                 </option>

//                 <option value="RETAIL">
//                   Retail
//                 </option>
//               </select>

//               <span className="select-arrow">
//                 ▾
//               </span>
//             </div>
//           </div>

//           {/* ACTIONS */}
//           <div className="modal-actions">
//             <button
//               type="button"
//               className="secondary-button"
//               onClick={onClose}
//               disabled={loading}
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="primary-button"
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span className="button-spinner"></span>
//                   <span>
//                     {isEditMode
//                       ? "Updating..."
//                       : "Creating..."}
//                   </span>
//                 </>
//               ) : (
//                 <>
//                   <span>
//                     {isEditMode
//                       ? "Update Product"
//                       : "Create Product"}
//                   </span>

//                   <span className="button-arrow">
//                     →
//                   </span>
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;


import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from '../../store/slices/productSlice';
import productService from '../../services/productService';

const ProductForm = ({
  mode = 'create',
  productId,
  id,
  product,
  onClose,
}) => {
  const dispatch = useDispatch();

  const currentId = productId || id || product?.id;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(
    product?.category || 'ELECTRONICS'
  );
  const [nameError, setNameError] = useState('');

  useEffect(() => {
    if (product) {
      setName(product.name || '');
      setCategory(product.category || 'ELECTRONICS');
      return;
    }

    if (mode === 'edit' && currentId) {
      productService
        .getProductById(currentId)
        .then((data) => {
          if (data) {
            setName(data.name || '');
            setCategory(data.category || 'ELECTRONICS');
          }
        })
        .catch(() => {});
    }
  }, [mode, currentId, product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setNameError('name is required');
      return;
    }

    try {
      if (mode === 'create') {
        await dispatch(
          createProduct({
            name: name.trim(),
            category,
          })
        ).unwrap();

        alert('Product created successfully!');
      } else {
        await dispatch(
          updateProduct({
            id: currentId,
            data: {
              name: name.trim(),
              category,
            },
          })
        ).unwrap();

        alert('Product updated successfully!');
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      alert('Unable to save. Please try again.');
    }
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      data-testid="product-form-modal"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        data-testid="product-form"
      >
        <div className="modal-header">
          <div>
            <h2>
              {mode === 'create'
                ? 'Create New Product'
                : 'Edit Product'}
            </h2>

            <p className="modal-subtitle">
              {mode === 'create'
                ? 'Add a product to start tracking customer feedback.'
                : 'Update the product information below.'}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="btn-close"
            >
              x
            </button>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="modal-body"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem',
          }}
        >
          <div className="form-group">
            <label
              htmlFor="product-name"
              className="form-label"
            >
              Product Name
            </label>

            <input
              id="product-name"
              type="text"
              className="form-input"
              placeholder="Enter product name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);

                if (nameError) {
                  setNameError('');
                }
              }}
            />

            {nameError && (
              <div
                className="error-text"
                style={{
                  color: '#ef4444',
                  fontSize: '0.8rem',
                  marginTop: '0.25rem',
                }}
              >
                name is required
              </div>
            )}
          </div>

          <div className="form-group">
            <label
              htmlFor="product-category"
              className="form-label"
            >
              Category
            </label>

            <select
              id="product-category"
              className="form-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="ELECTRONICS">
                ELECTRONICS
              </option>

              <option value="FASHION">
                FASHION
              </option>

              <option value="SOFTWARE">
                SOFTWARE
              </option>

              <option value="FOOD">
                FOOD
              </option>
            </select>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
              marginTop: '1rem',
            }}
          >
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="btn-cancel"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="btn-submit"
            >
              {mode === 'create'
                ? 'Create Product'
                : 'Update Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;