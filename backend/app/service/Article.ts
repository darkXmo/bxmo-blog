import { Service } from 'egg';
import { ArticleCompleted, ArticleInfo, ArticleSimple, ArticleSQL, ArticleToPublish, ArticleToUpdate, Book, Category, Tag, TagMapSQL } from 'model';
import { isArticleToPublish } from '../models/guard';

/**
 * Test Service
 */
export default class Article extends Service {

  /**
   * sayHi to you
   * @param name - your name
   */
  public async sayHi(name: string) {
    return `hi, ${name}`;
  }

  public async listArticles(): Promise<{
    articles: Array<ArticleSimple>
  }> {
    const articles = await this.app.mysql.select('article');
    const ans: Array<ArticleSimple> = [];
    for (const article of articles) {
      ans.push(await this.getArticleSimple(article.article_id));
    }
    return { articles: ans };
  }

  public async getArticle(id: number): Promise<ArticleCompleted> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = (await mysql.query('SELECT title, abstract, content FROM article WHERE article_id = ?', [ id ]))[0];
    if (!article) {
      this.ctx.status = 404;
      throw new Error('Article Not Found');
    }
    const title: string = article.title;
    const abstract: string = article.abstract;
    const content: string = article.content ?? '';
    const articleInfo: ArticleInfo = await this.getArticleInfo(id);
    return {
      id,
      title,
      abstract,
      content,
      category: articleInfo.category,
      book: articleInfo.book,
      tags: articleInfo.tags,
    };
  }

  public async getArticleSimple(id: number): Promise<ArticleSimple> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = (await mysql.query('SELECT title, abstract FROM article WHERE article_id = ?', [ id ]))[0];
    if (!article) {
      this.ctx.status = 404;
      throw new Error('Article Not Found');
    }
    const title: string = article.title;
    const abstract: string = article.abstract;
    const articleInfo: ArticleInfo = await this.getArticleInfo(id);
    return {
      id,
      title,
      abstract,
      category: articleInfo.category,
      book: articleInfo.book,
      tags: articleInfo.tags,
    };
  }

  public async getArticleByTitle(title: string): Promise<ArticleSimple> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = await mysql.get('article', { title });
    const ans = await this.getArticleSimple(article.article_id);
    return ans;
  }

  public async getArticleByBook(bookTitle: string): Promise<Array<{
    title: string;
    id: number;
    book: Book
  }>> {
    const mysql = this.app.mysql;
    const book: Book = await mysql.get('book', { book_title: bookTitle });
    if (!book) {
      return [];
    }
    const bookId = book.book_id;
    const articlesIds: Array<number> = (await mysql.select('article', {
      where: {
        book_id: bookId,
      },
      columns: [ 'article_id' ],
    })).map(value => {
      return value.article_id;
    });
    const ans: Array<{
      title: string;
      id: number;
      book: Book;
    }> = [];
    for (const articleId of articlesIds) {
      const article: ArticleSimple = await this.getArticleSimple(articleId);
      ans.push({
        title: article.title,
        id: article.id,
        book: article.book,
      });
    }
    return ans;
  }

  public async publishArticle(article: ArticleToPublish): Promise<ArticleSimple> {
    if (!isArticleToPublish(article)) {
      this.ctx.response.status = 500;
      throw new Error('Wrong Object');
    }
    const mysql = this.app.mysql;
    const title = article.title;
    if (await mysql.get('article', { title })) {
      this.ctx.response.status = 500;
      throw new Error('Article title duplicate');
    }

    const articleCategory = article.category;
    const categoryStored: Category = await this.publishCategory(articleCategory);
    const articleBook = article.book;
    const bookStored: Book = await this.publishBook(articleBook);
    const articleTags = article.tags;
    const tagsStored: Array<Tag> = [];
    for (const articleTag of articleTags) {
      const tagStored = await this.publishTag(articleTag);
      // 将这个标签加入数组
      tagsStored.push(tagStored);
    }

    // 将所有信息存入对应的Table中
    // 存入 article
    const { insertId } = await mysql.insert('article', {
      title,
      content: article.content,
      abstract: article.abstract,
      category_id: categoryStored.category_id,
      book_id: bookStored.book_id,
    });
    // category和book不用存
    // 在 tag_map 表中构建关系
    for (const articleTag of tagsStored) {
      await mysql.insert('tag_map', {
        tag_id: articleTag.tag_id,
        article_id: insertId,
      });
    }
    return await this.getArticleSimple(insertId);
  }

  public async deleteArticle(id: number): Promise<number> {
    const mysql = this.app.mysql;
    const articleStored: ArticleSQL = await mysql.get('article', { article_id: id });
    await mysql.delete('article', { article_id: id });
    await this.decreaseBook(articleStored.book_id);
    await this.decreaseCategory(articleStored.category_id);
    const articleTagMaps: Array<TagMapSQL> = await mysql.select('tag_map', {
      where: {
        article_id: id,
      },
      columns: [ 'tag_map_id', 'article_id', 'tag_id' ],
    });
    for (const element of articleTagMaps) {
      const tag_map_id = element.tag_map_id;
      await mysql.delete('tag_map', { tag_map_id });
      await this.decreaseTag(element.tag_id);
    }
    return id;
  }

  public async updateArticle(id: number, body: ArticleToUpdate): Promise<ArticleSimple> {
    const mysql = this.app.mysql;
    await mysql.update('article', {
      title: body.title,
      abstract: body.abstract,
      content: body.content,
    }, {
      where: {
        article_id: id,
      },
    });
    return await this.getArticleSimple(id);
  }

  /**
   * 通过id获取文章Book，Category和Tag信息
   * @param id 文章的id
   */
  private async getArticleInfo(id: number): Promise<ArticleInfo> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = (await mysql.query('SELECT category_id, book_id FROM article WHERE article_id = ?', [ id ]))[0];
    if (!article) {
      this.ctx.status = 404;
      throw new Error('Article Not Found');
    }
    const category_id: number = article.category_id;
    const book_id: number = article.book_id;
    const category: Category = await mysql.get('category', { category_id });
    const book: Book = await mysql.get('book', { book_id });
    const tagIds: Array<number> = (await mysql.select('tag_map', {
      where: { article_id: id },
      columns: [ 'tag_id' ],
      orders: [[ 'tag_id', 'asc' ]],
    })).map(value => {
      return value.tag_id;
    });
    const tags: Array<Tag> = [];
    for (const tag_id of tagIds) {
      const tag = await mysql.get('tag', { tag_id });
      tags.push(tag);
    }
    return {
      id,
      category,
      book,
      tags,
    };
  }

  /**
   * 如果当前表中不存在该Tag，创建Tag，如果有Tag，Tag的article_amount加1
   * @param tagName Tag名
   */
  private async publishTag(tagName: string): Promise<Tag> {
    const mysql = this.app.mysql;
    const tableName = 'tag';
    const tagStored: Tag = await mysql.get(tableName, { value: tagName });
    if (!tagStored) {
      await mysql.insert(tableName, { value: tagName, article_amount: 1 });
      return await mysql.get(tableName, { value: tagName });
    }
    const row = {
      article_amount: tagStored.article_amount + 1,
    };
    const options = {
      where: {
        tag_id: tagStored.tag_id,
      },
    };
    await mysql.update(tableName, row, options);
    return await mysql.get(tableName, { tag_id: tagStored.tag_id });
  }

  /**
   * 如果当前表中不存在该Category，创建Category，如果有Category，Category的article_amount加1
   * @param categoryName Category名
   */
  private async publishCategory(categoryName: string): Promise<Category> {
    const mysql = this.app.mysql;
    const categoryStored: Category = await mysql.get('category', { value: categoryName });
    if (!categoryStored) {
      await mysql.insert('category', { value: categoryName, article_amount: 1 });
      return await mysql.get('category', { value: categoryName });
    }
    const row = {
      article_amount: categoryStored.article_amount + 1,
    };
    const options = {
      where: {
        category_id: categoryStored.category_id,
      },
    };
    await mysql.update('category', row, options);
    return await mysql.get('category', { category_id: categoryStored.category_id });
  }

  /**
   * 如果当前表中不存在该Book，创建Book，如果有Book，Book的article_amount加1
   * @param bookTitle 书目标题
   */
  private async publishBook(bookTitle: string): Promise<Book> {
    const mysql = this.app.mysql;
    const tableName = 'book';
    const bookStored: Book = await mysql.get(tableName, { book_title: bookTitle });
    if (!bookStored) {
      await mysql.insert(tableName, { book_title: bookTitle, article_amount: 1 });
      return await mysql.get(tableName, { book_title: bookTitle });
    }
    const row = {
      article_amount: bookStored.article_amount + 1,
    };
    const options = {
      where: {
        book_id: bookStored.book_id,
      },
    };
    await mysql.update(tableName, row, options);
    return await mysql.get(tableName, { book_id: bookStored.book_id });
  }

  private async decreaseTag(id: number): Promise<void> {
    const mysql = this.app.mysql;
    const tableName = 'tag';
    const tagStored: Tag = await mysql.get(tableName, { tag_id: id });
    if (!tagStored) {
      return;
    }
    if (tagStored.article_amount === 1) {
      mysql.delete(tableName, { tag_id: id });
      return;
    }
    const row = {
      article_amount: tagStored.article_amount - 1,
    };
    const options = {
      where: {
        tag_id: id,
      },
    };
    mysql.update(tableName, row, options);
  }

  private async decreaseCategory(id: number): Promise<void> {
    const mysql = this.app.mysql;
    const tableName = 'category';
    const categoryStored: Category = await mysql.get(tableName, { category_id: id });
    if (!categoryStored) {
      return;
    }
    if (categoryStored.article_amount === 1) {
      mysql.delete(tableName, { category_id: id });
      return;
    }
    const row = {
      article_amount: categoryStored.article_amount - 1,
    };
    const options = {
      where: {
        category_id: id,
      },
    };
    mysql.update(tableName, row, options);
  }

  private async decreaseBook(id: number): Promise<void> {
    const mysql = this.app.mysql;
    const tableName = 'book';
    const bookStored: Book = await mysql.get(tableName, { book_id: id });
    if (!bookStored) {
      return;
    }
    if (bookStored.article_amount === 1) {
      mysql.delete(tableName, { book_id: id });
      return;
    }
    const row = {
      article_amount: bookStored.article_amount - 1,
    };
    const options = {
      where: {
        book_id: id,
      },
    };
    mysql.update(tableName, row, options);
  }


}
