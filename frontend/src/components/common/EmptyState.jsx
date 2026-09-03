import React from "react";

const EmptyState = ({
  message = "No data available."
}) => {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        <span>∅</span>
      </div>

      <h3>No Results</h3>

      <p>
        {message}
      </p>

    </div>
  );
};

export default EmptyState;