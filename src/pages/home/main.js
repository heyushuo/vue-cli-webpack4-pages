import Vue from 'vue'
import Home from './home'
import Router from '@/router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  Router,
  render: h => h(Home)
})
