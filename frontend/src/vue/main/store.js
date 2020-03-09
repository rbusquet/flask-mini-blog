import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const localUser = JSON.parse(localStorage.getItem("user") || "false");

const defaultUser = {
  id: "",
  username: ""
};

export default new Vuex.Store({
  state: {
    user: localUser || defaultUser
  },
  mutations: {
    setUser(state, user) {
      localStorage.setItem("user", JSON.stringify({ ...user }));
      state.user = { ...state.user, ...user };
    },
    clearUser(state) {
      localStorage.removeItem("user");
      state.user = { ...state.user, ...defaultUser };
    }
  }
});
