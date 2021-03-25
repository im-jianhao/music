import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import FastClick from "fastclick";
import "@/assets/stylus/index.styl";
import VueLazyload from "vue-lazyload";

Vue.use(VueLazyload, {
  error: require("@/assets/image/loading.gif"),
  loading: require("@/assets/image/loading.gif"),
  attempt: 1,
});

// 300ms延迟
FastClick.attach(document.body);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
