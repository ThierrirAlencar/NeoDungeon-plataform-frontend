<script setup lang="ts">
  import { calculateSkillCheckBonusString } from '@/services/Meta/DND/skills.service';
import type { PericiasTypes, SkillEntry } from '@/types/Meta/Dungeons/dndTypes'
  import { computed } from 'vue'

  const props = defineProps<PericiasTypes & { modelValue: SkillEntry, proficiency_bonus:number, related_atribute_bonus:number } >()

  const emit = defineEmits<{
    'update:modelValue': [value: SkillEntry]
  }>()

  const skillValue = computed({
    get: () => props.modelValue.value,
    set: (value: number) => emit('update:modelValue', { ...props.modelValue, value }),
  })

  const handleSkillTrainedChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    emit('update:modelValue', { ...props.modelValue, trained: target.checked })
  }

</script>

<template>
  <div class="flex flex-col justify-center items-center w-full h-auto ">
    <label for="abrev" title="descricao" class="pr-6 pl-6 text-white w-full text-center"
      >{{ props.nome }}
    </label>
    <div class="flex flex-row justify-center items-center w-full">
      <input
        class="m-1 bg-slate-800 pr-6 pl-6 text-slate-900"
        type="checkbox"
        :checked="props.modelValue.trained"
        @change="handleSkillTrainedChange"
      />

      <!-- <input
        type="number"
        name="abrev"
        id="abrev"
        aria-label="descricao"
        v-model.number="skillValue"
        class="text-white font-bold p-1 pr-3 text-center w-1/2 bg-slate-800 rounded-2xl"
      /> -->

      <label
        class="pr-6 pl-6 text-white text-center w-1/2 bg-slate-800 rounded-2xl ml-1 font-extrabold"
        >{{ calculateSkillCheckBonusString(related_atribute_bonus, proficiency_bonus, modelValue.trained) }}</label
      >
      <label class="m-1 text-white text-sm font-bold">
        {{ atributoBase }}
      </label>
      <!-- <label class="m-1 text-white text-sm font-bold">
        {{ proficiency_bonus }} and {{ props.modelValue.trained }}
      </label> -->
    </div>
  </div>
</template>
