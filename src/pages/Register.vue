<template>
  <div class="flex justify-center items-center min-h-screen">
    <div class="w-96 border border-gray-200 shadow p-8 rounded-2xl">
      <h1 class="text-3xl font-bold mb-8">Register</h1>

      <div v-if="error" class="mb-4 text-red-600">{{ error }}</div>

      <form @submit.prevent="register" class="flex flex-col space-y-4">
        <div class="flex flex-col space-y-2">
          <label for="name" class="block text-sm font-medium">Fullname</label>
          <input
            type="text"
            id="name"
            name="name"
            class="input"
            v-model="formState.name"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="gender" class="block text-sm font-medium">Gender</label>
          <select
            id="gender"
            name="gender"
            class="input"
            v-model="formState.gender"
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>

        <div class="flex flex-col space-y-2">
          <label for="email" class="block text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            class="input"
            v-model="formState.email"
            required
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
            v-model="formState.password"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="password_confirmation" class="block text-sm font-medium">
            Confirm Password
          </label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            class="input"
            v-model="formState.password_confirmation"
          />
        </div>

        <button type="submit" class="btn btn-primary">Register</button>

        <div class="mt-4 text-center">
          <router-link to="/login" class="text-sm text-blue-600 hover:underline"
            >Already have an account? Login</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { api } from "@/lib/api";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const error = ref(null);
const formState = reactive({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  gender: "",
});

async function register() {
  try {
    await api.post("/register", formState);
    router.push("/login");
  } catch (e) {
    console.error(e);
    error.value = e.response.data.message || "Registration failed";
  }
}
</script>
