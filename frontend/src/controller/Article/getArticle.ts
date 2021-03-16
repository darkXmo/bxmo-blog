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

export const articleAnchorInit = () => {
  const h2List: Array<HTMLHeadingElement> = Array.from(
    document.getElementsByTagName("h2")
  );
  const h2ListHref: Array<string> = [];
  h2List.forEach((element) => {
    element.id = element.innerText;
    h2ListHref.push(element.innerText);
  });
  return h2ListHref;
};
