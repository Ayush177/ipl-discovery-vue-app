import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'

// Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Vue.use(require('bootstrap-vue/dist/bootstrap-vue.common.min'));
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

import TheNavbar from "./components/nav/TheNavbar.vue";

Vue.config.productionTip = false

Vue.component("the-navbar", TheNavbar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
