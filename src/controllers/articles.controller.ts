import { Types } from "mongoose";
import * as ArticlesService from "../services/articles.service";

export const getArticles = async (req, res) => {
  try {
    const { keyword, startDate, endDate, userId, category } = req.query;

    const filters = {
      keyword: keyword ? String(keyword) : undefined,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      userId: userId ? String(userId) : undefined,
      category: category ? String(category) : undefined,
    };

    const articles = await ArticlesService.getArticles(filters);

    if (!articles || articles.length === 0) {
      return res.status(404).json({ error: "No articles found" });
    }

    res.status(200).json(articles);
  } catch (err) {
    console.log("ErrorControllerGetArticles : ", err);
    res.status(500).send(err);
  }
};

export const createArticle = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("requser", req.user);

    const { title, content, category } = req.body;
    const authorId = req.user.userId;
    console.log("authorId :", authorId);

    const newArticle = await ArticlesService.createArticle(
      title,
      content,
      authorId,
      category
    );

    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticlesService.getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.status(200).json(article);
  } catch (err) {
    console.log("Error getting article by ID (controller): ", err);
    res.status(500).json({
      error: "Error getting article by ID",
    });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
      return res
        .status(400)
        .json({ message: "Title, content, and category are required" });
    }

    const updatedArticle = await ArticlesService.updateArticle(
      id,
      title,
      content,
      category
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Modified article :", updatedArticle });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await ArticlesService.deleteArticle(id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Deleted article :", deletedArticle });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
