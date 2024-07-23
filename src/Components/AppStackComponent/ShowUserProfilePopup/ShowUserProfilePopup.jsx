import React from "react";
import "./ShowUserProfilePopup.css";
import back from "../../../assets/Icons/back.png";

const ShowUserProfilePopup = ({ setShowUserProfile, specificUserData }) => {
  console.log("Specific User : ", JSON.stringify(specificUserData));

  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString();
  };

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
            <img src={specificUserData.profileimage} alt="User Profile" />
          </div>
          <div className="show-user-profile-popup-body-info">
            <div className="show-user-profile-popup-body-info-name">
              <div className="show-user-profile-popup-body-info-first-name">
                <label>First name:</label>
                <h3>{specificUserData.firstName}</h3>
              </div>
              <div className="show-user-profile-popup-body-info-last-name">
                <label>Last name:</label>
                <h3>{specificUserData.lastName}</h3>
              </div>
            </div>
            <div className="show-user-profile-popup-body-info-email">
              <label>Email:</label>
              <h3>{specificUserData.email}</h3>
            </div>
          </div>
          <div className="show-user-profile-popup-log-card">
            <div className="show-user-profile-popup-log-card-header">
              <h3>Log</h3>
            </div>
            <div className="show-user-profile-popup-log-card-body">
              {specificUserData.loginLogoutInfoByDate &&
                specificUserData.loginLogoutInfoByDate.map((log, index) => (
                  <div
                    key={index}
                    className="show-user-profile-popup-log-card-body-item"
                  >
                    <div className="log-item">
                      <div className="log-item-date">
                        <h4>Date:</h4>
                        <h5>{log.date}</h5>
                      </div>
                      {log.logins.map((login, idx) => (
                        <div key={idx} className="log-item-detail">
                          <div className="log-item-time">
                            <h4>Login Time:</h4>
                            <h5>{formatDateTime(login.logintime)}</h5>
                          </div>
                          <div className="log-item-location">
                            <h4>Location:</h4>
                            <h5>{login.loginlocationName}</h5>
                          </div>
                        </div>
                      ))}
                      {log.logouts.map((logout, idx) => (
                        <div key={idx} className="log-item-detail">
                          <div className="log-item-time">
                            <h4>Logout Time:</h4>
                            <h5>{formatDateTime(logout.logOutTime)}</h5>
                          </div>
                          <div className="log-item-location">
                            <h4>Location:</h4>
                            <h5>{logout.logoutlocationName}</h5>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              {!specificUserData.loginLogoutInfoByDate && (
                <p>No log data available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowUserProfilePopup;
