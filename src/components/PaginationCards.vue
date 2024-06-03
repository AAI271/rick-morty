<template>
  <div class="flex justify-center mt-4 space-x-2">
    <button
      @click="$emit('changePage', currentPage - 1)"
      :disabled="currentPage <= 1"
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Previous
    </button>

    <button
      v-for="page in pages"
      :key="page"
      @click="$emit('changePage', page)"
      :class="{
        'px-4 py-2 rounded': true,
        'bg-gray-200': currentPage !== page,
        'bg-blue-500 text-white': currentPage === page
      }"
    >
      {{ page }}
    </button>

    <span v-if="currentPage < totalPages - 2">...</span>

    <button
      @click="$emit('changePage', totalPages)"
      v-if="currentPage < totalPages - 1"
      class="px-4 py-2 bg-gray-200 rounded"
    >
      {{ totalPages }}
    </button>

    <button
      @click="$emit('changePage', currentPage + 1)"
      :disabled="currentPage >= totalPages"
      class="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
    >
      Next
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emits = defineEmits(['changePage']);

const pages = computed(() => {
  const maxPagesToShow = 3;
  const start = Math.max(props.currentPage - 1, 1);
  const end = Math.min(start + maxPagesToShow - 1, props.totalPages);
  const pages = [];

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
