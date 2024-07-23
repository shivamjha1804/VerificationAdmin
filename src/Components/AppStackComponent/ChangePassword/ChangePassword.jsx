import React, { useState } from "react";
import "./ChangePassword.css";
import cross from "../../../assets/Icons/back.png";
import { toast } from "react-toastify";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";

const ChangePassword = ({ setShowChangePassword }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!oldPassword) newErrors.oldPassword = "Old Password is required*";
    if (!newPassword) newErrors.newPassword = "New Password is required*";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required*";
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match*";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clear = () => {
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = getToken();

      if (token) {
        const headers = {
          Authorization: token, // Send token without 'Bearer' prefix
          userType: "Admin",
        };

        const data = {
          email: "admin1@gmail.com", // Ensure the email is provided correctly
          password: oldPassword,
          newPassword: confirmPassword,
        };

        try {
          const response = await axios.post(
            `${adminBaseUrl}/adminchangepassword`,
            data, // Data should be the second argument
            { headers } // Headers should be the third argument
          );
          if (response.data.status) {
            console.log("Password changed successfully");
            clear();
            toast.success("Password changed successfully.");
            setShowChangePassword(false);
          } else {
            console.log("Error: ", response.data.error);
            toast.error(response.data.error);
          }
        } catch (err) {
          console.log("Error fetching change password", err);
          toast.error("An error occurred while changing the password.");
        }
      } else {
        console.log("No token found in local storage");
        toast.error("No token found in local storage.");
      }
    }
  };

  return (
    <div
      className="change-password-screen"
      onClick={() => setShowChangePassword(false)}
    >
      <div
        className="change-password-container"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="change-password-cross-image"
          src={cross}
          alt="close"
          onClick={() => setShowChangePassword(false)}
        />
        <div className="change-password-header">
          <h1>Change Password</h1>
        </div>
        <div className="change-password-body">
          <form className="change-password-form" onSubmit={handleSubmit}>
            <div className="change-password-input-section">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                type="password"
                id="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {errors.oldPassword && (
                <span className="change-password-error">
                  {errors.oldPassword}
                </span>
              )}
            </div>
            <div className="change-password-input-section">
              <label htmlFor="newPassword">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {errors.newPassword && (
                <span className="change-password-error">
                  {errors.newPassword}
                </span>
              )}
            </div>
            <div className="change-password-input-section">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && (
                <span className="change-password-error">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            <div className="change-password-footer">
              <button type="submit" className="change-password-button">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
