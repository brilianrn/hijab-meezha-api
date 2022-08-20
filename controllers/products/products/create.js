const { errors, successMessageTypes } = require('../../../constants');
const {
  Category,
  Size,
  Tax,
  ProductStatus,
  Promo,
  Product,
} = require('../../../models');
const { UuidCheck, RoundNumberCheck } = require('../../../utils/check-fields');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const CreateProduct = async (req, res, next) => {
  const {
    categoryId,
    sizeId,
    taxId,
    promoId,
    productStatusId,
    name,
    description,
    stock,
    price,
    priceAfterDiscount,
    code,
  } = req.body;
  const { id } = req.currentAdmin;

  if (!name)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product name',
    });
  if (!description)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product description',
    });
  if (!stock)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product stock',
    });
  if (!RoundNumberCheck(stock))
    return next({
      name: errors['400_NOT_NUMBER'],
      description: 'Product stock-round',
    });
  if (!price)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product price',
    });
  if (!RoundNumberCheck(price))
    return next({
      name: errors['400_NOT_NUMBER'],
      description: 'Product price-round',
    });
  if (!priceAfterDiscount)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product price after discount',
    });
  if (!RoundNumberCheck(priceAfterDiscount))
    return next({
      name: errors['400_NOT_NUMBER'],
      description: 'Product price after discount-round',
    });
  if (!promoId) {
    if (price !== priceAfterDiscount)
      return next({
        name: errors['400_WRONG_FIELD'],
        description: 'Price after discount',
      });
  } else {
    if (!UuidCheck(promoId))
      return next({
        name: errors['400_WRONG_DATA_TYPE'],
        description: 'Promo ID',
      });
  }
  if (!code)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product code',
    });
  if (!categoryId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Category ID',
    });
  if (!UuidCheck(categoryId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Category ID',
    });
  if (!sizeId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Size ID',
    });
  if (!UuidCheck(sizeId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Size ID',
    });
  if (!taxId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Tax ID',
    });
  if (!UuidCheck(taxId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Tax ID',
    });
  if (!productStatusId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product status ID',
    });
  if (!UuidCheck(productStatusId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Product status ID',
    });

  try {
    if (promoId)
      await FindPromo(promoId, (dataCb, err) => {
        if (!dataCb) {
          return next(
            err
              ? err
              : { name: errors['400_NOT_EXIST'], description: 'Promo ID' }
          );
        }
      });
    await FindCategory(categoryId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err
            ? err
            : { name: errors['400_NOT_EXIST'], description: 'Category ID' }
        );
    });
    await FindSize(sizeId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err ? err : { name: errors['400_NOT_EXIST'], description: 'Size ID' }
        );
    });
    await FindTax(taxId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err ? err : { name: errors['400_NOT_EXIST'], description: 'Tax ID' }
        );
    });
    await FindProductStatus(productStatusId, (dataCb, err) => {
      if (!dataCb)
        return next(
          err
            ? err
            : {
                name: errors['400_NOT_EXIST'],
                description: 'Product status ID',
              }
        );
    });

    const createProduct = await Product.create({
      ...req.body,
      createdBy: id,
      updatedBy: id,
    });

    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(successMessageTypes.createData, 'Product'),
          { product: createProduct }
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

module.exports = { CreateProduct };
