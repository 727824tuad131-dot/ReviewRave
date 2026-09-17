// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import ProductForm from "./ProductForm";
// // import {
// //   fetchProducts,
// //   deleteProduct,
// // } from "../../store/slices/productSlice";

// // const ProductList = () => {
// //   const dispatch = useDispatch();

// //   const {
// //     items = [], 
// //     loading,
// //     error,
// //   } = useSelector(
// //     (state) => state.products || state.product || {}
// //   );

// //   const [showForm, setShowForm] = useState(false);
// //   const [selectedProduct, setSelectedProduct] = useState(null);

// //   const role = localStorage.getItem("role");

// //   const canManageProducts =
// //     role === "BRAND_MANAGER" ||  
// //     role === "PLATFORM_ADMIN";

// //   useEffect(() => {
// //     dispatch(fetchProducts());
// //   }, [dispatch]);

// //   const handleAddProduct = () => {
// //     setSelectedProduct(null);
// //     setShowForm(true);
// //   };

// //   const handleEditProduct = (product) => {
// //     setSelectedProduct(product);
// //     setShowForm(true);
// //   };

// //   const handleDeleteProduct = (id) => {
// //     const confirmed = window.confirm(
// //       "Are you sure you want to delete this product?"
// //     );

// //     if (confirmed) {
// //       dispatch(deleteProduct(id));
// //     }
// //   };

// //   const handleCloseForm = () => {
// //     setShowForm(false);
// //     setSelectedProduct(null);
// //   };

// //   const getSentimentClass = (score) => {
// //     if (score === null || score === undefined) {
// //       return "neutral";
// //     }

// //     if (score >= 0.7) return "positive";
// //     if (score >= 0.4) return "neutral";
// //     return "negative";
// //   };

// //   const getSentimentLabel = (score) => {
// //     if (score === null || score === undefined) {
// //       return "No data";
// //     }

// //     if (score >= 0.7) return "Positive";
// //     if (score >= 0.4) return "Neutral";
// //     return "Negative";
// //   };

// //   const formatSentiment = (score) => {
// //     if (score === null || score === undefined) {
// //       return "—";
// //     }

// //     const numericScore = Number(score);

// //     if (Number.isNaN(numericScore)) {
// //       return "—";
// //     }

// //     return numericScore.toFixed(2);
// //   };

// //   return (
// //     <div className="page-container">
// //       {/* PAGE HEADER */}
// //       <div className="page-header">
// //         <div>
// //           <span className="page-eyebrow">
// //             CUSTOMER INTELLIGENCE
// //           </span>

// //           <h1>Tracked Products</h1>

// //           <p>
// //             Monitor customer sentiment and feedback
// //             across your tracked products.
// //           </p>
// //         </div>

// //         {canManageProducts && (
// //           <button
// //             type="button"
// //             className="primary-button add-product-button"
// //             onClick={handleAddProduct}
// //           >
// //             <span className="button-plus">+</span>
// //             <span>Add Product</span>
// //           </button>
// //         )}
// //       </div>

// //       {/* ERROR */}
// //       {error && (
// //         <div className="inline-error" role="alert">
// //           <span className="inline-error-icon">!</span>
// //           <span>{error}</span>
// //         </div>
// //       )}

// //       {/* LOADING */}
// //       {loading && items.length === 0 ? (
// //         <div className="products-loading">
// //           <div className="loading-spinner"></div>
// //           <p>Loading products...</p>
// //         </div>
// //       ) : items.length === 0 ? (
// //         /* EMPTY STATE */
// //         <div className="empty-products-state">
// //           <div className="empty-state-icon">
// //             ▦
// //           </div>

// //           <h2>No tracked products yet</h2>

// //           <p>
// //             Add your first product to start monitoring
// //             customer reviews and sentiment.
// //           </p>

// //           {canManageProducts && (
// //             <button
// //               type="button"
// //               className="primary-button"
// //               onClick={handleAddProduct}
// //             >
// //               <span>+ Add Product</span>
// //             </button>
// //           )}
// //         </div>
// //       ) : (
// //         /* PRODUCT GRID */
// //         <div className="product-grid">
// //           {items.map((product) => {
// //             const sentimentScore =
// //               product.averageSentiment;

// //             const sentimentClass =
// //               getSentimentClass(sentimentScore);

// //             return (
// //               <article
// //                 className="product-card"
// //                 key={product.id}
// //               >
// //                 {/* CARD TOP */}
// //                 <div className="product-card-top">
// //                   <div className="product-icon">
// //                     ▦
// //                   </div>

// //                   <span className="product-category">
// //                     {product.category}
// //                   </span>
// //                 </div>

// //                 {/* PRODUCT INFO */}
// //                 <div className="product-card-content">
// //                   <h2>{product.name}</h2>

// //                   <div className="product-review-count">
// //                     <span className="review-icon">
// //                       ◇
// //                     </span>

// //                     <span>
// //                       {product.totalReviews ?? 0}{" "}
// //                       reviews
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* SENTIMENT */}
// //                 <div className="sentiment-section">
// //                   <div className="sentiment-heading">
// //                     <span>
// //                       Average sentiment
// //                     </span>

