import express from "express";
import ctrlContacts from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import checkEmptyBody from "../middlewares/checkEmptyBody.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrlContacts.getAllContacts);

contactsRouter.get("/:id", ctrlContacts.getOneContact);

contactsRouter.delete("/:id", ctrlContacts.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlContacts.createContact
);

contactsRouter.put(
  "/:id",
  checkEmptyBody,
  validateBody(updateContactSchema),
  ctrlContacts.updateContact
);

export default contactsRouter;
