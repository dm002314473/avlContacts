import React, { useState } from "react";
import ContactForm from "./ContactForm";
import "./ContactItem.css";

const ContactItem = ({ contact, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (updatedContact) => {
    alert(`Updated Contact: ${JSON.stringify(updatedContact)}`);
    onUpdate(updatedContact);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="contact-item">
      {isEditing ? (
        <ContactForm
          initialData={contact}
          onSubmit={handleEdit}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <h3>{contact.firstname + " " + contact.lastname}</h3>
          <p>Birthdate: {new Date(contact.birthdate).toLocaleDateString()}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button
            className="delete-button"
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default ContactItem;
