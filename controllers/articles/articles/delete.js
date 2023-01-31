const { successMessageTypes, errors } = require('../../../constants');
const { Article } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteArticle = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const article = await Article.findOne(opt);
    if (!article) return next({ name: errors[404] });
    const deleteCategory = await Article.destroy(opt);
    if (!deleteCategory) return next(deleteCategory);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Article'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteArticle };
