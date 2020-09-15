import Vue from "vue";
import Home from "./home.vue";
import "./home.less";
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(Home)
});
