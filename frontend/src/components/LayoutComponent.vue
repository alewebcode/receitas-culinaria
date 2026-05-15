<template>
  <div class="flex-col min-h-screen flex items-center bg-gray-100">
    <header-component v-if="auth.isAuthenticated" />
    <div class="container mx-auto px-4 py-8">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/auth'
import HeaderComponent from './HeaderComponent.vue'

const auth = useAuth()
</script>