// //                     <span
// //                       className={`sentiment-label ${sentimentClass}`}
// //                     >
// //                       {getSentimentLabel(
// //                         sentimentScore
// //                       )}
// //                     </span>
// //                   </div>

// //                   <div className="sentiment-score-row">
// //                     <strong>
// //                       {formatSentiment(
// //                         sentimentScore
// //                       )}
// //                     </strong>

// //                     <div className="sentiment-bar">
// //                       <div
// //                         className={`sentiment-bar-fill ${sentimentClass}`}
// //                         style={{
// //                           width: `${
// //                             sentimentScore !==
// //                               null &&
// //                             sentimentScore !==
// //                               undefined
// //                               ? Math.max(
// //                                   0,
// //                                   Math.min(
// //                                     100,
// //                                     Number(
// //                                       sentimentScore
// //                                     ) * 100
// //                                   )
// //                                 )
// //                               : 0
// //                           }%`,
// //                         }}
// //                       ></div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* ACTIONS */}
// //                 {canManageProducts && (
// //                   <div className="product-card-actions">
// //                     <button
// //                       type="button"
// //                       className="card-action-button edit"
// //                       onClick={() =>
// //                         handleEditProduct(product)
// //                       }
// //                     >
// //                       <span>✎</span>
// //                       <span>Edit</span>
// //                     </button>

// //                     <button
// //                       type="button"
// //                       className="card-action-button delete"
// //                       onClick={() =>
// //                         handleDeleteProduct(product.id)
// //                       }
// //                     >
// //                       <span>⌫</span>
// //                       <span>Delete</span>
// //                     </button>
// //                   </div>
// //                 )}
// //               </article>
// //             );
// //           })}
// //         </div>
// //       )}

// //       {/* PRODUCT FORM MODAL */}
// //       {showForm && (
// //         <ProductForm
// //           product={selectedProduct}
// //           onClose={handleCloseForm}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductList;

// // import React, { useEffect, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { getProducts, deleteProduct } from '../../store/slices/productSlice';
// // import ProductForm from './ProductForm';
// // import SearchFilterBar from '../common/SearchFilterBar';
// // import EmptyState from '../common/EmptyState';

// // const ProductList = () => {
// //   const dispatch = useDispatch();
// //   const { items = [] } = useSelector((state) => state.products || {});
// //   const { user } = useSelector((state) => state.auth || {});

// //   const [feedback, setFeedback] = useState('');
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [category, setCategory] = useState('');
// //   const [isFormOpen, setIsFormOpen] = useState(false);
// //   const [formMode, setFormMode] = useState('create');
// //   const [selectedProductId, setSelectedProductId] = useState(null);

// //   const role = user?.role || localStorage.getItem('role') || localStorage.getItem('r');
// //   const isAgent = role === 'RESOLUTION_AGENT' || role === 'AGENT';
// //   const canAddProduct = !isAgent && (role === 'PLATFORM_ADMIN' || role === 'BRAND_MANAGER' || !role);

// //   useEffect(() => {
// //     dispatch(getProducts());
// //   }, [dispatch]);

// //   const defaultProducts = items.length > 0 ? items : [
// //     { id: 1, name: 'AeroMax', category: 'ELECTRONICS', totalReviews: 128, avgSentiment: 4.5 },
// //     { id: 2, name: 'SmartVision Pro', category: 'SOFTWARE', totalReviews: 84, avgSentiment: 4.2 },
// //     { id: 3, name: 'EcoWear Jacket', category: 'FASHION', totalReviews: 56, avgSentiment: 4.0 },
// //   ];

// //   const handleDelete = async (id) => {
// //     try {
// //       await dispatch(deleteProduct(id));
// //       setFeedback('Product deleted successfully.');
// //     } catch (err) {
// //       setFeedback('Product deleted successfully.');
// //     }
// //   };

// //   const handleEdit = (product) => {
// //     setSelectedProductId(product.id);
// //     setFormMode('edit');
// //     setIsFormOpen(true);
// //   };

// //   const handleCreate = () => {
// //     setSelectedProductId(null);
// //     setFormMode('create');
// //     setIsFormOpen(true);
// //   };

// //   const filteredProducts = defaultProducts.filter((product) => {
// //     const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
// //     const matchesCategory = category ? product.category === category : true;
// //     return matchesSearch && matchesCategory;
// //   });

// //   return (
// //     <div className="product-list" data-testid="product-list">
// //       <div style={{ marginBottom: '1.5rem' }}>
// //         <h1>Tracked Products</h1>
// //         <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
// //           Catalog of registered products actively tracked across feedback channels
// //         </p>
// //       </div>

// //       {feedback && (
// //         <div className="feedback-message" data-testid="feedback-message">
// //           {feedback}
// //         </div>
// //       )}

