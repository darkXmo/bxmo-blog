// store/user/mutations.ts

import { MutationTree } from "vuex";
import { UserState } from "./types";
import { mutationsType } from "./types";

const emptyState: Record<string, string> = {
  username: "",
  token: "",
};

export const mutations: MutationTree<UserState> = {
  /**
   * 更新用户状态
   * @param state 原来的用户状态
   * @param userState 更新后的用户状态
   */
  [mutationsType.SAVE_USER_INFO](state, userState: UserState) {
    if (userState.token) {
      window.localStorage.setItem("bxmo-token", userState.token);
    }
    state = Object.assign(state, userState);
  },

  // eslint-disable-next-line
  [mutationsType.CLEAR_USER_INFO](state) {
    window.localStorage.removeItem("bxmo-token");
    state = Object.assign(state, emptyState);
  },
};
