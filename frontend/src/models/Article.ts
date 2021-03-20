import ArticleInfo from "./ArticleInfo";
import Book from "./Book";

interface Article extends ArticleInfo {
  id?: number;
  book: Book | null;
  content: string;
}

export default Article;
