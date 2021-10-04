import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    db: null,
    isDbReady: false,
    error: null,
  },
  mutations: {
    setDb(state, payload) {
      state.db = payload;
      state.isDbReady = true;
    },
    setErr(state, payload) {
      state.error = payload;
      state.isDbReady = true;
    },
    setClearErr(state) {
      state.error = null;
    },
  },
  actions: {},
  modules: {},
});
