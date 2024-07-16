import React from "react";
import "./LoggedOutUser.css";

const LoggedOutUser = () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/johndoe.jpg",
      email: "john.doe@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      image: "https://example.com/janesmith.jpg",
      email: "jane.smith@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      image: "https://example.com/michaeljohnson.jpg",
      email: "michael.johnson@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Emily",
      lastName: "Williams",
      image: "https://example.com/emilywilliams.jpg",
      email: "emily.williams@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "David",
      lastName: "Brown",
      image: "https://example.com/davidbrown.jpg",
      email: "david.brown@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Sarah",
      lastName: "Miller",
      image: "https://example.com/sarahmiller.jpg",
      email: "sarah.miller@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "James",
      lastName: "Davis",
      image: "https://example.com/jamesdavis.jpg",
      email: "james.davis@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Anna",
      lastName: "Wilson",
      image: "https://example.com/annawilson.jpg",
      email: "anna.wilson@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Robert",
      lastName: "Martinez",
      image: "https://example.cActiveUserom/robertmartinez.jpg",
      email: "robert.martinez@example.com",
      location: "America",
      time: "30min",
    },
    {
      firstName: "Olivia",
      lastName: "Garcia",
      image: "https://example.com/oliviagarcia.jpg",
      email: "olivia.garcia@example.com",
      location: "America",
      time: "30min",
    },
  ];

  return (
    <div className="logged-out-user-list">
      <p className="logged-out-user-title">Logged Out Users</p>
      <div className="logged-out-user-table-list">
        <div className="logged-out-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>
          <b>Location</b>
          <b>Time</b>
        </div>
        {data.map((item, index) => {
          return (
            <div className="logged-out-user-table-list-format" key={index}>
              <p>{index + 1}</p>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
              <img src={item.image} />
              <p>{item.email}</p>
              <p>{item.location}</p>
              <p>{item.time}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoggedOutUser;
