import React, { useState } from "react";
import "./ForgetPassword.css";
import back from "../../../assets/Icons/arrow.png";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setIsEmailValid(isValid);
    if (!isValid) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailValid) {
      // Proceed with password reset logic
      console.log("Email submitted:", email);
      // You can add logic here to handle the password reset process
      // For example, send a reset link to the provided email address
    } else {
      setEmailError("Please enter a valid email address");
    }
  };

  return (
    <div className="forget-password-screen">
      <div onClick={() => navigate("/")} className="forget-password-back">
        <img src={back} alt="back" />
        <h5>Back</h5>
      </div>
      <div className="forget-password-container">
        <h3>Forget Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="forget-password-input-section">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <span className="forget-password-error">{emailError}</span>
            )}
          </div>
          <button type="submit" className="forget-password-button">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
