import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    singer: {},
  },
  mutations: {
    changeSinger(state, payload) {
      state.singer = payload;
    },
  },
  actions: {},
  modules: {},
});
