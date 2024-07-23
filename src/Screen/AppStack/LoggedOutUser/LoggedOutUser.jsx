import React, { useEffect, useState } from "react";
import "./LoggedOutUser.css";
import { adminBaseUrl } from "../../../Utils/Apis";
import axios from "axios";

const LoggedOutUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("token");
      return token;
    };

    const fetchUsers = async () => {
      const token = getToken();

      if (token) {
        const headers = {
          Authorization: token,
          userType: "Admin",
        };

        try {
          const response = await axios.get(`${adminBaseUrl}/loggedoutusers`, {
            headers,
          });
          if (response.data.status) {
            setUsers(response.data.data);
          } else {
            console.log("Error: ", response.data.error);
          }
        } catch (err) {
          console.log("Error fetching all users", err);
        }
      } else {
        console.log("No token found in local storage");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="logged-out-user-list">
      <p className="logged-out-user-title">Logged Out Users</p>
      <div className="logged-out-user-table-list">
        <div className="logged-out-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
          <b>Location</b>
          <b>Time</b>
        </div>
        {users.map((item, index) => {
          return (
            <div className="logged-out-user-table-list-format" key={index}>
              <p>{index + 1}</p>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
              <img src={item.image} />
              <p>{item.email}</p>
              <p>{item.location}</p>
              <p>{item.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoggedOutUser;
