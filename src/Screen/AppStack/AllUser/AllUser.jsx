import React, { useEffect, useState } from "react";
import "./AllUser.css";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";

const AllUser = () => {
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
          const response = await axios.get(`${adminBaseUrl}/allusers`, {
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
    <div className="all-user-list">
      <p className="all-user-title">All Users</p>
      <div className="all-user-table-list">
        <div className="all-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
        </div>
        {users.map((user, index) => {
          return (
            <div className="all-user-table-list-format" key={user._id}>
              <p>{index + 1}</p>
              <p>{user.firstName}</p>
              <p>{user.lastName || ""}</p>
              <img src={user.image} />
              <p>{user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUser;
