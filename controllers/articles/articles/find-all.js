const { errors, successMessageTypes } = require('../../../constants');
const { Article, ArticleCategory } = require('../../../models');
const { getNextPage, getPreviousPage } = require('../../../utils');
const formatResponse = require('../../../utils/format-response');
const { successMessages } = require('../../../utils/messages-generate');

const FindAllArticle = async (req, res, next) => {
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

  // options = {
  //   where: filterObj,
  //   attributes: {
  //     exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
  //   },
  //   ...options,
  // };

  try {
    const allData = await Article.findAll({ where: filterObj });
    totalRows = allData.length;
  } catch (error) {
    return next({ name: errors['404'] });
  }

  Article.findAll({
    where: filterObj,
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
    },
  })
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
            successMessages(successMessageTypes.findAll, 'Article'),
            {
              totalRows,
              totalPage,
              prevPage,
              currentPage,
              nextPage,
              articles: data,
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

const FindDeepAllArticle = async (req, res, next) => {
  const { filter } = req.query;
  try {
    const filterObj = filter ? JSON.parse(filter) : {};
    const options = {
      where: filterObj,
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
      },
      include: [
        {
          model: Article,
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'createdBy', 'updatedBy'],
          },
        },
      ],
    };
    const articleCtgs = await ArticleCategory.findAll(options);
    return res
      .status(200)
      .json(
        formatResponse(
          true,
          200,
          successMessages(successMessageTypes.findAll, 'Article Deep'),
          { articleCtgs }
        )
      );
  } catch (error) {
    next({ name: error.message });
  }
};

module.exports = { FindAllArticle, FindDeepAllArticle };
