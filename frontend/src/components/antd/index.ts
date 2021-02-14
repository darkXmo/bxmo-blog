import { Button, Card } from 'ant-design-vue';
import { App } from 'vue';

/**
 * 选择Antd引入的组件
 * @param app 
 */
const antdImport = (app: App<Element>) => {
  app.use(Button);
  app.use(Card);
};

export default antdImport;