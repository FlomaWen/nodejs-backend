import mongoose from "mongoose";

const { Schema } = mongoose;

export const CommentSchema = new Schema({
  authorId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
  articleId: {
    type: Schema.Types.ObjectId,
    ref: "Articles",
    required: true,
  },
});

CommentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
