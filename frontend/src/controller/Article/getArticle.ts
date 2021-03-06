import { articleGetReq, bookArticlesGetReq } from "@/api/articleReq";
import Article from "@/models/Article";
import ArticleSimple from "@/models/ArticleSimple";
import { message } from "ant-design-vue";
import { Ref } from "vue";
import { getDateString } from "../utils/date";

/**
 * 通过书目的id获取所有的书
 * @param articles 书目的对应文章列表Ref
 * @param id 书目的id
 * @returns
 */
export const getBookArticles = (
  articles: Ref<Array<ArticleSimple> | undefined>,
  id: number
): Ref<Array<ArticleSimple> | undefined> => {
  bookArticlesGetReq(id)
    .then((res) => {
      const data = res.data;
      articles.value = data;
    })
    .catch((err) => {
      console.error(err);
    });
  return articles;
};

export const getArticle = (
  article: Ref<Article | undefined>,
  id: number,
  bookArticles: Ref<Array<ArticleSimple> | undefined>
): Ref<Article | undefined> => {
  articleGetReq(id)
    .then((res) => {
      const data: Article = res.data;
      article.value = data;
      article.value.publish_date = getDateString(article.value.publish_date);
      getBookArticles(bookArticles, data.book?.book_id ?? 0);
    })
    .catch((err) => {
      message.error(err.response?.message ?? err.message ?? err, 0);
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
