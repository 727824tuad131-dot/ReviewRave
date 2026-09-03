import React from "react";

const ErrorHandler = ({
  error
}) => {
  if (!error) {
    return null;
  }

  return (
    <div
      className="error-handler"
      role="alert"
    >

      <strong>
        Error
      </strong>

      <p>
        {error}
      </p>

    </div>
  );
};

export default ErrorHandler;