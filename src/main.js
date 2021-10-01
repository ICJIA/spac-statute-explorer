import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/assets/app.css";
import "@/assets/github-markdown.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
Vue.config.productionTip = false;
import VueGtag from "vue-gtag";
Vue.use(
  VueGtag,
  {
    config: { id: "G-Q14RK9Y4L8" },
  },
  router
);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
