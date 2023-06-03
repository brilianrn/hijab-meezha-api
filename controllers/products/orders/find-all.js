const moment = require("moment");
const { Op } = require("sequelize");
const {
  errors,
  successMessageTypes,
  excludeColumns,
} = require("../../../constants");
const {
  Order,
  CommonStatus,
  Tax,
  OrderProduct,
  Address,
  Category,
  Promo,
  Product,
  ProductThumbnail,
  ProductSize,
  ProductImage,
} = require("../../../models");
const formatResponse = require("../../../utils/format-response");
const { successMessages } = require("../../../utils/messages-generate");

const FindAllUserOrders = async (req, res, next) => {
  const { id } = req.currentUser;
  const { pageSize, filter, sort, date } = req.query;
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
    limit,
  };

  if (date) {
    filterObj = {
      ...filterObj,
      userId: id,
      createdAt: {
        [Op.gte]: moment().subtract(+date, "days").toDate(),
      },
    };
  }

  filterObj = {
    ...filterObj,
    userId: id,
  };

  options = {
    where: filterObj,
    attributes: {
      exclude: ["updatedAt", "createdBy", "updatedBy"],
    },
    include: [
      {
        model: OrderProduct,
        attributes: ["id", "qty"],
        include: [
          {
            model: ProductSize,
            attributes: { exclude: excludeColumns },
            include: [
              {
                model: Product,
                attributes: { exclude: excludeColumns },
                include: [
                  { model: ProductThumbnail, attributes: ["url"] },
                  { model: ProductImage, attributes: ["url"] },
                ],
              },
            ],
            // include: [
            //   { model: ProductThumbnail, attributes: ["url"] },
            //   { model: ProductImage, attributes: ["url"] },
            // ],
          },
        ],
      },
      {
        model: CommonStatus,
        attributes: ["name", "code"],
      },
      {
        model: Tax,
        attributes: ["name", "amount"],
      },
      {
        model: Address,
        attributes: { exclude: excludeColumns },
      },
      {
        model: Category,
        attributes: { exclude: excludeColumns },
      },
      {
        model: Promo,
        attributes: { exclude: excludeColumns },
      },
    ],
    ...options,
  };

  try {
    const allData = await Order.findAll(filterObj && { where: filterObj });
    totalRows = allData.length;
  } catch (error) {
    return next({ name: errors["404"] });
  }

  Order.findAll(options)
    .then((data) => {
      const totalPage = Math.ceil(totalRows / limit);
      const currentPage = page;
      const nextPage = getNextPage(currentPage, limit, totalRows);
      const prevPage = getPreviousPage(currentPage);
      return res.status(200).json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, "Order"),
          {
            limit,
            totalRows,
            totalPage,
            prevPage,
            currentPage,
            nextPage,
            orders: data,
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

module.exports = { FindAllUserOrders };
