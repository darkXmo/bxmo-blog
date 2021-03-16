import Article from "./Article";

interface Book {
  bookTitle: string;
  id?: number;
  articles: Array<Article>;
}

export default Book;
