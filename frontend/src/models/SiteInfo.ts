import Category from "./Category";
import FriendLink from "./FriendLink";
import { Tag } from "./";
import Book from "./Book";

/**
 * 博客网站信息
 */
interface SiteInfo {
  owner: string;
  article_amount: number;
  books?: Array<Book>;
  categories: Array<Category>;
  tags: Array<Tag>;
  friend_links: Array<FriendLink>;
}

export default SiteInfo;
