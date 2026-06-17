<script setup lang="ts">
import { rpgSystem } from '@/types/rpgSystemEnum'

const { description, name, system } = defineProps<{
  name: string
  system: rpgSystem
  description: string
}>()

const defineColour = () => {
  switch (system) {
    case rpgSystem.DUNGEONS_AND_DRAGONS:
      return `
                    <div :class="defineColour" class="w-full rounded-b-lg h-8 bg-red-500"></div>
                `
      break
    case rpgSystem.PARANORMAL_ORDER:
      return `
                    <div :class="defineColour" class="w-full rounded-b-lg h-8 bg-blue-500"></div>
                `
      break
    case rpgSystem.SORCERES_AND_CURSES:
      return `
                    <div :class="defineColour" class="w-full rounded-b-lg h-8 bg-green-500"></div>
                `
  }
}
</script>

<template>
  <!-- From Uiverse.io by emmanuelh-dev -->
  <div class="bg-slate-600 p-6 rounded-lg">
    <div class="flex p-2 gap-1">
      <div class="">
        <span class="bg-blue-500 inline-block center w-3 h-3 rounded-full"></span>
      </div>
      <div class="circle">
        <span class="bg-purple-500 inline-block center w-3 h-3 rounded-full"></span>
      </div>
      <div class="circle">
        <span class="bg-pink-500 box inline-block center w-3 h-3 rounded-full"></span>
      </div>
    </div>
    <div class="card__content">
      <h1>
        {{ name }}
      </h1>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>
