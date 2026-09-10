
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    organization: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(register(formData));
    if (register.fulfilled.match(resultAction)) {
      navigate('/login');
    } else {
      alert(resultAction.payload || 'Registration failed');
    }
  };

  return (
    <div className="auth-container" data-testid="register-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Register Account</h2>
          <p className="auth-subtitle">Join ReviewRave platform</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} data-testid="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              data-testid="fullname-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="organization">
              Organization
            </label>
            <input
              type="text"
              id="organization"
              name="organization"
              className="form-input"
              placeholder="e.g. Acme Corp"
              value={formData.organization}
              onChange={handleChange}
              data-testid="organization-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="brand@reviewrave.com"
              value={formData.email}
              onChange={handleChange}
              data-testid="email-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              placeholder="Choose a password"
              value={formData.password}
              onChange={handleChange}
              data-testid="password-input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            data-testid="register-submit-btn"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="auth-footer">
          Have an account?{' '}
          <Link to="/login" data-testid="login-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;