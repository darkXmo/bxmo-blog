import LoginForm from "@/models/LoginForm";
import { RootState } from "@/store/types";
import { userMutationsType as mutationsType } from "@/store/types";
import { Store } from "vuex";

/**
 * 登录
 * @param store
 * @param loginForm 登录表单
 */
export const login = (store: Store<RootState>, loginForm: LoginForm): void => {
  store.dispatch("user/login", loginForm);
};

export const logout = (store: Store<RootState>): void => {
  store.commit("user/" + mutationsType.CLEAR_USER_INFO);
};
