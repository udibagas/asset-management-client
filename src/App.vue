<template>
  <div class="container mx-auto my-4">
    <router-view />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";

onMounted(() => {
  axios.get("http://localhost:8000/sanctum/csrf-cookie", {
    withCredentials: true,
  });
});
</script>
