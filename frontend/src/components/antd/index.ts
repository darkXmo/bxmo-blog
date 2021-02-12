import { Button, Card } from 'ant-design-vue';
import { App } from 'vue';


const antdImport = (app: App<Element>) => {
  app.use(Button);
  app.use(Card);
};

export default antdImport;