const { errors, successMessageTypes } = require('../../../constants');
const { Product } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');
const { FindThumbnail, FindImages } = require('./find-all');

const FindDetailProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id)
    return next({
      name: errors['400_EMPTY_FIELD'],
      description: 'Product ID',
    });

  try {
    const opt = {
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };
    const product = await Product.findOne(opt);
    if (!product) return next({ name: errors[404] });
    let tempProd = product;

    await FindThumbnail(id, async (dataThumbnail, err) => {
      if (err) {
        return next(err);
      }
      tempProd = {
        ...product.dataValues,
        thumbnail: dataThumbnail ? dataThumbnail.url : null,
      };

      await FindImages(id, (dataImages, err) => {
        if (err) {
          return next(err);
        }
        tempProd = { ...tempProd, images: dataImages || null };
        return res
          .status(200)
          .json(
            formatResponse(
              true,
              200,
              successMessages(successMessageTypes.findDetail, 'Product'),
              tempProd
            )
          );
      });
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { FindDetailProduct };
