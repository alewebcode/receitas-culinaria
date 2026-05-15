import { useAuth } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: () => import('@/views/RecipesView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/recipes/new',
    name: 'recipes.new',
    component: () => import('@/views/RecipeFormView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/recipes/:id',
    name: 'recipes.edit',
    component: () => import('@/views/RecipeFormView.vue'),
    meta: {
      auth: true,
    },
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuth()
  const authRequired = to.meta.auth

  if (authRequired) {
    await authStore.checkAuth()

    if (!authStore.isAuthenticated) {
      return { path: '/login' }
    }
  }

  next()
})

export default router
