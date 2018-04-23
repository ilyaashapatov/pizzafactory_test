import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    roles: {
      driver: 'Водитель',
      waiter: 'Официант',
      cook: 'Повар'
    }
  },
  computed: {
    employeesState () {
      return this.$store.getters.employees
    }
  }
})
