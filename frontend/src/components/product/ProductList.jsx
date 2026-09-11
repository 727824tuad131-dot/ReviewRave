// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ProductForm from "./ProductForm";
// import {
//   fetchProducts,
//   deleteProduct,
// } from "../../store/slices/productSlice";

// const ProductList = () => {
//   const dispatch = useDispatch();

//   const {
//     items = [], 
//     loading,
//     error,
//   } = useSelector(
//     (state) => state.products || state.product || {}
//   );

//   const [showForm, setShowForm] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const role = localStorage.getItem("role");

//   const canManageProducts =
//     role === "BRAND_MANAGER" ||  
//     role === "PLATFORM_ADMIN";

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const handleAddProduct = () => {
//     setSelectedProduct(null);
//     setShowForm(true);
//   };

//   const handleEditProduct = (product) => {
//     setSelectedProduct(product);
//     setShowForm(true);
//   };

//   const handleDeleteProduct = (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );

//     if (confirmed) {
//       dispatch(deleteProduct(id));
//     }
//   };

//   const handleCloseForm = () => {
//     setShowForm(false);
//     setSelectedProduct(null);
//   };

//   const getSentimentClass = (score) => {
//     if (score === null || score === undefined) {
//       return "neutral";
//     }

//     if (score >= 0.7) return "positive";
//     if (score >= 0.4) return "neutral";
//     return "negative";
//   };

//   const getSentimentLabel = (score) => {
//     if (score === null || score === undefined) {
//       return "No data";
//     }

//     if (score >= 0.7) return "Positive";
//     if (score >= 0.4) return "Neutral";
//     return "Negative";
//   };

//   const formatSentiment = (score) => {
//     if (score === null || score === undefined) {
//       return "—";
//     }

//     const numericScore = Number(score);

//     if (Number.isNaN(numericScore)) {
//       return "—";
//     }

//     return numericScore.toFixed(2);
//   };

//   return (
//     <div className="page-container">
//       {/* PAGE HEADER */}
//       <div className="page-header">
//         <div>
//           <span className="page-eyebrow">
//             CUSTOMER INTELLIGENCE
//           </span>

//           <h1>Tracked Products</h1>

//           <p>
//             Monitor customer sentiment and feedback
//             across your tracked products.
//           </p>
//         </div>

//         {canManageProducts && (
//           <button
//             type="button"
//             className="primary-button add-product-button"
//             onClick={handleAddProduct}
//           >
//             <span className="button-plus">+</span>
//             <span>Add Product</span>
//           </button>
//         )}
//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="inline-error" role="alert">
//           <span className="inline-error-icon">!</span>
//           <span>{error}</span>
//         </div>
//       )}

//       {/* LOADING */}
//       {loading && items.length === 0 ? (
//         <div className="products-loading">
//           <div className="loading-spinner"></div>
//           <p>Loading products...</p>
//         </div>
//       ) : items.length === 0 ? (
//         /* EMPTY STATE */
//         <div className="empty-products-state">
//           <div className="empty-state-icon">
//             ▦
//           </div>

//           <h2>No tracked products yet</h2>

//           <p>
//             Add your first product to start monitoring
//             customer reviews and sentiment.
//           </p>

//           {canManageProducts && (
//             <button
//               type="button"
//               className="primary-button"
//               onClick={handleAddProduct}
//             >
//               <span>+ Add Product</span>
//             </button>
//           )}
//         </div>
//       ) : (
//         /* PRODUCT GRID */
//         <div className="product-grid">
//           {items.map((product) => {
//             const sentimentScore =
//               product.averageSentiment;

//             const sentimentClass =
//               getSentimentClass(sentimentScore);

//             return (
//               <article
//                 className="product-card"
//                 key={product.id}
//               >
//                 {/* CARD TOP */}
//                 <div className="product-card-top">
//                   <div className="product-icon">
//                     ▦
//                   </div>

//                   <span className="product-category">
//                     {product.category}
//                   </span>
//                 </div>

//                 {/* PRODUCT INFO */}
//                 <div className="product-card-content">
//                   <h2>{product.name}</h2>

//                   <div className="product-review-count">
//                     <span className="review-icon">
//                       ◇
//                     </span>

//                     <span>
//                       {product.totalReviews ?? 0}{" "}
//                       reviews
//                     </span>
//                   </div>
//                 </div>

//                 {/* SENTIMENT */}
//                 <div className="sentiment-section">
//                   <div className="sentiment-heading">
//                     <span>
//                       Average sentiment
//                     </span>

//                     <span
//                       className={`sentiment-label ${sentimentClass}`}
//                     >
//                       {getSentimentLabel(
//                         sentimentScore
//                       )}
//                     </span>
//                   </div>

//                   <div className="sentiment-score-row">
//                     <strong>
//                       {formatSentiment(
//                         sentimentScore
//                       )}
//                     </strong>

//                     <div className="sentiment-bar">
//                       <div
//                         className={`sentiment-bar-fill ${sentimentClass}`}
//                         style={{
//                           width: `${
//                             sentimentScore !==
//                               null &&
//                             sentimentScore !==
//                               undefined
//                               ? Math.max(
//                                   0,
//                                   Math.min(
//                                     100,
//                                     Number(
//                                       sentimentScore
//                                     ) * 100
//                                   )
//                                 )
//                               : 0
//                           }%`,
//                         }}
//                       ></div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* ACTIONS */}
//                 {canManageProducts && (
//                   <div className="product-card-actions">
//                     <button
//                       type="button"
//                       className="card-action-button edit"
//                       onClick={() =>
//                         handleEditProduct(product)
//                       }
//                     >
//                       <span>✎</span>
//                       <span>Edit</span>
//                     </button>

//                     <button
//                       type="button"
//                       className="card-action-button delete"
//                       onClick={() =>
//                         handleDeleteProduct(product.id)
//                       }
//                     >
//                       <span>⌫</span>
//                       <span>Delete</span>
//                     </button>
//                   </div>
//                 )}
//               </article>
//             );
//           })}
//         </div>
//       )}

//       {/* PRODUCT FORM MODAL */}
//       {showForm && (
//         <ProductForm
//           product={selectedProduct}
//           onClose={handleCloseForm}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts, deleteProduct } from '../../store/slices/productSlice';
// import ProductForm from './ProductForm';
// import SearchFilterBar from '../common/SearchFilterBar';
// import EmptyState from '../common/EmptyState';

// const ProductList = () => {
//   const dispatch = useDispatch();
//   const { items = [] } = useSelector((state) => state.products || {});
//   const { user } = useSelector((state) => state.auth || {});

//   const [feedback, setFeedback] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [category, setCategory] = useState('');
//   const [isFormOpen, setIsFormOpen] = useState(false);
//   const [formMode, setFormMode] = useState('create');
//   const [selectedProductId, setSelectedProductId] = useState(null);

//   const role = user?.role || localStorage.getItem('role') || localStorage.getItem('r');
//   const isAgent = role === 'RESOLUTION_AGENT' || role === 'AGENT';
//   const canAddProduct = !isAgent && (role === 'PLATFORM_ADMIN' || role === 'BRAND_MANAGER' || !role);

//   useEffect(() => {
//     dispatch(getProducts());
//   }, [dispatch]);

//   const defaultProducts = items.length > 0 ? items : [
//     { id: 1, name: 'AeroMax', category: 'ELECTRONICS', totalReviews: 128, avgSentiment: 4.5 },
//     { id: 2, name: 'SmartVision Pro', category: 'SOFTWARE', totalReviews: 84, avgSentiment: 4.2 },
//     { id: 3, name: 'EcoWear Jacket', category: 'FASHION', totalReviews: 56, avgSentiment: 4.0 },
//   ];

//   const handleDelete = async (id) => {
//     try {
//       await dispatch(deleteProduct(id));
//       setFeedback('Product deleted successfully.');
//     } catch (err) {
//       setFeedback('Product deleted successfully.');
//     }
//   };

//   const handleEdit = (product) => {
//     setSelectedProductId(product.id);
//     setFormMode('edit');
//     setIsFormOpen(true);
//   };

//   const handleCreate = () => {
//     setSelectedProductId(null);
//     setFormMode('create');
//     setIsFormOpen(true);
//   };

//   const filteredProducts = defaultProducts.filter((product) => {
//     const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesCategory = category ? product.category === category : true;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div className="product-list" data-testid="product-list">
//       <div style={{ marginBottom: '1.5rem' }}>
//         <h1>Tracked Products</h1>
//         <p style={{ margin: '0.25rem 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>
//           Catalog of registered products actively tracked across feedback channels
//         </p>
//       </div>

//       {feedback && (
//         <div className="feedback-message" data-testid="feedback-message">
//           {feedback}
//         </div>
//       )}

//       <div
//         className="top-action-row"
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           gap: '1rem',
//           flexWrap: 'wrap',
//           marginBottom: '1.5rem',
//         }}
//       >
//         <SearchFilterBar
//           searchTerm={searchTerm}
//           onSearchChange={setSearchTerm}
//           category={category}
//           onCategoryChange={setCategory}
//         />

//         {canAddProduct && (
//           <button className="btn-add-product" onClick={handleCreate} data-testid="add-product-btn">
//             Add Product
//           </button>
//         )}
//       </div>

//       {isFormOpen && (
//         <ProductForm
//           mode={formMode}
//           productId={selectedProductId}
//           onClose={() => setIsFormOpen(false)}
//         />
//       )}

//       {filteredProducts.length === 0 ? (
//         <EmptyState message="No products found." />
//       ) : (
//         <div style={{ overflowX: 'auto' }}>
//           <table className="products-table">
//             <thead>
//               <tr>
//                 <th>Product Name</th>
//                 <th>Category</th>
//                 <th>Total Reviews</th>
//                 <th>Avg Sentiment</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredProducts.map((prod) => (
//                 <tr key={prod.id}>
//                   <td style={{ fontWeight: 600, color: '#0f172a' }}>{prod.name}</td>
//                   <td>
//                     <span className="badge category-badge">{prod.category}</span>
//                   </td>
//                   <td>{prod.totalReviews ?? prod.reviewsCount ?? 128}</td>
//                   <td>
//                     <span
//                       style={{
//                         display: 'inline-flex',
//                         alignItems: 'center',
//                         gap: '0.25rem',
//                         fontWeight: 600,
//                         color: (prod.avgSentiment ?? 4.5) >= 4.0 ? '#059669' : '#d97706',
//                       }}
//                     >
//                       ★ {prod.avgSentiment ?? prod.sentimentScore ?? '4.5'}
//                     </span>
//                   </td>
//                   <td>
//                     <button
//                       className="btn-edit"
//                       onClick={() => handleEdit(prod)}
//                       data-testid={`edit-prod-${prod.id}`}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn-delete"
//                       onClick={() => handleDelete(prod.id)}
//                       data-testid={`delete-prod-${prod.id}`}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import ProductForm from "./ProductForm";
import {
  getProducts,
  deleteProduct,
} from "../../store/slices/productSlice";


const ProductList = () => {
  const dispatch = useDispatch();

  const productsState = useSelector(
    (state) => state.products || {}
  );

  const products = useMemo(
    () => productsState.items || [],
    [productsState.items]
  );

  const loading = productsState.loading || false;
  const error = productsState.error || null;

  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const role = localStorage.getItem("role");

  const canManageProducts =
    role === "BRAND_MANAGER" ||
    role === "PLATFORM_ADMIN";


  /* ===============================
     GET PRODUCTS
     =============================== */

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  /* ===============================
     CATEGORIES
     =============================== */

  const categories = [
    "ALL",
    "ELECTRONICS",
    "FASHION",
    "SOFTWARE",
    "FOOD",
  ];


  /* ===============================
     FILTER PRODUCTS
     =============================== */

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "ALL") {
      return products;
    }

    return products.filter((product) => {
      return (
        String(product.category || "").toUpperCase() ===
        selectedCategory
      );
    });
  }, [products, selectedCategory]);


  /* ===============================
     ADD PRODUCT
     =============================== */

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };


  /* ===============================
     EDIT PRODUCT
     =============================== */

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };


  /* ===============================
     DELETE PRODUCT
     =============================== */

  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmed) {
      dispatch(deleteProduct(id));
    }
  };


  /* ===============================
     CLOSE FORM
     =============================== */

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
  };


  /* ===============================
     SENTIMENT
     =============================== */

  const getSentimentValue = (product) => {
    const raw =
      product.averageSentiment ??
      product.sentimentScore ??
      product.sentiment ??
      null;

    if (
      raw === null ||
      raw === undefined ||
      raw === ""
    ) {
      return null;
    }

    const value = Number(raw);

    if (Number.isNaN(value)) {
      return null;
    }

    if (value <= 1) {
      return value * 5;
    }

    return value;
  };


  /* ===============================
     CATEGORY CLASS
     =============================== */

  const getCategoryClass = (category) => {
    return `category-${String(category || "GENERAL")
      .toLowerCase()
      .replace(/\s+/g, "-")}`;
  };


  /* ===============================
     LOADING
     =============================== */

  if (loading && products.length === 0) {
    return (
      <div className="rr-dashboard">

        <aside className="rr-sidebar">
          <SidebarContent />
        </aside>

        <main className="rr-dashboard-main">

          <div className="rr-loading">
            <div className="rr-spinner"></div>

            <p>
              Loading products...
            </p>
          </div>

        </main>

      </div>
    );
  }


  /* ===============================
     MAIN UI
     =============================== */

  return (
    <div className="rr-dashboard">

      {/* ===============================
          LEFT SIDEBAR
          =============================== */}

      <aside className="rr-sidebar">

        <SidebarContent />

      </aside>


      {/* ===============================
          MAIN CONTENT
          =============================== */}

      <main className="rr-dashboard-main">

        {/* Decorative shapes */}

        <div className="rr-shape rr-shape-one"></div>

        <div className="rr-shape rr-shape-two"></div>

        <div className="rr-shape rr-shape-three"></div>

        <div className="rr-shape rr-shape-four"></div>


        {/* ===============================
            PAGE HEADER
            =============================== */}

        <div className="rr-page-header">

          <div>

            <div className="rr-eyebrow">
              CUSTOMER INTELLIGENCE
            </div>

            <h1>
              Tracked Products
            </h1>

            <p>
              Catalog of registered products actively
              tracked across feedback channels
            </p>

          </div>


          {canManageProducts && (
            <button
              type="button"
              className="rr-add-product"
              onClick={handleAddProduct}
            >
              <span>+</span>

              Add Product
            </button>
          )}

        </div>


        {/* ===============================
            ERROR
            =============================== */}

        {error && (
          <div
            className="rr-error"
            role="alert"
          >

            <span>
              !
            </span>

            {typeof error === "string"
              ? error
              : "Unable to load products"}

          </div>
        )}


        {/* ===============================
            CATEGORY FILTER
            =============================== */}

        <div className="rr-category-filter">

          {categories.map((category) => (

            <button
              key={category}
              type="button"
              className={
                selectedCategory === category
                  ? "rr-category active"
                  : "rr-category"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >

              {category === "ALL"
                ? "All Categories"
                : category}

            </button>

          ))}

        </div>


        {/* ===============================
            EMPTY STATE
            =============================== */}

        {filteredProducts.length === 0 ? (

          <div className="rr-empty-card">

            <div className="rr-empty-icon">
              ▣
            </div>

            <h2>
              No tracked products yet
            </h2>

            <p>
              Add your first product to start monitoring
              customer reviews and sentiment.
            </p>


            {canManageProducts && (
              <button
                type="button"
                className="rr-add-product"
                onClick={handleAddProduct}
              >

                <span>
                  +
                </span>

                Add Product

              </button>
            )}

          </div>

        ) : (

          /* ===============================
             PRODUCT TABLE
             =============================== */

          <div className="rr-product-card">


            {/* TABLE HEADER */}

            <div className="rr-table-header">

              <div>
                Product Name
              </div>

              <div>
                Category
              </div>

              <div>
                Total Reviews
              </div>

              <div>
                Avg Sentiment
              </div>

              <div>
                Action
              </div>

            </div>


            {/* TABLE BODY */}

            <div className="rr-table-body">

              {filteredProducts.map((product) => {

                const sentiment =
                  getSentimentValue(product);

                const category =
                  product.category || "GENERAL";


                const sentimentClass =
                  sentiment === null
                    ? "neutral"
                    : sentiment >= 4
                    ? "positive"
                    : sentiment >= 3
                    ? "medium"
                    : "negative";


                return (

                  <div
                    className="rr-product-row"
                    key={product.id}
                  >


                    {/* PRODUCT NAME */}

                    <div className="rr-product-name">

                      <div
                        className={`rr-product-image ${getCategoryClass(
                          category
                        )}`}
                      >

                        {String(category)
                          .toUpperCase()
                          .includes("ELECTRONICS")
                          ? "◉"
                          : String(category)
                              .toUpperCase()
                              .includes("SOFTWARE")
                          ? "▣"
                          : String(category)
                              .toUpperCase()
                              .includes("FASHION")
                          ? "◇"
                          : "✦"}

                      </div>


                      <strong>
                        {product.name ||
                          "Unnamed Product"}
                      </strong>

                    </div>


                    {/* CATEGORY */}

                    <div>

                      <span
                        className={`rr-category-badge ${getCategoryClass(
                          category
                        )}`}
                      >

                        {category}

                      </span>

                    </div>


                    {/* TOTAL REVIEWS */}

                    <div className="rr-review-count">

                      {product.totalReviews ??
                        product.reviewCount ??
                        0}

                    </div>


                    {/* SENTIMENT */}

                    <div className="rr-sentiment">

                      <span className="rr-star">
                        ★
                      </span>

                      <span
                        className={`sentiment-${sentimentClass}`}
                      >

                        {sentiment !== null
                          ? sentiment.toFixed(1)
                          : "—"}

                      </span>

                    </div>


                    {/* ACTION */}

                    <div className="rr-actions">

                      {canManageProducts && (
                        <>

                          <button
                            type="button"
                            className="rr-edit"
                            onClick={() =>
                              handleEditProduct(product)
                            }
                          >

                            ✎ Edit

                          </button>


                          <button
                            type="button"
                            className="rr-delete"
                            onClick={() =>
                              handleDeleteProduct(
                                product.id
                              )
                            }
                          >

                            × Delete

                          </button>

                        </>
                      )}

                    </div>

                  </div>

                );
              })}

            </div>

          </div>

        )}


        {/* ===============================
            PRODUCT FORM
            =============================== */}

        {showForm && (

          <ProductForm
            product={selectedProduct}
            onClose={handleCloseForm}
          />

        )}

      </main>

    </div>
  );
};


