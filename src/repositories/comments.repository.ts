import { CommentModel } from "../databases/models/comments.model";

export const createComment = async (comment) => {
  try {
    const newComment = await CommentModel.create(comment);
    return newComment;
  } catch (error) {
    throw error;
  }
};
export const updateComment = async (commentId, content) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    return updatedComment;
  } catch (error) {
    throw error;
  }
};
export const deleteComment = async (commentId) => {
  try {
    const deletedComment = await CommentModel.findByIdAndDelete(commentId);
    return deletedComment;
  } catch (error) {
    throw error;
  }
};
