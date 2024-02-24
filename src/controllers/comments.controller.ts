import * as commentService from "../services/comments.service";

export const addCommentToArticle = async (req, res) => {
  try {
    const { id: articleId } = req.params;
    const { content } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!articleId || !content) {
      return res
        .status(400)
        .json({ message: "Article ID and new comment are required" });
    }

    const newComment = {
      authorId: req.user.userId,
      authorName: req.user.username,
      content: content,
      articleId: articleId,
    };

    const updatedArticle = await commentService.createComment(newComment);
    res.status(200).json({ message: "Added comment :", updatedArticle });
  } catch (error) {
    console.error("Error adding comment to article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    // Vérifier si l'utilisateur est connecté

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Modifier le commentaire
    const updatedComment = await commentService.updateComment(
      commentId,
      content
    );

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Verify if user is same than the auuthor
    if (req.user.userId !== updatedComment.authorId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized you are not the author" });
    }

    res
      .status(200)
      .json({ message: "Comment updated successfully", updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const deletedComment = await commentService.deleteComment(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Verify if user is same than the auuthor
    if (req.user.userId !== deletedComment.authorId.toString()) {
      return res
        .status(401)
        .json({ message: "Unauthorized you are not the author" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
