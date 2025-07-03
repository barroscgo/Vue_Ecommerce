<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-container>
    <v-card class="mx-auto mt-10 pa-6" max-width="400">
      <h3 class="mb-4 text-center">Criar Conta</h3>
      <v-form @submit.prevent="handleRegister">
        <v-text-field label="Nome" v-model="form.name" required />
        <v-text-field label="Email" v-model="form.email" required />
        <v-text-field label="Senha" v-model="form.password" type="password" required />
        <v-btn type="submit" color="primary" block>Cadastrar</v-btn>
        <v-btn text block @click="$router.push('/login')">Já tenho conta</v-btn>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const form = reactive({
  name: '',
  email: '',
  password: ''
});

const handleRegister = async () => {
  try {
    await store.dispatch('auth/register', form);
    alert('Cadastro realizado com sucesso!');
    router.push('/login');
  } catch (err) {
    alert('Erro ao cadastrar');
  }
};
</script>
