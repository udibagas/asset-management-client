<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-96 border border-gray-200 shadow p-8 rounded-2xl">
      <h1 class="text-3xl font-bold mb-8">Login</h1>

      <div v-if="error" class="text-error my-8">{{ error }}</div>

      <form
        @submit.prevent="handleLogin"
        method="POST"
        class="w-full flex flex-col space-y-4"
      >
        <div class="flex flex-col space-y-2">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input"
            required
            v-model="formState.email"
            placeholder="Enter your email"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="password" class="block text-sm font-medium"
            >Password</label
          >
          <input
            type="password"
            id="password"
            name="password"
            class="input"
            required
            v-model="formState.password"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>

        <div class="mt-4 text-center">
          <router-link
            to="/register"
            class="text-sm text-blue-600 hover:underline"
            >Don't have an account? Register</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { api } from "@/lib/api";

const error = ref(null);
const router = useRouter();

const formState = reactive({
  email: "",
  password: "",
});

async function handleLogin() {
  try {
    const { data } = await api.post("/login", {
      ...formState,
    });

    console.log(data);
    router.push("/", { replace: true });
  } catch (err) {
    error.value = "Login failed. Please check your credentials.";
    console.error(err);
  }
}
</script>
