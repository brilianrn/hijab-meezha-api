const { errors, successMessageTypes } = require('../../../constants');
const { Tax } = require('../../../models');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindAllProductTax = async (req, res, next) => {
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
  };

  options = {
    where: filterObj,
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
    },
    ...options,
  };

  try {
    const allData = await Tax.findAll();
    totalRows = allData.length;
  } catch (error) {
    return next({ name: errors['404'] });
  }

  Tax.findAll(options)
    .then((data) => {
      const totalPage = Math.ceil(totalRows / limit);
      const currentPage = page;
      const nextPage = getNextPage(currentPage, limit, totalRows);
      const prevPage = getPreviousPage(currentPage);

      if (data.length) {
        return res.status(200).json(
          formatResponse(
            true,
            200,
            successMessages(successMessageTypes.findAll, 'Tax'),
            {
              totalRows,
              totalPage,
              prevPage,
              currentPage,
              nextPage,
              taxes: data,
            }
          )
        );
      } else {
        return next({ name: errors[404] });
      }
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

const FindAllProductTaxForDropDown = async (_, res, next) => {
  try {
    const opt = {
      where: { isActive: true },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
    };
    const sizes = await Tax.findAll(opt);

    if (!sizes) return next({ name: errors[404] });

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, 'Tax'),
          sizes
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindAllProductTax, FindAllProductTaxForDropDown };
