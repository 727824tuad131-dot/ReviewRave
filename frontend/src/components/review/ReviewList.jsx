import React, { useState } from "react";
import "./ReviewList.css";

const ReviewList = ({ reviews = [] }) => {
  const [filterRating, setFilterRating] = useState("ALL");

  // Calculate Average Rating
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, item) => acc + (Number(item.rating) || 0), 0) /
          totalReviews
        ).toFixed(1)
      : 0;

  // Filter Reviews
  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "ALL") return true;
    return Number(review.rating) === Number(filterRating);
  });

  // Helper to render star icons
  const renderStars = (rating) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <span
        key={star}
        className={`star ${star <= rating ? "filled" : ""}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="review-list-container">
      {/* Review Summary Header */}
      <div className="review-summary">
        <div className="summary-score">
          <span className="avg-rating">{averageRating}</span>
          <div className="summary-stars">{renderStars(Math.round(averageRating))}</div>
          <span className="total-count">based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}</span>
        </div>

        {/* Rating Filter Tabs */}
        <div className="rating-filter">
          <label>Filter by rating:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
            className="filter-select"
          >
            <option value="ALL">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>

      {/* Review Items */}
      {filteredReviews.length === 0 ? (
        <div className="no-reviews">
          <p>No reviews found matching your filter.</p>
        </div>
      ) : (
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <div key={review.id || Math.random()} className="review-card">
              <div className="review-card-header">
                <div className="reviewer-info">
                  <span className="reviewer-avatar">
                    {(review.reviewerName || "A")[0].toUpperCase()}
                  </span>
                  <div>
                    <h4 className="reviewer-name">
                      {review.reviewerName || "Anonymous"}
                    </h4>
                    <span className="review-date">
                      {review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </div>
                </div>
                <div className="review-stars">{renderStars(review.rating)}</div>
              </div>

              {review.title && <h5 className="review-title">{review.title}</h5>}
              <p className="review-comment">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;