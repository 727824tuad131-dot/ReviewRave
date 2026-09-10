
// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, Link } from 'react-router-dom';
// import { register } from '../../store/slices/authSlice';
// import './Login.css';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     fullName: '',
//     organization: '',
//   });

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { isLoading } = useSelector((state) => state.auth || {});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resultAction = await dispatch(register(formData));
//     if (register.fulfilled.match(resultAction)) {
//       navigate('/login');
//     } else {
//       alert(resultAction.payload || 'Registration failed');
//     }
//   };

//   return (
//     <div className="auth-container" data-testid="register-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <h2 className="auth-title">Register Account</h2>
//           <p className="auth-subtitle">Join ReviewRave platform</p>
//         </div>

//         <form className="auth-form" onSubmit={handleSubmit} data-testid="register-form">
//           <div className="form-group">
//             <label className="form-label" htmlFor="fullName">
//               Full Name
//             </label>
//             <input
//               type="text"
//               id="fullName"
//               name="fullName"
//               className="form-input"
//               placeholder="John Doe"
//               value={formData.fullName}
//               onChange={handleChange}
//               data-testid="fullname-input"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="organization">
//               Organization
//             </label>
//             <input
//               type="text"
//               id="organization"
//               name="organization"
//               className="form-input"
//               placeholder="e.g. Acme Corp"
//               value={formData.organization}
//               onChange={handleChange}
//               data-testid="organization-input"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="email">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="form-input"
//               placeholder="brand@reviewrave.com"
//               value={formData.email}
//               onChange={handleChange}
//               data-testid="email-input"
//             />
//           </div>

//           <div className="form-group">
//             <label className="form-label" htmlFor="password">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="form-input"
//               placeholder="Choose a password"
//               value={formData.password}
//               onChange={handleChange}
//               data-testid="password-input"
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn-primary"
//             disabled={isLoading}
//             data-testid="register-submit-btn"
//           >
//             {isLoading ? 'Registering...' : 'Register'}
//           </button>
//         </form>

//         <div className="auth-footer">
//           Have an account?{' '}
//           <Link to="/login" data-testid="login-link">
//             Login here
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;


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
    role: 'BRAND_MANAGER',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth || {});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
     * Keep the existing form fields for frontend tests,
     * while also sending the backend-compatible fields.
     */
    const nameParts = formData.fullName.trim().split(/\s+/);

    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const registrationData = {
      ...formData,
      firstName,
      lastName,
      companyName: formData.organization,
    };

    const resultAction = await dispatch(register(registrationData));

    if (register.fulfilled.match(resultAction)) {
      navigate('/login');
    } else {
      alert(resultAction.payload || 'Registration failed');
    }
  };

  return (
    <div className="auth-container" data-testid="register-container">
      <div className="auth-card">

        {/* Header */}
        <div className="auth-header">
          <h2 className="auth-title">Register Account</h2>
          <p className="auth-subtitle">
            Join ReviewRave platform
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          data-testid="register-form"
        >

          {/* Full Name */}
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

          {/* Organization */}
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

          {/* Email */}
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

          {/* Password */}
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

          {/* ROLE SELECTION */}
          <div className="form-group">

            <label className="form-label">
              Select Your Role
            </label>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginTop: '4px',
              }}
            >

              {/* BRAND MANAGER */}
              <button
                type="button"
                onClick={() => handleRoleSelect('BRAND_MANAGER')}
                data-testid="role-brand-manager"
                style={{
                  padding: '14px 8px',
                  borderRadius: '10px',
                  border:
                    formData.role === 'BRAND_MANAGER'
                      ? '2px solid #2563eb'
                      : '1px solid #dbe2ea',
                  background:
                    formData.role === 'BRAND_MANAGER'
                      ? '#eff6ff'
                      : '#f8fafc',
                  color:
                    formData.role === 'BRAND_MANAGER'
                      ? '#1d4ed8'
                      : '#334155',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>
                  🏢
                </div>

                <div>Brand Manager</div>
              </button>

              {/* RESOLUTION AGENT */}
              <button
                type="button"
                onClick={() => handleRoleSelect('RESOLUTION_AGENT')}
                data-testid="role-resolution-agent"
                style={{
                  padding: '14px 8px',
                  borderRadius: '10px',
                  border:
                    formData.role === 'RESOLUTION_AGENT'
                      ? '2px solid #2563eb'
                      : '1px solid #dbe2ea',
                  background:
                    formData.role === 'RESOLUTION_AGENT'
                      ? '#eff6ff'
                      : '#f8fafc',
                  color:
                    formData.role === 'RESOLUTION_AGENT'
                      ? '#1d4ed8'
                      : '#334155',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>
                  🎧
                </div>

                <div>Resolution Agent</div>
              </button>

              {/* PLATFORM ADMIN */}
              <button
                type="button"
                onClick={() => handleRoleSelect('PLATFORM_ADMIN')}
                data-testid="role-platform-admin"
                style={{
                  padding: '14px 8px',
                  borderRadius: '10px',
                  border:
                    formData.role === 'PLATFORM_ADMIN'
                      ? '2px solid #2563eb'
                      : '1px solid #dbe2ea',
                  background:
                    formData.role === 'PLATFORM_ADMIN'
                      ? '#eff6ff'
                      : '#f8fafc',
                  color:
                    formData.role === 'PLATFORM_ADMIN'
                      ? '#1d4ed8'
                      : '#334155',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontSize: '12px',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ fontSize: '22px', marginBottom: '6px' }}>
                  🛡️
                </div>

                <div>Platform Admin</div>
              </button>

            </div>

            {/* Selected role */}
            <div
              style={{
                marginTop: '8px',
                fontSize: '12px',
                color: '#64748b',
              }}
            >
              Selected role:{' '}
              <strong style={{ color: '#2563eb' }}>
                {formData.role}
              </strong>
            </div>

          </div>

          {/* Existing Register Button */}
          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            data-testid="register-submit-btn"
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>

        </form>

        {/* Footer */}
        <div className="auth-footer">
          Have an account?{' '}

          <Link
            to="/login"
            data-testid="login-link"
          >
            Login here
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Register;