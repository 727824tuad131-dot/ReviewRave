// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { submitReview } from "../../store/slices/reviewSlice"; // Adjust slice path as needed
// import "./ReviewForm.css";

// const ReviewForm = ({ productId, onSuccess }) => {
//   const dispatch = useDispatch();
//   const { loading, error } = useSelector(
//     (state) => state.reviews || state.review || {}
//   );

//   const [formData, setFormData] = useState({
//     rating: 0,
//     hoverRating: 0,
//     title: "",
//     comment: "",
//     reviewerName: "",
//   });

//   const [formError, setFormError] = useState("");

//   const handleStarClick = (rating) => {
//     setFormData((prev) => ({ ...prev, rating }));
//   };

//   const handleStarHover = (hoverRating) => {
//     setFormData((prev) => ({ ...prev, hoverRating }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormError("");

//     if (formData.rating === 0) {
//       setFormError("Please select a star rating.");
//       return;
//     }

//     if (!formData.comment.trim()) {
//       setFormError("Please enter a review comment.");
//       return;
//     }

//     const reviewPayload = {
//       productId,
//       rating: formData.rating,
//       title: formData.title,
//       comment: formData.comment,
//       reviewerName: formData.reviewerName || "Anonymous",
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       // Dispatch Redux submit action
//       await dispatch(submitReview(reviewPayload)).unwrap();
      
//       // Reset Form State
//       setFormData({
//         rating: 0,
//         hoverRating: 0,
//         title: "",
//         comment: "",
//         reviewerName: "",
//       });

//       if (onSuccess) onSuccess();
//     } catch (err) {
//       setFormError(err.message || "Failed to submit review. Please try again.");
//     }
//   };

//   const currentDisplayRating = formData.hoverRating || formData.rating;

//   return (
//     <div className="review-form-container">
//       <h3>Write a Review</h3>
      
//       {(formError || error) && (
//         <div className="error-message">{formError || error}</div>
//       )}

//       <form onSubmit={handleSubmit} className="review-form">
//         {/* Star Rating Selection */}
//         <div className="form-group">
//           <label className="form-label">Your Rating *</label>
//           <div className="star-rating-input">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`star ${star <= currentDisplayRating ? "filled" : ""}`}
//                 onClick={() => handleStarClick(star)}
//                 onMouseEnter={() => handleStarHover(star)}
//                 onMouseLeave={() => handleStarHover(0)}
//               >
//                 ★
//               </span>
//             ))}
//             <span className="rating-text">
//               {currentDisplayRating > 0 ? `${currentDisplayRating} out of 5` : ""}
//             </span>
//           </div>
//         </div>

//         {/* Reviewer Name */}
//         <div className="form-group">
//           <label htmlFor="reviewerName" className="form-label">Name</label>
//           <input
//             type="text"
//             id="reviewerName"
//             name="reviewerName"
//             className="form-control"
//             placeholder="e.g. Alex Smith"
//             value={formData.reviewerName}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Review Title */}
//         <div className="form-group">
//           <label htmlFor="title" className="form-label">Review Headline</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             className="form-control"
//             placeholder="e.g. Great build quality!"
//             value={formData.title}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Review Body */}
//         <div className="form-group">
//           <label htmlFor="comment" className="form-label">Review Details *</label>
//           <textarea
//             id="comment"
//             name="comment"
//             rows="4"
//             className="form-control"
//             placeholder="What did you like or dislike about this product?"
//             value={formData.comment}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="submit-review-btn"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Submit Review"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;

import React from 'react';
import ReviewIngestForm from './ReviewIngestForm';

const ReviewForm = (props) => {
  return (
    <div className="review-form-container">
      <h2>Submit Feedback</h2>
      <ReviewIngestForm {...props} />
    </div>
  );
};

export default ReviewForm;