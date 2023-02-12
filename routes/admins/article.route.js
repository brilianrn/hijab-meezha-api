const route = require('express').Router();
const {
  FindAllArticle,
  FindDetailArticle,
  CreateArticle,
  UpdateArticle,
  DeleteArticle,
  FindDeepAllArticle,
} = require('../../controllers/articles/articles');
const {
  CreateArticleCategory,
  FindAllArticleCategory,
  UpdateArticleCategory,
  DeleteArticleCategory,
  FindAllArticleCategoryForDropDown,
  FindDetailArticleCategory,
} = require('../../controllers/articles/categories');
const {
  AdminAuthentication,
  AdminAuthorization,
} = require('../../middlewares/auth');

route.use(AdminAuthentication);
route.use(AdminAuthorization('Super Admin'));

route.get('/category', FindAllArticleCategory);
route.get('/category/:id', FindDetailArticleCategory);
route.post('/category', CreateArticleCategory);
route.put('/category/:id', UpdateArticleCategory);
route.delete('/category/:id', DeleteArticleCategory);
route.get('/category/lov', FindAllArticleCategoryForDropDown);

route.get('/deep', FindDeepAllArticle);
route.get('/', FindAllArticle);
route.get('/:id', FindDetailArticle);
route.post('/', CreateArticle);
route.put('/:id', UpdateArticle);
route.delete('/:id', DeleteArticle);

module.exports = route;
