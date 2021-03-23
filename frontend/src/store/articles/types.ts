// store/articles/types.ts

import ArticleItemList from "@/models/ArticleItemList";

export interface ArticlesState extends ArticleItemList {
  isArticlesState?: boolean;
}

export const mutationsType: Record<string, string> = {
  INIT_ARTICLES: "initArticles",
};
