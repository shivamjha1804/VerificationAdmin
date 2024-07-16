import React from "react";
import "./AllUser.css";

const AllUser = () => {
  const data = [
    {
      firstName: "John",
      lastName: "Doe",
      image: "https://example.com/johndoe.jpg",
      email: "john.doe@example.com",
    },
    {
      firstName: "Jane",
      lastName: "Smith",
      image: "https://example.com/janesmith.jpg",
      email: "jane.smith@example.com",
    },
    {
      firstName: "Michael",
      lastName: "Johnson",
      image: "https://example.com/michaeljohnson.jpg",
      email: "michael.johnson@example.com",
    },
    {
      firstName: "Emily",
      lastName: "Williams",
      image: "https://example.com/emilywilliams.jpg",
      email: "emily.williams@example.com",
    },
    {
      firstName: "David",
      lastName: "Brown",
      image: "https://example.com/davidbrown.jpg",
      email: "david.brown@example.com",
    },
    {
      firstName: "Sarah",
      lastName: "Miller",
      image: "https://example.com/sarahmiller.jpg",
      email: "sarah.miller@example.com",
    },
    {
      firstName: "James",
      lastName: "Davis",
      image: "https://example.com/jamesdavis.jpg",
      email: "james.davis@example.com",
    },
    {
      firstName: "Anna",
      lastName: "Wilson",
      image: "https://example.com/annawilson.jpg",
      email: "anna.wilson@example.com",
    },
    {
      firstName: "Robert",
      lastName: "Martinez",
      image: "https://example.com/robertmartinez.jpg",
      email: "robert.martinez@example.com",
    },
    {
      firstName: "Olivia",
      lastName: "Garcia",
      image: "https://example.com/oliviagarcia.jpg",
      email: "olivia.garcia@example.com",
    },
  ];


  return (
    <div className="all-user-list">
      <p className="all-user-title">All Users</p>
      <div className="all-user-table-list">
        <div className="all-user-table-list-format">
          <b>SI/No.</b>
          <b>First name</b>
          <b>Last name</b>
          <b>Image</b>
          <b>Email</b>  
        </div>
        {data.map((item, index) => {
          return (
            <div className="all-user-table-list-format" key={index}>
              <p>{index + 1}</p>
              <p>{item.firstName}</p>
              <p>{item.lastName}</p>
              <img src={item.image} />
              <p>{item.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllUser;
