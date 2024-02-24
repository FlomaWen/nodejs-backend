import * as ArticlesRepository from "../repositories/articles.repository";

export const getArticles = async (filters?: any) => {
  try {
    let articles;

    if (filters) {
      articles = await ArticlesRepository.getArticlesByFilter(filters);
    } else {
      articles = await ArticlesRepository.getArticles();
    }

    return articles;
  } catch (err) {
    console.log("ErrorServiceGetArticles : ", err);
    throw err;
  }
};

export const createArticle = async (title, content, authorId, category) => {
  try {
    const newArticle = await ArticlesRepository.createArticle(
      title,
      content,
      authorId,
      category
    );
    return newArticle;
  } catch (error) {
    console.error("Error creating article in service:", error);
    throw error;
  }
};

export const getArticleById = async (id: string) => {
  try {
    const article = await ArticlesRepository.getArticleById(id);
    if (!article) {
      return null;
    }
    return article;
  } catch (error) {
    throw new Error("Error retrieving article by ID: " + error.message);
  }
};

export const updateArticle = async (id, title, content, category) => {
  try {
    const updatedArticle = await ArticlesRepository.UpdateArticle(
      id,
      title,
      content,
      category
    );
    return updatedArticle;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
export const deleteArticle = async (id) => {
  try {
    const deletedArticle = await ArticlesRepository.DeleteArticle(id);
    return deletedArticle;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
