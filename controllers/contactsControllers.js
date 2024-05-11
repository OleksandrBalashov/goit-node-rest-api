import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const allContacts = await contactsService.listContacts();

  res.json(allContacts);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.removeContact(id);

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const createContact = async (req, res) => {
  const newContact = await contactsService.addContact(req.body);

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const updatedContact = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;

  const updasteStatus = await contactsService.updateContact(id, body);

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updasteStatus);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
