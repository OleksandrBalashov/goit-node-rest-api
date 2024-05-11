import express from "express";
import ctrlContacts from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import checkEmptyBody from "../middlewares/checkEmptyBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchema.js";

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

contactsRouter.patch(
  "/:id/favorite",
  checkEmptyBody,
  validateBody(updateStatusSchema),
  ctrlContacts.updateStatusContact
);

export default contactsRouter;
