import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import antdImport from './components/antd';

const app = createApp(App).use(store).use(router);

antdImport(app);

app.mount('#app');


