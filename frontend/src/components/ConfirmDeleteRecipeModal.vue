<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-gray-700 bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">Excluir Receita</h2>
      <p class="mb-4">Tem certeza que deseja excluir a receita "{{ recipeName }}"?</p>
      <div class="flex justify-end space-x-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Excluir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
  recipeName: string | null
}>()

defineEmits<{
  confirm: []
  cancel: []
}>()
</script>
