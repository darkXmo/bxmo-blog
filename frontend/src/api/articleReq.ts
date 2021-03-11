import request from "./request";
import api from "./index";
import { AxiosResponse } from "axios";
import Article from "@/models/Article";

export const articleGetReq = (id: number): Promise<AxiosResponse<Article>> =>
  request.post(api.GET_ARTICLE, {
    params: id,
  });
