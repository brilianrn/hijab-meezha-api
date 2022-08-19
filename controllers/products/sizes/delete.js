const { successMessageTypes, errors } = require('../../../constants');
const { Size } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteProductSize = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const size = await Size.findOne(opt);
    if (!size) return next({ name: errors[404] });
    const deleteSize = await Size.destroy(opt);
    if (!deleteSize) return next(deleteSize);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Size'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProductSize };
