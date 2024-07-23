import React, { useState } from "react";
import "./AddUser.css";
import { toast } from "react-toastify";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      // Display the selected image before upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Prepare the file for upload
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Upload the file to the server
        const response = await axios.post(
          `${adminBaseUrl}/upload-face-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status) {
          toast.success("Image uploaded successfully");
          if (response.data.faceId) {
            const { imageUrl } = response.data;
            setFormData((prevData) => ({
              ...prevData,
              faceId: response.data.faceId,
            }));
            const uploadImage = await axios.post(`${adminBaseUrl}/upload-profile-image`)
            
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
    }
  };

  // const { imageUrl } = response.data;
  //         setFormData((prevData) => ({
  //           ...prevData,
  //           path: response.data.path,
  //         }));

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
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
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
      const submitData = { ...formData };
      delete submitData.confirmPassword;
      console.log(submitData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        image: null,
      });
      setSelectedImage(null);
      toast.success("User added successfully");
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="add-user-error">{errors.password}</span>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="add-user-error">{errors.confirmPassword}</span>
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
            <label>Selected image</label>
            <img
              src={selectedImage}
              alt="Selected"
              className="add-user-selected-image-img"
            />
          </div>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUser;
