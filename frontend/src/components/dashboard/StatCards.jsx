// import React from "react";

// const StatCards = ({
//   totalProducts = 0,
//   totalReviews = 0,
//   averageSentiment = 0,
// }) => {
//   const sentimentValue =
//     averageSentiment === null ||
//     averageSentiment === undefined
//       ? 0
//       : Number(averageSentiment);

//   return (
//     <div className="stat-cards">
//       {/* TOTAL PRODUCTS */}
//       <div className="stat-card">
//         <div className="stat-card-top">
//           <div className="stat-icon">
//             ▦
//           </div>

//           <span className="stat-label">
//             PRODUCTS
//           </span>
//         </div>

//         <div className="stat-card-value">
//           {totalProducts}
//         </div>

//         <p className="stat-card-description">
//           Products currently being tracked
//         </p>
//       </div>

//       {/* TOTAL REVIEWS */}
//       <div className="stat-card">
//         <div className="stat-card-top">
//           <div className="stat-icon">
//             ◇
//           </div>

//           <span className="stat-label">
//             REVIEWS
//           </span>
//         </div>

//         <div className="stat-card-value">
//           {totalReviews}
//         </div>

//         <p className="stat-card-description">
//           Customer reviews analyzed
//         </p>
//       </div>

//       {/* AVERAGE SENTIMENT */}
//       <div className="stat-card">
//         <div className="stat-card-top">
//           <div className="stat-icon">
//             ◔
//           </div>

//           <span className="stat-label">
//             AVG. SENTIMENT
//           </span>
//         </div>

//         <div className="stat-card-value">
//           {sentimentValue.toFixed(2)}
//         </div>

//         <p className="stat-card-description">
//           Overall customer sentiment score
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StatCards;

import React from 'react';

const StatCards = ({ totalReviews = 1250, avgSentiment = 4.2, pendingTasks = 8 }) => {
  return (
    <div
      className="stat-cards"
      data-testid="stat-cards"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
      }}
    >
      <div className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>Total Reviews</span>
          <h3 className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0.35rem 0 0 0', color: '#0f172a' }}>
            {totalReviews}
          </h3>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            border: '1px solid #bfdbfe',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '9999px',
          }}
        >
          +12% this week
        </span>
      </div>

      <div className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>Avg Sentiment</span>
          <h3 className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0.35rem 0 0 0', color: '#0f172a' }}>
            {avgSentiment} <span style={{ fontSize: '1rem', color: '#64748b', fontWeight: 500 }}>/ 5.0</span>
          </h3>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: '#ecfdf5',
            color: '#059669',
            border: '1px solid #a7f3d0',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '9999px',
          }}
        >
          Positive
        </span>
      </div>

      <div className="stat-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600 }}>Pending Tasks</span>
          <h3 className="stat-value" style={{ fontSize: '1.875rem', fontWeight: 700, margin: '0.35rem 0 0 0', color: '#0f172a' }}>
            {pendingTasks}
          </h3>
        </div>
        <span
          className="badge"
          style={{
            backgroundColor: '#fffbeb',
            color: '#d97706',
            border: '1px solid #fde68a',
            fontSize: '0.75rem',
            padding: '0.35rem 0.65rem',
            borderRadius: '9999px',
          }}
        >
          Action Required
        </span>
      </div>
    </div>
  );
};

export default StatCards;