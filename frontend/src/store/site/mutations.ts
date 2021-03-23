// store/user/mutations.ts

import Book from "@/models/Book";
import { MutationTree } from "vuex";
import { SiteState } from "./types";
import { mutationsType } from "./types";

export const mutations: MutationTree<SiteState> = {
  /**
   * 更新用户状态
   * @param state 原来的用户状态
   * @param userState 更新后的用户状态
   */
  [mutationsType.INIT_SITE_INFO](state, siteState: SiteState) {
    state = Object.assign(state, siteState);
  },

  [mutationsType.CREATE_BOOK](state, bookTitle) {
    const book: Book = {
      book_title: bookTitle,
    };
    state.books?.push(book);
  },
};
