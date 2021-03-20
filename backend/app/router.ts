import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);

  router.get('/article/list', controller.home.listArticles);

  router.get('/article/:id', controller.home.getArticle);

  router.get('/article/simple/:id', controller.home.getArticleSimple);

  router.post('/article/publish', controller.home.publishArticle);

  router.get('/article/delete/:id', controller.home.deleteArticle);

  router.put('/article/update/:id', controller.home.updateArticle);
};
