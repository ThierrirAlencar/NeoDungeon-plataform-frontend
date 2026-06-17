<script setup lang="ts">
import { classesDnD5e } from '@/templates/dndData'
import type { ClasseDnD5e } from '@/types/Meta/Dungeons/dndTypes'
import { ref } from 'vue'

const classeSelecionada = ref<ClasseDnD5e>()
</script>

<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
      ><strong>Classe</strong></label
    >
    <select
      v-model="classeSelecionada"
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
    >
      <option :value="null" disabled>Selecione</option>
      <option v-for="c in classesDnD5e" :key="c.id" :value="c">
        {{ c.nome }} ({{ c.dadoVida }})
      </option>
    </select>
  </div>
</template>
