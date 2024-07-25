import React, { useContext, useEffect, useState } from "react";
import "./SearchUser.css";
import userView from "../../../assets/Icons/eye.png";
import ShowUserProfilePopup from "../../../Components/AppStackComponent/ShowUserProfilePopup/ShowUserProfilePopup";
import { StoreContext } from "../../../Context/StoreContex";
import axios from "axios";
import { adminBaseUrl } from "../../../Utils/Apis";

const SearchUser = () => {
  const [allUsersData, setAllUsersData] = useState([]);
  const [searchType, setSearchType] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [specificUserData, setSpecificUserData] = useState({});

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem("token");
      return token;
    };

    const fetchUsers = async () => {
      const token = getToken();

      if (token) {
        const headers = {
          Authorization: token,
          userType: "Admin",
        };

        try {
          const response = await axios.get(`${adminBaseUrl}/allusers`, {
            headers,
          });
          if (response.data.status) {
            setAllUsersData(response.data.data);
          } else {
            console.log("Error: ", response.data.error);
          }
        } catch (err) {
          console.log("Error fetching all users", err);
        }
      } else {
        console.log("No token found in local storage");
      }
    };

    fetchUsers();
  }, []);

  const getUserData = async (_id) => {
    const getToken = () => {
      const token = localStorage.getItem("token");
      return token;
    };

    const token = getToken();

    if (token) {
      const headers = {
        Authorization: token,
        userType: "Admin",
      };

      try {
        const response = await axios.post(
          `${adminBaseUrl}/userloginfo`,
          {
            userId: _id,
          },
          {
            headers,
          }
        );
        if (response.data.status) {
          setSpecificUserData(response.data.data);
          setShowUserProfile(true);
        } else {
          console.log("Error: ", response.data.error);
        }
      } catch (err) {
        console.log("Error fetching all users", err);
      }
    } else {
      console.log("No token found in local storage");
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterData(e.target.value, startingDate, endingDate);
  };

  const handleFilter = () => {
    setDateError("");

    if (!startingDate || !endingDate) {
      setDateError("Please enter both starting and ending dates.");
      return;
    }

    if (new Date(startingDate) > new Date(endingDate)) {
      setDateError("Ending date cannot be before starting date.");
      return;
    }

    filterData(searchText, startingDate, endingDate);
  };

  const filterData = (searchText, startDate, endDate) => {
    const filtered = allUsersData.filter((user) => {
      const loginTime = new Date(user.loginInfo?.[0]?.logintime);
      let includesSearch = true;
      let isInDateRange = true;

      if (searchType === "search") {
        if (searchText.length === 0) {
          includesSearch = false;
        }
        for (let i = 0; i < searchText.length; i++) {
          includesSearch =
            user.firstName.charAt(i).toLowerCase() ===
            searchText.charAt(i).toLowerCase();
        }
      }

      if (searchType === "date-time") {
        isInDateRange =
          !startDate ||
          !endDate ||
          (loginTime >= new Date(startDate) && loginTime <= new Date(endDate));
      }

      return (
        (searchType === "search" ? includesSearch : isInDateRange) &&
        (searchType === "date-time" ? isInDateRange : true)
      );
    });
    setFilteredData(filtered);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return " ";
    const date = new Date(dateTime);

    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };

    const day = padTo2Digits(date.getDate());
    const month = padTo2Digits(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = padTo2Digits(date.getHours());
    const minutes = padTo2Digits(date.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <div className="search-screen-container">
      <p className="search-user-title">Search User</p>
      <div className="search-screen-container-body">
        <div className="search-screen-container-body-type">
          <label>
            <input
              type="radio"
              name="searchType"
              value="search"
              checked={searchType === "search"}
              onChange={() => {
                setStartingDate("");
                setEndingDate("");
                setFilteredData([]);
                setSearchType("search");
              }}
            />
            Search By Name
          </label>
          <label>
            <input
              type="radio"
              name="searchType"
              value="date-time"
              checked={searchType === "date-time"}
              onChange={() => {
                setSearchText("");
                setFilteredData([]);
                setSearchType("date-time");
              }}
            />
            Date & Time
          </label>
        </div>
        {searchType === "search" && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchText}
              onChange={handleSearchChange}
            />
            <button
              onClick={() => filterData(searchText, startingDate, endingDate)}
            >
              Search
            </button>
          </div>
        )}
        {searchType === "date-time" && (
          <>
            <div className="date-time-inputs">
              <div className="date-time-input">
                <label>
                  Starting
                  <input
                    type="datetime-local"
                    value={startingDate}
                    onChange={(e) => setStartingDate(e.target.value)}
                  />
                </label>
              </div>
              <div className="date-time-input">
                <label>
                  Ending
                  <input
                    type="datetime-local"
                    value={endingDate}
                    onChange={(e) => setEndingDate(e.target.value)}
                  />
                </label>
              </div>
              <button className="date-time-input-button" onClick={handleFilter}>
                Filter
              </button>
            </div>
            {dateError && <p className="date-error">{dateError}</p>}
          </>
        )}

        {filteredData.length > 0 ? (
          <div className="search-user-table-list">
            <div className="search-user-table-list-format">
              <b>SI/No.</b>
              <b>First name</b>
              <b>Last name</b>
              <b>Image</b>
              <b>Email</b>
              <b>Location</b>
              <b>Date & Time</b>
              <b>View</b>
            </div>
            {filteredData.map((item, index) => (
              <div className="search-user-table-list-format" key={index}>
                <p>{index + 1}</p>
                <p>{item.firstName}</p>
                <p>{item.lastName}</p>
                <img
                  src={item.profileimage}
                  alt={`${item.firstName}'s profile`}
                />
                <p>{item.email}</p>
                <p>
                  {item.loginInfo[0]
                    ?.loginlocationName || "N/A"}
                </p>
                <p>
                  {formatDateTime(
                    item.loginInfo[0]?.logintime
                  )}
                </p>
                <img
                  id="search-user-list-user-view"
                  src={userView}
                  alt="eye"
                  onClick={() => getUserData(item._id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-found">No data found</div>
        )}

        {showUserProfile && (
          <ShowUserProfilePopup
            specificUserData={specificUserData}
            setShowUserProfile={setShowUserProfile}
          />
        )}
      </div>
    </div>
  );
};

export default SearchUser;
