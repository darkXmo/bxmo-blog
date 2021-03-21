import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';
import { ArticleSimple, ArticleToUpdate } from 'model';
import { isArticleCompleted, isArticleSimple } from '../utils';

describe('test/app/controller/article.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().get('/').expect(200);
    assert(result.text === 'hi, xmo');
  });

  it('should GET /article/list', async () => {
    const result = await app.httpRequest().get('/article/list').expect(200);
    // 确保对象内容符合期望
    const data = JSON.parse(result.text);
    assert('articles' in data);
    // 确保对象内容符合期望
    assert(isArticleSimple(data.articles[0]));
  });

  it('should GET /article/:id', async () => {
    const result = await app.httpRequest().get('/article/1').expect(200);
    // 确保对象内容符合期望
    const data = JSON.parse(result.text);
    // 确保对象内容符合期望
    assert(isArticleCompleted(data));
  });

  it('should GET /article/simple/:id', async () => {
    const result = await app.httpRequest().get('/article/simple/1').expect(200);
    // 确保对象内容符合期望
    const data = JSON.parse(result.text);
    // 确保对象内容符合期望
    assert(isArticleSimple(data));
  });

  it('should GET /article/:id', async () => {
    const result = await app.httpRequest().get('/article/simple/0').expect(500);
    assert(result.text === 'Article Not Found');
  });

  it('should POST /article/publish', async () => {
    const title = '我是一篇文章-' + new Date().getTime();
    const articleToPublish = ({
      title,
      abstract: '我是文章的概述Controller',
      content: '我是一篇文章，我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
      category: '前端',
      book: '测试用书籍',
      tags: [ 'test', '测试', 'publishTest' ],
    });
    app.mockCsrf();
    const result = await app
      .httpRequest()
      .post('/article/publish')
      .type('form')
      .send(articleToPublish)
      .expect(200);
    const articleResponse = JSON.parse(result.text);
    assert(isArticleSimple(articleResponse));
    assert(articleResponse.title === title);
  });

  it('should PUT /article/update/:id', async () => {
    const title = '我是一篇文章-' + new Date().getTime();
    const articleList = await app.httpRequest().get('/article/list').expect(200);
    const articleStored: ArticleSimple = JSON.parse(articleList.text).articles.pop();
    if (!articleStored) {
      throw new Error('Article Not Found');
    }
    const articleToUpdate: ArticleToUpdate = {
      id: articleStored.id,
      title,
      abstract: '我是文章的概述，我被改了Controller',
      content: '我是一篇文章，我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长',
    };
    app.mockCsrf();
    const result = await app
      .httpRequest()
      .put(`/article/update/${articleStored.id}`)
      .type('form')
      .send(articleToUpdate)
      .expect(200);
    const resultArticle = JSON.parse(result.text);
    assert(parseInt(resultArticle.id) === articleStored.id);
    assert(resultArticle.title === title);
    assert(resultArticle.abstract === articleToUpdate.abstract);
  });
});
