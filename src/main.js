import Vue from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment/moment'
import Multiselect from 'vue-multiselect'
import "@/stylesheet/multiselect.css";

Vue.config.productionTip = false
Vue.component('multiselect', Multiselect)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')