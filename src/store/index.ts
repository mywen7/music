
import { createStore } from 'vuex'

const files = require.context('./modules', false, /\.ts$/)
const modules = files.keys().reduce((module: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = files(modulePath);
  module[moduleName] = value.default;
  return module
}, {})

export default createStore({
  modules,
})
