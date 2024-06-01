import HttpError from "../helpers/HttpError.js";

const checkEmail = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(HttpError(400, "missing required field email"));
  }

  next();
};

export default checkEmail;
