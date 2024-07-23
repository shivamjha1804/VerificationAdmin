import React, { useContext, useEffect } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Auth from "./Screen/AuthStack/Auth/Auth";
import Home from "./Screen/AppStack/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Screen/AuthStack/ForgotPassword/ForgetPassword";
import { StoreContext } from "./Context/StoreContex";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setToken } =
    useContext(StoreContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, [setToken, setIsAuthenticated]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            !isAuthenticated ? (
              <Auth setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/home/alluser" />
            )
          }
        />
        <Route
          path="/home/*"
          element={
            isAuthenticated ? (
              <Home setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
    </>
  );
};

export default App;
