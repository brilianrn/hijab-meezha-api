const { errors, successMessageTypes } = require("../../../constants");
const {
  Category,
  Size,
  Tax,
  ProductStatus,
  Promo,
  Product,
} = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const UpdateProduct = async (req, res, next) => {
  const { categoryId, sizeId, taxId, promoId, productStatusId } = req.body;
  const { id } = req.currentAdmin;

  try {
    if (promoId)
      await FindPromo(promoId, (dataCb, err) => {
        if (!dataCb) {
          return next(
            err
              ? err
              : { name: errors["400_NOT_EXIST"], description: "Promo ID" }
          );
        }
      });
    await FindCategory(categoryId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err
            ? err
            : { name: errors["400_NOT_EXIST"], description: "Category ID" }
        );
    });
    await FindSize(sizeId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err ? err : { name: errors["400_NOT_EXIST"], description: "Size ID" }
        );
    });
    await FindTax(taxId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err ? err : { name: errors["400_NOT_EXIST"], description: "Tax ID" }
        );
    });
    await FindProductStatus(productStatusId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err
            ? err
            : {
                name: errors["400_NOT_EXIST"],
                description: "Product status ID",
              }
        );
    });

    const optProduct = { where: { id: req.params.id } };
    const findOne = await Product.findOne(optProduct);
    if (!findOne) {
      return next({ name: errors[404] });
    }
    await Product.update(
      {
        ...req.body,
        updatedBy: id,
      },
      optProduct
    );

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.updateData, "Product"),
          findOne
        )
      );
  } catch (error) {
    next(error);
  }
};

const FindCategory = async (id, done) => {
  try {
    const category = await Category.findOne({ where: { id } });
    if (!category) return done(null, false);
    return done(category, null);
  } catch (error) {
    return done(null, error);
  }
};

const FindSize = async (id, done) => {
  try {
    const size = await Size.findOne({ where: { id } });
    if (!size) return done(null, false);
    return done(size, null);
  } catch (error) {
    return done(null, error);
  }
};

const FindTax = async (id, done) => {
  try {
    const tax = await Tax.findOne({ where: { id } });
    if (!tax) return done(null, false);
    return done(tax, null);
  } catch (error) {
    return done(null, error);
  }
};

const FindProductStatus = async (id, done) => {
  try {
    const productStatus = await ProductStatus.findOne({ where: { id } });
    if (!productStatus) return done(null, false);
    return done(productStatus, null);
  } catch (error) {
    return done(null, error);
  }
};

const FindPromo = async (id, done) => {
  try {
    const productStatus = await Promo.findOne({ where: { id } });
    if (!productStatus) return done(null, false);
    return done(productStatus, null);
  } catch (error) {
    return done(null, error);
  }
};

module.exports = { UpdateProduct };
