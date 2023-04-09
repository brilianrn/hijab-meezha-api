const { successMessageTypes, errors } = require("../../../constants");
const { Product } = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const DeleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const product = await Product.findOne(opt);
    if (!product) return next({ name: errors[404] });
    const deleteProduct = await Product.destroy(opt);
    if (!deleteProduct) return next(deleteProduct);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.deleteData, "Product"),
          { id }
        )
      );
  } catch (error) {
    return next(error);
  }
};

module.exports = { DeleteProduct };
