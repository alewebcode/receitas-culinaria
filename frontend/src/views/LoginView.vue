<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="flex items-center justify-center">
      <img src="@/assets/cooking.svg" alt="culinária" class="w-2/7" />
    </div>
    <h1 class="text-3xl font-bold m-4">Login</h1>
    <form class="mt-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="login" class="block text-gray-700">Login</label>
        <input
          type="text"
          id="login"
          name="login"
          v-model="login"
          class="w-full px-3 py-2 border border-gray-400 rounded"
          placeholder="Seu Login"
        />
        <p v-if="errors.login" class="text-red-600 text-md mt-1">
          {{ errors.login }}
        </p>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="w-full px-3 py-2 border border-gray-400 rounded"
          placeholder="Sua senha"
        />
        <p v-if="errors.password" class="text-red-600 text-md mt-1">
          {{ errors.password }}
        </p>
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
        Login
      </button>

      <span class="ml-4 text-sm text-gray-600"
        >Não tem uma conta? <a href="/register" class="text-blue-500">Registrar</a></span
      >
      <p v-if="error" class="text-red-500 text-md mt-2">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'
import z from 'zod'

const auth = useAuth()
const login = ref('')
const password = ref('')
const error = ref('')

const formSchema = z.object({
  login: z.string().min(1, 'Informe o Login').min(3, 'Login deve ter no mínimo 3 caracteres'),
  password: z.string().min(1, 'Informe a Senha').min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type formSchema = z.infer<typeof formSchema>
const errors = ref<Record<string, string>>({})

async function handleSubmit() {
  const valid = formSchema.safeParse({ login: login.value, password: password.value })

  if (!valid.success) {
    errors.value = {}
    valid.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof formSchema
      if (!errors.value[field]) {
        errors.value[field] = issue.message
      }
    })
    return
  }

  errors.value = {}

  try {
    await auth.login(login.value, password.value)
    router.push('/')
  } catch {
    error.value = 'Email ou senha inválidos'
  }
}
</script>
