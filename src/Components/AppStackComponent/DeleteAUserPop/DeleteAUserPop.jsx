import React from "react";
import "./DeleteAUserPop.css";

const DeleteAUserPop = ({
  firstName,
  lastName,
  _id,
  handleDeleteUser,
  setDeleteUser,
}) => {
  return (
    <div className="delete-user-pop">
      <div className="delete-container">
        <div className="delete-header">
          <h1>Delete User</h1>
        </div>
        <div className="delete-body">
          <p>
            Are you sure you want to delete {firstName || "user"}{" "}
            {lastName || ""}?
          </p>
        </div>
        <div className="delete-footer">
          <button
            className="delete-cancel-btn"
            onClick={() => setDeleteUser(false)}
          >
            No
          </button>
          <button className="delete-btn" onClick={() => handleDeleteUser(_id)}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAUserPop;
