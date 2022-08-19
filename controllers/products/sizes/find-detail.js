const { errors, successMessageTypes } = require('../../../constants');
const { Size } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailProductSize = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Size ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };

    const size = await Size.findOne(opt);

    if (!size) return next({ name: errors[404] });
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Size'),
          size
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailProductSize };
