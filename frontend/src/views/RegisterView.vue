<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold m-4">Cadastrar Usuário</h1>
    <form class="mt-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700">Nome</label>
        <input
          type="text"
          name="name"
          id="name"
          v-model="user.name"
          class="w-full px-3 py-2 border border-gray-400 rounded"
        />
        <p v-if="errors.name" class="text-red-600 text-md mt-1">
          {{ errors.name }}
        </p>
      </div>
      <div class="mb-4">
        <label for="login" class="block text-gray-700">Login</label>
        <input
          type="text"
          name="login"
          id="login"
          v-model="user.login"
          class="w-full px-3 py-2 border border-gray-400 rounded"
        />
        <p v-if="errors.login" class="text-red-600 text-md mt-1">
          {{ errors.login }}
        </p>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Senha</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          class="w-full px-3 py-2 border border-gray-400 rounded"
        />
        <p v-if="errors.password" class="text-red-600 text-md mt-1">
          {{ errors.password }}
        </p>
      </div>
      <div class="flex justify-start space-x-2">
        <button
          type="button"
          class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
        >
          <router-link to="/login">Cancelar</router-link>
        </button>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
          Cadastrar
        </button>
      </div>
      <p v-if="errorRegister" class="text-red-500 text-md mt-2">{{ errorRegister }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { api } from '@/services/api'
import axios from 'axios'
import { reactive, ref } from 'vue'
import z from 'zod'

const user = reactive({
  name: '',
  login: '',
  password: '',
})

const formSchema = z.object({
  name: z.string().min(1, 'Informe um nome!').min(3, 'Informe um nome com pelo menos 3 caracteres'),
  login: z.string().min(1, 'Login é obrigatório').min(3, 'Login deve ter no mínimo 3 caracteres'),
  password: z.string().min(6, 'Informe uma senha com pelo menos 6 caracteres!'),
})

type formSchema = z.infer<typeof formSchema>
const errors = ref<Record<string, string>>({})
const errorRegister = ref('')

async function handleSubmit() {
  const valid = formSchema.safeParse(user)
  if (!valid.success) {
    errors.value = {}
    valid.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof user
      if (!errors.value[field]) {
        errors.value[field] = issue.message
      }
    })
    return
  }
  errors.value = {}

  try {
    await api.post('/users', { ...user })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorRegister.value = error.response?.data?.message || 'Erro ao cadastrar usuário'
      return
    }
  }
  router.push('/login')
}
</script>
