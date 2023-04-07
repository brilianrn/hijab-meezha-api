const { errors, successMessageTypes } = require("../../../constants");
const { Category } = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const FindAllProductCategory = async (req, res, next) => {
  const { pageSize, filter, sort } = req.query;

  const page = req.query.page ? +req.query.page : 1;
  const limit = pageSize ? +pageSize : 10;
  const sortObj = sort ? JSON.parse(sort)[0] : "";
  const sortKey = sortObj ? Object.keys(sortObj)[0] : "";
  const sortVal = sortKey ? JSON.parse(sort)[0][sortKey].toUpperCase() : "";

  let totalRows = 0;
  let filterObj = filter ? JSON.parse(filter) : {};
  let options = {
    order: sortKey && sortVal ? [[sortKey, sortVal]] : [],
    offset: page === 1 ? 0 : (page - 1) * limit,
  };

  options = {
    where: filterObj,
    attributes: {
      exclude: ["createdAt", "updatedAt", "createdBy", "updatedBy"],
    },
    ...options,
  };

  try {
    const allData = await Category.findAll();
    totalRows = allData.length;
  } catch (error) {
    return next({ name: errors["404"] });
  }

  Category.findAll(options)
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
            successMessages(successMessageTypes.findAll, "Category"),
            {
              totalRows,
              totalPage,
              prevPage,
              currentPage,
              nextPage,
              categories: data,
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

const FindAllProductCategoryForDropDown = async (req, res, next) => {
  try {
    const { isAll } = req.query;
    const opt = {
      where: {
        isActive: isAll ? [true, false] : true,
      },
      order: [["createdAt", "ASC"]],
      attributes: {
        exclude: ["updatedAt", "createdBy", "updatedBy"],
      },
    };
    const categories = await Category.findAll(opt);

    if (!categories) return next({ name: errors[404] });

    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, "Category"),
          categories
        )
      );
  } catch (error) {
    next(error);
  }
};

module.exports = { FindAllProductCategory, FindAllProductCategoryForDropDown };
