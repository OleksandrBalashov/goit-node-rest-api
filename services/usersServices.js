import User from "../models/User.js";
import bcrypt from "bcrypt";

export const findUser = (filter) => User.findOne(filter);

export const createUser = async (data) => {
  const password = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password });
};

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
