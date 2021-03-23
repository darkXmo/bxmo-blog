// store/site/actions.ts

import { mutationsType, SiteState } from "./types";
import { ActionTree } from "vuex";
import { RootState } from "../types";
import { siteInfoReq } from "@/api/homeReq";
import SiteInfo from "@/models/SiteInfo";

export const actions: ActionTree<SiteState, RootState> = {
  fetchData({ commit }): void {
    siteInfoReq
      .then((res) => {
        const {
          owner,
          article_amount,
          categories,
          tags,
          books,
          friend_links,
        } = res.data;
        const siteInfo: SiteInfo = {
          owner,
          article_amount,
          books,
          categories,
          tags,
          friend_links,
        };

        commit(mutationsType.INIT_SITE_INFO, siteInfo);
      })
      .catch((err) => {
        window.console.log(err);
      });
  },
};