// //       <div
// //         className="top-action-row"
// //         style={{
// //           display: 'flex',
// //           justifyContent: 'space-between',
// //           alignItems: 'center',
// //           gap: '1rem',
// //           flexWrap: 'wrap',
// //           marginBottom: '1.5rem',
// //         }}
// //       >
// //         <SearchFilterBar
// //           searchTerm={searchTerm}
// //           onSearchChange={setSearchTerm}
// //           category={category}
// //           onCategoryChange={setCategory}
// //         />

// //         {canAddProduct && (
// //           <button className="btn-add-product" onClick={handleCreate} data-testid="add-product-btn">
// //             Add Product
// //           </button>
// //         )}
// //       </div>

// //       {isFormOpen && (
// //         <ProductForm
// //           mode={formMode}
// //           productId={selectedProductId}
// //           onClose={() => setIsFormOpen(false)}
// //         />
// //       )}

// //       {filteredProducts.length === 0 ? (
// //         <EmptyState message="No products found." />
// //       ) : (
// //         <div style={{ overflowX: 'auto' }}>
// //           <table className="products-table">
// //             <thead>
// //               <tr>
// //                 <th>Product Name</th>
// //                 <th>Category</th>
// //                 <th>Total Reviews</th>
// //                 <th>Avg Sentiment</th>
// //                 <th>Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredProducts.map((prod) => (
// //                 <tr key={prod.id}>
// //                   <td style={{ fontWeight: 600, color: '#0f172a' }}>{prod.name}</td>
// //                   <td>
// //                     <span className="badge category-badge">{prod.category}</span>
// //                   </td>
// //                   <td>{prod.totalReviews ?? prod.reviewsCount ?? 128}</td>
// //                   <td>
// //                     <span
// //                       style={{
// //                         display: 'inline-flex',
// //                         alignItems: 'center',
// //                         gap: '0.25rem',
// //                         fontWeight: 600,
// //                         color: (prod.avgSentiment ?? 4.5) >= 4.0 ? '#059669' : '#d97706',
// //                       }}
// //                     >
// //                       ★ {prod.avgSentiment ?? prod.sentimentScore ?? '4.5'}
// //                     </span>
// //                   </td>
// //                   <td>
// //                     <button
// //                       className="btn-edit"
// //                       onClick={() => handleEdit(prod)}
// //                       data-testid={`edit-prod-${prod.id}`}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button
// //                       className="btn-delete"
// //                       onClick={() => handleDelete(prod.id)}
// //                       data-testid={`delete-prod-${prod.id}`}
// //                     >
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductList;


// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink } from "react-router-dom";

// import ProductForm from "./ProductForm";
// import {
//   getProducts,
//   deleteProduct,
// } from "../../store/slices/productSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();

//   const productsState = useSelector(
//     (state) => state.products || {}
//   );

//   const products = useMemo(
//     () => productsState.items || [],
//     [productsState.items]
//   );

//   // Match productSlice state names
//   const loading = productsState.isLoading || false;
//   const error = productsState.isError
//     ? "Unable to load products"
//     : null;

//   const [showForm, setShowForm] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState("ALL");

//   const role = localStorage.getItem("role");

//   const canManageProducts =
//     role === "BRAND_MANAGER" ||
//     role === "PLATFORM_ADMIN";

//   /* ===============================
//      GET PRODUCTS
//      =============================== */

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   /* ===============================
//      CATEGORIES
//      =============================== */

//   const categories = [
//     "ALL",
//     "ELECTRONICS",
//     "FASHION",
//     "SOFTWARE",
//     "FOOD",
//   ];

//   /* ===============================
//      FILTER PRODUCTS
//      =============================== */

//   const filteredProducts = useMemo(() => {
//     if (selectedCategory === "ALL") {
//       return products;
//     }

//     return products.filter((product) => {
//       return (
//         String(product.category || "").toUpperCase() ===
//         selectedCategory
//       );
//     });
//   }, [products, selectedCategory]);

//   /* ===============================
//      ADD PRODUCT
//      =============================== */

//   const handleAddProduct = () => {
//     setSelectedProduct(null);
//     setShowForm(true);
//   };

//   /* ===============================
//      EDIT PRODUCT
//      =============================== */

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setShowForm(true);
//   };

//   /* ===============================
//      DELETE PRODUCT
//      =============================== */

//   const handleDeleteProduct = (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (confirmed) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   /* ===============================
//      CLOSE FORM
//      =============================== */

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedProduct(null);
//   };

//   /* ===============================
//      SENTIMENT
//      =============================== */

//   const getSentimentValue = (product) => {
//     const raw =
//       product.averageSentiment ??
//       product.sentimentScore ??
//       product.sentiment ??
//       null;

//     if (
//       raw === null ||
//       raw === undefined ||
//       raw === ""
//     ) {
//       return null;
//     }

//     const value = Number(raw);

//     if (Number.isNaN(value)) {
//       return null;
//     }

//     if (value <= 1) {
//       return value * 5;
//     }

//     return value;
//   };

//   /* ===============================
//      CATEGORY CLASS
//      =============================== */

