<template>
    <div class="bg-gray-800 rounded-lg shadow-lg p-4">
      <img :src="character.image" :alt="character.name" class="w-full h-48 object-cover rounded-t-lg"/>
      <div class="p-4">
        <h2 class="text-xl font-bold text-white">{{ character.name }}</h2>
        <p class="text-gray-400">
          <span class="inline-block w-3 h-3 mr-2 rounded-full"
            :class="{
              'bg-green-500': character.status === 'Alive',
              'bg-red-500': character.status === 'Dead',
              'bg-gray-500': character.status === 'unknown'
            }"></span>
          {{ character.status }} - {{ character.species }}
        </p>
        <p class="text-gray-400 mt-2">Last known location:</p>
        <p class="text-white">{{ character.location.name }}</p>
        <p class="text-gray-400 mt-2">First seen in:</p>
        <p class="text-white">{{ character.episode[0].split('/').pop() }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from 'vue';
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
  
  const props = defineProps<{
    character: Character;
  }>();
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  