import express from "express";
import ctrlContacts from "../controllers/contactsControllers.js";
import validateBody from "../middlewares/validateBody.js";
import checkEmptyBody from "../middlewares/checkEmptyBody.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchema.js";
import isValidId from "../middlewares/isValidId.js";
import authenticate from "../middlewares/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlContacts.getAllContacts);

contactsRouter.get("/:id", isValidId, ctrlContacts.getOneContact);

contactsRouter.delete("/:id", isValidId, ctrlContacts.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlContacts.createContact
);

contactsRouter.put(
  "/:id",
  isValidId,
  checkEmptyBody,
  validateBody(updateContactSchema),
  ctrlContacts.updateContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  checkEmptyBody,
  validateBody(updateStatusSchema),
  ctrlContacts.updateStatusContact
);

export default contactsRouter;
