// import React from "react";

// const RecentActivity = ({ activities = [] }) => {
//   return (
//     <div className="activity-card">
//       <div className="activity-card-header">
//         <div>
//           <span className="card-eyebrow">
//             ACTIVITY
//           </span>

//           <h2>Recent Activity</h2>
//         </div>

//         <div className="activity-header-icon">
//           ◷
//         </div>
//       </div>

//       {activities.length === 0 ? (
//         <div className="activity-empty">
//           <div className="activity-empty-icon">
//             ◷
//           </div>

//           <p>No recent activity.</p>
//         </div>
//       ) : (
//         <div className="activity-list">
//           {activities.map((activity, index) => (
//             <div
//               className="activity-item"
//               key={
//                 activity.id ||
//                 `${activity.description}-${index}`
//               }
//             >
//               <div className="activity-marker">
//                 <span></span>
//               </div>

//               <div className="activity-content">
//                 <p className="activity-description">
//                   {activity.description}
//                 </p>

//                 <span className="activity-time">
//                   {activity.time}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecentActivity;

import React from 'react';

const RecentActivity = () => {
  const activities = [
    { id: 1, text: 'New brand manager registered', time: '12m ago', type: 'user' },
    { id: 2, text: 'System wide review ingestion completed', time: '45m ago', type: 'system' },
    { id: 3, text: 'Critical ticket auto assigned to Agent Smith', time: '2h ago', type: 'ticket' },
  ];

  return (
    <div className="recent-activity" data-testid="recent-activity">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem' }}>Recent Timeline</h3>
        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Live Updates</span>
      </div>
      <ul className="activity-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {activities.map((a) => (
          <li
            key={a.id}
            className="activity-item"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.75rem',
              paddingBottom: '0.875rem',
              borderBottom: '1px solid #f1f5f9',
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: a.type === 'ticket' ? '#ef4444' : a.type === 'user' ? '#2563eb' : '#10b981',
                marginTop: '6px',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#1e293b' }}>{a.text}</div>
              <small style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{a.time}</small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;