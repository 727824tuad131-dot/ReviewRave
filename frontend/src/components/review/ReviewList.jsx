// import React, { useState } from "react";
// import "./ReviewList.css";

// const ReviewList = ({ reviews = [] }) => {
//   const [filterRating, setFilterRating] = useState("ALL");

//   // Calculate Average Rating
//   const totalReviews = reviews.length;
//   const averageRating =
//     totalReviews > 0
//       ? (
//           reviews.reduce((acc, item) => acc + (Number(item.rating) || 0), 0) /
//           totalReviews
//         ).toFixed(1)
//       : 0;

//   // Filter Reviews
//   const filteredReviews = reviews.filter((review) => {
//     if (filterRating === "ALL") return true;
//     return Number(review.rating) === Number(filterRating);
//   });

//   // Helper to render star icons
//   const renderStars = (rating) => {
//     return [1, 2, 3, 4, 5].map((star) => (
//       <span
//         key={star}
//         className={`star ${star <= rating ? "filled" : ""}`}
//       >
//         ★
//       </span>
//     ));
//   };

//   return (
//     <div className="review-list-container">
//       {/* Review Summary Header */}
//       <div className="review-summary">
//         <div className="summary-score">
//           <span className="avg-rating">{averageRating}</span>
//           <div className="summary-stars">{renderStars(Math.round(averageRating))}</div>
//           <span className="total-count">based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}</span>
//         </div>

//         {/* Rating Filter Tabs */}
//         <div className="rating-filter">
//           <label>Filter by rating:</label>
//           <select
//             value={filterRating}
//             onChange={(e) => setFilterRating(e.target.value)}
//             className="filter-select"
//           >
//             <option value="ALL">All Ratings</option>
//             <option value="5">5 Stars</option>
//             <option value="4">4 Stars</option>
//             <option value="3">3 Stars</option>
//             <option value="2">2 Stars</option>
//             <option value="1">1 Star</option>
//           </select>
//         </div>
//       </div>

//       {/* Review Items */}
//       {filteredReviews.length === 0 ? (
//         <div className="no-reviews">
//           <p>No reviews found matching your filter.</p>
//         </div>
//       ) : (
//         <div className="reviews-grid">
//           {filteredReviews.map((review) => (
//             <div key={review.id || Math.random()} className="review-card">
//               <div className="review-card-header">
//                 <div className="reviewer-info">
//                   <span className="reviewer-avatar">
//                     {(review.reviewerName || "A")[0].toUpperCase()}
//                   </span>
//                   <div>
//                     <h4 className="reviewer-name">
//                       {review.reviewerName || "Anonymous"}
//                     </h4>
//                     <span className="review-date">
//                       {review.createdAt
//                         ? new Date(review.createdAt).toLocaleDateString()
//                         : "Recently"}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="review-stars">{renderStars(review.rating)}</div>
//               </div>

//               {review.title && <h5 className="review-title">{review.title}</h5>}
//               <p className="review-comment">{review.comment}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewList;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../store/slices/reviewSlice';
import ReviewIngestForm from './ReviewIngestForm';
import EmptyState from '../common/EmptyState';

const ReviewList = () => {
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.reviews || {});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className="review-list" data-testid="review-list">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.25rem 0' }}>Product Reviews</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '0.95rem' }}>
            Customer feedback and rating submissions across all registered products
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary"
          data-testid="toggle-review-form-btn"
        >
          {showForm ? 'Cancel' : 'Write Review'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '2rem' }}>
          <ReviewIngestForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      {items.length === 0 ? (
        <EmptyState message="No reviews found." />
      ) : (
        <div className="reviews-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {items.map((rev, idx) => (
            <div
              key={rev.id || idx}
              className="card review-item"
              style={{ padding: '1.25rem' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <strong style={{ color: '#0f172a', fontSize: '0.95rem' }}>Product #{rev.productId || 1}</strong>
                <span
                  style={{
                    backgroundColor: '#ecfdf5',
                    color: '#065f46',
                    border: '1px solid #a7f3d0',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.5rem',
                    borderRadius: '9999px',
                  }}
                >
                  ★ {rev.rating}/5
                </span>
              </div>
              <p style={{ margin: 0, color: '#475569', fontSize: '0.875rem', lineHeight: '1.5' }}>
                {rev.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;