import request from "./request";
import api from "./index";
import { AxiosResponse } from "axios";
import Article from "@/models/Article";
import ArticleSimple from "@/models/ArticleSimple";
import { ArticleToModify, ArticleToPublish } from "@/models";

const authorizationConfig = (token: string) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const articleGetReq = (id: number): Promise<AxiosResponse<Article>> =>
  request.get(`${api.GET_ARTICLE}/${id}`);

export const bookArticlesGetReq = (
  id: number
): Promise<AxiosResponse<Array<ArticleSimple>>> =>
  request.get(`${api.GET_BOOK_ARTICLES}/${id}`);

export const articlePublishReq = (
  body: ArticleToPublish,
  token: string
): Promise<AxiosResponse<ArticleSimple>> =>
  request.post(api.PUBLISH, body, authorizationConfig(token));

export const deleteArticleReq = (
  id: number,
  token: string
): Promise<AxiosResponse<number>> =>
  request.get(`${api.DELETE_ARTICLE}/${id}`, authorizationConfig(token));

export const updateArticleReq = (
  id: number,
  body: ArticleToModify,
  token: string
): Promise<AxiosResponse<ArticleSimple>> =>
  request.put(`${api.UPDATE_ARTICLE}/${id}`, body, authorizationConfig(token));
