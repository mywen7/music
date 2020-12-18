import { createApp } from 'vue';
import './index.css';
import Elementplus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);

app.use(Elementplus);
app.use(router);

const install = () => {
  const requireComponent = require.context(
    '@/components',
    true,
    /[a-z0-9]+\.(tsx?|vue)$/i,
  )
  // 批量注册components里面的组件
  requireComponent.keys().forEach((component) => {
    const componentConfig = requireComponent(component);
    const componentName = componentConfig.default.name;
    if (componentName) {
      app.component(componentName, componentConfig.default || componentConfig)
    }
  })
}

app.use(install);
app.mount('#app');
