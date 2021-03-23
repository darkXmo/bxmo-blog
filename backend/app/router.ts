import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, jwt } = app;

  router.post('/login', controller.auth.login);

  router.post('/register', jwt, controller.auth.register);

  router.get('/', controller.article.index);

  router.get('/siteinfo', controller.site.getSiteInfo);

  router.get('/article/list', controller.article.listArticles);

  router.get('/article/book/:id', controller.article.getArticlesByBook);

  router.get('/article/:id', controller.article.getArticle);

  router.get('/article/simple/:id', controller.article.getArticleSimple);

  router.post('/article/publish', jwt, controller.article.publishArticle);

  router.get('/article/delete/:id', jwt, controller.article.deleteArticle);

  router.put('/article/update/:id', jwt, controller.article.updateArticle);
};
