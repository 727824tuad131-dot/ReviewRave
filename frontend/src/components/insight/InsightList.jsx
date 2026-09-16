import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInsights } from '../../store/slices/insightSlice';
import { fetchProducts } from '../../store/slices/productSlice';
import EmptyState from '../common/EmptyState';

const InsightList = () => {
  const dispatch = useDispatch();

  const {
    insights,
    isLoading,
  } = useSelector((state) => state.insights || {});

  const {
    items: products = [],
    loading: productsLoading,
  } = useSelector((state) => state.products || {});

  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      setSelectedProduct(String(products[0].id));
    }
  }, [products, selectedProduct]);

  useEffect(() => {
    if (selectedProduct) {
      dispatch(getInsights(selectedProduct));
    }
  }, [dispatch, selectedProduct]);

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  return (
    <div className="insight-list" data-testid="insight-list">

      {/* HEADER */}
      <div className="insight-page-header">
        <div>
          <p className="insight-eyebrow">
            CUSTOMER INTELLIGENCE
          </p>

          <h1>
            Sentiment Insights
          </h1>

          <p className="insight-description">
            Understand how customers feel about your products
            through sentiment and review insights.
          </p>
        </div>
      </div>

      {/* PRODUCT SELECTOR */}
      <div className="insight-selector-section">

        <label htmlFor="insight-product">
          Select Product
        </label>

        {productsLoading ? (
          <p className="insight-loading-text">
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <EmptyState message="No products available." />
        ) : (
          <select
            id="insight-product"
            className="form-input insight-product-select"
            value={selectedProduct}
            onChange={handleProductChange}
            data-testid="insight-product-select"
          >
            <option value="">
              Select a product
            </option>

            {products.map((product) => (
              <option
                key={product.id}
                value={product.id}
              >
                {product.name}
              </option>
            ))}
          </select>
        )}

      </div>

      {/* LOADING */}
      {isLoading && selectedProduct && (
        <div className="insight-loading">
          Loading insights...
        </div>
      )}

      {/* NO INSIGHTS */}
      {!isLoading && selectedProduct && !insights && (
        <EmptyState message="No insights available for this product." />
      )}

      {/* INSIGHTS */}
      {!isLoading && insights && (
        <div className="insights-container">

          {/* SUMMARY */}
          <div className="insight-summary-section">

            <div className="insight-section-heading">
              <span className="insight-icon">✦</span>

              <div>
                <h2>Sentiment Summary</h2>

                <p>
                  Customer feedback overview
                </p>
              </div>
            </div>

            <p className="insight-summary-text">
              {insights.summary ||
                'Customer sentiment is largely positive across product lines.'}
            </p>

          </div>


          {/* METRICS */}
          <div className="insight-metrics">

            <div className="insight-metric positive">
              <span className="metric-label">
                Positive
              </span>

              <strong>
                {insights.positivePercentage ??
                  insights.positive ??
                  0}%
              </strong>
            </div>


            <div className="insight-metric neutral">
              <span className="metric-label">
                Neutral
              </span>

              <strong>
                {insights.neutralPercentage ??
                  insights.neutral ??
                  0}%
              </strong>
            </div>


            <div className="insight-metric negative">
              <span className="metric-label">
                Negative
              </span>

              <strong>
                {insights.negativePercentage ??
                  insights.negative ??
                  0}%
              </strong>
            </div>


            <div className="insight-metric reviews">
              <span className="metric-label">
                Reviews
              </span>

              <strong>
                {insights.totalReviews ??
                  insights.reviewCount ??
                  0}
              </strong>
            </div>

          </div>


          {/* DETAILS */}
          <div className="insight-details">

            <h2>
              Customer Intelligence
            </h2>

            <p>
              Product-level insights help identify customer
              sentiment and recurring feedback patterns.
            </p>

            {insights.recommendation && (
              <div className="insight-recommendation">
                <span>Recommendation</span>

                <p>
                  {insights.recommendation}
                </p>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
};

export default InsightList;