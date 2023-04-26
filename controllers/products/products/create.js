const { errors, successMessageTypes } = require("../../../constants");
const {
  Category,
  Size,
  Tax,
  ProductStatus,
  Promo,
  Product,
  ProductSize,
} = require("../../../models");
const {
  AddPromoToPrice,
  AddTaxToPrice,
} = require("../../../utils/format-data");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const CreateProduct = async (req, res, next) => {
  const { categoryId, taxId, productStatusId, ProductSizes } = req.body;
  const { id } = req.currentAdmin;

  try {
    await FindCategory(categoryId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err
            ? err
            : { name: errors["400_NOT_EXIST"], description: "Category ID" }
        );
    });
    const tax = await FindTax(taxId, (dataCb, err) => {
      if (!dataCb) {
        return next(
          err ? err : { name: errors["400_NOT_EXIST"], description: "Tax ID" }
        );
      }
      return dataCb;
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

    delete req.body.ProductSizes;
    const createProduct = await Product.create({
      ...req.body,
      createdBy: id,
      updatedBy: id,
    });

    const { data, error } = await FormatProductSize(
      ProductSizes,
      tax.amount,
      createProduct.id,
      id
    );

    if (error) {
      await Product.destroy({ where: { id: createProduct.id } });
      return next(
        err
          ? err
          : {
              name: errors[400],
              description: "Invalid create product",
            }
      );
    }
    await ProductSize.bulkCreate(data);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, "Product"),
          createProduct
        )
      );
  } catch (error) {
    next(error);
  }
};

const FormatProductSize = async (productSizes, tax, productId, adminId) => {
  try {
    const data = await Promise.all(
      productSizes.map(async (e) => {
        const size = await FindSize(e.sizeId, (dataCb, err) => {
          if (!dataCb && err) throw new Error(err);
          return dataCb;
        });
        if (!size) {
          throw new Error("Size not found");
        }
        const result = {
          ...e,
          priceAfterDiscount: e.price,
          promoId: null,
          productId,
          isActive: true,
          createdBy: adminId,
          updatedBy: adminId,
        };
        if (e.promoId) {
          const promo = await FindPromo(e.promoId);
          if (!promo) {
            throw new Error("Promo not found");
          }
          const priceDiscount = AddPromoToPrice(promo.amount, e.price);
          return {
            ...result,
            priceAfterDiscount: AddTaxToPrice(tax, priceDiscount),
            promoId: promo.id,
          };
        }
        return result;
      })
    );
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const FindCategory = async (id, done) => {
  try {
    const category = await Category.findOne({ where: { id, isActive: true } });
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
    const tax = await Tax.findOne({ where: { id, isActive: true } });
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
    const productStatus = await Promo.findOne({
      where: { id, isActive: true },
    });
    if (!productStatus) return done(null, false);
    return done(productStatus, null);
  } catch (error) {
    return done(null, error);
  }
};

module.exports = { CreateProduct, FormatProductSize };
