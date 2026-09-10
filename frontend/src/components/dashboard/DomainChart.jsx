// import React from "react";

// const DomainChart = ({ title, data = [] }) => {
//   const values = data
//     .map((item) => Number(item.value) || 0);

//   const maxValue =
//     values.length > 0
//       ? Math.max(...values, 1)
//       : 1;

//   return (
//     <div className="chart-card">
//       <div className="chart-card-header">
//         <div>
//           <span className="card-eyebrow">
//             SENTIMENT BREAKDOWN
//           </span>

//           <h2>{title}</h2>
//         </div>

//         <div className="chart-header-icon">
//           ◔
//         </div>
//       </div>

//       {data.length === 0 ? (
//         <div className="chart-empty">
//           <div className="chart-empty-icon">
//             ◔
//           </div>

//           <p>No data available.</p>
//         </div>
//       ) : (
//         <div className="horizontal-chart">
//           {data.map((item, index) => {
//             const numericValue =
//               Number(item.value) || 0;

//             const width =
//               Math.max(
//                 0,
//                 Math.min(
//                   100,
//                   (numericValue / maxValue) * 100
//                 )
//               );

//             return (
//               <div
//                 className="chart-row"
//                 key={`${item.label}-${index}`}
//               >
//                 <div className="chart-row-header">
//                   <span className="chart-label">
//                     {item.label}
//                   </span>

//                   <span className="chart-value">
//                     {item.value}
//                   </span>
//                 </div>

//                 <div className="chart-track">
//                   <div
//                     className="chart-bar"
//                     style={{
//                       width: `${width}%`,
//                       backgroundColor:
//                         item.color,
//                     }}
//                   ></div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DomainChart;


import React from 'react';

const DomainChart = () => {
  const sentiments = [
    { name: 'Positive', percentage: 68, color: '#10b981', count: '850 reviews' },
    { name: 'Neutral', percentage: 22, color: '#f59e0b', count: '275 reviews' },
    { name: 'Negative', percentage: 10, color: '#ef4444', count: '125 reviews' },
  ];

  const roles = [
    { name: 'Platform Admin', percentage: 15, count: 12 },
    { name: 'Brand Manager', percentage: 45, count: 36 },
    { name: 'Resolution Agent', percentage: 40, count: 32 },
  ];

  return (
    <div className="domain-chart" data-testid="domain-chart">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Sentiment Overview</h3>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Global User Roles
        </span>
      </div>

      <div className="sentiment-bars" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {sentiments.map((s) => (
          <div key={s.name} className="chart-bar-item">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem', fontSize: '0.875rem' }}>
              <span style={{ fontWeight: 600, color: '#1e293b' }}>{s.name}</span>
              <span style={{ color: '#64748b', fontSize: '0.8125rem' }}>
                {s.percentage}% ({s.count})
              </span>
            </div>
            <div
              style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#f1f5f9',
                borderRadius: '9999px',
                overflow: 'hidden',
              }}
            >
              <div
                className="chart-bar"
                style={{
                  width: `${s.percentage}%`,
                  height: '100%',
                  backgroundColor: s.color,
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#64748b', marginBottom: '0.75rem' }}>
          Active Role Breakdown
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {roles.map((r) => (
            <div
              key={r.name}
              style={{
                padding: '0.5rem 0.75rem',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.8125rem',
                flex: 1,
                minWidth: '120px',
              }}
            >
              <div style={{ color: '#64748b', fontSize: '0.75rem' }}>{r.name}</div>
              <div style={{ fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                {r.count} users ({r.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DomainChart;