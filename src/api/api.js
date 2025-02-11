const BACKEND_URL = "https://67a605c5510789ef0dfa1f89.mockapi.io/api/v1/users";

// Fetch all contacts
const fetchContacts = async () => {
  try {
    const response = await fetch(BACKEND_URL);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }
};

// Fetch a contact by ID
const fetchContactById = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching contact:", error);
    throw error;
  }
};

// Add a new contact
const addNewContact = async (contact) => {
  try {
    const response = await fetch(BACKEND_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding contact:", error);
    throw error;
  }
};

// Update an existing contact
const updateContact = async (id, updatedContact) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedContact),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw error;
  }
};

// Delete a contact with specific id
const deleteContact = async (id) => {
  try {
    const response = await fetch(`${BACKEND_URL}/${id}`, {
      method: "DELETE",
    });

    return id;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw error;
  }
};

export {
  fetchContacts,
  fetchContactById,
  addNewContact,
  updateContact,
  deleteContact,
};
