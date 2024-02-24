import { UserModel } from "../databases/models/users.model";

export const createUser = async (user) => {
  try {
    const newUser = await UserModel.create(user);

    return newUser;
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const user = await UserModel.findOne({ email });
    return user;
  } catch (error) {
    throw error;
  }
};
