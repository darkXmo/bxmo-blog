import { createStore } from "vuex";
import { RootState } from "./types";
import { user } from "./user/index";

export default createStore<RootState>({
  modules: {
    user,
  },
});
