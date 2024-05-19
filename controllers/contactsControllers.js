import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import contactsService from "../services/contactsServices.js";

const getAllContacts = async (req, res) => {
  const {
    user: { id: owner },
    query: { page = 1, limit = 20, favorite },
  } = req;

  const skip = (page - 1) * limit;

  const filter = { owner, ...(favorite ? { favorite } : {}) };

  const settings = { skip, limit };

  const allContacts = await contactsService.listContacts({ filter, settings });

  res.json(allContacts);
};

const getOneContact = async (req, res) => {
  const {
    params: { id: _id },
    user: { id: owner },
  } = req;
  const contact = await contactsService.getContact({ _id, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const deleteContact = async (req, res) => {
  const {
    params: { id: _id },
    user: { id: owner },
  } = req;

  const contact = await contactsService.removeContact({ _id, owner });

  if (!contact) {
    throw HttpError(404, "Not found");
  }

  res.json(contact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await contactsService.addContact({ ...req.body, owner });

  res.status(201).json(newContact);
};

const updateContact = async (req, res) => {
  const {
    params: { id: _id },
    body,
    user: { id: owner },
  } = req;

  const updatedContact = await contactsService.updateContact(
    { _id, owner },
    body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

const updateStatusContact = async (req, res) => {
  const {
    params: { id: _id },
    body,
    user: { id: owner },
  } = req;

  const updatedContact = await contactsService.updateContact(
    { _id, owner },
    body
  );

  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }

  res.json(updatedContact);
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  deleteContact: ctrlWrapper(deleteContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
