<script setup lang="ts">
import LayoutComponent from './components/LayoutComponent.vue'
import { onMounted } from 'vue'
import { useAuth } from '@/stores/auth'
import { Toaster } from 'vue-sonner'

const authStore = useAuth()

onMounted(() => {
  if (authStore.isAuthenticated) {
    authStore.checkAuth()
  }
})
</script>

<template>
  <Toaster rich-colors position="top-center" />
  <LayoutComponent>
    <RouterView />
  </LayoutComponent>
</template>

<style scoped></style>
