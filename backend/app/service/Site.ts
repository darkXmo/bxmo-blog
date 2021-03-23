import { Service } from 'egg';
import { Book, BookCollection, Category, CategoryCollection, SiteInfo, Tag, TagCollection } from 'model';

export default class Article extends Service {

  public async getSiteInfo(): Promise<SiteInfo> {
    const tagCollection = await this.getAllTags();
    const categoryCollection = await this.getAllCategories();
    const bookCollection = await this.getAllBooks();
    const articleAmount = await this.getArticleAmount();
    const owner = 'Xmo';
    const friend_links: Array<any> = [];
    return {
      ...tagCollection,
      ...categoryCollection,
      ...bookCollection,
      ...articleAmount,
      owner,
      friend_links,
    };
  }

  private async getAllTags(): Promise<TagCollection> {
    const mysql = this.app.mysql;
    const ans: Array<Tag> = await mysql.select('tag');
    return {
      tags: ans,
    };
  }

  private async getAllBooks(): Promise<BookCollection> {
    const mysql = this.app.mysql;
    const ans: Array<Book> = await mysql.select('book');
    return {
      books: ans,
    };
  }

  private async getAllCategories(): Promise<CategoryCollection> {
    const mysql = this.app.mysql;
    const ans: Array<Category> = await mysql.select('category');
    return {
      categories: ans,
    };
  }

  private async getArticleAmount() {
    const mysql = this.app.mysql;
    const ans: number = await mysql.count('article');
    return {
      article_amount: ans,
    };
  }

}
