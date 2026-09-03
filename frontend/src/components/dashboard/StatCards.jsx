import React from "react";
import { useSelector } from "react-redux";

const StatCards = () => {
  const {
    items: products
  } = useSelector(
    (state) => state.products
  );

  const totalProducts =
    products.length;

  const totalReviews =
    products.reduce(
      (total, product) =>
        total +
        Number(
          product.totalReviews || 0
        ),
      0
    );

  const sentimentValues =
    products
      .map(
        (product) =>
          Number(
            product.sentimentScore ??
            product.averageSentiment ??
            product.avgSentiment
          )
      )
      .filter(
        (value) => !Number.isNaN(value)
      );

  const avgSentiment =
    sentimentValues.length > 0
      ? (
          sentimentValues.reduce(
            (sum, value) =>
              sum + value,
            0
          ) /
          sentimentValues.length
        ).toFixed(2)
      : "0.00";

  return (
    <div className="stat-grid">

      <div className="stat-card">

        <span className="stat-label">
          Total Products
        </span>

        <strong className="stat-value">
          {totalProducts}
        </strong>

      </div>

      <div className="stat-card">

        <span className="stat-label">
          Total Reviews
        </span>

        <strong className="stat-value">
          {totalReviews}
        </strong>

      </div>

      <div className="stat-card">

        <span className="stat-label">
          Avg Sentiment Score
        </span>

        <strong className="stat-value">
          {avgSentiment}
        </strong>

      </div>

    </div>
  );
};

export default StatCards;