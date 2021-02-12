import Mock from "mockjs";

const baseUrl = 'http://127.0.0.1:3000/';

export default () => {
  Mock.mock(baseUrl + 'article/list', {
      'list|1-10': [{
      'id|+1': 1
    }]
  });
};


// 输出结果