import { Module } from "vuex";
import { UserState } from "./types";
import { RootState } from "../types";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";
const state: UserState = {
  username: "",
  token: "",
};
const namespaced = true;
export const user: Module<UserState, RootState> = {
  namespaced,
  actions,
  state,
  getters,
  mutations,
};
export default state;
