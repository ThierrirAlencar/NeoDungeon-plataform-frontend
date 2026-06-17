<script setup lang="ts">
import type { AttributeTypes } from '@/types/Meta/Dungeons/dndTypes'
import { ref } from 'vue'

const atributeWhole = ref<number>(10)
const { abrev, descricao, nome, pericias } = defineProps<AttributeTypes>()

const calcAtributeMod = (e: number): string => {
  const value = Math.floor((e - 10) / 2)
  console.log(value)
  return value >= 0 ? '+ ' + value : '-' + value
}
</script>

<template>
  <div class="flex flex-row justify-center items-center w-full">
    <label for="abrev" title="descricao" class="p-2 text-white font-black w-1/3"
      >{{ abrev }}
    </label>
    <input
      type="number"
      name="abrev"
      id="abrev"
      aria-label="descricao"
      v-model.number="atributeWhole"
      class="text-white font-bold p-2 text-center w-1/3 bg-slate-800 rounded-2xl"
    />
    <label class="p-2 text-white w-1/4 ml-4 rounded-2xl font-extrabold bg-slate-800 text-center">{{
      calcAtributeMod(atributeWhole)
    }}</label>
  </div>
</template>
