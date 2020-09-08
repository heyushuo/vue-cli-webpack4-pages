import Vue from "vue";
import Index from "./index.vue";
import "./index.less";
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(Index)
});
