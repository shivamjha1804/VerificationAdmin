import React from "react";
import "./DeletePopup.css";
import { toast } from "react-toastify";

const DeletePopup = ({ setShowDeletePopup, clear }) => {
  const deleteUser = () => {
    setShowDeletePopup(false);
    clear();
    toast.success("User deleted");
  };
  return (
    <div className="delete-popup-screen">
      <div className="delete-popup-container">
        <div className="delete-popup-header">
          <h3>Delete</h3>
        </div>
        <div className="delete-popup-body">
          <p>Are you sure you want to delete this user?</p>
        </div>
        <div className="delete-popup-footer">
          <button
            onClick={() => setShowDeletePopup(false)}
            className="delete-popup-cancel"
          >
            Cancel
          </button>
          <button onClick={deleteUser} className="delete-popup-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