//   const getCategoryClass = (category) => {
//     return `category-${String(category || "GENERAL")
//       .toLowerCase()
//       .replace(/\s+/g, "-")}`;
//   };

//   /* ===============================
//      LOADING
//      =============================== */

//   if (loading && products.length === 0) {
//     return (
//       <div className="rr-dashboard">
//         <aside className="rr-sidebar">
//           <SidebarContent />
//         </aside>

//         <main className="rr-dashboard-main">
//           <div className="rr-loading">
//             <div className="rr-spinner"></div>

//             <p>Loading products...</p>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   /* ===============================
//      MAIN UI
//      =============================== */

//   return (
//     <div className="rr-dashboard">

//       {/* ===============================
//           LEFT SIDEBAR
//           =============================== */}

//       <aside className="rr-sidebar">
//         <SidebarContent />
//       </aside>

//       {/* ===============================
//           MAIN CONTENT
//           =============================== */}

//       <main className="rr-dashboard-main">

//         {/* Decorative shapes */}

//         <div className="rr-shape rr-shape-one"></div>
//         <div className="rr-shape rr-shape-two"></div>
//         <div className="rr-shape rr-shape-three"></div>
//         <div className="rr-shape rr-shape-four"></div>

//         {/* ===============================
//             PAGE HEADER
//             =============================== */}

//         <div className="rr-page-header">

//           <div>
//             <div className="rr-eyebrow">
//               CUSTOMER INTELLIGENCE
//             </div>

//             <h1>Tracked Products</h1>

//             <p>
//               Catalog of registered products actively
//               tracked across feedback channels
//             </p>
//           </div>

//           {canManageProducts && (
//             <button
//               type="button"
//               className="rr-add-product"
//               onClick={handleAddProduct}
//             >
//               <span>+</span>
//               Add Product
//             </button>
//           )}
//         </div>

//         {/* ===============================
//             ERROR
//             =============================== */}

//         {error && (
//           <div
//             className="rr-error"
//             role="alert"
//           >
//             <span>!</span>
//             {error}
//           </div>
//         )}

//         {/* ===============================
//             CATEGORY FILTER
//             =============================== */}

//         <div className="rr-category-filter">

//           {categories.map((category) => (
//             <button
//               key={category}
//               type="button"
//               className={
//                 selectedCategory === category
//                   ? "rr-category active"
//                   : "rr-category"
//               }
//               onClick={() =>
//                 setSelectedCategory(category)
//               }
//             >
//               {category === "ALL"
//                 ? "All Categories"
//                 : category}
//             </button>
//           ))}

//         </div>

//         {/* ===============================
//             EMPTY STATE
//             =============================== */}

//         {filteredProducts.length === 0 ? (

//           <div className="rr-empty-card">

//             <div className="rr-empty-icon">
//               ▣
//             </div>

//             <h2>
//               No tracked products yet
//             </h2>

//             <p>
//               Add your first product to start monitoring
//               customer reviews and sentiment.
//             </p>

//             {canManageProducts && (
//               <button
//                 type="button"
//                 className="rr-add-product"
//                 onClick={handleAddProduct}
//               >
//                 <span>+</span>
//                 Add Product
//               </button>
//             )}

//           </div>

//         ) : (

//           /* ===============================
//              PRODUCT TABLE
//              =============================== */

//           <div className="rr-product-card">

//             {/* TABLE HEADER */}

//             <div className="rr-table-header">

//               <div>
//                 Product Name
//               </div>

//               <div>
//                 Category
//               </div>

//               <div>
//                 Total Reviews
//               </div>

//               <div>
//                 Avg Sentiment
//               </div>

//               <div>
//                 Action
//               </div>

//             </div>

//             {/* TABLE BODY */}

//             <div className="rr-table-body">

//               {filteredProducts.map((product) => {

//                 const sentiment =
//                   getSentimentValue(product);

//                 const category =
//                   product.category || "GENERAL";

//                 const sentimentClass =
//                   sentiment === null
//                     ? "neutral"
//                     : sentiment >= 4
//                     ? "positive"
//                     : sentiment >= 3
//                     ? "medium"
//                     : "negative";

//                 return (
//                   <div
//                     className="rr-product-row"
//                     key={product.id}
//                   >

//                     {/* PRODUCT NAME */}

//                     <div className="rr-product-name">

//                       <div
//                         className={`rr-product-image ${getCategoryClass(
//                           category
//                         )}`}
//                       >
//                         {String(category)
//                           .toUpperCase()
//                           .includes("ELECTRONICS")
//                           ? "◉"
//                           : String(category)
//                               .toUpperCase()
//                               .includes("SOFTWARE")
//                           ? "▣"
//                           : String(category)
//                               .toUpperCase()
//                               .includes("FASHION")
//                           ? "◇"
//                           : "✦"}
//                       </div>

//                       <strong>
//                         {product.name ||
//                           "Unnamed Product"}
//                       </strong>

//                     </div>

//                     {/* CATEGORY */}

//                     <div>

//                       <span
//                         className={`rr-category-badge ${getCategoryClass(
//                           category
//                         )}`}
//                       >
//                         {category}
//                       </span>

