import api from '../services/api';

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || ''
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, payload) {
      const res = await api.post('/auth/login', payload);
      commit('setUser', res.data.user);
      commit('setToken', res.data.token);
    },
    async register(_, payload) {
      await api.post('/auth/register', payload);
    },
    logout({ commit }) {
      commit('logout');
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    getUser: state => state.user
  }
};
