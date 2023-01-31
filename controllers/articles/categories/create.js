const { errors, successMessageTypes } = require('../../../constants');
const { ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateArticleCategory = async (req, res, next) => {
  const { name, code, image } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article category name',
    });
  if (!code)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article category code',
    });

  try {
    const category = await ArticleCategory.create({
      name,
      code,
      image,
      createdBy: id,
      updatedBy: id,
    });
    if (!category) return next(category);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'ArticleCategory'),
          { name, code, image }
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { CreateArticleCategory };
