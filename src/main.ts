import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import H5Components from './components'
import './icons/index.ts'

import './assets/style.scss'

Vue.use(ElementUI)

Vue.config.productionTip = false

const evt = {
  install (Vue: any) {
    Vue.prototype.$evt = new Vue()
  }
}
Vue.use(evt)
Vue.use(H5Components)

new Vue({
  render: h => h(App)
}).$mount('#app')
