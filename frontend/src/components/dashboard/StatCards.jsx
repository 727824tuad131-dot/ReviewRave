import React from "react";

const StatCards = ({
  totalProducts = 0,
  totalReviews = 0,
  averageSentiment = 0,
}) => {
  const sentimentValue =
    averageSentiment === null ||
    averageSentiment === undefined
      ? 0
      : Number(averageSentiment);

  return (
    <div className="stat-cards">
      {/* TOTAL PRODUCTS */}
      <div className="stat-card">
        <div className="stat-card-top">
          <div className="stat-icon">
            ▦
          </div>

          <span className="stat-label">
            PRODUCTS
          </span>
        </div>

        <div className="stat-card-value">
          {totalProducts}
        </div>

        <p className="stat-card-description">
          Products currently being tracked
        </p>
      </div>

      {/* TOTAL REVIEWS */}
      <div className="stat-card">
        <div className="stat-card-top">
          <div className="stat-icon">
            ◇
          </div>

          <span className="stat-label">
            REVIEWS
          </span>
        </div>

        <div className="stat-card-value">
          {totalReviews}
        </div>

        <p className="stat-card-description">
          Customer reviews analyzed
        </p>
      </div>

      {/* AVERAGE SENTIMENT */}
      <div className="stat-card">
        <div className="stat-card-top">
          <div className="stat-icon">
            ◔
          </div>

          <span className="stat-label">
            AVG. SENTIMENT
          </span>
        </div>

        <div className="stat-card-value">
          {sentimentValue.toFixed(2)}
        </div>

        <p className="stat-card-description">
          Overall customer sentiment score
        </p>
      </div>
    </div>
  );
};

export default StatCards;