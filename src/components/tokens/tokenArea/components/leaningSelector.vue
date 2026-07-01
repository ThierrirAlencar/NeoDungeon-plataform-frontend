<script setup lang="ts">
  import { tendenciasDnD5e } from '@/templates/dndData'
  import type { TendenciaDnD5e } from '@/types/Meta/Dungeons/dndTypes'
  import { computed, ref } from 'vue'

  // const tendenciaSelecionada = ref<TendenciaDnD5e>()

  const props = defineProps<{
    modelValue: TendenciaDnD5e
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: TendenciaDnD5e]
  }>()

  //Configura um getter/setter para o management da classe de raça; 
  const tendenciaSelecionada = computed({
    get: () => props.modelValue,
    set: (val: TendenciaDnD5e) => emit('update:modelValue', val)
  })
</script>

<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"><strong>Tendência</strong></label>
    <select v-model="tendenciaSelecionada"
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none">
      <option :value="tendenciasDnD5e.find(e=>e.nome==tendenciaSelecionada.nome)" disabled>Selecione</option>
      <option v-for="t in tendenciasDnD5e" :key="t.id" :value="t">{{ t.nome }}</option>
    </select>
  </div>
</template>
