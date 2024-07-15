import React from "react";
import "./Navbar.css";
import logo from "../../assets/Navbar/logo.png";
import user from "../../assets/Navbar/user.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" />
      </div>
      <div className="navbar-right">
        <img src={user} alt="User" />
        <h5>Admin</h5>
        <ul className="nav-profile-dropdown">
          <li onClick={""}>
            <p>View Profile</p>
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
