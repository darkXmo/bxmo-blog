import ArticleItem from "@/models/ArticleItem";
import Tag from "@/models/Tag";
import Mock, { Random } from "mockjs";

const baseUrl = 'http://127.0.0.1:3000/';

/**
 * 设置延时
 */
Mock.setup({
  timeout: '200-600' // 表示响应时间介于 200 和 600 毫秒之间，默认值是'10-100'。
})

const tag = () => {
  const tag: Tag = {
    'value': Random.cword(Random.integer(2, 4))
  };
  return tag;
};

const articleItem = () => {
  const item: ArticleItem = {
    'title': Random.ctitle(),
    'author': Random.cname(),
    'abstract': Random.cparagraph(),
    'date': new Date(Random.date()),
    'tags': Array(Random.integer(1, 4)).fill(undefined).map(() => tag())
  };
  return item;
};

/**
 * Mock模拟数据
 */
export default () => {
  Mock.mock(baseUrl + 'article/list', {
    'articles': Array(10).fill(undefined).map(() => articleItem())
  });
};


// 输出结果