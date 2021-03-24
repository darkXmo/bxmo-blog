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
    const article: ArticleSQL = (await mysql.query('SELECT title, abstract, author, content, publish_date, next_article_id FROM article WHERE article_id = ?', [ id ]))[0];
    if (!article) {
      this.ctx.status = 404;
      throw new Error('Article Not Found');
    }
    const title: string = article.title;
    const abstract: string = article.abstract;
    const content: string = article.content ?? '';
    const author: string = article.author;
    const publish_date: Date = article.publish_date;
    const articleInfo: ArticleInfo = await this.getArticleInfo(id);
    let next_article: null | ArticleSimple = null;
    if (article.next_book_id) {
      next_article = await this.getArticleSimple(article.next_book_id);
    }
    return {
      id,
      publish_date,
      author,
      title,
      abstract,
      content,
      next_article,
      category: articleInfo.category,
      book: articleInfo.book,
      tags: articleInfo.tags,
    };
  }

  public async getArticleSimple(id: number): Promise<ArticleSimple> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = (await mysql.query('SELECT title, abstract, author, publish_date FROM article WHERE article_id = ?', [ id ]))[0];
    if (!article) {
      this.ctx.status = 404;
      throw new Error('Article Not Found');
    }
    const title: string = article.title;
    const abstract: string = article.abstract;
    const author: string = article.author;
    const publish_date: Date = article.publish_date;
    const articleInfo: ArticleInfo = await this.getArticleInfo(id);
    return {
      id,
      title,
      abstract,
      author,
      publish_date,
      category: articleInfo.category,
      book: articleInfo.book,
      tags: articleInfo.tags,
    };
  }

  public async getArticleByTitle(title: string): Promise<ArticleSimple> {
    const mysql = this.app.mysql;
    const article: ArticleSQL = await mysql.get('article', { title });
    if (!article) {
      throw new Error('Article Not Found');
    }
    const ans = await this.getArticleSimple(article.article_id);
    return ans;
  }

  public async getArticlesByBook(id: number): Promise<Array<{
    title: string;
    id: number;
    book: Book
  }>> {
    const mysql = this.app.mysql;
    const bookId = id;
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

  public async getArticlesByBookTitle(bookTitle: string): Promise<Array<{
    title: string;
    id: number;
    book: Book
  }>> {
    const mysql = this.app.mysql;
    const book: Book = await mysql.get('book', { book_title: bookTitle });
    if (!book) {
      return [];
    }
    const ans = await this.getArticlesByBook(book.book_id);
    return ans;
  }

  public async publishArticle(article: ArticleToPublish): Promise<ArticleSimple> {
    const conn = await this.app.mysql.beginTransaction();
    if (article.title.trim().length === 0 || article.content.trim().length === 0) {
      this.ctx.response.status = 409;
      throw new Error('Title or Content Empty');
    }
    try {
      if (!isArticleToPublish(article)) {
        this.ctx.response.status = 500;
        throw new Error('Wrong Object');
      }
      const title = article.title;
      if (await conn.get('article', { title })) {
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
      const author = article.author ?? null;

      // 将所有信息存入对应的Table中
      // 存入 article
      const { insertId } = await conn.insert('article', {
        title,
        author,
        publish_date: this.getTodayString(),
        content: article.content,
        abstract: article.abstract,
        category_id: categoryStored.category_id,
        book_id: bookStored.book_id,
      });
      // category和book不用存
      // 在 tag_map 表中构建关系
      for (const articleTag of tagsStored) {
        await conn.insert('tag_map', {
          tag_id: articleTag.tag_id,
          article_id: insertId,
        });
      }
      await conn.commit();
      return await this.getArticleSimple(insertId);
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  public async deleteArticle(id: number): Promise<number> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const articleStored: ArticleSQL = await conn.get('article', { article_id: id });
      await conn.delete('article', { article_id: id });
      await this.decreaseBook(articleStored.book_id);
      await this.decreaseCategory(articleStored.category_id);
      const articleTagMaps: Array<TagMapSQL> = await conn.select('tag_map', {
        where: {
          article_id: id,
        },
        columns: [ 'tag_map_id', 'article_id', 'tag_id' ],
      });
      for (const element of articleTagMaps) {
        const tag_map_id = element.tag_map_id;
        await conn.delete('tag_map', { tag_map_id });
        await this.decreaseTag(element.tag_id);
      }
      await conn.commit();
      return id;
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  public async updateArticle(id: number, body: ArticleToUpdate): Promise<ArticleSimple> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const articleToUpdate: {
        title?: string;
        abstract?: string;
        content?: string;
        author?: string;
      } = {};
      if (body.title) {
        articleToUpdate.title = body.title;
      }
      if (body.abstract) {
        articleToUpdate.abstract = body.abstract;
      }
      if (body.content) {
        articleToUpdate.content = body.content;
      }
      if (body.author) {
        articleToUpdate.author = body.author;
      }
      await conn.update('article',
        articleToUpdate,
        {
          where: {
            article_id: id,
          },
        },
      );
      await conn.commit(); // 提交事务
      const ans = await this.getArticleSimple(id);
      return ans;
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
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
    const conn = await this.app.mysql.beginTransaction();
    try {
      let ans: Tag;
      const tableName = 'tag';
      const tagStored: Tag = await conn.get(tableName, { value: tagName });
      if (!tagStored) {
        await conn.insert(tableName, { value: tagName, article_amount: 1 });
        ans = await conn.get(tableName, { value: tagName });
      } else {
        const row = {
          article_amount: tagStored.article_amount + 1,
        };
        const options = {
          where: {
            tag_id: tagStored.tag_id,
          },
        };
        await conn.update(tableName, row, options);
        ans = await conn.get(tableName, { tag_id: tagStored.tag_id });
      }
      await conn.commit();
      return ans;
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  /**
   * 如果当前表中不存在该Category，创建Category，如果有Category，Category的article_amount加1
   * @param categoryName Category名
   */
  private async publishCategory(categoryName: string): Promise<Category> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const categoryStored: Category = await conn.get('category', { value: categoryName });
      let ans: Category;
      if (!categoryStored) {
        await conn.insert('category', { value: categoryName, article_amount: 1 });
        ans = await conn.get('category', { value: categoryName });
      } else {
        const row = {
          article_amount: categoryStored.article_amount + 1,
        };
        const options = {
          where: {
            category_id: categoryStored.category_id,
          },
        };
        await conn.update('category', row, options);
        ans = await conn.get('category', { category_id: categoryStored.category_id });
      }
      await conn.commit();
      return ans;
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  /**
   * 如果当前表中不存在该Book，创建Book，如果有Book，Book的article_amount加1
   * @param bookTitle 书目标题
   */
  private async publishBook(bookTitle: string): Promise<Book> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      let ans: Book;
      const tableName = 'book';
      const bookStored: Book = await conn.get(tableName, { book_title: bookTitle });
      if (!bookStored) {
        await conn.insert(tableName, { book_title: bookTitle, article_amount: 1 });
        ans = await conn.get(tableName, { book_title: bookTitle });
      } else {
        const row = {
          article_amount: bookStored.article_amount + 1,
        };
        const options = {
          where: {
            book_id: bookStored.book_id,
          },
        };
        await conn.update(tableName, row, options);
        ans = await conn.get(tableName, { book_id: bookStored.book_id });
      }
      await conn.commit();
      return ans;
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  private async decreaseTag(id: number): Promise<void> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const tableName = 'tag';
      const tagStored: Tag = await conn.get(tableName, { tag_id: id });
      if (!tagStored) {
        throw new Error('Tag Not Found');
      }
      if (tagStored.article_amount === 1) {
        await conn.delete(tableName, { tag_id: id });
      } else {
        const row = {
          article_amount: tagStored.article_amount - 1,
        };
        const options = {
          where: {
            tag_id: id,
          },
        };
        await conn.update(tableName, row, options);
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  private async decreaseCategory(id: number): Promise<void> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const tableName = 'category';
      const categoryStored: Category = await conn.get(tableName, { category_id: id });
      if (!categoryStored) {
        throw new Error('Category Not Found');
      }
      if (categoryStored.article_amount === 1) {
        await conn.delete(tableName, { category_id: id });
      } else {
        const row = {
          article_amount: categoryStored.article_amount - 1,
        };
        const options = {
          where: {
            category_id: id,
          },
        };
        await conn.update(tableName, row, options);
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  private async decreaseBook(id: number): Promise<void> {
    const conn = await this.app.mysql.beginTransaction();
    try {
      const tableName = 'book';
      const bookStored: Book = await conn.get(tableName, { book_id: id });
      if (!bookStored) {
        throw new Error('Book Not Found');
      }
      if (bookStored.article_amount === 1) {
        await conn.delete(tableName, { book_id: id });
      } else {
        const row = {
          article_amount: bookStored.article_amount - 1,
        };
        const options = {
          where: {
            book_id: id,
          },
        };
        await conn.update(tableName, row, options);
      }
      await conn.commit();
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw err;
    }
  }

  public getTodayString() {
    const date = new Date();
    const year = date.getFullYear().toString();
    const month = (1 + date.getMonth()).toString();
    const day = date.getDate().toString();
    return `${year}-${month}-${day}`;
  }


}
