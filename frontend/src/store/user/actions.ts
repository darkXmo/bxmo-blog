// store/user/actions.ts

import { UserState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";

export const actions: ActionTree<UserState, RootState> = {
  fetchData({ commit }): void {
    const userInfo: UserState = {
      username: "Hello World",
      token: "",
    };
    commit("saveUserInfo", userInfo);
  },
};
