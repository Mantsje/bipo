import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

import './fontAwesome.js'

Vue.config.productionTip = false

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--windowHeight', `${vh}px`)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
