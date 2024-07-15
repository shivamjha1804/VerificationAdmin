import React, { useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.*");
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);
    setError("");
    setIsAuthenticated(true);
  };

  return (
    <div className="authScreen">
      <section className="authSection">
        <div className="authContainer">
          <h3>Login</h3>
          <form className="authForm" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <a href="#">Forgot Password?</a>
            <div className="auth-form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Auth;
