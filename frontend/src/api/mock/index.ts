import ArticleSimple from "@/models/ArticleSimple";
import { Tag } from "@/models";
import Mock, { Random } from "mockjs";
import API from "@/api";
import Category from "@/models/Category";
import FriendLink from "@/models/FriendLink";
import Article from "@/models/Article";
import UserState from "@/models/UserState";
import articleContent from "@/api/mock/articleContent";
import abstract from "./abstract";
import SiteInfo from "@/models/SiteInfo";

const baseUrl = "http://127.0.0.1:7001/";
// eslint-disable-next-line no-useless-escape
const baseUrlReg = "/http:\\/\\/127\\.0\\.0\\.1:7001";

/**
 * 设置延时
 */
Mock.setup({
  timeout: "200-600", // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
});

const tag = () => {
  const tag: Tag = {
    value: Random.cword(Random.integer(2, 4)),
  };
  return tag;
};

const articleSimple = () => {
  const item: ArticleSimple = {
    title: Random.ctitle(),
    author: Random.cname(),
    abstract: abstract(),
    book: null,
    publish_date: Random.date(),
    tags: Array(Random.integer(1, 4))
      .fill(undefined)
      .map(() => tag()),
  };
  return item;
};

const category = () => {
  const item: Category = {
    category_id: Random.integer(),
    value: Random.word(),
    article_amount: Random.integer(1, 29),
  };

  return item;
};

const friendLink = () => {
  const item: FriendLink = {
    link_id: Random.integer(),
    value: Random.url(),
    name: Random.word(),
  };
  return item;
};

const article = () => {
  const item: Article = {
    book: null,
    content: articleContent(),
    title: Random.ctitle(),
    category: category(),
    tags: Array(Random.integer(1, 4))
      .fill(undefined)
      .map(() => tag()),
    author: "Xmo",
    publish_date: Random.date(),
    abstract: abstract(),
  };
  return item;
};

const userInfo = () => {
  const item: UserState = {
    username: "Xmo",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjE0NzYzOTM5fQ.DpLviZ40NS4pa3Ux4TZnnU0NEJNkRONQL8x5f_oTYM0",
  };
  return item;
};

/**
 * Mock模拟数据
 */
export default () => {
  Mock.mock(baseUrl + API.GET_ARTICLE_LIST, {
    articles: Array(10)
      .fill(undefined)
      .map(() => articleSimple()),
  });

  const siteInfo: SiteInfo = {
    owner: "Xmo",
    article_amount: Random.integer(10, 99),
    categories: Array(Random.integer(3, 10))
      .fill(undefined)
      .map(() => category()),
    tags: Array(Random.integer(10, 20))
      .fill(undefined)
      .map(() => tag()),
    friend_links: Array(Random.integer(2, 3))
      .fill(undefined)
      .map(() => friendLink()),
  };

  Mock.mock(baseUrl + API.GET_SITE_INFO, siteInfo);

  Mock.mock(baseUrl + API.POST_LOGIN, userInfo());

  // eslint-disable-next-line no-useless-escape
  const getArticleReg = "\\/article\\/\\d+/";
  Mock.mock(eval(baseUrlReg + getArticleReg), article());
};

// 输出结果
