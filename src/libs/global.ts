import { App } from 'vue';

export const globalComponent = {
  install(app: App) {
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
  },
}
