import React from "react";

const EmptyState = ({
  message = "No data available."
}) => {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        ∅
      </div>

      <p>
        {message}
      </p>

    </div>
  );
};

export default EmptyState;