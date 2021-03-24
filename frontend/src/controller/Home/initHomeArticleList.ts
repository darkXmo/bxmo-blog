import { articleListReq, siteInfoReq } from "@/api/homeReq";
import ArticleItemList from "@/models/ArticleItemList";
import SiteInfo from "@/models/SiteInfo";
import { message, notification } from "ant-design-vue";
import { reactive } from "vue";
import { getDateString } from "../utils/date";

/**
 * 返回首页文章列表
 */
export const initArticles = async () => {
  const homeArticles: ArticleItemList = reactive({ value: [] });
  await articleListReq
    .then((res) => {
      const ans = res.data.articles;
      ans.forEach((ele) => {
        ele.publish_date = getDateString(ele.publish_date);
      });
      homeArticles.value = res.data.articles;
    })
    .catch((err) => {
      if (err.message === "Network Error") {
        notification.open({
          message: "网络错误",
          description:
            "加载后端失败，网络错误。由于网站部署在香港，如遇到本提示，请使用代理访问。",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
      }
      message.error(err.response?.message ?? err.message ?? err);
    })
    .finally(() => {
      // console.log(loading);
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
