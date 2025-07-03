<!-- eslint-disable vue/multi-word-component-names -->

<template>
  <v-container>
    <v-card class="mx-auto mt-10 pa-6" max-width="400">
      <h3 class="mb-4 text-center">Login</h3>
      <v-form @submit.prevent="handleLogin">
        <v-text-field label="Email" v-model="form.email" required />
        <v-text-field label="Senha" v-model="form.password" type="password" required />
        <v-btn type="submit" color="primary" block>Entrar</v-btn>
        <v-btn text block @click="$router.push('/register')">Criar Conta</v-btn>
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
  email: '',
  password: ''
});

const handleLogin = async () => {
  try {
    await store.dispatch('auth/login', form);
    router.push('/dashboard');
  } catch (err) {
    alert('Erro ao fazer login');
  }
};
</script>
