import React, {
  useEffect,
  useState
} from "react";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  fetchProducts
} from "../store/slices/productSlice";

import {
  ingestReview
} from "../store/slices/reviewSlice";

import {
  addNotification
} from "../store/slices/notificationSlice";

const ReviewIngestForm = () => {
  const dispatch = useDispatch();

  const {
    items: products
  } = useSelector(
    (state) => state.products
  );

  const {
    loading
  } = useSelector(
    (state) => state.reviews
  );

  const [productId, setProductId] =
    useState("");

  const [sourcePlatform, setSourcePlatform] =
    useState("GOOGLE");

  const [content, setContent] =
    useState("");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId) {
      dispatch(
        addNotification({
          message: "Please select a product",
          type: "warning"
        })
      );

      return;
    }

    if (!content.trim()) {
      dispatch(
        addNotification({
          message: "Review content is required",
          type: "warning"
        })
      );

      return;
    }

    const result = await dispatch(
      ingestReview({
        productId: Number(productId),
        sourcePlatform,
        content: content.trim()
      })
    );

    if (
      result.meta.requestStatus === "fulfilled"
    ) {
      setProductId("");
      setSourcePlatform("GOOGLE");
      setContent("");

      dispatch(
        addNotification({
          message:
            "Review submitted successfully",
          type: "success"
        })
      );
    }
  };

  return (
    <div className="form-card">

      <h2>
        Submit Customer Review
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>
            Product
          </label>

          <select
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

        <div className="form-group">

          <label>
            Source Platform
          </label>

          <select
            value={sourcePlatform}
            onChange={(e) =>
              setSourcePlatform(
                e.target.value
              )
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

        <div className="form-group">

          <label>
            Review
          </label>

          <textarea
            placeholder="Tell us what you think..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            rows="6"
            required
          />

        </div>

        <button
          type="submit"
          className="primary-btn"
          disabled={loading}
        >
          Submit Review
        </button>

      </form>

    </div>
  );
};

export default ReviewIngestForm;