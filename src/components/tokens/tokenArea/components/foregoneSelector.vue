<script setup lang="ts">
  import { antecedentesDnD5e } from '@/templates/dndData'
  import type { AntecedenteDnD5e } from '@/types/Meta/Dungeons/dndTypes'
  import { computed, ref } from 'vue'

  const antecedenteSelecionado = ref<AntecedenteDnD5e | undefined>(antecedentesDnD5e[1])

  // const props = defineProps<{
  //   modelValue: AntecedenteDnD5e
  // }>()

  // const emit = defineEmits<{
  //   'update:modelValue': [value: AntecedenteDnD5e]
  // }>()

  // //Configura um getter/setter para o management da classe de raça; 
  // const antecedenteSelecionado = computed({
  //   get: () => props.modelValue,
  //   set: (val: AntecedenteDnD5e) => emit('update:modelValue', val)
  // })


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
      <option :value="antecedentesDnD5e.find(e=>e.nome == antecedenteSelecionado?.nome)" disabled>Selecione</option>
      <option v-for="a in antecedentesDnD5e" :key="a.id" :value="a">{{ a.nome }}</option>
    </select>
  </div>
</template>
