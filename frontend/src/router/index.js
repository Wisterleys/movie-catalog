import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import FavoritesView from '@/views/FavoritesView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Buscar Filmes' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    meta: { title: 'Meus Favoritos' }
  },
  {
    path: '/movie/:id',
    name: 'MovieDetails',
    component: () => import('../views/MovieDetails.vue'),
    props: true
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  }
});

// Mudar título da página dinamicamente
router.beforeEach((to) => {
  document.title = to.meta.title 
    ? `${to.meta.title} | Catálogo de Filmes` 
    : 'Catálogo de Filmes';
});

export default router;