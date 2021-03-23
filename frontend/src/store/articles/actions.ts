// store/articles/actions.ts
import { mutationsType, ArticlesState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import { initArticles } from "@/controller/Home/initHomeArticleList";

export const actions: ActionTree<ArticlesState, RootState> = {
  async initArticles({ commit }): Promise<void> {
    const ans = await initArticles();
    commit(mutationsType.INIT_ARTICLES, ans);
  },
};
