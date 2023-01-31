const { errors, successMessageTypes } = require('../../../constants');
const { ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailArticleCategory = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Article Category ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };
    const articleCtg = await ArticleCategory.findOne(opt);

    if (!articleCtg) return next({ name: errors[404] });

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'ArticleCategory'),
          articleCtg
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailArticleCategory };
