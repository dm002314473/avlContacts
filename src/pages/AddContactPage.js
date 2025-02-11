import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addNewContact } from "../api/api";
import ContactForm from "../components/ContactForm";
import "./AddContactPage.css";
import LoadingSpinner from "../components/LoadingSpinner";

const AddContactPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (newContact) => {
    setIsLoading(true);
    try {
      await addNewContact(newContact);
      alert("Contact added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding contact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="add-contact-page">
      <h1>Add new Contact</h1>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ContactForm
          initialData={{}}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default AddContactPage;
