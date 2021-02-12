import { Button, message, Card } from 'ant-design-vue';
import { App } from 'vue';


const antdImport = (app: App<Element>) => {
  app.use(Button);
  app.use(Card);

  app.config.globalProperties.$message = message;
};

export default antdImport;