<template>
  <div class="p-6">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-2xl font-semibold text-gray-800">Receitas</h1>
      <button
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
      >
        <router-link to="/recipes/new">Cadastrar Receita</router-link>
      </button>
    </div>
    <div class="mb-4">
      <input
        type="text"
        placeholder="Buscar receitas..."
        @input="findRecipes"
        class="w-full px-4 py-2 border border-gray-400 rounded-md"
      />
    </div>

    <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nome
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Categoria
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tempo
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Porções
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ingredientes
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Modo de Preparo
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ações
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-100">
          <tr v-if="loading">
            <td colspan="7" class="px-6 py-10 text-center text-gray-400">
              <span class="animate-pulse">Carregando...</span>
            </td>
          </tr>
          <tr v-else-if="error">
            <td colspan="7" class="px-6 py-10 text-center text-red-500">{{ error }}</td>
          </tr>
          <tr v-else-if="recipes.length === 0">
            <td colspan="7" class="px-6 py-10 text-center text-gray-400">
              Nenhuma receita encontrada
            </td>
          </tr>
          <tr v-for="recipe in recipes" :key="recipe.id" class="hover:bg-gray-50 transition-colors">
            <td class="px-6 py-4 text-sm font-medium text-gray-800">{{ recipe.name }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">
              <span class="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs">
                {{ recipe.category }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ recipe.preparationTime }} min</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ recipe.servings }} porções</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ recipe.ingredients }}</td>
            <td class="px-6 py-4 text-sm text-gray-600">{{ recipe.preparationMethod }}</td>
            <td class="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
              <div class="relative group">
                <button class="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <router-link :to="`/recipes/${recipe.id}`">
                    <PencilSquareIcon class="w-5 h-5 text-blue-500" />
                  </router-link>
                </button>
                <span
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Editar
                </span>
              </div>

              <div class="relative group">
                <button
                  class="text-red-500 hover:text-red-700 ml-2 cursor-pointer"
                  @click="openDeleteModal(recipe.id, recipe.name)"
                >
                  <TrashIcon class="w-5 h-5 text-red-500" />
                </button>
                <span
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Excluir
                </span>
              </div>
              <div class="relative group">
                <button
                  class="text-green-500 hover:text-green-700 ml-2 cursor-pointer"
                  @click="handlePrint(recipe.id)"
                >
                  <PrinterIcon class="w-5 h-5 text-gray-600" />
                </button>
                <span
                  class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                >
                  Imprimir
                </span>
              </div>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
    </div>
  </div>
  <ConfirmDeleteRecipeModal
    :is-open="deleteModal"
    :recipe-name="selectedRecipeName"
    @confirm="handleConfirmDelete"
    @cancel="deleteModal = false"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '@/services/api'
import { TrashIcon, PencilSquareIcon, PrinterIcon } from '@heroicons/vue/24/outline'
import { toast } from 'vue-sonner'
import { useRecipePrint } from '@/composables/useRecipePrint'
import ConfirmDeleteRecipeModal from '@/components/ConfirmDeleteRecipeModal.vue'

const { handlePrint } = useRecipePrint()

interface Recipe {
  id: number
  name: string
  category: string
  preparationTime: number
  servings: number
  ingredients: string
  preparationMethod: string
}

const recipes = ref<Recipe[]>([])
const error = ref('')
const loading = ref(false)
const deleteModal = ref(false)
const selectedRecipeId = ref<number | null>(null)
const selectedRecipeName = ref<string | null>(null)
let debounceTimer: ReturnType<typeof setTimeout>

onMounted(async () => {
  loading.value = true
  try {
    const response = await api.get('/recipes')

    recipes.value = response.data
  } catch {
    error.value = 'Não foi possível carregar receitas'
  } finally {
    loading.value = false
  }
})

async function handleDelete(id: number) {
  try {
    await api.delete(`/recipes/${id}`)
    recipes.value = recipes.value.filter((recipe) => recipe.id !== id)
  } catch {
    toast.error('Erro ao excluir receita!')
  }
}

async function handleConfirmDelete() {
  if (!selectedRecipeId.value) return
  await handleDelete(selectedRecipeId.value)
  deleteModal.value = false
  selectedRecipeId.value = null
}

function openDeleteModal(id: number, name: string) {
  selectedRecipeId.value = id
  deleteModal.value = true
  selectedRecipeName.value = name
}

async function findRecipes(event: Event) {
  clearTimeout(debounceTimer)

  debounceTimer = setTimeout(async () => {
    const target = event.target as HTMLInputElement
    const query = target.value.trim()

    if (!query) {
      recipes.value = []
    }

    loading.value = true
    try {
      const url = query ? `/recipes?search=${encodeURIComponent(query)}` : '/recipes'
      const response = await api.get(url)

      recipes.value = response.data
    } catch {
      error.value = 'Erro ao buscar receitas'
    } finally {
      loading.value = false
    }
  }, 500)
}
</script>
