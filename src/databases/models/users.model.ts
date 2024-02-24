import mongoose from "mongoose";
import { UserSchema } from "../schemas/users.schema";

export const UserModel = mongoose.model("Users", UserSchema);
