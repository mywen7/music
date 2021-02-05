import { createApp } from 'vue';
import './index.css';
import Elementplus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import { globalComponent } from './libs/global';
const app = createApp(App);

app.use(Elementplus);
app.use(router);
app.use(store);
app.use(globalComponent);
app.mount('#app');
