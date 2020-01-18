import Vue from 'vue'
import App from './App.vue'
import database from './firebase.js'

const hnr_db = new database()

Vue.config.productionTip = false
Vue.prototype.$database = hnr_db

// Object.defineProperty(Vue.prototype, '$database', {
//   value: hnr_db,
// })

new Vue({
  render: h => h(App),
}).$mount('#app')
