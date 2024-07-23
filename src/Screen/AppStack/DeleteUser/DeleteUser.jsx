import React, { useEffect, useState } from "react";
import "./DeleteUser.css";
import DeletePopup from "../../../Components/AppStackComponent/DeletePopup/DeletePopup";
import { adminBaseUrl } from "../../../Utils/Apis";
import axios from "axios";

const DeleteUser = () => {
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
          const response = await axios.get(`${adminBaseUrl}/deleteduser`, {
            headers,
          });
          if (response.data.status) {
            setUsers(response.data.data);
            console.log("User data : ", response.data.data);
          } else {
            console.log("Error: ", response.data.error);
          }
        } catch (err) {
          console.log("Error fetching deleted users", err);
        }
      } else {
        console.log("No token found in local storage");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="delete-user-list">
      <p className="delete-user-title">Deleted Users</p>
      <div className="delete-user-table-list">
        <div className="delete-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
        </div>
        {users.length == 0 ? (
          <div className="no-data-found">No data found</div>
        ) : (
          <></>
        )}
        {users.map((user, index) => {
          return (
            <div className="delete-user-table-list-format" key={user._id}>
              <p>{index + 1}</p>
              <p>{user.firstName}</p>
              <p>{user.lastName || ""}</p>
              <img
                src={user.profileimage}
                alt={`${user.firstName}'s profile`}
              />
              <p>{user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeleteUser;
