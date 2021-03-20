import Article from "@/models/Article";
import ArticleInfo from "@/models/ArticleInfo";

const publish = (info: ArticleInfo, content: string) => {
  const article: Article = Object.assign({ content }, info, {
    book: null,
  });
  console.dir(article);
};

export default publish;
