const { successMessageTypes, errors } = require("../../../constants");
const { Product, ProductSize } = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const DeleteProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const opt = { where: { id } };
    const product = await Product.findOne(opt);
    if (!product) return next({ name: errors[404] });
    await DeleteProductSizeSelected(product.id);
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

const DeleteProductSizeSelected = async (productId) => {
  try {
    await ProductSize.destroy({ where: { productId } });
    return { data: "Product size successfully deleted", error: null };
  } catch (error) {
    return { error, data: null };
  }
};

module.exports = { DeleteProduct, DeleteProductSizeSelected };
