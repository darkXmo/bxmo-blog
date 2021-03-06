import { createStore } from "vuex";
import { RootState } from "./types";
import { user } from "./user/index";
import { site } from "./site/index";
import { articles } from "./articles/index";

export default createStore<RootState>({
  modules: {
    user,
    site,
    articles,
  },
});
