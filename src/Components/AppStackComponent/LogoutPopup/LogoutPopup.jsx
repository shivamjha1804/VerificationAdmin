import React, { useContext } from "react";
import "./LogoutPopup.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../../../Context/StoreContex";
const LogoutPopup = ({ setShowLogout, setIsAuthenticated }) => {
  const { setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    setIsAuthenticated(false);
    setToken("");
    localStorage.removeItem("token");
    setShowLogout(false);
    navigate("/");
    toast.success("Admin logout.");
  };
  return (
    <div className="logout-screen">
      <div className="logout-container">
        <div className="logout-header">
          <h1>Logout</h1>
        </div>
        <div className="logout-body">
          <p>Are you sure you want to logout?</p>
        </div>
        <div className="logout-footer">
          <button
            onClick={() => setShowLogout(false)}
            className="logout-cancel-btn"
          >
            Cancel
          </button>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
