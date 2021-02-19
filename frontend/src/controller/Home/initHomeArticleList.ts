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
      homeArticles.value = res.data.articles;
    })
    .catch((err) => {
      console.log(err);
    });

  return homeArticles;
};

/**
 * 返回博客网站信息
 */
export const initSiteInfo = () => {
  const siteInfo: SiteInfo = reactive({
    owner: "",
    articleAmount: 0,
    tagAmount: 0,
    categories: [],
    tags: [],
    friendLinks: [],
  });
  siteInfoReq
    .then((res) => {
      const {
        owner,
        articleAmount,
        tagAmount,
        categories,
        tags,
        friendLinks,
      } = res.data;

      siteInfo.owner = owner;
      siteInfo.articleAmount = articleAmount;
      siteInfo.tagAmount = tagAmount;
      siteInfo.categories = categories;
      siteInfo.tags = tags;
      siteInfo.friendLinks = friendLinks;
    })
    .catch((err) => {
      console.log(err);
    });

  return siteInfo;
};
