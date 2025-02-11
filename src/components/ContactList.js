import React, { useEffect, useState } from "react";
import { fetchContacts, deleteContact, updateContact } from "../api/api";
import ContactItem from "./ContactItem";
import "./ContactList.css";
import LoadingSpinner from "../components/LoadingSpinner";

const ContactList = ({ searchQuery }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getContacts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchContacts();
        setContacts(data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getContacts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
      alert("Contact deleted successfully!");
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const handleUpdate = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updateContact.id ? updatedContact : contact
      )
    );
  };

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="contact-list">
      <h2>Contact List</h2>
      {isLoading ? (
        <LoadingSpinner />
      ) : filteredContacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            contact={contact}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default ContactList;
