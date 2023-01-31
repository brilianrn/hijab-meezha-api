const { errors, successMessageTypes } = require('../../../constants');
const { ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const UpdateArticleCategory = async (req, res, next) => {
  const { name, code, image } = req.body;
  const { id } = req.params;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article Category name',
    });
  if (!code)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article Category code',
    });

  try {
    const opt = { where: { id } };
    const payload = {
      name,
      code,
      image,
      updatedBy: req.currentAdmin.id,
    };
    const updateArticleCtg = await ArticleCategory.update(payload, opt);
    if (!updateArticleCtg) return next(updateArticleCtg);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, 'Article category'),
          { name, code, image }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { UpdateArticleCategory };
