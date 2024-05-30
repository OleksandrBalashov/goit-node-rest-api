import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUser } from "../services/usersServices.js";

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  console.log(req);

  if (!authorization) {
    return next(HttpError(401));
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    return next(HttpError(401, "Bearer not found"));
  }

  try {
    const { _id } = jwt.verify(token, JWT_SECRET);

    const user = await findUser({ _id });

    if (!user) {
      return next(HttpError(401));
    }

    if (!user.token) {
      return next(HttpError(401, "User have been already logout"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, error.message));
  }
};

export default authenticate;
