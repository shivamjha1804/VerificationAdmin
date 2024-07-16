import React, { useState } from "react";
import "./AddUser.css";
import { toast } from "react-toastify";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.image) newErrors.image = "Image is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const submitData = formData;
      console.log(submitData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        image: null,
      });
      setSelectedImage(null);
      toast.success("User add successfully");
    }
  };

  return (
    <div className="add-user-container">
      <p>Add User</p>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <div>
          <label>First name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <span className="add-user-error">{errors.firstName}</span>
          )}
        </div>
        <div>
          <label>Last name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <span className="add-user-error">{errors.lastName}</span>
          )}
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <span className="add-user-error">{errors.email}</span>
          )}
        </div>
        <div>
          <label>Add image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {errors.image && (
            <span className="add-user-error">{errors.image}</span>
          )}
        </div>
        {selectedImage && (
          <div className="add-user-selected-image">
            <h3>Selected Image:</h3>
            <div className="add-user-selected-image-div">
              <img src={selectedImage} alt="Selected" />
            </div>
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
