import request from "./request";
import api from "./index";
import LoginForm from "@/models/LoginForm";
import { AxiosResponse } from "axios";
import UserState from "@/models/UserState";

export const loginReq = (data: LoginForm): Promise<AxiosResponse<UserState>> =>
  request.post(api.POST_LOGIN, data);
