import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";

function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const returnPage = location.state?.from || "/";

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    const result = onLogin(email.trim(), password);

    if (result.success) {
      navigate(returnPage);
    } else {
      setError(result.message);
    }
  }

  return (
    <section className="page-section account-page">
      <div className="container account-card">
        <p className="eyebrow">Welcome back</p>
        <h1>Login to your account</h1>
        <p className="account-intro">Your saved delivery details will be filled in during checkout.</p>

        <form className="account-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="loginEmail">Email Address</label>
            <input
              id="loginEmail"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="loginPassword">Password</label>
            <input
              id="loginPassword"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              minLength="6"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-alert" role="alert">{error}</p>}

          <button className="button button-full" type="submit">
            Login
          </button>
        </form>

        <p className="account-switch">
          No account yet? <Link to="/register" state={{ from: returnPage }}>Register here</Link>
        </p>
        <p className="memory-note">Accounts are kept only while this page is open, as required for this activity.</p>
      </div>
    </section>
  );
}

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
