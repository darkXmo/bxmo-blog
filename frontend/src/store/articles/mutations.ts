// store/articles/mutations.ts

import { MutationTree } from "vuex";
import { ArticlesState } from "./types";
import { mutationsType } from "./types";

export const mutations: MutationTree<ArticlesState> = {
  /**
   * 更新用户状态
   * @param state 原来的用户状态
   * @param userState 更新后的用户状态
   */
  [mutationsType.INIT_ARTICLES](state, articleState: ArticlesState) {
    state = Object.assign(state, articleState);
  },
};
