import { Module } from "vuex";
import { SiteState } from "./types";
import { RootState } from "../types";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { initSiteInfo } from "@/controller/Home/initHomeArticleList";

const state: SiteState = {
  last_updated: new Date(),
  ...initSiteInfo(),
};
const namespaced = true;
export const site: Module<SiteState, RootState> = {
  namespaced,
  actions,
  state,
  getters,
  mutations,
};
export default state;
