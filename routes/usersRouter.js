import express from "express";
import checkEmptyBody from "../middlewares/checkEmptyBody.js";
import validateBody from "../middlewares/validateBody.js";
import { userSignupSchema } from "../schemas/usersSchema.js";
import usersCtrl from "../controllers/usersControllers.js";
import authenticate from "../middlewares/authenticate.js";
import { updateSubscriptionSchema } from "../schemas/contactsSchema.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  checkEmptyBody,
  validateBody(userSignupSchema),
  usersCtrl.signup
);

usersRouter.post(
  "/login",
  checkEmptyBody,
  validateBody(userSignupSchema),
  usersCtrl.login
);

usersRouter.post("/logout", authenticate, usersCtrl.logout);

usersRouter.get("/current", authenticate, usersCtrl.current);

usersRouter.patch(
  "/",
  authenticate,
  checkEmptyBody,
  validateBody(updateSubscriptionSchema),
  usersCtrl.updateSubscription
);

export default usersRouter;
