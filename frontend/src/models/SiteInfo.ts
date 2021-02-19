import Category from "./Category";
import FriendLink from "./FriendLink";
import Tag from "./Tag";

/**
 * 博客网站信息
 */
interface SiteInfo {
  owner: string;
  articleAmount: number;
  tagAmount: number;
  categories: Array<Category>;
  tags: Array<Tag>;
  friendLinks: Array<FriendLink>;
}

export default SiteInfo;
