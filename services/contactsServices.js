import Contact from "../models/Contact.js";

const listContacts = (search = {}) => {
  const { filter = {}, fields = "", settings = {} } = search;
  return Contact.find(filter, fields, settings).populate(
    "owner",
    "email subscription"
  );
};

const getContact = (filter) => Contact.findOne(filter);

const removeContact = (filter) => Contact.findOneAndDelete(filter);

const addContact = (data) => Contact.create(data);

const updateContact = (filter, data) => Contact.findOneAndUpdate(filter, data);

export default {
  listContacts,
  getContact,
  removeContact,
  addContact,
  updateContact,
};
