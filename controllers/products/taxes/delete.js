const { successMessageTypes, errors } = require('../../../constants');
const { Tax } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteProductTax = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id, isActive: true } };
    const tax = await Tax.findOne(opt);
    if (!tax) return next({ name: errors[404] });
    const deleteTax = await Tax.destroy(opt);
    if (!deleteTax) return next(deleteTax);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Tax'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProductTax };
