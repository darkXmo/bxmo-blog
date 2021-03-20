import { Tag } from "./index";

interface ArticleInfo {
  title: string;
  category: string;
  tags: Array<Tag>;
  author: string;
  date: Date;
  abstract: string;
}

export default ArticleInfo;
