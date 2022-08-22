const { errors, successMessageTypes } = require('../../../constants');
const { Product, ProductThumbnail, ProductImage } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindAllProduct = async (req, res, next) => {
  const { pageSize, filter, sort } = req.query;
  const page = req.query.page ? +req.query.page : 1;

  const limit = pageSize ? +pageSize : 10;
  const sortObj = sort ? JSON.parse(sort)[0] : '';
  const sortKey = sortObj ? Object.keys(sortObj)[0] : '';
  const sortVal = sortKey ? JSON.parse(sort)[0][sortKey].toUpperCase() : '';

  let totalRows = 0;
  let filterObj = filter ? JSON.parse(filter) : {};
  let options = {
    order: sortKey && sortVal ? [[sortKey, sortVal]] : [],
    offset: page === 1 ? 0 : (page - 1) * limit,
    limit,
  };

  options = {
    where: filterObj,
    attributes: {
      exclude: ['updatedAt', 'createdBy', 'updatedBy'],
    },
    include: [
      { model: ProductThumbnail, attributes: ['url'] },
      { model: ProductImage, attributes: ['url'] },
    ],
    ...options,
  };

  try {
    const allData = await Product.findAll(filterObj && { where: filterObj });
    totalRows = allData.length;
  } catch (error) {
    return next({ name: errors['404'] });
  }

  Product.findAll(options)
    .then((data) => {
      const totalPage = Math.ceil(totalRows / limit);
      const currentPage = page;
      const nextPage = getNextPage(currentPage, limit, totalRows);
      const prevPage = getPreviousPage(currentPage);
      return res.status(200).json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, 'Product'),
          {
            limit,
            totalRows,
            totalPage,
            prevPage,
            currentPage,
            nextPage,
            products: data,
          }
        )
      );
    })
    .catch((err) => {
      next({ name: err.message });
    });
};

const getNextPage = (page, limit, total) => {
  if (total / limit > page) {
    return page + 1;
  }

  return null;
};

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null;
  }
  return page - 1;
};

const FindThumbnail = async (productId, done) => {
  try {
    const thumbnail = await ProductThumbnail.findOne({
      where: { productId },
      attributes: ['url'],
    });
    if (!thumbnail) return done(null, false);
    return done(thumbnail, null);
  } catch (error) {
    return done(null, error);
  }
};

const FindImages = async (productId, done) => {
  try {
    const images = await ProductImage.findAll({
      where: { productId },
      attributes: ['url'],
    });
    if (!images) return done(null, false);
    return done(images, null);
  } catch (error) {
    return done(null, error);
  }
};

module.exports = { FindAllProduct, FindThumbnail, FindImages };
