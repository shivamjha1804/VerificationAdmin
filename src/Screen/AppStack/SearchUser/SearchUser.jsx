import React, { useState } from "react";
import "./SearchUser.css";
import userView from "../../../assets/Icons/eye.png";
import ShowUserProfilePopup from "../../../Components/ShowUserProfilePopup/ShowUserProfilePopup";

const SearchUser = () => {
  const [searchType, setSearchType] = useState("search");
  const [searchText, setSearchText] = useState("");
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data] = useState([
    {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/johndoe.jpg",
      email: "john.doe@example.com",
      location: "America",
      time: new Date("2024-07-15T16:08:00"),
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      image: "https://example.com/janesmith.jpg",
      email: "jane.smith@example.com",
      location: "America",
      time: new Date("2024-07-16T18:08:00"),
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      image: "https://example.com/michaeljohnson.jpg",
      email: "michael.johnson@example.com",
      location: "America",
      time: new Date("2024-07-17T16:08:00"),
    },
    {
      firstName: "Emily",
      lastName: "Brown",
      image: "https://example.com/emilybrown.jpg",
      email: "emily.brown@example.com",
      location: "Canada",
      time: new Date("2024-07-17T18:08:00"),
    },
    {
      firstName: "David",
      lastName: "Wilson",
      image: "https://example.com/davidwilson.jpg",
      email: "david.wilson@example.com",
      location: "Australia",
      time: new Date("2024-07-18T16:08:00"),
    },
    {
      firstName: "Sarah",
      lastName: "Garcia",
      image: "https://example.com/sarahgarcia.jpg",
      email: "sarah.garcia@example.com",
      location: "Europe",
      time: new Date("2024-07-19T16:08:00"),
    },
    {
      firstName: "James",
      lastName: "Martinez",
      image: "https://example.com/jamesmartinez.jpg",
      email: "james.martinez@example.com",
      location: "Asia",
      time: new Date("2024-07-20T16:08:00"),
    },
    {
      firstName: "Anna",
      lastName: "Miller",
      image: "https://example.com/annamiller.jpg",
      email: "anna.miller@example.com",
      location: "Africa",
      time: new Date("2024-07-21T16:08:00"),
    },
    {
      firstName: "Robert",
      lastName: "Davis",
      image: "https://example.com/robertdavis.jpg",
      email: "robert.davis@example.com",
      location: "South America",
      time: new Date("2024-07-22T16:08:00"),
    },
    {
      firstName: "Olivia",
      lastName: "Thomas",
      image: "https://example.com/oliviathomas.jpg",
      email: "olivia.thomas@example.com",
      location: "North America",
      time: new Date("2024-07-23T16:08:00"),
    },
  ]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    filterData(e.target.value, startingDate, endingDate);
  };

  // Function to handle date filter button click
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

  // Function to filter data based on search text and date range
  const filterData = (searchText, startDate, endDate) => {
    const filtered = data.filter((item) => {
      const itemDate = new Date(item.time);
      const includesSearch =
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.location.toLowerCase().includes(searchText.toLowerCase());
      const isInDateRange =
        !startDate ||
        !endDate ||
        (itemDate >= new Date(startDate) && itemDate <= new Date(endDate));
      return includesSearch && isInDateRange;
    });
    setFilteredData(filtered);
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
            Search
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
              placeholder="Search..."
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
              <b>Time</b>
              <b>View</b>
            </div>
            {filteredData.map((item, index) => (
              <div className="search-user-table-list-format" key={index}>
                <p>{index + 1}</p>
                <p>{item.firstName}</p>
                <p>{item.lastName}</p>
                <img
                  className="search-user-list-user-image"
                  src={item.image}
                  alt={`${item.firstName} ${item.lastName}`}
                />
                <p>{item.email}</p>
                <p>{item.location}</p>
                <p>{item.time.toLocaleString()}</p>
                <img
                  className="search-user-list-user-view"
                  src={userView}
                  alt="eye"
                  onClick={() => setShowUserProfile(true)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data-found">No data found</div>
        )}

        {showUserProfile && (
          <ShowUserProfilePopup setShowUserProfile={setShowUserProfile} />
        )}
      </div>
    </div>
  );
};

export default SearchUser;
