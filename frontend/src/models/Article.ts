import ArticleSimple from "./ArticleSimple";
import Book from "./Book";
import Category from "./Category";

interface Article extends ArticleSimple {
  id?: number;
  category: Category;
  book: Book | null;
  next_article?: Article | null;
  content: string;
}

export default Article;
