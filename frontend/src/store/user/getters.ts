// store/user/getters.ts

import { GetterTree } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";

export const getters: GetterTree<UserState, RootState> = {
  /**
   * 判断当前是否为登录状态
   * @param state
   * @returns
   */
  logined(state): boolean {
    if (state.token.length > 10) {
      return true;
    }
    return false;
  },
};