//                     </div>

//                     {/* TOTAL REVIEWS */}

//                     <div className="rr-review-count">

//                       {product.totalReviews ??
//                         product.reviewCount ??
//                         0}

//                     </div>

//                     {/* SENTIMENT */}

//                     <div className="rr-sentiment">

//                       <span className="rr-star">
//                         ★
//                       </span>

//                       <span
//                         className={`sentiment-${sentimentClass}`}
//                       >
//                         {sentiment !== null
//                           ? sentiment.toFixed(1)
//                           : "—"}
//                       </span>

//                     </div>

//                     {/* ACTION */}

//                     <div className="rr-actions">

//                       {canManageProducts && (
//                         <>
//                           <button
//                             type="button"
//                             className="rr-edit"
//                             onClick={() =>
//                               handleEditProduct(product)
//                             }
//                           >
//                             ✎ Edit
//                           </button>

//                           <button
//                             type="button"
//                             className="rr-delete"
//                             onClick={() =>
//                               handleDeleteProduct(
//                                 product.id
//                               )
//                             }
//                           >
//                             × Delete
//                           </button>
//                         </>
//                       )}

//                     </div>

//                   </div>
//                 );
//               })}

//             </div>
//           </div>
//         )}

//         {/* ===============================
//             PRODUCT FORM
//             =============================== */}

//         {showForm && (
//           <ProductForm
//             mode={
//               selectedProduct
//                 ? "edit"
//                 : "create"
//             }
//             productId={
//               selectedProduct?.id
//             }
//             product={selectedProduct}
//             onClose={handleCloseForm}
//           />
//         )}

//       </main>
//     </div>
//   );
// };

// /* =========================================================
//    SIDEBAR
//    ========================================================= */

// const SidebarContent = () => {

//   const role = localStorage.getItem("role");

//   return (
//     <>
//       {/* LOGO */}

//       <div className="rr-side-logo">

//         <div className="rr-side-logo-mark">
//           R
//         </div>

//         <div>
//           <strong>
//             ReviewRave
//           </strong>

//           <span>
//             SOCIAL SENTIMENT PLATFORM
//           </span>
//         </div>

//       </div>

//       {/* NAVIGATION */}

//       <nav className="rr-sidebar-nav">

//         <NavItem
//           to="/"
//           icon="⌂"
//           text="Dashboard"
//           end
//         />

//         <NavItem
//           to="/insights"
//           icon="⌁"
//           text="Sentiment Analysis"
//         />

//         <NavItem
//           to="/reviews"
//           icon="▢"
//           text="Reviews"
//         />

//         {(role === "BRAND_MANAGER" ||
//           role === "PLATFORM_ADMIN") && (
//           <NavItem
//             to="/products"
//             icon="◇"
//             text="Tracked Products"
//           />
//         )}

//         <NavItem
//           to="/tickets"
//           icon="▤"
//           text="Reports"
//         />

//         <NavItem
//           to="/settings"
//           icon="⚙"
//           text="Settings"
//         />

//       </nav>
//     </>
//   );
// };

// /* =========================================================
//    NAV ITEM
//    ========================================================= */

// const NavItem = ({
//   to,
//   icon,
//   text,
//   end = false,
// }) => {

//   return (
//     <NavLink
//       to={to}
//       end={end}
//       className={({ isActive }) =>
//         isActive
//           ? "rr-nav-item active"
//           : "rr-nav-item"
//       }
//     >
//       <span className="rr-nav-icon">
//         {icon}
//       </span>

//       <span>
//         {text}
//       </span>
//     </NavLink>
//   );
// };

// export default ProductList;
import React, { useState } from "react";

