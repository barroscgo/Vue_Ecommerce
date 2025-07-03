import api from '../services/api';

export default {
  namespaced: true,
  state: () => ({
    products: [],
    loading: false
  }),
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setLoading(state, value) {
      state.loading = value;
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      commit('setLoading', true);
      const res = await api.get('/products');
      commit('setProducts', res.data);
      commit('setLoading', false);
    },
    async createProduct(_, product) {
      const token = localStorage.getItem('token');
      await api.post('/products', product, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    async updateProduct(_, { id, product }) {
      const token = localStorage.getItem('token');
      await api.put(`/products/${id}`, product, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    async deleteProduct(_, id) {
      const token = localStorage.getItem('token');
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }
  }
};
