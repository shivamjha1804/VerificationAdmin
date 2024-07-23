import React from "react";
import "./ShowUserProfilePopup.css";
import demoImage from "../../../assets/demo/demo.jpeg";
import back from "../../../assets/Icons/back.png";

const ShowUserProfilePopup = ({ setShowUserProfile }) => {
  return (
    <div className="show-user-profile-popup-screen">
      <div
        className="show-user-profile-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          onClick={() => setShowUserProfile(false)}
          className="show-user-profile-popup-back-icon"
          src={back}
          alt="Back"
        />

        <div className="show-user-profile-popup-header">
          <h3>Profile</h3>
        </div>
        <div className="show-user-profile-popup-body">
          <div className="show-user-profile-popup-body-image">
            <img src={demoImage} alt="User Profile" />
          </div>
          <div className="show-user-profile-popup-body-info">
            <div className="show-user-profile-popup-body-info-name">
              <div className="show-user-profile-popup-body-info-first-name">
                <label>First name:</label>
                <h3>John</h3>
              </div>
              <div className="show-user-profile-popup-body-info-last-name">
                <label>Last name:</label>
                <h3>Doe</h3>
              </div>
            </div>
            <div className="show-user-profile-popup-body-info-email">
              <label>Email:</label>
              <h3>john@gmail.com</h3>
            </div>
          </div>
          <div className="show-user-profile-popup-log-card">
            <div className="show-user-profile-popup-log-card-header">
              <h3>Log</h3>
            </div>
            <div className="show-user-profile-popup-log-card-body">
              {/* Sample log item */}
              <div className="show-user-profile-popup-log-card-body-item">
                <div className="log-item">
                  <div className="log-item-date">
                    <h4>Date:</h4>
                    <h5>2024-07-17</h5>
                  </div>
                  <div className="log-item-time">
                    <h4>Time:</h4>
                    <h5>12:00</h5>
                  </div>
                  <div className="log-item-time">
                    <h4>Location:</h4>
                    <h5>America</h5>
                  </div>
                  <div className="log-item-status">
                    <h4>Status:</h4>
                    <h5>Logged In</h5>
                  </div>
                </div>
              </div>
              <div className="show-user-profile-popup-log-card-body-item">
                <div className="log-item">
                  <div className="log-item-date">
                    <h4>Date:</h4>
                    <h5>2024-07-17</h5>
                  </div>
                  <div className="log-item-time">
                    <h4>Time:</h4>
                    <h5>2:00</h5>
                  </div>
                  <div className="log-item-time">
                    <h4>Location:</h4>
                    <h5>America</h5>
                  </div>
                  <div className="log-item-status">
                    <h4>Status:</h4>
                    <h5>Logged Out</h5>
                  </div>
                </div>
              </div>
              {/* Add more log items as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUserProfilePopup;
