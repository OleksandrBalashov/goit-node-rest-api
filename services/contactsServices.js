import Contact from "../models/Contact.js";

const listContacts = () => Contact.find({});

const getContactById = (id) => Contact.findById(id);

const removeContact = (id) => Contact.findByIdAndDelete(id);

const addContact = (data) => Contact.create(data);

const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
