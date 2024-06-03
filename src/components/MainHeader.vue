<template>
    <header class="bg-gray-800 text-white py-4 shadow-lg">
      <div class="container mx-auto flex justify-between items-center px-4">
        <div class="flex items-center space-x-2">
          
          <h1 class="text-2xl font-bold">Rick and Morty</h1>
        </div>
        <nav class="hidden md:flex space-x-4">
          <router-link to="/characters" class="hover:text-gray-400">Characters</router-link>
          <router-link to="/locations" class="hover:text-gray-400">Locations</router-link>
          <router-link to="/episodes" class="hover:text-gray-400">Episodes</router-link>
        </nav>
        <button @click="toggleMenu" class="md:hidden flex items-center">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <div v-if="menuOpen" class="md:hidden bg-gray-800">
        <nav class="flex flex-col space-y-2 px-4 pb-4">
          <router-link to="/characters" class="hover:text-gray-400" @click="toggleMenu">Characters</router-link>
          <router-link to="/locations" class="hover:text-gray-400" @click="toggleMenu">Locations</router-link>
          <router-link to="/episodes" class="hover:text-gray-400" @click="toggleMenu">Episodes</router-link>
        </nav>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const menuOpen = ref(false);
  
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value;
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  