import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

function updateContacts(list) {
  fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
}

async function listContacts() {
  const listContacts = await fs.readFile(contactsPath);

  return JSON.parse(listContacts);
}

async function getContactById(contactId) {
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);

  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const [contact] = contacts.splice(idx, 1);

  updateContacts(contacts);

  return contact;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  updateContacts(contacts);

  return newContact;
}

async function updateContact(contactId, data) {
  const contacts = await listContacts();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  contacts[idx] = { ...contacts[idx], ...data };

  updateContacts(contacts);

  return contacts[idx];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
