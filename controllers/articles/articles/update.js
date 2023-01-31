const { errors, successMessageTypes } = require('../../../constants');
const { Article, ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateArticle = async (req, res, next) => {
  const { name, content, image, articleCategoryId } = req.body;
  const { id } = req.params;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article name',
    });
  if (!articleCategoryId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article ID',
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

    const opt = { where: { id } };
    const payload = {
      ...req.body,
      updatedBy: req.currentAdmin.id,
    };
    console.log(payload, ' = payload payload payload');
    const updateArticle = await Article.update(payload, opt);
    if (!updateArticle) return next(updateArticle);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, 'Article'),
          { name, category: articleCtg.name, image }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateArticle };
