const { CreateArticle } = require('./create');
const { DeleteArticle } = require('./delete');
const { FindAllArticle, FindDeepAllArticle } = require('./find-all');
const { FindDetailArticle } = require('./find-detail');
const { UpdateArticle } = require('./update');

module.exports = {
  CreateArticle,
  DeleteArticle,
  FindAllArticle,
  FindDetailArticle,
  UpdateArticle,
  FindDeepAllArticle,
};
