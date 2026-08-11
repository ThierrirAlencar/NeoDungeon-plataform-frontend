<script setup lang="ts">
  import { racasDnD5e } from '@/templates/dndData'
  import type { RacaDnD5e } from '@/types/Meta/Dungeons/dndTypes'
  import { computed } from 'vue'

    const props = defineProps<{
      modelValue: RacaDnD5e
    }>()

    const emit = defineEmits<{
      'update:modelValue': [value: RacaDnD5e]
    }>()

    //Configura um getter/setter para o management da classe de raça; 
    const racaSelecionada = computed({
      get: () => props.modelValue,
      set: (val: RacaDnD5e) => emit('update:modelValue', val)
    })


</script>

<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide">
      <strong>Raça</strong>
    </label>
    <select
      v-model="racaSelecionada"
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
    >
      <option disabled>Selecione</option>
      <option v-for="r in racasDnD5e" :key="r.id" :value="r">{{ r.nome }}</option>
    </select>
  </div>
</template>