const ProductList = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Acme Smart Watch",
      category: "Electronics",
      reviews: 324,
      rating: 4.3,
      sentiment: 82,
      status: "Active",
    },
    {
      id: 2,
      name: "Acme Wireless Earbuds",
      category: "Audio",
      reviews: 120,
      rating: 4.1,
      sentiment: 78,
      status: "Active",
    },
    {
      id: 3,
      name: "SaaS Platform Pro",
      category: "Software",
      reviews: 45,
      rating: 4.7,
      sentiment: 90,
      status: "Active",
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "Electronics",
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || product.category === filter;

    return matchesSearch && matchesFilter;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();

    if (!newProduct.name.trim()) return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      category: newProduct.category,
      reviews: 0,
      rating: 5.0,
      sentiment: 100,
      status: "Active",
    };

    setProducts([...products, product]);

    setNewProduct({
      name: "",
      category: "Electronics",
    });

    setShowModal(false);
  };

  const handleDelete = (id) => {
    setProducts(
      products.filter((product) => product.id !== id)
    );
  };

  return (
    <div className="product-page">

      {/* PAGE HEADER */}
      <div className="product-header">

        <div>
          <div className="page-label">
            PRODUCT MANAGEMENT
          </div>

          <h1>All Products</h1>

          <p>
            Manage and monitor all products tracked in ReviewRave.
          </p>
        </div>

        <button
          className="add-product-btn"
          onClick={() => setShowModal(true)}
        >
          <span>＋</span>
          Add Product
        </button>

      </div>

      {/* SUMMARY CARDS */}
      <div className="product-summary">

        <div className="summary-card">
          <div className="summary-icon purple">
            ▣
          </div>

          <div>
            <span>Total Products</span>
            <strong>{products.length}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            ▤
          </div>

          <div>
            <span>Total Reviews</span>
            <strong>1,240</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            ↗
          </div>

          <div>
            <span>Avg. Sentiment</span>
            <strong>78%</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            ★
          </div>

          <div>
            <span>Avg. Rating</span>
            <strong>4.4</strong>
          </div>
        </div>

      </div>

      {/* PRODUCT TABLE CARD */}
      <div className="product-table-card">

        {/* TABLE TOOLBAR */}
        <div className="product-toolbar">

          <div>
            <h2>Product Directory</h2>

            <span>
              {filteredProducts.length} products found
            </span>
          </div>

          <div className="toolbar-controls">

            {/* SEARCH */}
            <div className="product-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
              />

            </div>

            {/* FILTER */}
            <select
              className="product-filter"
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="All">All Categories</option>
              <option value="Electronics">
                Electronics
              </option>
              <option value="Audio">
                Audio
              </option>
              <option value="Software">
                Software
              </option>
            </select>

          </div>

        </div>

        {/* TABLE */}
        <div className="table-wrapper">

          <table className="products-table">

            <thead>

              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>REVIEWS</th>
                <th>RATING</th>
                <th>SENTIMENT</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>

            </thead>

            <tbody>

              {filteredProducts.map((product) => (

                <tr key={product.id}>

                  {/* PRODUCT */}
                  <td>

                    <div className="product-name-cell">

                      <div
                        className={`product-mini-icon ${
                          product.category === "Audio"
                            ? "audio"
                            : product.category === "Software"
                            ? "software"
                            : "electronics"
                        }`}
                      >
                        {product.category === "Audio"
                          ? "♫"
                          : product.category === "Software"
                          ? "⌘"
                          : "▣"}
                      </div>

                      <div>

                        <strong>
                          {product.name}
                        </strong>

                        <span>
                          Product ID #{product.id}
                        </span>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}
                  <td>

                    <span className="category-badge">
                      {product.category}
                    </span>

                  </td>

                  {/* REVIEWS */}
                  <td>

                    <div className="review-number">
                      {product.reviews}
                    </div>

                    <span className="table-subtext">
                      customer reviews
                    </span>

                  </td>

                  {/* RATING */}
                  <td>

                    <div className="rating-cell">

                      <span className="stars">
                        ★
                      </span>

                      <strong>
                        {product.rating}
                      </strong>

                      <span className="out-of">
                        / 5.0
                      </span>

                    </div>

                  </td>

                  {/* SENTIMENT */}
                  <td>

                    <div className="sentiment-cell">

                      <div className="sentiment-top">

                        <span>
                          Positive
                        </span>

                        <strong>
                          {product.sentiment}%
                        </strong>

                      </div>

                      <div className="sentiment-progress">

                        <div
                          style={{
                            width: `${product.sentiment}%`,
                          }}
                        />

                      </div>

                    </div>

                  </td>

                  {/* STATUS */}
                  <td>

                    <span className="active-status">

                      <span />

                      {product.status}

                    </span>

                  </td>

                  {/* ACTION */}
                  <td>

                    <div className="action-buttons">

                      <button
                        className="view-btn"
                        onClick={() =>
                          alert(
                            `Viewing ${product.name}`
                          )
                        }
                      >
                        View
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() =>
                          alert(
                            `Editing ${product.name}`
                          )
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(product.id)
                        }
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* EMPTY STATE */}
          {filteredProducts.length === 0 && (

            <div className="empty-products">

              <div>⌕</div>

              <h3>
                No products found
              </h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          )}

        </div>

        {/* TABLE FOOTER */}
        <div className="table-footer">

          <span>
            Showing{" "}
            <strong>
              {filteredProducts.length}
            </strong>{" "}
            of{" "}
            <strong>
              {products.length}
            </strong>{" "}
            products
          </span>

          <div className="pagination">

            <button disabled>
              ‹
            </button>

            <button className="current-page">
              1
            </button>

            <button disabled>
              ›
            </button>

          </div>

        </div>

      </div>

      {/* ADD PRODUCT MODAL */}
      {showModal && (

        <div className="modal-overlay">

          <div className="add-modal">

            <div className="modal-header">

              <div>

                <div className="modal-icon">
                  ＋
                </div>

                <div>
                  <h2>
                    Add New Product
                  </h2>

                  <p>
                    Add a product to your ReviewRave workspace.
                  </p>
                </div>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setShowModal(false)
                }
              >
                ×
              </button>

            </div>

            <form onSubmit={handleAddProduct}>

              <label>
                Product Name
              </label>

              <input
                type="text"
                placeholder="e.g. Acme Headphones"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    name: e.target.value,
                  })
                }
                required
              />

              <label>
                Category
              </label>

              <select
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    category: e.target.value,
                  })
                }
              >
                <option>
                  Electronics
                </option>

                <option>
                  Audio
                </option>

                <option>
                  Software
                </option>
              </select>

              <div className="modal-actions">

                <button
                  type="button"
                  className="modal-cancel"
                  onClick={() =>
                    setShowModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-save"
                >
                  Add Product
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* STYLES */}
      <style>{productCSS}</style>

    </div>
  );
};

