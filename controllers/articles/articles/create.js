const { errors, successMessageTypes } = require('../../../constants');
const { Article, ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateArticle = async (req, res, next) => {
  const { name, content, image, articleCategoryId } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article name',
    });
  if (!articleCategoryId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article category ID',
    });
  if (!content)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article content',
    });

  try {
    const articleCtg = await ArticleCategory.findOne({
      where: { id: articleCategoryId },
    });
    if (!articleCtg)
      return next({
        name: errors['404'],
        description: 'Article category',
      });

    const article = await Article.create({
      ...req.body,
      createdBy: id,
      updatedBy: id,
    });
    if (!article) return next(article);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Article'),
          { name, category: articleCtg.name, image }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateArticle };
