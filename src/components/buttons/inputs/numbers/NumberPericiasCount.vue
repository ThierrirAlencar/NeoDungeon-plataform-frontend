<script setup lang="ts">
import type { AttributeTypes, PericiasTypes } from '@/types/Meta/Dungeons/dndTypes'
import { ref } from 'vue'

const atributeWhole = ref<number>(10)
const { atributoBase, id, nome, nomeIngles } = defineProps<PericiasTypes>()

const calcAtributeMod = (e: number): string => {
  const value = Math.floor((e - 10) / 2)
  console.log(value)
  return value >= 0 ? '+ ' + value : '-' + value
}
</script>

<template>
  <div class="flex flex-col justify-center items-center w-full">
    <label for="abrev" title="descricao" class="p-1 text-white w-full text-center"
      >{{ nome }}
    </label>
    <div class="flex flex-row justify-center items-center">
      <input
        type="number"
        name="abrev"
        id="abrev"
        aria-label="descricao"
        v-model.number="atributeWhole"
        class="text-white font-bold p-1 pr-3 text-center w-1/2 bg-slate-800 rounded-2xl"
      />

      <label
        class="p-1 text-white w-1/3 bg-slate-800 rounded-2xl ml-1 font-extrabold text-center"
        >{{ calcAtributeMod(atributeWhole) }}</label
      >
    </div>
  </div>
</template>
