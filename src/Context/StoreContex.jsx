import { createContext, useState, useEffect } from "react";
import { adminBaseUrl } from "../Utils/Apis";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [usersData, setUsersData] = useState("");
  const [allUsersData, setAllUsersData] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

  const fetchActiveUsersData = async () => {
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
          setUsersData(response.data.data);
        } else {
          console.log("Error: ", response.data.error);
        }
      } catch (err) {
        console.log("Error fetching all users", err);
      }
    }
  };

  const contextValue = {
    token,
    setToken,
    isAuthenticated,
    setIsAuthenticated,
    usersData,
    setUsersData,
    fetchActiveUsersData,
    setAllUsersData,
    allUsersData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
