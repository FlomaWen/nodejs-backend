import mongoose from "mongoose";
import { CommentSchema } from "../schemas/comments.schema";
export const CommentModel = mongoose.model("Comments", CommentSchema);
