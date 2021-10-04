import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import { EventBus } from "./event-bus";
import "@/assets/app.css";
import "@/assets/github-markdown.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import initSqlJs from "sql.js";
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

Vue.config.productionTip = false;
import VueGtag from "vue-gtag";

Vue.use(
  VueGtag,
  {
    config: { id: "G-Q14RK9Y4L8" },
  },
  router
);

(async () => {
  let dbPath;
  if (process.env.NODE_ENV === "development") {
    dbPath = "http://localhost:8080/statutes.db";
  } else {
    dbPath = "https://statutes.icjia.cloud/statutes.db";
  }
  try {
    const sqlPromise = await initSqlJs({ locateFile: () => sqlWasm });
    let databasePath = `${dbPath}`;
    const dataPromise = fetch(databasePath).then((res) => res.arrayBuffer());
    const [SQL, buf] = await Promise.all([sqlPromise, dataPromise]);
    let db = await new SQL.Database(new Uint8Array(buf));
    store.commit("setDb", db);
    // EventBus.$emit("dbIsReady");
  } catch (err) {
    store.commit("setError", err);
    console.log(err);
  }
})();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
