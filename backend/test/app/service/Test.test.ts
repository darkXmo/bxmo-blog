import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import { ArticleToUpdate } from 'model';
import { isArticleCompleted, isArticleSimple } from '../utils';

describe('test/app/service/Article.article.js', () => {
  let ctx: Context;
  const bookTitle = '测试用书籍';

  before(async () => {
    ctx = app.mockContext();
  });

  it('listArticles', async () => {
    const result = await ctx.service.article.listArticles();
    // 确保返回值是一个正确对象
    assert('articles' in result);
    // 确保对象内容符合期望
    assert(isArticleSimple(result.articles[0]));
  });

  it('getArticleSimple', async () => {
    const result = await ctx.service.article.getArticleSimple(1);
    // 确保对象内容符合期望
    assert(isArticleSimple(result));
    assert(result.id === 1);
  });

  it('getArticle', async () => {
    const result = await ctx.service.article.getArticle(1);
    assert(isArticleCompleted(result));
    assert(result.id === 1);
  });

  it('getArticleByTitle', async () => {
    const result = await ctx.service.article.getArticleByTitle('ArticleTEst');
    // 确保对象内容符合期望
    assert(isArticleSimple(result));
    assert(result.title === 'ArticleTEst');
  });

  it('publishArticle', async () => {
    const title = '我是一篇文章-' + new Date().getTime();
    const result = await ctx.service.article.publishArticle({
      title,
      abstract: '我是文章的概述',
      content: '我是一篇文章，我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
      category: '后端',
      book: bookTitle,
      tags: [ 'test', '测试', 'publishTest' ],
    });
    const articleStored = await ctx.service.article.getArticleByTitle(title);
    assert(result.id === articleStored.id);
    assert(title === articleStored.title && title === result.title);
  });

  it('getArticleByBook', async () => {
    const result = await ctx.service.article.getArticleByBook(bookTitle);
    assert(result[0].book.book_title === bookTitle);
  });

  it('updateArticle', async () => {
    const title = '我是一篇文章-' + new Date().getTime();
    const articleStored = (await ctx.service.article.listArticles()).articles.pop();
    if (!articleStored) {
      throw new Error('Article Not Found');
    }
    const articleToUpdate: ArticleToUpdate = {
      id: articleStored.id,
      title,
      abstract: '我是文章的概述，我被改了',
      content: '我是一篇文章，我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
    };
    const result = await ctx.service.article.updateArticle(articleStored.id, articleToUpdate);
    assert(result.id === articleStored.id);
    assert(result.title === title);
    assert(result.abstract === articleToUpdate.abstract);
  });

  /**
   * 最后一个执行，顺便将之前所有生成的文章都删掉
   */
  it('deleteArticle', async () => {
    const result = await ctx.service.article.getArticleByBook(bookTitle);
    for (const item of result) {
      const deletedArticleId = await ctx.service.article.deleteArticle(item.id);
      assert(deletedArticleId === item.id);
    }
    const articleLeft = await ctx.service.article.getArticleByBook(bookTitle);
    assert(articleLeft.length === 0);
  });
});

