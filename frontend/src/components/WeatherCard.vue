<template>
  <v-card class="mb-6" max-width="400">
    <v-card-title>Previsão do Tempo</v-card-title>

    <v-card-text v-if="loading">Carregando...</v-card-text>
    <v-card-text v-else-if="error">{{ error }}</v-card-text>
    <v-card-text v-else>
      <div class="d-flex align-center">
        <v-img :src="weatherIcon" width="60" class="mr-4" />
        <div>
          <div class="text-h6">{{ city }}</div>
          <div>{{ temperature }}°C | {{ weather }}</div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const city = ref('Joinville');
const temperature = ref(null);
const weather = ref('');
const weatherIcon = ref('');
const loading = ref(true);
const error = ref('');

const API_KEY = 'e59ce60f273ce29dfd56f6abe2fbe84f'; 

const fetchWeather = async () => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}&units=metric&lang=pt_br`
    );
    temperature.value = Math.round(res.data.main.temp);
    weather.value = res.data.weather[0].description;
    weatherIcon.value = `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`;
  } catch (err) {
    error.value = 'Não foi possível carregar o clima 😢';
  } finally {
    loading.value = false;
  }
};

onMounted(fetchWeather);
</script>
