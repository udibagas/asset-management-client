<template>
  <div class="container mx-auto my-4">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { api } from "./lib/api";

onMounted(() => {
  api.get("/sanctum/csrf-cookie");
});
</script>
