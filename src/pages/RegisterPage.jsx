import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";

function RegisterPage({ onRegister, hasCartItems }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [accountError, setAccountError] = useState("");
  const returnPage = location.state?.from || (hasCartItems ? "/checkout" : "/");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function validateForm() {
    const newErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Please enter your complete name.";
    }
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (phoneDigits.length < 10 || phoneDigits.length > 13) {
      newErrors.phone = "Phone number must contain 10 to 13 digits.";
    }
    if (formData.address.trim().length < 10) {
      newErrors.address = "Please enter a complete delivery address.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setAccountError("");

    if (!validateForm()) {
      return;
    }

    const newAccount = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      password: formData.password,
    };
    const result = onRegister(newAccount);

    if (result.success) {
      navigate(returnPage);
    } else {
      setAccountError(result.message);
    }
  }

  return (
    <section className="page-section account-page">
      <div className="container account-card register-card">
        <p className="eyebrow">New customer</p>
        <h1>Create an account</h1>
        <p className="account-intro">Enter your delivery details once and checkout will fill them in for you.</p>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="registerName">Full Name</label>
            <input id="registerName" name="fullName" type="text" value={formData.fullName} onChange={handleChange} required minLength="3" autoComplete="name" />
            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="registerEmail">Email Address</label>
              <input id="registerEmail" name="email" type="email" value={formData.email} onChange={handleChange} required autoComplete="email" />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="registerPhone">Phone Number</label>
              <input id="registerPhone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required minLength="10" autoComplete="tel" />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="registerAddress">Delivery Address</label>
            <textarea id="registerAddress" name="address" rows="3" value={formData.address} onChange={handleChange} required minLength="10" autoComplete="street-address"></textarea>
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="registerPassword">Password</label>
              <input id="registerPassword" name="password" type="password" value={formData.password} onChange={handleChange} required minLength="6" autoComplete="new-password" />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required minLength="6" autoComplete="new-password" />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          </div>

          {accountError && <p className="form-alert" role="alert">{accountError}</p>}

          <button className="button button-full" type="submit">
            Create account
          </button>
        </form>

        <p className="account-switch">
          Already registered? <Link to="/login" state={{ from: returnPage }}>Login here</Link>
        </p>
        <p className="memory-note">For this front-end activity, account data resets when the page is refreshed.</p>
      </div>
    </section>
  );
}

RegisterPage.propTypes = {
  onRegister: PropTypes.func.isRequired,
  hasCartItems: PropTypes.bool,
};

RegisterPage.defaultProps = {
  hasCartItems: false,
};

export default RegisterPage;
