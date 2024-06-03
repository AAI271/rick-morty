<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import SkeletonCard from '@/components/SkeletonCard.vue';
import PaginationCards from '@/components/PaginationCards.vue';
import { useRoute, useRouter } from 'vue-router';

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
}

const route = useRoute();
const router = useRouter();

const locations = ref<Location[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const page = ref(Number(route.params.page) || 1);
const totalPages = ref(1);

const fetchLocations = async (page: number) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/location', {
      params: { page },
    });
    locations.value = response.data.results;
    totalPages.value = response.data.info.pages;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      error.value = err.message;
    } else {
      error.value = (err as Error).message;
    }
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.page, (newPage) => {
  page.value = Number(newPage);
  fetchLocations(page.value );
});

onMounted(() => {
  fetchLocations(page.value);
});
</script>

<template>
  <main class="container mx-auto p-4">
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="location in locations" :key="location.id" class="bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 class="text-xl font-bold text-white">{{ location.name }}</h2>
        <p class="text-gray-400">{{ location.type }}</p>
        <p class="text-gray-400">{{ location.dimension }}</p>
      </div>
    </div>
    <PaginationCards :currentPage="page" :totalPages="totalPages" @changePage="router.push(`/locations/${$event}`)"  />
  </main>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
