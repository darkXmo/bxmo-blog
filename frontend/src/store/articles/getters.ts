// store/articles/getters.ts

import { GetterTree } from "vuex";
import { ArticlesState } from "./types";
import { RootState } from "../types";
import ArticleSimple from "@/models/ArticleSimple";

export const getters: GetterTree<ArticlesState, RootState> = {
  /**
   * 判断当前是否为登录状态
   * @param state
   * @returns
   */

  list(state): Array<ArticleSimple> {
    if (state.value) {
      return state.value;
    } else {
      return [];
    }
  },
};
