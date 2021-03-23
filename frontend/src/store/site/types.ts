// store/site/types.ts

import SiteInfo from "@/models/SiteInfo";

export interface SiteState extends SiteInfo {
  last_updated: Date;
}

export const mutationsType: Record<string, string> = {
  INIT_SITE_INFO: "initSiteInfo",
  CREATE_BOOK: "createBook",
};
