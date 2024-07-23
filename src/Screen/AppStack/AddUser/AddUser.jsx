import React, { useContext, useEffect, useState } from "react";
import "./AddUser.css";
import { toast } from "react-toastify";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";
import { StoreContext } from "../../../Context/StoreContex";

const AddUser = () => {
  const { usersData, fetchActiveUsersData } = useContext(StoreContext);
  useEffect(() => {
    fetchActiveUsersData();
  }, []);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    faceId: "",
    profileimage: "",
  });
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      const token = localStorage.getItem("token");

      try {
        const response = await axios.post(
          `${adminBaseUrl}/upload-face-image`,
          uploadFormData,
          {
            headers: {
              userType: "Admin",
              Authorization: token,
            },
          }
        );

        if (response.status && response.data.data.faceId) {
          toast.success("Image uploaded successfully");
          setFormData((prevData) => ({
            ...prevData,
            faceId: response.data.data.faceId,
          }));

          const uploadProfileResponse = await axios.post(
            `${adminBaseUrl}/upload-profile-image`,
            uploadFormData,
            {
              headers: {
                userType: "Admin",
                Authorization: token,
              },
            }
          );

          if (uploadProfileResponse.data.data) {
            toast.success("Profile image uploaded successfully");
            setFormData((prevData) => ({
              ...prevData,
              profileimage: uploadProfileResponse.data.data.path,
            }));
          }
        } else {
          toast.error("User face is not clear, Try another Image!");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Error uploading image");
      }
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
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.profileimage) newErrors.profileimage = "Image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();

    // Debug logs for usersData
    console.log("usersData: ", usersData);

    // Check if email already exists
    const emailExists = usersData.some((user) => user.email === formData.email);
    if (emailExists) {
      validationErrors.email = "Email already exists";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      const submitData = { ...formData };
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${adminBaseUrl}/create-user`,
          submitData,
          {
            headers: {
              Authorization: token,
              userType: "Admin",
            },
          }
        );

        if (response.data.status) {
          toast.success("User added successfully");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            faceId: "",
            profileimage: "",
          });
          setSelectedImage(null);
        } else {
          toast.error("Error adding user");
          console.log("Error: ", response.data.error);
        }
      } catch (error) {
        console.error("Error adding user:", error);
        toast.error("Error adding user");
      }
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
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
