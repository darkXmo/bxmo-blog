import request from "./request";
import api from "./index";
import { AxiosResponse } from "axios";
import ArticleSimple from "@/models/ArticleSimple";

export const articleListReq: Promise<
  AxiosResponse<{
    articles: Array<ArticleSimple>;
  }>
> = request.get(api.GET_ARTICLE_LIST);
export const siteInfoReq = request.get(api.GET_SITE_INFO);
