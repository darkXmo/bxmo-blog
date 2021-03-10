import UserState from "@/models/UserState";
import { mutationsType } from "./user/types";

// 全部的state,导出 Vuex.Store时使用
export interface RootState {
  user: UserState;
}

export const userMutationsType = mutationsType;
