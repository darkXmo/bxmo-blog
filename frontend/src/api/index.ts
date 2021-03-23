// api/index.js

/**
 * 网站使用的 API 列表
 */
const api: {
  [k: string]: string;
} = {
  GET_ARTICLE_LIST: "article/list",
  GET_SITE_INFO: "siteinfo",
  POST_LOGIN: "login",
  GET_ARTICLE: "article",
  GET_BOOK_ARTICLES: "article/book",
  PUBLISH: "article/publish",
};

export default api;
