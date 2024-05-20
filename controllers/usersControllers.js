import ctrlWrapper from "../decorators/ctrlWrapper.js";
import HttpError from "../helpers/HttpError.js";
import compareHash from "../helpers/compareHash.js";
import { createToken } from "../helpers/jwt.js";
import * as usersServices from "../services/usersServices.js";

const signup = async (req, res) => {
  const { email } = req.body;
  const user = await usersServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await usersServices.createUser(req.body);

  res.status(201).json({
    user: { email: newUser.email, subscription: newUser.subscription },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await usersServices.findUser({ email });
  const isComparePassword = await compareHash(password, user?.password);

  if (!user || !isComparePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id, subscription } = user;

  const token = createToken({ _id });
  await usersServices.updateUser({ _id }, { token });

  res.json({
    token,
    user: { email, subscription },
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await usersServices.updateUser({ _id }, { token: null });

  res.status(204).send();
};

const current = async (req, res) => {
  const { _id } = req.user;

  const user = await usersServices.findUser({ _id });

  if (!user) {
    next(HttpError(401));
  }

  const { email, subscription } = user;

  res.json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const contact = await usersServices.updateUser({ _id }, req.body);

  res.json(contact);
};

export default {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  current: ctrlWrapper(current),
  updateSubscription: ctrlWrapper(updateSubscription),
};
