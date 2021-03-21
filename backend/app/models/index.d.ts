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
  interface ArticleCompleted extends ArticleSimple {
    content: string;
  }
  interface ArticleSimple extends ArticleInfo{
    title: string;
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
    abstract: string;
    content: string;
    category: string;
    book: string;
    tags: Array<string>;
  }
  interface ArticleToUpdate {
    id: number;
    title?: string;
    abstract?: string;
    content?: string;
  }
  interface ArticleSQL {
    article_id: number;
    title: string;
    abstract: string;
    content?: string;
    category_id: number;
    book_id: number;
    next_book_id: number;
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