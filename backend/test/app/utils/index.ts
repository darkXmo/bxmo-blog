import { ArticleCompleted, ArticleSimple, ArticleToPublish, SiteInfo } from 'model';

export function isArticleSimple(object: any): object is ArticleSimple {
  let ans = false;
  try {
    ans = 'id' in object &&
      'title' in object &&
      'abstract' in object &&
      'category' in object &&
      'publish_date' in object &&
      'author' in object &&
      'book' in object &&
      'tags' in object;
  } catch (err) {
    return false;
  }
  return ans;

}
export function isArticleToPublish(object: any): object is ArticleToPublish {
  let ans = false;
  try {
    ans = 'title' in object &&
      'abstract' in object &&
      'content' in object &&
      'category' in object &&
      'book' in object &&
      'tags' in object;
  } catch (err) {
    return false;
  }
  return ans;
}

export function isArticleCompleted(object: any): object is ArticleCompleted {
  let ans = false;
  try {
    ans = 'id' in object &&
      'author' in object &&
      'publish_date' in object &&
      'next_article' in object &&
      'content' in object &&
      'title' in object &&
      'abstract' in object &&
      'category' in object &&
      'book' in object &&
      'tags' in object;
  } catch (err) {
    return false;
  }
  return ans;

}


export function isSiteInfo(object: any): object is SiteInfo {
  let ans = false;
  try {
    ans = 'categories' in object &&
      'books' in object &&
      'tags' in object &&
      'owner' in object &&
      'article_amount' in object &&
      'tag_id' in object.tags[0] &&
      'book_id' in object.books[0] &&
      'category_id' in object.categories[0];
  } catch (err) {
    return false;
  }
  return ans;

}
