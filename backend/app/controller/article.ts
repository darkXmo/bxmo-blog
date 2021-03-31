import { Controller } from 'egg';

export default class ArticleController extends Controller {
  public async index() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.sayHi('xmo');
  }

  public async listArticles() {
    const { ctx } = this;
    ctx.body = await ctx.service.article.listArticles();
  }

  public async getArticle() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.getArticle(ctx.params.id);
    } catch (err) {
      ctx.status = 500;
      ctx.message = err.message;
    }
  }

  public async getArticlesByBook() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.getArticlesByBook(ctx.params.id);
    } catch (err) {
      ctx.status = 500;
      ctx.message = err.message;
    }
  }

  public async getArticleSimple() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.getArticleSimple(ctx.params.id);
    } catch (err) {
      ctx.status = 500;
      ctx.message = err.message;
    }
  }

  public async publishArticle() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.publishArticle(ctx.request.body);
    } catch (err) {
      ctx.status = 500;
      ctx.message = err.message;
    }
  }

  public async deleteArticle() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.deleteArticle(ctx.params.id);
    } catch (err) {
      ctx.status = 500;
      ctx.message = err.message;
    }
  }

  public async updateArticle() {
    const { ctx } = this;
    try {
      ctx.body = await ctx.service.article.updateArticle(
        ctx.params.id,
        ctx.request.body,
      );
    } catch (err) {
      ctx.status = 500;
      console.dir(err);
      if (err.sqlMessage && err.code === 'ER_DUP_ENTRY') {
        ctx.message = 'Duplicate Title';
      } else {
        ctx.message = err.message;
      }
    }
  }
}
