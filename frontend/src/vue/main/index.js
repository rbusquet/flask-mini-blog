import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
import routes from "./routes";
import store from "./store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  base: "/vue/",
  mode: "history"
});

const vm = new Vue({
  render: h => h(App),
  router,
  store
});

vm.$mount("#root");
