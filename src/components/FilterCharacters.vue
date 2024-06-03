<template>
    <div class="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
      <input v-model="filterName" type="text" placeholder="Name" class="px-4 py-2 bg-gray-200 rounded" />
      <select v-model="filterStatus" class="px-4 py-2 bg-gray-200 rounded">
        <option value="">Status</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <button @click="applyFilters" class="px-4 py-2 bg-blue-500 text-white rounded">Apply</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { defineEmits } from 'vue';
  
  const emits = defineEmits(['applyFilters']);
  
  const filterName = ref('');
  const filterStatus = ref('');
  
  const applyFilters = () => {
    emits('applyFilters', { name: filterName.value, status: filterStatus.value });
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  