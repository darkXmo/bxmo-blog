import UserState from "@/models/UserState";
import { SiteState } from "./site/types";
import { mutationsType as user_mutationsType } from "./user/types";
import { mutationsType as site_mutationsType } from "./site/types";
import { mutationsType as articles_mutationsType } from "./articles/types";

// 全部的state,导出 Vuex.Store时使用
export interface RootState {
  user: UserState;
  site: SiteState;
}

export const userMutationsType = user_mutationsType;

export const siteMutationsType = site_mutationsType;

export const articlesMutationsType = articles_mutationsType;
