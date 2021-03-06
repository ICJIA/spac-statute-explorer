import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },

  {
    path: "/builder",
    name: "builder",
    redirect: "/",
  },
  {
    path: "/keyword",
    name: "keyword",

    component: () =>
      import(/* webpackChunkName: "builder" */ "../views/Keyword.vue"),
  },
  {
    path: "/sql",
    name: "sql",

    component: () =>
      import(/* webpackChunkName: "builder" */ "../views/Sql.vue"),
  },
  // {
  //   path: "/sandbox",
  //   name: "sandbox",

  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Sandbox.vue"),
  // },
  // {
  //   path: "/sandbox2",
  //   name: "sandbox2",

  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/Sandbox2.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
