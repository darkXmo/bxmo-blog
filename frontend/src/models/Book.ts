import ArticleSimple from "./ArticleSimple";

interface Book {
  book_title: string;
  book_id?: number;
  book_amount?: number;
  book_articles?: Array<ArticleSimple>;
}

export default Book;
