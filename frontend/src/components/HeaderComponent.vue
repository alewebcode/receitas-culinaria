<template>
  <header class="w-full bg-gray-800 h-20 flex items-center text-white">
    <div class="flex items-center flex-1 ml-4">
      <span class="font-bold text-xl">Receitas de Culinária</span>
    </div>
    <div class="flex justify-end mr-4 flex-1">
      <span>Olá, {{ userLogin?.user?.login }}!</span>
    </div>
    <nav className="ml-4">
      <div className="flex justify-end space-x-4 mr-4 relative group">
        <span className="hover:text-gray-300 cursor-pointer" @click="handleLogout">
          <ArrowLeftEndOnRectangleIcon class="h-6 w-6"
        /></span>
        <span
          class="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
        >
          Sair
        </span>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'
import { useAuth } from '@/stores/auth'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/vue/24/outline'

const userLogin = useAuth()

const handleLogout = () => {
  userLogin.logout()

  router.push('/login')
}
</script>
