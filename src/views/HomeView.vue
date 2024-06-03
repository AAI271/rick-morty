<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import CharacterCard from '@/components/CharacterCard.vue';
import SkeletonCard from '@/components/SkeletonCard.vue';
import PaginationCards from '@/components/PaginationCards.vue';
import FilterCharacters from '@/components/FilterCharacters.vue';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  episode: string[];
}

const route = useRoute();
const router = useRouter();

const characters = ref<Character[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const page = ref(Number(route.params.page) || 1);
const totalPages = ref(1); 

const filterName = ref('');
const filterStatus = ref('');

const fetchCharacters = async (page: number, name: string, status: string) => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/', {
      params: { page, name, status },
    });
    characters.value = response.data.results;
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
  fetchCharacters(page.value, filterName.value, filterStatus.value);
});

const applyFilters = (filters: { name: string; status: string }) => {
  filterName.value = filters.name;
  filterStatus.value = filters.status;
  router.push(`/characters/${1}`);
  fetchCharacters(1, filterName.value, filterStatus.value);
};

onMounted(() => {
  fetchCharacters(page.value, filterName.value, filterStatus.value);
});
</script>

<template>
  <main class="container mx-auto p-4">
    <FilterCharacters @applyFilters="applyFilters" />

    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SkeletonCard v-for="n in 8" :key="n" />
    </div>
    <div v-else-if="error" class="text-center text-red-500">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character" />
    </div>
    <PaginationCards :currentPage="page" :totalPages="totalPages" @changePage="router.push(`/characters/${$event}`)" />
  </main>
</template>

<style scoped>
/* Add any custom styles if needed */
</style>
