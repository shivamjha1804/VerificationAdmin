import React, { useEffect, useState } from "react";
import "./AllActiveUser.css";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";
import deleteUserIcon from "../../../assets/Icons/delete.png";
import { toast } from "react-toastify";
import DeleteAUserPop from "../../../Components/AppStackComponent/DeleteAUserPop/DeleteAUserPop";

const AllActiveUser = () => {
  const [users, setUsers] = useState([]);
  const [deleteUser, setDeleteUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const getToken = () => {
    const token = localStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getToken();

      if (token) {
        const headers = {
          Authorization: token,
          userType: "Admin",
        };

        try {
          const response = await axios.get(`${adminBaseUrl}/activeusers`, {
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

  const handleDeleteUser = async (_id) => {
    const token = getToken();

    if (token) {
      const headers = {
        Authorization: token,
        userType: "Admin",
      };

      try {
        const response = await axios.post(
          `${adminBaseUrl}/deleteuser`,
          { userId: _id },
          {
            headers,
          }
        );
        if (response.data.status) {
          setUsers(users.filter((user) => user._id !== _id));
          toast.success(
            `${
              users.find((user) => user._id === selectedUserId)?.firstName ||
              "User"
            } ${
              users.find((user) => user._id === selectedUserId)?.lastName || ""
            } has been deleted successfully`
          );
          setDeleteUser(false);
        } else {
          console.log("Error: ", response.data.error);
        }
      } catch (err) {
        console.log("Error deleting user", err);
      }
    } else {
      console.log("No token found in local storage");
    }
  };

  return (
    <div className="current-user-list">
      <p className="current-user-title">Active Users</p>
      <div className="current-user-table-list">
        <div className="current-user-table-list-format title">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
          <b>Delete</b>
        </div>
        {users.map((user, index) => {
          return (
            <div className="current-user-table-list-format" key={user._id}>
              <p>{index + 1}</p>
              <p>{user.firstName}</p>
              <p>{user.lastName}</p>
              <img src={user.image} />
              <p>{user.email}</p>
              <img
                onClick={() => {
                  setDeleteUser(true);
                  setSelectedUserId(user._id);
                }}
                className="delete-user-icon"
                src={deleteUserIcon}
                alt="Delete User"
              />
            </div>
          );
        })}
      </div>
      {deleteUser && (
        <DeleteAUserPop
          firstName={
            users.find((user) => user._id === selectedUserId)?.firstName || ""
          }
          lastName={
            users.find((user) => user._id === selectedUserId)?.lastName || ""
          }
          _id={selectedUserId}
          setDeleteUser={setDeleteUser}
          handleDeleteUser={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default AllActiveUser;
