import mongoose from "mongoose";
import { ArticleSchema } from "../schemas/articles.schema";

export const ArticlesModel = mongoose.model("Articles", ArticleSchema);
