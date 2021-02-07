import { Button, message } from 'ant-design-vue';
import { App } from 'vue';


const antdImport = (app: App<Element>) => {
  app.use(Button);

  app.config.globalProperties.$message = message;
};

export default antdImport;