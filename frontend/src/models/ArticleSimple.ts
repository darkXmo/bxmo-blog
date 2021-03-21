import { Tag } from ".";

interface ArticleSimple {
  id?: number;
  title: string;
  abstract: string;
  author: string;
  date: Date;
  tags: Array<Tag>;
}

export default ArticleSimple;
