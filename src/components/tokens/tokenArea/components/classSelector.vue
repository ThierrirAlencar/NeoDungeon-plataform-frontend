<script setup lang="ts">
  import { classesDnD5e } from '@/templates/dndData'
  import { computed } from 'vue';
  import type { ClasseDnD5e } from '@/types/Meta/Dungeons/dndTypes';
  
  const props = defineProps<{
    modelValue: ClasseDnD5e
  }>()

  const emit = defineEmits<{
    'update:modelValue': [value: ClasseDnD5e]
  }>()

  //Configura um getter/setter para o management da classe de raça; 
  const racaSelecionada = computed({
    get: () => props.modelValue,
    set: (val: ClasseDnD5e) => emit('update:modelValue', val)
  })

</script>

<template>
  <div class="flex flex-col gap-1 min-w-28">
    <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"><strong>Classe</strong>
    </label>
    <select
      class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
      v-model="racaSelecionada">
      <option :value="classesDnD5e.find(e => e.nome == props.modelValue.nome)" disabled>Selecione</option>
      <option v-for="c in classesDnD5e" :key="c.id" :value="c.nome">
        {{ c.nome }} ({{ c.dadoVida }})
      </option>
    </select>
  </div>
</template>
