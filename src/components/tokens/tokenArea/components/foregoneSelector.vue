<script setup lang="ts">
import { antecedentesDnD5e } from '@/templates/dndData'
import type { AntecedenteDnD5e } from '@/types/Meta/Dungeons/dndTypes'
import { ref } from 'vue'

const antecedenteSelecionado = ref<AntecedenteDnD5e>()
</script>
<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
      ><strong>Antecedente</strong></label
    >
    <select
      v-model="antecedenteSelecionado"
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
    >
      <option :value="null" disabled>Selecione</option>
      <option v-for="a in antecedentesDnD5e" :key="a.id" :value="a">{{ a.nome }}</option>
    </select>
  </div>
</template>
