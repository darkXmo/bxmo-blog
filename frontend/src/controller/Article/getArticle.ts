import { articleGetReq } from "@/api/articleReq";
import Article from "@/models/Article";
import { Ref } from "vue";

export const getArticle = (
  article: Ref<Article | undefined>,
  id: number
): Ref<Article | undefined> => {
  articleGetReq(id)
    .then((res) => {
      const data: Article = res.data;
      article.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
  return article;
};
