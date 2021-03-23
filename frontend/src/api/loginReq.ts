import request from "./request";
import api from "./index";
import LoginForm from "@/models/LoginForm";
import { AxiosResponse } from "axios";

export const loginReq = (
  data: LoginForm
): Promise<
  AxiosResponse<{
    token: string;
  }>
> => request.post(api.POST_LOGIN, data);
