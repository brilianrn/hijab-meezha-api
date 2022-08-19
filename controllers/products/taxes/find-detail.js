const { errors, successMessageTypes } = require('../../../constants');
const { Tax } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindDetailProductTax = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Tax ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };

    const size = await Tax.findOne(opt);

    if (!size) return next({ name: errors[404] });
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findDetail, 'Tax'),
          size
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailProductTax };
