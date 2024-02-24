import * as commentRepository from "../repositories/comments.repository";

export const createComment = async (comment) => {
  try {
    const newComment = await commentRepository.createComment(comment);
    return newComment;
  } catch (error) {
    throw error;
  }
};
export const updateComment = async (commentId, content) => {
  try {
    const updatedComment = await commentRepository.updateComment(
      commentId,
      content
    );
    return updatedComment;
  } catch (error) {
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const deletedComment = await commentRepository.deleteComment(commentId);
    return deletedComment;
  } catch (error) {
    throw error;
  }
};
