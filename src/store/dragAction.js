import Vuex, { createLogger } from "vuex";
import Vue from "vue";

Vue.use(Vuex);

const dragAction = {
  namespaced: true,
  state: {
    count:0,
    elements: []
  },
  mutations: {
    updateElements: (state, payload) => {
      state.elements = payload;
    },
    addElements: (state, payload) => {
      state.elements.push(payload);
    }
  },
  actions: {
    updateElements: ({ commit }, payload) => {
      commit("updateElements", payload);
    },
    addElements: ({ commit }, payload) => {
      commit("addElements", payload);
    }
  }
}

export default dragAction