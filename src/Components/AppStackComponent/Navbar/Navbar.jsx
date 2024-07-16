import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../../assets/Navbar/logo.png";
import user from "../../../assets/Navbar/user.png";
import { useNavigate } from "react-router-dom";
import LogoutPopup from "../LogoutPopup/LogoutPopup";
import ChangePassword from "../ChangePassword/ChangePassword";

const Navbar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const logout = () => {
    // setIsAuthenticated(false);
    // navigate("/");
    setShowLogout(true);
  };

  return (
    <nav className="navbar">
      {showLogout ? (
        <LogoutPopup
          setIsAuthenticated={setIsAuthenticated}
          setShowLogout={setShowLogout}
        />
      ) : (
        <></>
      )}

      {showChangePassword ? (
        <ChangePassword setShowChangePassword={setShowChangePassword} />
      ) : (
        <></>
      )}
      <div className="navbar-left">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-right">
        <img src={user} alt="User" />
        <h5>Admin</h5>
        <ul className="nav-profile-dropdown">
          <li onClick={() => setShowChangePassword(true)}>
            <p>Change password</p>
          </li>
          <li onClick={logout}>
            <p>Logout</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
