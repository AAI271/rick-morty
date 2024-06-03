<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import SkeletonCard from '@/components/SkeletonCard.vue';
import PaginationCards from '@/components/PaginationCards.vue';
import { useRoute, useRouter } from 'vue-router';


interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}
const route = useRoute();
const router = useRouter();

const episodes = ref<Episode[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const page = ref(Number(route.params.page) || 1);
const totalPages = ref(1);

const fetchEpisodes = async (page: number) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/episode', {
      params: { page },
    });
    episodes.value = response.data.results;
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
  fetchEpisodes(page.value );
});


onMounted(() => {
  fetchEpisodes(page.value);
});
</script>

<template>
  <main class="container mx-auto p-4 episodes">
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="episode in episodes" :key="episode.id" class="bg-gray-800 rounded-lg shadow-lg p-4">
        <h2 class="text-xl font-bold text-white">{{ episode.name }}</h2>
        <p class="text-gray-400">{{ episode.air_date }}</p>
        <p class="text-gray-400">{{ episode.episode }}</p>
      </div>
    </div>
    <PaginationCards :currentPage="page" :totalPages="totalPages" @changePage="router.push(`/episodes/${$event}`)" />
  </main>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
