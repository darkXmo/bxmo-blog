import ArticleInfo from "./ArticleInfo";

interface Article extends ArticleInfo {
  belong: Article | null;
  content: string;
}

export default Article;
