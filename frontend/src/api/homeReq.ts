import request from "./request";
import api from "./index";

export const articleListReq = request.get(api.GET_ARTICLE_LIST);
export const siteInfoReq = request.get(api.GET_SITE_INFO);
