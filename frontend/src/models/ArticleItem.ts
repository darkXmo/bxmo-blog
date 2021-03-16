import Tag from "./Tag";

interface ArticleItem {
  id?: number;
  title: string;
  abstract: string;
  author: string;
  date: Date;
  tags: Array<Tag>;
}

export default ArticleItem;
