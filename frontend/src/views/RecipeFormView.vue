<template>
  <h1 class="text-3xl font-bold m-4">{{ id ? 'Editar Receita' : 'Nova Receita' }}</h1>
  <form class="mt-4" @submit.prevent="handleSubmit">
    <div class="mb-4">
      <label for="category" class="block text-gray-700">Categoria</label>
      <select
        id="category"
        name="categoryId"
        v-model="recipe.categoryId"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      >
        <option :value="null">Selecione uma categoria</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      <p v-if="errors.categoryId" class="text-red-600 text-md mt-1">{{ errors.categoryId }}</p>
    </div>
    <div class="mb-4">
      <label for="name" class="block text-gray-700">Nome</label>
      <input
        type="text"
        name="name"
        id="name"
        v-model="recipe.name"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      />
      <p v-if="errors.name" class="text-red-600 text-md mt-1">{{ errors.name }}</p>
    </div>
    <div class="mb-4">
      <label for="preparationTime" class="block text-gray-700">Tempo de Preparo</label>
      <input
        type="number"
        min="1"
        name="preparationTime"
        id="preparationTime"
        v-model="recipe.preparationTime"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      />
    </div>
    <div class="mb-4">
      <label for="servings" class="block text-gray-700">Porções</label>
      <input
        type="number"
        min="1"
        name="servings"
        id="servings"
        v-model="recipe.servings"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      />
    </div>
    <div class="mb-4">
      <label for="preparationMethod" class="block text-gray-700">Modo de Preparo</label>
      <textarea
        name="preparationMethod"
        id="preparationMethod"
        v-model="recipe.preparationMethod"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      ></textarea>
      <p v-if="errors.preparationMethod" class="text-red-600 text-md mt-1">
        {{ errors.preparationMethod }}
      </p>
    </div>
    <div class="mb-4">
      <label for="ingredients" class="block text-gray-700">Ingredientes</label>
      <textarea
        name="ingredients"
        id="ingredients"
        v-model="recipe.ingredients"
        class="w-full px-2 py-2 border border-gray-400 rounded"
      ></textarea>
    </div>
    <div class="flex justify-start space-x-2">
      <button
        type="button"
        class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer"
      >
        <router-link to="/recipes">Cancelar</router-link>
      </button>

      <button
        type="submit"
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
      >
        Salvar
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import router from '@/router'
import { api } from '@/services/api'
import { onMounted, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue-sonner'
import z from 'zod'

const route = useRoute()
const id = route.params.id as string

interface Category {
  id: number
  name: string
}

const recipe = reactive({
  categoryId: null as number | null,
  name: '',
  preparationTime: null as number | null,
  servings: null as number | null,
  preparationMethod: '',
  ingredients: '',
})

const formSchema = z.object({
  categoryId: z.coerce.number().min(1, 'Informe uma categoria!'),
  name: z.string().min(1, 'Informe um nome!').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  preparationTime: z.coerce.number().optional(),
  servings: z.coerce.number().optional(),
  preparationMethod: z.string().min(1, 'Modo de preparo é obrigatório'),
  ingredients: z.string().optional(),
})

type formSchema = z.infer<typeof formSchema>
const errors = ref<Record<string, string>>({})

const categories = ref<Category[]>([])

onMounted(async () => {
  if (id) {
    try {
      const response = await api.get(`/recipes/${id}`)
      const data = response.data
      recipe.categoryId = data.categoryId
      recipe.name = data.name
      recipe.preparationTime = data.preparationTime
      recipe.servings = data.servings
      recipe.preparationMethod = data.preparationMethod
      recipe.ingredients = data.ingredients
    } catch {
      toast.error('Erro ao carregar receita!')
    }
  }

  try {
    const response = await api.get('/categories')
    categories.value = response.data
  } catch {
    console.error('Erro ao buscar categorias')
  }
})

async function handleSubmit() {
  const valid = formSchema.safeParse(recipe)

  if (!valid.success) {
    errors.value = {}
    valid.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof typeof recipe
      if (!errors.value[field]) {
        errors.value[field] = issue.message
      }
    })
    return
  }

  errors.value = {}

  if (id) {
    try {
      await api.put(`/recipes/${id}`, { ...recipe })

      toast.success('Cadastro atualizado com sucesso!')
    } catch {
      toast.error('Erro ao atualizar!')
      return
    }
    router.push('/recipes')
    return
  }
  try {
    await api.post('/recipes', { ...recipe })

    toast.success('Cadastro realizado com sucesso!')
  } catch {
    toast.error('Erro ao cadastrar!')
    return
  }
  router.push('/recipes')
}
</script>
