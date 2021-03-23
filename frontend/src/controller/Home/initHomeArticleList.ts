import { articleListReq, siteInfoReq } from "@/api/homeReq";
import ArticleItemList from "@/models/ArticleItemList";
import SiteInfo from "@/models/SiteInfo";
import { reactive } from "vue";

/**
 * 返回首页文章列表
 */
export const initArticles = () => {
  const homeArticles: ArticleItemList = reactive({ value: [] });
  articleListReq
    .then((res) => {
      console.log(res);
      homeArticles.value = res.data.articles;
    })
    .catch((err) => {
      window.console.log(err);
    });

  return homeArticles;
};

/**
 * 返回博客网站信息
 */
export const initSiteInfo = () => {
  const siteInfo: SiteInfo = reactive({
    owner: "",
    article_amount: 0,
    categories: [],
    tags: [],
    friend_links: [],
  });
  siteInfoReq
    .then((res) => {
      const {
        owner,
        article_amount,
        categories,
        tags,
        friend_links,
      } = res.data;

      siteInfo.owner = owner;
      siteInfo.article_amount = article_amount;
      siteInfo.categories = categories;
      siteInfo.tags = tags;
      siteInfo.friend_links = friend_links;
    })
    .catch((err) => {
      window.console.log(err);
    });

  return siteInfo;
};
