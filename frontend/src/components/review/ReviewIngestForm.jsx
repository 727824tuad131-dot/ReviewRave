import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../store/slices/productSlice";

import { ingestReview } from "../store/slices/reviewSlice";

import { addNotification } from "../store/slices/notificationSlice";

const ReviewIngestForm = () => {
  const dispatch = useDispatch();

  const { items: products } = useSelector(
    (state) => state.products
  );

  const { loading } = useSelector(
    (state) => state.reviews
  );

  const [productId, setProductId] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState("GOOGLE");
  const [content, setContent] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      dispatch(
        addNotification({
          message: "Please select a product",
          type: "warning",
        })
      );

      return;
    }

    if (!content.trim()) {
      dispatch(
        addNotification({
          message: "Review content is required",
          type: "warning",
        })
      );

      return;
    }

    const result = await dispatch(
      ingestReview({
        productId: Number(productId),
        sourcePlatform,
        content: content.trim(),
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setProductId("");
      setSourcePlatform("GOOGLE");
      setContent("");

      dispatch(
        addNotification({
          message: "Review submitted successfully",
          type: "success",
        })
      );
    }
  };

  return (
    <section className="review-page">

      <div className="review-header">
        <div>
          <span className="page-eyebrow">
            CUSTOMER FEEDBACK
          </span>

          <h1>Submit Customer Review</h1>

          <p>
            Add customer feedback from different platforms
            for sentiment analysis.
          </p>
        </div>

        <div className="review-header-icon">
          💬
        </div>
      </div>

      <div className="review-form-card">

        <div className="review-form-intro">
          <div className="review-intro-icon">
            ✦
          </div>

          <div>
            <h2>Customer Review</h2>
            <p>
              Select a product and tell us what the customer
              thinks about it.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="review-form-grid">

            {/* Product */}
            <div className="form-group">
              <label htmlFor="review-product">
                Product
              </label>

              <div className="input-with-icon">
                <span>📦</span>

                <select
                  id="review-product"
                  value={productId}
                  onChange={(e) =>
                    setProductId(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select Product
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
              </div>
            </div>

            {/* Source Platform */}
            <div className="form-group">
              <label htmlFor="review-platform">
                Source Platform
              </label>

              <div className="input-with-icon">
                <span>🌐</span>

                <select
                  id="review-platform"
                  value={sourcePlatform}
                  onChange={(e) =>
                    setSourcePlatform(e.target.value)
                  }
                >
                  <option value="GOOGLE">
                    GOOGLE
                  </option>

                  <option value="YELP">
                    YELP
                  </option>

                  <option value="TWITTER">
                    TWITTER
                  </option>
                </select>
              </div>
            </div>

          </div>

          {/* Review */}
          <div className="form-group review-content-group">

            <div className="review-label-row">
              <label htmlFor="review-content">
                Review
              </label>

              <span>
                Customer feedback
              </span>
            </div>

            <textarea
              id="review-content"
              placeholder="Tell us what you think..."
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows="6"
              required
            />

            <div className="review-helper">
              Your review will be processed for sentiment
              analysis.
            </div>

          </div>

          {/* Submit */}
          <div className="review-form-actions">

            <button
              type="submit"
              className="primary-btn review-submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="button-spinner"></span>
                  Submitting...
                </>
              ) : (
                <>
                  Submit Review
                  <span>→</span>
                </>
              )}
            </button>

          </div>

        </form>
      </div>

    </section>
  );
};

export default ReviewIngestForm;