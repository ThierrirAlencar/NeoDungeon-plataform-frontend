<script setup lang="ts">
import { racasDnD5e } from '@/templates/dndData'
import type { RacaDnD5e } from '@/types/Meta/Dungeons/dndTypes'
import { ref } from 'vue'

const racaSelecionada = ref<RacaDnD5e>()
</script>

<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
      ><strong>Raça</strong></label
    >
    <select
      v-model="racaSelecionada"
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
    >
      <option :value="null" disabled>Selecione</option>
      <option v-for="r in racasDnD5e" :key="r.id" :value="r">{{ r.nome }}</option>
    </select>
  </div>
</template>
