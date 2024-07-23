import React, { useEffect, useState } from "react";
import "./ActiveUser.css";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";

const ActiveUser = () => {
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
          const response = await axios.get(`${adminBaseUrl}/loggedinusers`, {
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

  const formateDateAndTime = (dateAndTime) => {
    if (dateAndTime == undefined) {
      return " ";
    }
    const date = new Date(dateAndTime);

    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };

    const day = padTo2Digits(date.getDate());
    const month = padTo2Digits(date.getMonth() + 1); // getMonth() returns 0-11
    const year = date.getFullYear();
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="active-user-list">
      <p className="active-user-title">Logged In Users</p>
      <div className="active-user-table-list">
        <div className="active-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
          <b>Location</b>
          <b>Time</b>
        </div>
        {users.length == 0 ? (
          <div className="no-data-found">No data found</div>
        ) : (
          <></>
        )}
        {users.map((item, index) => {
          return (
            <div className="active-user-table-list-format" key={index}>
              <p>{index + 1}</p>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
              <img
                src={item.profileimage}
                alt={`${item.firstName}'s profile`}
              />{" "}
              <p>{item.email}</p>
              <p>{item.loginlocationName}</p>
              <p>{formateDateAndTime(item.logintime)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActiveUser;
