
import React, { Component } from 'react';

class ErrorHandler extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorHandler caught an error:', error, errorInfo);
  }

  render() {
    const errorProp = this.props.error;
    const hasError = this.state.hasError || Boolean(errorProp);
    const errorMsg = typeof errorProp === 'string' ? errorProp : (errorProp?.message || this.state.error?.message || 'err');

    if (hasError) {
      return (
        <div className="error-container" data-testid="error-container">
          <span>err: {errorMsg}</span>
          {this.props.onClose && (
            <button onClick={this.props.onClose} className="notification-close" data-testid="error-close-btn">
              x
            </button>
          )}
        </div>
      );
    }

    return this.props.children || null;
  }
}

export default ErrorHandler;