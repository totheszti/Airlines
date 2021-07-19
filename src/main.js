import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { BFormSelect } from 'bootstrap-vue'
Vue.component('b-form-select', BFormSelect)

new Vue({
  render: h => h(App),
}).$mount('#app')
