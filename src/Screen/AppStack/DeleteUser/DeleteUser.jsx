import React, { useState } from "react";
import "./DeleteUser.css";
import DeletePopup from "../../../Components/AppStackComponent/DeletePopup/DeletePopup";

const DeleteUser = () => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!firstName) {
      errors.firstName = "First name is required";
    }
    if (!lastName) {
      errors.lastName = "Last name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    return errors;
  };

  const clear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setErrors({});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form (e.g., call an API)
      setShowDeletePopup(true);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="delete-user-container">
      {showDeletePopup ? (
        <DeletePopup setShowDeletePopup={setShowDeletePopup} clear={clear} />
      ) : (
        <></>
      )}
      <p>Deleted User</p>
      <form className="delete-user-form" onSubmit={handleSubmit}>
        <div>
          <label>First name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && (
            <span className="delete-error">{errors.firstName}</span>
          )}
        </div>
        <div>
          <label>Last name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && (
            <span className="delete-error">{errors.lastName}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <span className="delete-error">{errors.email}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DeleteUser;
