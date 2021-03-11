// api/index.js

/**
 * 网站使用的 API 列表
 */
const api: {
  [k: string]: string;
} = {
  GET_ARTICLE_LIST: "article/list",
  GET_SITE_INFO: "site",
  POST_LOGIN: "login",
  GET_ARTICLE: "article",
};

export default api;
