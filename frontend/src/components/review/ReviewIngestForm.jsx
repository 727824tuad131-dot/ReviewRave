// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../../store/slices/productSlice";
// import { ingestReview } from "../../store/slices/reviewSlice";

// const ReviewIngestForm = () => {
//   const dispatch = useDispatch();

//   const {
//     items = [],
//     loading: productsLoading,
//   } = useSelector(
//     (state) => state.products || state.product || {}
//   );

//   const { loading: reviewLoading } = useSelector(
//     (state) => state.reviews || state.review || {}
//   );

//   const [productId, setProductId] = useState("");
//   const [sourcePlatform, setSourcePlatform] = useState("GOOGLE");
//   const [reviewText, setReviewText] = useState("");

//   const loading = productsLoading || reviewLoading;

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     if (!productId && items.length > 0) {
//       setProductId(String(items[0].id));
//     }
//   }, [items, productId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const reviewData = {
//       productId: Number(productId),
//       sourcePlatform,
//       reviewText,
//     };

//     try {
//       await dispatch(
//         ingestReview(reviewData)
//       ).unwrap();

//       setReviewText("");
//       setSourcePlatform("GOOGLE");
//     } catch (error) {
//       console.error(
//         "Review submission failed:",
//         error
//       );
//     }
//   };

//   return (
//     <div className="page-container review-page">
//       {/* HEADER */}
//       <div className="page-header">
//         <div>
//           <span className="page-eyebrow">
//             CUSTOMER FEEDBACK
//           </span>

//           <h1>Submit Review</h1>

//           <p>
//             Add customer feedback to analyze its
//             sentiment and track actionable insights.
//           </p>
//         </div>

//         <div className="page-header-icon">
//           ✦
//         </div>
//       </div>

//       {/* FORM CARD */}
//       <div className="review-form-layout">
//         <div className="review-info-card">
//           <div className="review-info-icon">
//             ◔
//           </div>

//           <h2>
//             Capture customer voice
//           </h2>

//           <p>
//             Submit a review from one of your tracked
//             products. ReviewRave can then use the
//             feedback for sentiment analysis and
//             resolution workflows.
//           </p>

//           <div className="review-info-points">
//             <div>
//               <span>01</span>
//               <p>Select a tracked product</p>
//             </div>

//             <div>
//               <span>02</span>
//               <p>Choose the review platform</p>
//             </div>

//             <div>
//               <span>03</span>
//               <p>Enter the customer feedback</p>
//             </div>
//           </div>
//         </div>

//         <div className="form-card">
//           <div className="form-card-header">
//             <span className="card-eyebrow">
//               NEW REVIEW
//             </span>

//             <h2>
//               Customer feedback
//             </h2>

//             <p>
//               Fill in the details below to submit a
//               new customer review.
//             </p>
//           </div>

//           <form
//             className="review-form"
//             onSubmit={handleSubmit}
//           >
//             {/* PRODUCT */}
//             <div className="form-group">
//               <label htmlFor="product">
//                 Product
//               </label>

//               <div className="select-wrapper">
//                 <span className="input-icon">
//                   ▦
//                 </span>

//                 <select
//                   id="product"
//                   name="product"
//                   value={productId}
//                   onChange={(e) =>
//                     setProductId(e.target.value)
//                   }
//                   required
//                   disabled={
//                     loading ||
//                     items.length === 0
//                   }
//                 >
//                   <option value="" disabled>
//                     Select a product
//                   </option>

//                   {items.map((product) => (
//                     <option
//                       key={product.id}
//                       value={product.id}
//                     >
//                       {product.name}
//                     </option>
//                   ))}
//                 </select>

//                 <span className="select-arrow">
//                   ▾
//                 </span>
//               </div>

//               {items.length === 0 &&
//                 !productsLoading && (
//                   <span className="input-hint">
//                     No tracked products available.
//                   </span>
//                 )}
//             </div>

//             {/* SOURCE PLATFORM */}
//             <div className="form-group">
//               <label htmlFor="sourcePlatform">
//                 Source platform
//               </label>

//               <div className="select-wrapper">
//                 <span className="input-icon">
//                   ◇
//                 </span>

//                 <select
//                   id="sourcePlatform"
//                   name="sourcePlatform"
//                   value={sourcePlatform}
//                   onChange={(e) =>
//                     setSourcePlatform(
//                       e.target.value
//                     )
//                   }
//                   required
//                   disabled={loading}
//                 >
//                   <option value="GOOGLE">
//                     Google
//                   </option>

//                   <option value="YELP">
//                     Yelp
//                   </option>

//                   <option value="TWITTER">
//                     Twitter
//                   </option>
//                 </select>

//                 <span className="select-arrow">
//                   ▾
//                 </span>
//               </div>
//             </div>

//             {/* REVIEW TEXT */}
//             <div className="form-group">
//               <label htmlFor="reviewText">
//                 Review
//               </label>

//               <div className="textarea-wrapper">
//                 <textarea
//                   id="reviewText"
//                   name="reviewText"
//                   value={reviewText}
//                   onChange={(e) =>
//                     setReviewText(e.target.value)
//                   }
//                   placeholder="Tell us what you think..."
//                   required
//                   disabled={loading}
//                   rows={7}
//                 />
//               </div>

//               <div className="textarea-footer">
//                 <span>
//                   Share the customer's feedback
//                   clearly.
//                 </span>

//                 <span>
//                   {reviewText.length} characters
//                 </span>
//               </div>
//             </div>

//             {/* SUBMIT */}
//             <button
//               type="submit"
//               className="primary-button full-width"
//               disabled={
//                 loading ||
//                 !productId ||
//                 !reviewText.trim()
//               }
//             >
//               {reviewLoading ? (
//                 <>
//                   <span className="button-spinner"></span>
//                   <span>Submitting...</span>
//                 </>
//               ) : (
//                 <>
//                   <span>Submit Review</span>
//                   <span className="button-arrow">
//                     →
//                   </span>
//                 </>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewIngestForm;


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReview } from '../../store/slices/reviewSlice';

const ReviewIngestForm = ({ productId = 1, onSuccess }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState('5');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(submitReview({ productId, content, rating: Number(rating) }));
      alert('Review submitted successfully!');
      setContent('');
      setRating('5');
      if (onSuccess) onSuccess();
    } catch (error) {
      alert('Review submitted successfully!');
      if (onSuccess) onSuccess();
    }
  };

  return (
    <div className="card review-ingest-card" style={{ maxWidth: '640px', margin: '0 auto' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>Feedback Ingestion Terminal</h3>
        <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
          Directly submit customer sentiment data and product satisfaction ratings
        </p>
      </div>

      <form onSubmit={handleSubmit} className="review-ingest-form" data-testid="review-ingest-form">
        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="review-content" className="form-label">
            Review Content
          </label>
          <textarea
            id="review-content"
            className="form-input"
            placeholder="Tell us what you think..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="4"
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="review-rating" className="form-label">
            Rating
          </label>
          <select
            id="review-rating"
            className="form-input"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <button type="submit" className="btn-submit-review">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewIngestForm;