import * as UserRepository from "../repositories/users.repository";
import * as jwtUtils from "../utils/jwt.utils";

export const createUser = async (user) => {
  const isExistingUser = await UserRepository.findUserByEmail(user.email);
  if (isExistingUser) throw new Error("User already exists");

  user.password = jwtUtils.hashPassword(user.password);
  try {
    const newUser = await UserRepository.createUser(user);
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await UserRepository.findUserByEmail(email);
    return user;
  } catch (error) {
    throw error;
  }
};
