import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules/', true, /\.js$/)
// don't need to do `import errorLog from './modules/errorLog'`
// it will automatically require all vuex module from modules file
export const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // this set './errorLog.js' => 'errorLog'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
