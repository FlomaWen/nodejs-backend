import { ArticlesModel } from "../databases/models/articles.model";

export const getArticles = async () => {
  try {
    const articles = await ArticlesModel.find();
    return articles;
  } catch (err) {
    console.log("ErrorRepoGetArticles : ", err);
    throw err;
  }
};

export const getArticlesByFilter = async (filters?: any) => {
  try {
    let query = {};

    // Si des filtres sont fournis, les inclure dans la requête
    if (filters) {
      if (filters.keyword) {
        // Filtrer par mot-clé dans le titre
        query["title"] = { $regex: filters.keyword, $options: "i" };
        query["content"] = { $regex: filters.keyword, $options: "i" };
      }
      if (filters.startDate && filters.endDate) {
        // Filtrer par plage de dates
        query["createdAt"] = {
          $gte: new Date(filters.startDate),
          $lte: new Date(filters.endDate),
        };
      }
      if (filters.userId) {
        // Filtrer par auteur
        query["author"] = filters.userId;
      }
      if (filters.category) {
        // Filtrer par catégorie
        query["category"] = filters.category;
      }
    }

    const articles = await ArticlesModel.find(query);
    return articles;
  } catch (err) {
    console.log("ErrorRepoGetArticles : ", err);
    throw err;
  }
};

export const createArticle = async (title, content, authorId, category) => {
  try {
    const newArticle = new ArticlesModel({
      title,
      content,
      author: authorId,
      category,
    });
    const savedArticle = await newArticle.save();
    return savedArticle;
  } catch (error) {
    console.error("Error creating article in repository:", error);
    throw error;
  }
};

export const getArticleById = async (id: string) => {
  try {
    const article = await ArticlesModel.findById(id);
    if (!article) {
      return null;
    }

    const category = article.category;
    const randomArticles = await ArticlesModel.aggregate([
      { $match: { category: category, _id: { $ne: article._id } } }, // Exclure l'article actuel
      { $sample: { size: 2 } }, // max 2 articles aléatoires
    ]);

    return { article, suggestions: randomArticles };
  } catch (error) {
    console.log("Error getting article by ID in repository: ", error);
  }
};

export const addCommentToArticle = async (articleId, newComment) => {
  try {
    const updatedArticle = await ArticlesModel.findOneAndUpdate(
      { _id: articleId },
      { $push: { comments: newComment } },
      { new: true }
    );
    return updatedArticle;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};
export const UpdateArticle = async (id, title, content, category) => {
  try {
    const updatedArticle = await ArticlesModel.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );
    return updatedArticle;
  } catch (error) {
    console.error("Error updating article:", error);
    throw error;
  }
};
export const DeleteArticle = async (id) => {
  try {
    const deletedArticle = await ArticlesModel.findByIdAndDelete(id);
    return deletedArticle;
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error;
  }
};
