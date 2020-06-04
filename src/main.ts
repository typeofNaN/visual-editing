import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import H5Components from './components/index'
import './icons/index'

import './assets/style.scss'

Vue.use(H5Components)
Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype.$evt = new Vue()

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})