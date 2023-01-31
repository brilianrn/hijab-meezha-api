const { successMessageTypes, errors } = require('../../../constants');
const { ArticleCategory } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteArticleCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const articleCtg = await ArticleCategory.findOne(opt);
    if (!articleCtg) return next({ name: errors[404] });
    const deleteCategory = await ArticleCategory.destroy(opt);
    if (!deleteCategory) return next(deleteCategory);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'ArticleCategory'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteArticleCategory };
