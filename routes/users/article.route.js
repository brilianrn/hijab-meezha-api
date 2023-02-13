const route = require('express').Router();
const {
  FindAllArticle,
  FindDetailArticle,
  FindDeepAllArticle,
} = require('../../controllers/articles/articles');
const {
  FindAllArticleCategory,
  FindAllArticleCategoryForDropDown,
  FindDetailArticleCategory,
} = require('../../controllers/articles/categories');

route.get('/category', FindAllArticleCategory);
route.get('/category/lov', FindAllArticleCategoryForDropDown);
route.get('/category/:id', FindDetailArticleCategory);

route.get('/deep', FindDeepAllArticle);
route.get('/', FindAllArticle);
route.get('/:id', FindDetailArticle);

module.exports = route;
