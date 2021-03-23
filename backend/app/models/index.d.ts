declare module 'model' {
  interface Category {
    category_id: number;
    value: string;
    article_amount: number;
  }
  interface Book {
    book_id: number;
    book_title: string;
    article_amount: number;
  }
  interface Tag {
    tag_id: number;
    value: string;
    article_amount: number;
  }
  interface CategoryCollection {
    categories: Array<Category>;
  }
  interface BookCollection {
    books: Array<Book>;
  }
  interface TagCollection {
    tags: Array<Tag>;
  }
  interface SiteInfo {
    tags: Array<tag>,
    books: Array<Book>;
    categories: Array<Category>;
    article_amount: number;
    owner: string;
    friend_links: Array<any>;
  }
  interface ArticleCompleted extends ArticleSimple {
    content: string;
    next_article: ArticleSimple | null;
  }
  interface ArticleSimple extends ArticleInfo{
    title: string;
    author: string;
    publish_date: Date;
    abstract: string;
  }
  interface ArticleInfo {
    id: number;
    category: Category;
    book: Book;
    tags: Array<Tag>;
  }
  interface ArticleToPublish {
    title: string;
    author: string | null;
    abstract: string;
    content: string;
    category: string;
    book: string;
    tags: Array<string>;
  }
  interface ArticleToUpdate {
    id: number;
    author?: string;
    title?: string;
    abstract?: string;
    content?: string;
  }
  interface ArticleSQL {
    article_id: number;
    publish_date: Date;
    title: string;
    author: string;
    abstract: string;
    content?: string;
    category_id: number;
    book_id: number;
    next_book_id?: number | null;
  }

  interface TagMapSQL {
    tag_map_id: number;
    article_id: number;
    tag_id: number
  }

  interface LoginForm {
    username: string;
    password: string;
  }
}