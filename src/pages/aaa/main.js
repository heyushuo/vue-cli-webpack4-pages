import Vue from 'vue'
import aaa from './aaa'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(aaa)
})
