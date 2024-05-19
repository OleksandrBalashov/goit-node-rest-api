import Joi from "joi";
import { emailRegexp } from "../constants/users.js";

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().required(),
});
