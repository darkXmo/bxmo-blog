import {
  Button,
  Card,
  Pagination,
  Input,
  Select,
  Modal,
  Form,
  Alert,
  Popconfirm,
} from "ant-design-vue";
import { App } from "vue";

/**
 * 选择Antd引入的组件
 * @param app
 */
const antdImport = (app: App<Element>) => {
  app.use(Button);
  app.use(Card);
  app.use(Pagination);
  app.use(Input);
  app.use(Select);
  app.use(Modal);
  app.use(Form);
  app.use(Alert);
  app.use(Popconfirm);
};

export default antdImport;
