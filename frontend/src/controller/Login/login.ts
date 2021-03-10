import { loginReq } from "@/api/loginReq";
import LoginForm from "@/models/LoginForm";
import UserState from "@/models/UserState";
import { RootState } from "@/store/types";
import { userMutationsType as mutationsType } from "@/store/types";
import { AxiosResponse } from "axios";
import { Store } from "vuex";

/**
 * 登录
 * @param store
 * @param loginForm 登录表单
 */
export const login = (store: Store<RootState>, loginForm: LoginForm): void => {
  loginReq(loginForm)
    .then((res: AxiosResponse<UserState>) => {
      store.commit("user/" + mutationsType.SAVE_USER_INFO, res.data);
      console.log(store.state);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logout = (store: Store<RootState>): void => {
  store.commit("user/" + mutationsType.CLEAR_USER_INFO);
};