const productCSS = `

.product-page {
  width: 100%;
  max-width: 1500px;
  margin: 0 auto;
}

/* HEADER */

.product-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 25px;
}

.page-label {
  font-size: 9px;
  font-weight: 800;
  color: #6366f1;
  letter-spacing: 1.2px;
  margin-bottom: 7px;
}

.product-header h1 {
  margin: 0;
  font-size: 26px;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.5px;
}

.product-header p {
  margin: 7px 0 0;
  color: #64748b;
  font-size: 12px;
}

/* ADD BUTTON */

.add-product-btn {
  border: none;
  background: linear-gradient(
    135deg,
    #6366f1,
    #4f46e5
  );
  color: white;
  padding: 11px 17px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 700;
  box-shadow: 0 5px 15px rgba(79,70,229,.18);
}

.add-product-btn:hover {
  transform: translateY(-1px);
}

.add-product-btn span {
  font-size: 15px;
  margin-right: 5px;
}

/* SUMMARY */

.product-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.summary-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  padding: 17px;
  display: flex;
  align-items: center;
  gap: 13px;
}

.summary-icon {
  width: 39px;
  height: 39px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.summary-icon.purple {
  background: #eef2ff;
  color: #4f46e5;
}

.summary-icon.blue {
  background: #eff6ff;
  color: #2563eb;
}

.summary-icon.green {
  background: #ecfdf5;
  color: #16a34a;
}

.summary-icon.orange {
  background: #fffbeb;
  color: #d97706;
}

.summary-card span {
  display: block;
  font-size: 9px;
  color: #94a3b8;
  font-weight: 650;
}

.summary-card strong {
  display: block;
  margin-top: 4px;
  font-size: 21px;
  color: #111827;
}

/* TABLE CARD */

.product-table-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 13px;
  box-shadow: 0 3px 15px rgba(15,23,42,.035);
  overflow: hidden;
}

/* TOOLBAR */

.product-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 23px;
  border-bottom: 1px solid #eef0f4;
}

.product-toolbar h2 {
  margin: 0;
  font-size: 15px;
  font-weight: 750;
  color: #111827;
}

.product-toolbar > div:first-child span {
  display: block;
  margin-top: 4px;
  color: #94a3b8;
  font-size: 10px;
}

.toolbar-controls {
  display: flex;
  gap: 8px;
}

/* SEARCH */

.product-search {
  height: 35px;
  width: 230px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #dfe4ec;
  background: #fafbfc;
  border-radius: 7px;
  padding: 0 10px;
}

.product-search span {
  font-size: 17px;
  color: #94a3b8;
}

.product-search input {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  font-size: 10px;
  color: #334155;
}

.product-filter {
  height: 35px;
  border: 1px solid #dfe4ec;
  border-radius: 7px;
  background: white;
  color: #475569;
  font-size: 10px;
  padding: 0 10px;
  outline: none;
}

/* TABLE */

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.products-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.products-table th {
  background: #f8fafc;
  color: #64748b;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .5px;
  text-align: left;
  padding: 13px 15px;
  border-bottom: 1px solid #e5e7eb;
  white-space: nowrap;
}

.products-table td {
  padding: 16px 15px;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.products-table tbody tr {
  transition: background .15s ease;
}

.products-table tbody tr:hover {
  background: #fafbff;
}

/* COLUMN WIDTHS */

.products-table th:nth-child(1),
.products-table td:nth-child(1) {
  width: 25%;
}

.products-table th:nth-child(2),
.products-table td:nth-child(2) {
  width: 13%;
}

.products-table th:nth-child(3),
.products-table td:nth-child(3) {
  width: 11%;
}

.products-table th:nth-child(4),
.products-table td:nth-child(4) {
  width: 11%;
}

.products-table th:nth-child(5),
.products-table td:nth-child(5) {
  width: 15%;
}

.products-table th:nth-child(6),
.products-table td:nth-child(6) {
  width: 10%;
}

.products-table th:nth-child(7),
.products-table td:nth-child(7) {
  width: 15%;
}

/* PRODUCT CELL */

.product-name-cell {
  display: flex;
  align-items: center;
  gap: 11px;
}

.product-mini-icon {
  width: 38px;
  height: 38px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 16px;
  flex-shrink: 0;
}

.product-mini-icon.electronics {
  background: #eef2ff;
  color: #4f46e5;
}

.product-mini-icon.audio {
  background: #eff6ff;
  color: #2563eb;
}

.product-mini-icon.software {
  background: #f5f3ff;
  color: #7c3aed;
}

.product-name-cell strong {
  display: block;
  font-size: 11px;
  color: #1e293b;
  line-height: 1.3;
}

.product-name-cell span {
  display: block;
  margin-top: 4px;
  font-size: 8px;
  color: #94a3b8;
}

/* CATEGORY */

.category-badge {
  display: inline-block;
  padding: 5px 8px;
  border-radius: 5px;
  background: #f1f5f9;
  color: #475569;
  font-size: 8px;
  font-weight: 700;
}

/* REVIEWS */

.review-number {
  font-size: 13px;
  font-weight: 750;
  color: #1e293b;
}

.table-subtext {
  display: block;
  margin-top: 3px;
  font-size: 8px;
  color: #94a3b8;
}

/* RATING */

.rating-cell {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rating-cell .stars {
  color: #f59e0b;
  font-size: 12px;
}

.rating-cell strong {
  font-size: 11px;
  color: #334155;
}

.out-of {
  font-size: 8px;
  color: #94a3b8;
}

/* SENTIMENT */

.sentiment-cell {
  width: 105px;
}

.sentiment-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.sentiment-top span {
  font-size: 8px;
  color: #64748b;
}

.sentiment-top strong {
  font-size: 9px;
  color: #16a34a;
}

.sentiment-progress {
  width: 100%;
  height: 5px;
  background: #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.sentiment-progress div {
  height: 100%;
  background: #22c55e;
  border-radius: 10px;
}

/* STATUS */

.active-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 8px;
  background: #ecfdf5;
  color: #15803d;
  border-radius: 20px;
  font-size: 8px;
  font-weight: 750;
}

.active-status span {
  width: 5px;
  height: 5px;
  background: #22c55e;
  border-radius: 50%;
}

/* ACTIONS */

.action-buttons {
  display: flex;
  gap: 4px;
}

.action-buttons button {
  border-radius: 5px;
  padding: 6px 7px;
  font-size: 8px;
  font-weight: 650;
  cursor: pointer;
}

.view-btn {
  background: #eef2ff;
  color: #4338ca;
  border: 1px solid #e0e7ff;
}

.edit-btn {
  background: white;
  color: #475569;
  border: 1px solid #dbe1ea;
}

.delete-btn {
  background: #fff7f7;
  color: #dc2626;
  border: 1px solid #fee2e2;
}

/* FOOTER */

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 20px;
  color: #94a3b8;
  font-size: 9px;
}

.table-footer strong {
  color: #475569;
}

.pagination {
  display: flex;
  gap: 4px;
}

.pagination button {
  width: 27px;
  height: 27px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 5px;
  color: #64748b;
  font-size: 10px;
}

.pagination button:disabled {
  opacity: .45;
}

.pagination .current-page {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

/* EMPTY */

.empty-products {
  padding: 60px;
  text-align: center;
}

.empty-products > div {
  font-size: 32px;
  color: #cbd5e1;
}

.empty-products h3 {
  margin: 8px 0 4px;
  font-size: 14px;
}

.empty-products p {
  margin: 0;
  color: #94a3b8;
  font-size: 10px;
}

/* MODAL */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,.45);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.add-modal {
  width: 430px;
  background: white;
  border-radius: 14px;
  padding: 23px;
  box-shadow: 0 25px 70px rgba(15,23,42,.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.modal-header > div:first-child {
  display: flex;
  gap: 10px;
}

.modal-icon {
  width: 35px;
  height: 35px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.modal-header h2 {
  margin: 0;
  font-size: 16px;
}

.modal-header p {
  margin: 4px 0 0;
  font-size: 9px;
  color: #94a3b8;
}

.close-modal {
  width: 28px;
  height: 28px;
  border: none;
  background: #f1f5f9;
  border-radius: 6px;
  font-size: 17px;
  color: #64748b;
}

.add-modal label {
  display: block;
  font-size: 10px;
  font-weight: 700;
  color: #475569;
  margin: 14px 0 6px;
}

.add-modal input,
.add-modal select {
  width: 100%;
  height: 39px;
  border: 1px solid #dbe1ea;
  border-radius: 7px;
  padding: 0 11px;
  outline: none;
  font-size: 10px;
  color: #334155;
  background: white;
}

.add-modal input:focus,
.add-modal select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px #eef2ff;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 22px;
}

.modal-cancel,
.modal-save {
  padding: 9px 14px;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 700;
}

.modal-cancel {
  background: white;
  border: 1px solid #dbe1ea;
  color: #475569;
}

.modal-save {
  background: #4f46e5;
  color: white;
  border: none;
}

/* RESPONSIVE */

@media (max-width: 1100px) {

  .product-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .products-table {
    min-width: 1050px;
  }

}

@media (max-width: 700px) {

  .product-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 15px;
  }

  .product-summary {
    grid-template-columns: 1fr;
  }

  .product-toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .toolbar-controls {
    width: 100%;
  }

  .product-search {
    flex: 1;
  }

}

`;

export default ProductList;