import { Module } from "vuex";
import { ArticlesState } from "./types";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
const state: ArticlesState = {
  value: [],
};
const namespaced = true;
export const articles: Module<ArticlesState, RootState> = {
  namespaced,
  actions,
  state,
  getters,
  mutations,
};
export default state;
