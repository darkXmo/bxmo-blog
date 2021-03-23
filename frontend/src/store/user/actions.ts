// store/user/actions.ts
import { message } from "ant-design-vue";
import { UserState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import LoginForm from "@/models/LoginForm";
import { loginReq } from "@/api/loginReq";

export const actions: ActionTree<UserState, RootState> = {
  login({ commit }, loginForm: LoginForm): void {
    const userInfo: UserState = {
      username: loginForm.username,
      token: "",
    };
    loginReq(loginForm)
      .then((res) => {
        userInfo.token = res.data.token;
        commit("saveUserInfo", userInfo);
        message.success("登录成功");
      })
      .catch((err) => {
        userInfo.token = null;
        commit("saveUserInfo", userInfo);
        message.error(
          `登录失败，${err.response.message ?? err.message ?? err}`
        );
      });
  },
};
