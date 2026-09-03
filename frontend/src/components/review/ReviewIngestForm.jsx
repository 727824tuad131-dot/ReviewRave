import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slices/productSlice";
import { ingestReview } from "../../store/slices/reviewSlice";

const ReviewIngestForm = () => {
  const dispatch = useDispatch();

  const {
    items = [],
    loading: productsLoading,
  } = useSelector(
    (state) => state.products || state.product || {}
  );

  const { loading: reviewLoading } = useSelector(
    (state) => state.reviews || state.review || {}
  );

  const [productId, setProductId] = useState("");
  const [sourcePlatform, setSourcePlatform] = useState("GOOGLE");
  const [reviewText, setReviewText] = useState("");

  const loading = productsLoading || reviewLoading;

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!productId && items.length > 0) {
      setProductId(String(items[0].id));
    }
  }, [items, productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      productId: Number(productId),
      sourcePlatform,
      reviewText,
    };

    try {
      await dispatch(
        ingestReview(reviewData)
      ).unwrap();

      setReviewText("");
      setSourcePlatform("GOOGLE");
    } catch (error) {
      console.error(
        "Review submission failed:",
        error
      );
    }
  };

  return (
    <div className="page-container review-page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <span className="page-eyebrow">
            CUSTOMER FEEDBACK
          </span>

          <h1>Submit Review</h1>

          <p>
            Add customer feedback to analyze its
            sentiment and track actionable insights.
          </p>
        </div>

        <div className="page-header-icon">
          ✦
        </div>
      </div>

      {/* FORM CARD */}
      <div className="review-form-layout">
        <div className="review-info-card">
          <div className="review-info-icon">
            ◔
          </div>

          <h2>
            Capture customer voice
          </h2>

          <p>
            Submit a review from one of your tracked
            products. ReviewRave can then use the
            feedback for sentiment analysis and
            resolution workflows.
          </p>

          <div className="review-info-points">
            <div>
              <span>01</span>
              <p>Select a tracked product</p>
            </div>

            <div>
              <span>02</span>
              <p>Choose the review platform</p>
            </div>

            <div>
              <span>03</span>
              <p>Enter the customer feedback</p>
            </div>
          </div>
        </div>

        <div className="form-card">
          <div className="form-card-header">
            <span className="card-eyebrow">
              NEW REVIEW
            </span>

            <h2>
              Customer feedback
            </h2>

            <p>
              Fill in the details below to submit a
              new customer review.
            </p>
          </div>

          <form
            className="review-form"
            onSubmit={handleSubmit}
          >
            {/* PRODUCT */}
            <div className="form-group">
              <label htmlFor="product">
                Product
              </label>

              <div className="select-wrapper">
                <span className="input-icon">
                  ▦
                </span>

                <select
                  id="product"
                  name="product"
                  value={productId}
                  onChange={(e) =>
                    setProductId(e.target.value)
                  }
                  required
                  disabled={
                    loading ||
                    items.length === 0
                  }
                >
                  <option value="" disabled>
                    Select a product
                  </option>

                  {items.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                    >
                      {product.name}
                    </option>
                  ))}
                </select>

                <span className="select-arrow">
                  ▾
                </span>
              </div>

              {items.length === 0 &&
                !productsLoading && (
                  <span className="input-hint">
                    No tracked products available.
                  </span>
                )}
            </div>

            {/* SOURCE PLATFORM */}
            <div className="form-group">
              <label htmlFor="sourcePlatform">
                Source platform
              </label>

              <div className="select-wrapper">
                <span className="input-icon">
                  ◇
                </span>

                <select
                  id="sourcePlatform"
                  name="sourcePlatform"
                  value={sourcePlatform}
                  onChange={(e) =>
                    setSourcePlatform(
                      e.target.value
                    )
                  }
                  required
                  disabled={loading}
                >
                  <option value="GOOGLE">
                    Google
                  </option>

                  <option value="YELP">
                    Yelp
                  </option>

                  <option value="TWITTER">
                    Twitter
                  </option>
                </select>

                <span className="select-arrow">
                  ▾
                </span>
              </div>
            </div>

            {/* REVIEW TEXT */}
            <div className="form-group">
              <label htmlFor="reviewText">
                Review
              </label>

              <div className="textarea-wrapper">
                <textarea
                  id="reviewText"
                  name="reviewText"
                  value={reviewText}
                  onChange={(e) =>
                    setReviewText(e.target.value)
                  }
                  placeholder="Tell us what you think..."
                  required
                  disabled={loading}
                  rows={7}
                />
              </div>

              <div className="textarea-footer">
                <span>
                  Share the customer's feedback
                  clearly.
                </span>

                <span>
                  {reviewText.length} characters
                </span>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="primary-button full-width"
              disabled={
                loading ||
                !productId ||
                !reviewText.trim()
              }
            >
              {reviewLoading ? (
                <>
                  <span className="button-spinner"></span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit Review</span>
                  <span className="button-arrow">
                    →
                  </span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewIngestForm;