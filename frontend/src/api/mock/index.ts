import ArticleItem from "@/models/ArticleItem";
import Tag from "@/models/Tag";
import Mock, { Random } from "mockjs";
import API from "@/api";
import Category from "@/models/Category";
import FriendLink from "@/models/FriendLink";

const baseUrl = "http://127.0.0.1:3000/";

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

const articleItem = () => {
  const item: ArticleItem = {
    title: Random.ctitle(),
    author: Random.cname(),
    abstract: Random.cparagraph(),
    date: new Date(Random.date()),
    tags: Array(Random.integer(1, 4))
      .fill(undefined)
      .map(() => tag()),
  };
  return item;
};

const category = () => {
  const item: Category = {
    value: Random.word(),
    amount: Random.integer(1, 29),
  };

  return item;
};

const friendLink = () => {
  const item: FriendLink = {
    value: Random.url(),
    name: Random.word(),
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
      .map(() => articleItem()),
  });

  Mock.mock(baseUrl + API.GET_SITE_INFO, {
    owner: "Xmo",
    articleAmount: Random.integer(10, 99),
    tagAmount: Random.integer(10, 99),
    categories: Array(Random.integer(3, 10))
      .fill(undefined)
      .map(() => category()),
    tags: Array(Random.integer(10, 20))
      .fill(undefined)
      .map(() => tag()),
    friendLinks: Array(Random.integer(2, 3))
      .fill(undefined)
      .map(() => friendLink()),
  });
};

// 输出结果
