import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import group from "../../assets/Sidebar/group.png";
import groupActive from "../../assets/Sidebar/groupActive.png";
import activeUserActive from "../../assets/Sidebar/activeUserActive.png";
import activeUser from "../../assets/Sidebar/activeUser.png";
import addUserActive from "../../assets/Sidebar/addUserActive.png";
import addUser from "../../assets/Sidebar/addUser.png";
import deleteUserActive from "../../assets/Sidebar/deleteUserActive.png";
import deleteUser from "../../assets/Sidebar/deleteUser.png";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/home/alluser" className="sidebar-option">
          {({ isActive }) => (
            <>
              <img
                className="sidebar-icon"
                src={isActive ? groupActive : group}
                alt="All User Icon"
              />
              <p>All User</p>
            </>
          )}
        </NavLink>
        <NavLink to="/home/activeuser" className="sidebar-option">
          {({ isActive }) => (
            <>
              <img
                className="sidebar-icon"
                src={isActive ? activeUserActive : activeUser}
                alt="Active User Icon"
              />
              <p>Active User</p>
            </>
          )}
        </NavLink>
        <NavLink to="/home/adduser" className="sidebar-option">
          {({ isActive }) => (
            <>
              <img
                className="sidebar-icon"
                src={isActive ? addUserActive : addUser}
                alt="Add User Icon"
              />
              <p>Add User</p>
            </>
          )}
        </NavLink>
        <NavLink to="/home/deleteuser" className="sidebar-option">
          {({ isActive }) => (
            <>
              <img
                className="sidebar-icon"
                src={isActive ? deleteUserActive : deleteUser}
                alt="Delete User Icon"
              />
              <p>Delete User</p>
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
