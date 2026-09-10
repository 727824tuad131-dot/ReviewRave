// import React from "react";

// const EmptyState = ({ message }) => {
//   return (
//     <div className="empty-state">
//       <div className="empty-state-icon">
//         ◇
//       </div>

//       <h2>No data available</h2>

//       <p>
//         {message}
//       </p>
//     </div>
//   );
// };

// export default EmptyState;

import React from 'react';

const EmptyState = ({ message = 'No data found.' }) => {
  return (
    <div className="empty-state" data-testid="empty-state">
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;