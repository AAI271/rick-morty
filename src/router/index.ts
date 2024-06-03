import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LocationsView from '@/views/LocationsView.vue';
import EpisodesView from '@/views/EpisodesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'characters',
      component: HomeView,
    },
    {
      path: '/characters/:page',
      name: 'charactersPage',
      component: HomeView,
    },
    {
      path: '/locations',
      name: 'locations',
      component: LocationsView,
    },
    {
      path: '/locations/:page',
      name: 'locationsPage',
      component: LocationsView,
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: () => EpisodesView,
    },
    {
      path: '/episodes/:page',
      name: 'episodesPage',
      component: EpisodesView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
