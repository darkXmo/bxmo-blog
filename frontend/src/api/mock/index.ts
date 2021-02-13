import ArticleItem from "@/models/ArticleItem";
import Mock, { Random } from "mockjs";

const baseUrl = 'http://127.0.0.1:3000/';

const articleItem = () => {
  const item: ArticleItem = {
    'title': Random.ctitle(),
    'author': Random.cname(),
    'abstract': Random.cparagraph(),
    'date': new Date(Random.date()),
    'tags': [
      {
        'value': Random.cword()
      }
    ]
  };
  return item;
};

export default () => {
  Mock.mock(baseUrl + 'article/list', {
    'articles': Array(10).fill(undefined).map(() => articleItem())
  });
};


// 输出结果