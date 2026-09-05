import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    role: "BRAND_MANAGER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    /* =========================================
       GET EXISTING USERS
    ========================================= */

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    /* =========================================
       CHECK EMAIL
    ========================================= */

    const existingUser = users.find(
      (user) =>
        user.email.toLowerCase() ===
        formData.email.toLowerCase()
    );

    if (existingUser) {
      alert(
        "This email is already registered. Please login."
      );

      setLoading(false);
      return;
    }

    /* =========================================
       CREATE NEW USER
    ========================================= */

    const newUser = {
      userId: Date.now(),

      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,

      email: formData.email,
      password: formData.password,

      role: formData.role,

      token: "frontend-token-" + Date.now(),
    };

    /* =========================================
       SAVE USER
    ========================================= */

    users.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(users)
    );

    /* =========================================
       SAVE CURRENT LOGIN
    ========================================= */

    localStorage.setItem(
      "token",
      newUser.token
    );

    localStorage.setItem(
      "role",
      newUser.role
    );

    localStorage.setItem(
      "userId",
      String(newUser.userId)
    );

    localStorage.setItem(
      "email",
      newUser.email
    );

    /* =========================================
       GO TO DASHBOARD
    ========================================= */

    navigate("/");
  };

  return (
    <div className="simple-register-page">

      <div className="simple-register-card">

        {/* HEADER */}

        <div className="simple-register-header">
          <h1>Register Account</h1>
        </div>


        {/* FORM */}

        <form
          className="simple-register-form"
          onSubmit={handleSubmit}
        >

          {/* FIRST + LAST NAME */}

          <div className="simple-name-row">

            <div className="simple-form-group">

              <label htmlFor="firstName">
                First Name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                required
                disabled={loading}
              />

            </div>


            <div className="simple-form-group">

              <label htmlFor="lastName">
                Last Name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                required
                disabled={loading}
              />

            </div>

          </div>


          {/* COMPANY */}

          <div className="simple-form-group">

            <label htmlFor="companyName">
              Company Name
            </label>

            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter company name"
              required
              disabled={loading}
            />

          </div>


          {/* EMAIL */}

          <div className="simple-form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              disabled={loading}
            />

          </div>


          {/* PASSWORD */}

          <div className="simple-form-group">

            <label htmlFor="password">
              Password (minimum 8 characters)
            </label>


            <div className="simple-password-wrapper">

              <input
                id="password"
                name="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                minLength={8}
                required
                disabled={loading}
              />


              <button
                type="button"
                className="simple-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>

            </div>

          </div>


          {/* ROLE */}

          <div className="simple-form-group">

            <label htmlFor="role">
              Select Role
            </label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >

              <option value="BRAND_MANAGER">
                Brand Manager
              </option>

              <option value="RESOLUTION_AGENT">
                Resolution Agent
              </option>

              <option value="PLATFORM_ADMIN">
                Platform Admin
              </option>

            </select>

          </div>


          {/* BUTTON */}

          <button
            type="submit"
            className="simple-create-button"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>


        {/* LOGIN */}

        <div className="simple-login-text">

          Already have an account?

          <Link to="/login">
            Login here
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Register;