import React, { useContext, useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";
import { StoreContext } from "../../../Context/StoreContex";

const Auth = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(StoreContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const data = {
      email: email,
      password: password,
    };

    axios
      .post(`${adminBaseUrl}/adminlogin`, data)
      .then((res) => {
        if (res.data.status === true) {
          console.log("Response : ", res.data.data.token);
          localStorage.setItem("token", res.data.data.token);
          setToken(res.data.token);
          setIsAuthenticated(true);
          toast.success("Admin logged In");
          setError("");
          navigate("/home/alluser");
        } else {
          setError("Invalid credentials.");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
        console.log("error : ", err);
      });
  };

  return (
    <div className="authScreen">
      <section className="authSection">
        <div className="authContainer">
          <h3>Login</h3>
          <form className="authForm" onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <div className="auth-form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="auth-form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Link to="/forgetpassword">Forgot Password?</Link>
            <div className="auth-form-group">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Auth;
