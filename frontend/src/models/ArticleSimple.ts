import { Tag } from ".";
import Book from "./Book";

interface ArticleSimple {
  id?: number;
  title: string;
  abstract: string;
  author: string;
  book: Book | null;
  publish_date: string;
  tags: Array<Tag>;
}

export default ArticleSimple;
