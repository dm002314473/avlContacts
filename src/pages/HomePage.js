import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContactList from "../components/ContactList";
import "./HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreateNewContact = () => {
    navigate("/add");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="home-page">
      <h1>Contacts</h1>
      <a
        href="/add"
        className="create-new-contact"
        onClick={handleCreateNewContact}
      >
        Create New Contact
      </a>
      <div className="search-container">
        <label htmlFor="search" className="search-label">
          Search by name:
        </label>
        <input
          type="text"
          id="search"
          placeholder="Enter name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
      <ContactList searchQuery={searchQuery} />{" "}
    </div>
  );
};

export default HomePage;
