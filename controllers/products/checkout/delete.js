const { successMessageTypes, errors } = require('../../../constants');
const { Cart } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const DeleteProductCart = async (req, res, next) => {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const opt = { where: { id, userId: currentUser.id } };
    const cart = await Cart.findOne(opt);
    if (!cart) return next({ name: errors[404] });
    const deleteCart = await Cart.destroy(opt);
    if (!deleteCart) return next(deleteCart);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, 'Cart'),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProductCart };
