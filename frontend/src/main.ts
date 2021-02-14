import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import antdImport from './components/antd';

const app = createApp(App).use(store).use(router);

// 按需引入 antd 组件
antdImport(app);

app.mount('#app');



