const { successMessageTypes, errors } = require('../../../constants');
const { UploadImage } = require('../../../services/imgur');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');
const { ProductThumbnail, Product, ProductImage } = require('../../../models');
const { UuidCheck } = require('../../../utils/check-fields');

const CreateThumbnailImage = async (req, res, next) => {
  if (!req.body.productId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product ID',
    });
  if (!UuidCheck(req.body.productId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Product ID',
    });

  try {
    await FindProduct(req.body.productId, (dataCb, err) => {
      if (!dataCb) {
        return next(
          err
            ? err
            : { name: errors['400_NOT_EXIST'], description: 'Product ID' }
        );
      }
    });
    const url = await UploadImage(req.files[0]);
    const payload = {
      url,
      name: 'Thumbnail from ' + req.body.productId,
      productId: req.body.productId,
    };

    const thumbnailProduct = await ProductThumbnail.create(payload);
    return res
      .status(201)
      .json(
        formatResponse(
          true,
          201,
          successMessages(
            successMessageTypes.createData,
            'Product thumbnail image'
          ),
          { thumbnailProduct }
        )
      );
  } catch (error) {
    return next(error);
  }
};

const CreateProductImages = async (req, res, next) => {
  let productImages = [];

  if (!req.body.productId)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product ID',
    });
  if (!UuidCheck(req.body.productId))
    return next({
      name: errors['400_WRONG_DATA_TYPE'],
      description: 'Product ID',
    });

  try {
    await FindProduct(req.body.productId, (dataCb, err) => {
      if (!dataCb) {
        return next(
          err
            ? err
            : { name: errors['400_NOT_EXIST'], description: 'Product ID' }
        );
      }
    });

    if (req.files.length > 0) {
      req.files.forEach(async (img, i) => {
        const url = await UploadImage(img);
        const payload = {
          url,
          name: 'Image from ' + req.body.productId,
          productId: req.body.productId,
        };

        const thumbnailProduct = await ProductImage.create(payload);
        productImages.push(thumbnailProduct);

        if (i === req.files.length - 1)
          return res
            .status(201)
            .json(
              formatResponse(
                true,
                201,
                successMessages(
                  successMessageTypes.createData,
                  'Product images'
                ),
                { productImages }
              )
            );
      });
    }
  } catch (error) {
    return next(error);
  }
};

const FindProduct = async (id, done) => {
  try {
    const product = await Product.findOne({ where: { id } });
    if (!product) return done(null, false);
    return done(product, null);
  } catch (error) {
    return done(null, error);
  }
};

module.exports = { CreateThumbnailImage, CreateProductImages };
