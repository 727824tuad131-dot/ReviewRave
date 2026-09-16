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


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  pageContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "radial-gradient(circle at top, #1e293b 0%, #0f172a 100%)",
    fontFamily: "'Inter', sans-serif",
    color: "#f8fafc",
    padding: "20px",
  },
  glassCard: {
    width: "100%",
    maxWidth: "460px",
    background: "rgba(30, 41, 59, 0.8)",
    backdropFilter: "blur(16px)",
    borderRadius: "16px",
    padding: "32px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.4)",
  },
  heading: { color: "#f8fafc", textAlign: "center", marginBottom: "24px" },
  formGroup: { display: "flex", flexDirection: "column", gap: "16px" },
  row: { display: "flex", gap: "12px" },
  label: { display: "block", color: "#94a3b8", fontSize: "13px", marginBottom: "6px" },
  input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#f8fafc", outline: "none", boxSizing: "border-box" },
  select: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1px solid #334155", backgroundColor: "#0f172a", color: "#f8fafc", outline: "none", boxSizing: "border-box" },
  primaryBtn: { width: "100%", padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#2563eb", color: "#ffffff", fontWeight: "600", cursor: "pointer", marginTop: "10px" },
  footerText: { textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "20px" },
  link: { color: "#38bdf8", cursor: "pointer", textDecoration: "underline" }
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registration Successful!");
    navigate("/"); // Direct-a login page-ku send pannum
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.glassCard}>
        <h2 style={styles.heading}>Register Account</h2>
        <form onSubmit={handleSubmit} style={styles.formGroup}>
          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Jane"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>
          </div>

          <div>
            <label style={styles.label}>Company Name</label>
            <input
              type="text"
              name="companyName"
              placeholder="Acme Corp (Optional)"
              value={formData.companyName}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="manager@gmail.com"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div>
            <label style={styles.label}>Select Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="BRAND_MANAGER">Brand Manager</option>
              <option value="RESOLUTION_AGENT">Resolution Agent</option>
              <option value="PLATFORM_ADMIN">Platform Admin</option>
            </select>
          </div>

          <button type="submit" style={styles.primaryBtn}>
            Create Account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <span onClick={() => navigate("/")} style={styles.link}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;