/* =========================================================
   SIDEBAR
   ========================================================= */

const SidebarContent = () => {

  const role = localStorage.getItem("role");

  return (
    <>

      {/* LOGO */}

      <div className="rr-side-logo">

        <div className="rr-side-logo-mark">
          R
        </div>


        <div>

          <strong>
            ReviewRave
          </strong>

          <span>
            SOCIAL SENTIMENT PLATFORM
          </span>

        </div>

      </div>


      {/* NAVIGATION */}

      <nav className="rr-sidebar-nav">


        <NavItem
          to="/"
          icon="⌂"
          text="Dashboard"
          end
        />


        <NavItem
          to="/insights"
          icon="⌁"
          text="Sentiment Analysis"
        />


        <NavItem
          to="/reviews"
          icon="▢"
          text="Reviews"
        />


        {(role === "BRAND_MANAGER" ||
          role === "PLATFORM_ADMIN") && (

          <NavItem
            to="/products"
            icon="◇"
            text="Tracked Products"
          />

        )}


        <NavItem
          to="/tickets"
          icon="▤"
          text="Reports"
        />


        <NavItem
          to="/settings"
          icon="⚙"
          text="Settings"
        />

      </nav>

    </>
  );
};


/* =========================================================
   NAV ITEM
   ========================================================= */

const NavItem = ({
  to,
  icon,
  text,
  end = false,
}) => {

  return (

    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        isActive
          ? "rr-nav-item active"
          : "rr-nav-item"
      }
    >

      <span className="rr-nav-icon">
        {icon}
      </span>

      <span>
        {text}
      </span>

    </NavLink>

  );
};


export default ProductList;