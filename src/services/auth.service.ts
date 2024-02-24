import * as jwtUtils from "../utils/jwt.utils";
import * as userService from "./users.service";

export const login = async (email, password) => {
  try {
    const user = await userService.getUserByEmail(email);
    if (!user) throw new Error("User not found");

    const isPasswordCorrect = jwtUtils.comparePassword(password, user.password);
    if (!isPasswordCorrect) throw new Error("Incorrect password");

    const accessToken = jwtUtils.generateAccessToken(
      user._id,
      email,
      user.role,
      user.username
    );
    const refreshToken = await jwtUtils.generateRefreshToken({ email: email });
    return { accessToken, refreshToken };
  } catch (error) {
    throw error;
  }
};
