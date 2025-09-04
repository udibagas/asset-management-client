<template>
  <div class="container mx-auto my-4">
    <router-view />
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted } from "vue";
import { api } from "./lib/api";

onMounted(() => {
  api.get("csrf-cookie");
});
</script>
