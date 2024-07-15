import React, { useState } from "react";
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Auth from "./Screen/Auth/Auth";
import Home from "./Screen/Home/Home";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Routes>
      <Route
        path="/*"
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
    </Routes>
  );
};

export default App;
