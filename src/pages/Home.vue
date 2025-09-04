<template>
  <h1 class="text-3xl font-bold mb-8">Kelola Aset</h1>

  <div class="mb-8 border border-gray-300 shadow rounded-2xl p-8">
    <h2 class="text-xl font-bold">Total Nilai Aset: Rp. ??</h2>
  </div>

  <div class="flex gap-4 items-center mb-8">
    <form @submit.prevent="fetchData" class="flex flex-1 gap-4">
      <input
        type="text"
        class="input"
        name="search"
        placeholder="Cari Asset..."
        v-model="search"
      />
      <select
        id="category"
        name="category_id"
        class="select"
        v-model="category_id"
        @change="fetchData"
      >
        <option value="">-- Pilih Kategori --</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>

      <select
        id="location"
        name="location_id"
        class="select"
        v-model="location_id"
        @change="fetchData"
      >
        <option value="">-- Pilih Lokasi --</option>
        <option
          v-for="location in locations"
          :key="location.id"
          :value="location.id"
        >
          {{ location.name }}
        </option>
      </select>
      <button class="btn btn-primary" type="submit">Filter</button>
      <button @click="reset" class="btn btn-primary btn-outline" type="button">
        Reset
      </button>
    </form>

    <router-link to="/asset/create" class="btn btn-primary">
      + Tambah Aset Baru
    </router-link>
  </div>

  <!-- List assets -->
  <div class="overflow-x-auto mb-8">
    <table class="table table-zebra">
      <!-- head -->
      <thead class="bg-gray-100">
        <tr>
          <th>#</th>
          <th>Gambar</th>
          <th>Nama Aset</th>
          <th class="text-right">Nilai</th>
          <th>Kategori</th>
          <th>Lokasi</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(asset, index) in assets" :key="asset.id">
          <td>{{ index + 1 }}</td>
          <td>
            <img :src="asset.image" class="w-16 h-16 object-contain" alt="" />
          </td>
          <td class="font-bold">{{ asset.name }}</td>
          <td>
            <div class="text-green-400 text-right">{{ asset.value }}</div>
          </td>
          <td>
            <div class="badge badge-outline badge-info badge-sm">
              {{ asset.category.name }}
            </div>
          </td>
          <td>{{ asset.location.name }}</td>
          <td class="flex gap-2 justify-end">
            <a href="/asset/?/edit" class="btn btn-warning btn-sm btn-outline"
              >Edit</a
            >

            <button
              @click="handleDelete(asset.id)"
              type="button"
              class="btn btn-error btn-sm btn-outline"
            >
              Hapus
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { api } from "@/lib/api";

const assets = ref([]);
const categories = ref([]);
const locations = ref([]);
const search = ref("");
const category_id = ref("");
const location_id = ref("");

async function fetchData() {
  try {
    const { data } = await api.get("/api/asset", {
      params: {
        search: search.value,
        category_id: category_id.value,
        location_id: location_id.value,
      },
    });
    console.log(data);
    assets.value = data.data;
  } catch (error) {
    console.error("Error fetching assets:", error);
  }
}

async function handleDelete(id) {
  const c = confirm("Anda yakin akan menghapus aset ini?");
  if (!c) return;

  try {
    await api.delete(`/api/asset/${id}`);
    fetchData();
  } catch (error) {
    console.error("Error deleting asset:", error);
  }
}

async function fetchCategories() {
  try {
    const { data } = await api.get("/api/category");
    console.log(data);
    categories.value = data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

async function fetchLocations() {
  try {
    const { data } = await api.get("/api/location");
    console.log(data);
    locations.value = data;
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
}

function reset() {
  search.value = "";
  category_id.value = "";
  location_id.value = "";
  fetchData();
}

onMounted(() => {
  fetchData();
  fetchCategories();
  fetchLocations();
});
</script>
