import HttpError from "../helpers/HttpError.js";

const checkEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);

  if (!length) {
    return next(HttpError(400, "Body must have at least 1 field"));
  }

  next();
};

export default checkEmptyBody;
