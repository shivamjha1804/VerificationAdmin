import React from "react";
import "./Home.css";
import Navbar from "../../../Components/AppStackComponent/Navbar/Navbar";
import Sidebar from "../../../Components/AppStackComponent/SideBar/Sidebar";
import AllUser from "../AllUser/AllUser";
import ActiveUser from "../ActiveUser/ActiveUser";
import { Route, Routes } from "react-router-dom";
import AddUser from "../AddUser/AddUser";
import DeleteUser from "../DeleteUser/DeleteUser";
import ChangePassword from "../../../Components/AppStackComponent/ChangePassword/ChangePassword";
import LoggedOutUser from "../LoggedOutUser/LoggedOutUser";
import SearchUser from "../SearchUser/SearchUser";

const Home = ({ setIsAuthenticated }) => {
  return (
    <>
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <div className="home-app-container">
        <div className="home-sidebar">
          <Sidebar />
        </div>
        <div className="home-main-content">
          <Routes>
            <Route path="/" element={<AllUser />} />
            <Route path="alluser" element={<AllUser />} />
            <Route path="activeuser" element={<ActiveUser />} />
            <Route path="loggedoutuser" element={<LoggedOutUser />} />
            <Route path="searchuser" element={<SearchUser />} />
            <Route path="adduser" element={<AddUser />} />
            <Route path="deleteuser" element={<DeleteUser />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default Home;
