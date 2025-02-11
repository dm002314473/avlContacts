import React, { useState, useEffect } from "react";
import { updateContact } from "../api/api";
import "./ContactForm.css";

const ContactForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    firstname: initialData.firstname || "",
    lastname: initialData.lastname || "",
    birthdate: initialData.birthdate ? formatDate(initialData.birthdate) : "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    id: initialData.id || "",
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData({
      firstname: initialData.firstname || "",
      lastname: initialData.lastname || "",
      birthdate: initialData.birthdate ? formatDate(initialData.birthdate) : "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      id: initialData.id || "",
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      await updateContact(formData.id, formData);
      onSubmit(formData);
    } catch (error) {
      console.error("Error updating contact:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstname: initialData.firstname || "",
      lastname: initialData.lastname || "",
      birthdate: initialData.birthdate ? formatDate(initialData.birthdate) : "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      id: initialData.id || "",
    });
    onCancel();
  };

  return (
    <div className="contact-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name: </label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Last Name: </label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Birthdate:</label>
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="buttons">
          <button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={handleCancel} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
