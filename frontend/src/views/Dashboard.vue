<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-container class="pa-4">
    <!-- TOPO: Clima e saudação -->
    <v-row>
      <v-col cols="12" md="6">
        <WeatherCard />
      </v-col>
      <v-col cols="12" md="6" class="d-flex align-end justify-end">
        <div class="text-right">
          <h2 class="font-weight-light">Olá, {{ user.name }} 👋</h2>
          <v-btn color="error" class="mt-2" @click="logout">Sair</v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- TÍTULO E BOTÃO -->
    <v-row class="mt-8 mb-4">
      <v-col>
        <h3 class="text-h5 font-weight-medium">🛍️ Produtos Cadastrados</h3>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" @click="openDialog()">+ Novo Produto</v-btn>
      </v-col>
    </v-row>

    <!-- TABELA -->
    <v-data-table
      :headers="headers"
      :items="products"
      :loading="loading"
      loading-text="Carregando produtos..."
      class="elevation-1"
      no-data-text="Nenhum produto encontrado"
    >
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn icon @click="openDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="deleteProduct(item.id)">
          <v-icon color="red">mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <!-- MODAL -->
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title class="text-h6">
          {{ edited.id ? 'Editar Produto' : 'Novo Produto' }}
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="saveProduct">
            <v-text-field label="Nome" v-model="edited.name" required />
            <v-text-field label="Preço" v-model="edited.price" type="number" required />
            <v-text-field label="Categoria" v-model="edited.category" required />
            <v-text-field label="Imagem (URL)" v-model="edited.image" />
            <v-textarea label="Descrição" v-model="edited.description" rows="2" />
            <v-card-actions class="justify-end mt-2">
              <v-btn text @click="closeDialog">Cancelar</v-btn>
              <v-btn color="success" type="submit">Salvar</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import { useStore } from 'vuex';
import WeatherCard from '@/components/WeatherCard.vue';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const products = computed(() => store.state.products.products);
const loading = computed(() => store.state.products.loading);
const user = computed(() => store.state.auth.user);

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Nome', value: 'name' },
  { text: 'Preço', value: 'price' },
  { text: 'Categoria', value: 'category' },
  { text: 'Ações', value: 'actions', sortable: false }
];

const dialog = ref(false);
const edited = reactive({
  id: null,
  name: '',
  price: '',
  category: '',
  image: '',
  description: ''
});

const openDialog = (product = null) => {
  if (product) Object.assign(edited, product);
  else Object.assign(edited, { id: null, name: '', price: '', category: '', image: '', description: '' });
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
  Object.assign(edited, { id: null, name: '', price: '', category: '', image: '', description: '' });
};

const saveProduct = async () => {
  edited.price = parseFloat(edited.price);
  if (edited.id) {
    await store.dispatch('products/updateProduct', { id: edited.id, product: edited });
  } else {
    await store.dispatch('products/createProduct', edited);
  }
  closeDialog();
  await store.dispatch('products/fetchProducts');
};

const deleteProduct = async (id) => {
  if (confirm('Deseja realmente excluir este produto?')) {
    await store.dispatch('products/deleteProduct', id);
    await store.dispatch('products/fetchProducts');
  }
};

const logout = () => {
  store.dispatch('auth/logout');
  router.push('/login');
};

onMounted(() => {
  store.dispatch('products/fetchProducts');
});
</script>

<style scoped>
.text-right h2 {
  margin: 0;
}

.v-data-table {
  border-radius: 12px;
  overflow: hidden;
}
</style>
