import UserState from "@/models/UserState";

// 全部的state,导出 Vuex.Store时使用
export interface RootState {
  user: UserState;
}
