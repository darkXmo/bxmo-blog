import { ArticleSimple, ArticleToPublish } from 'model';

export function isArticleSimple(object: any): object is ArticleSimple {
  let ans = false;
  try {
    ans = 'id' in object &&
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
