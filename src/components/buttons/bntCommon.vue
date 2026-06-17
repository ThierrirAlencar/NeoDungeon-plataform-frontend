<script setup lang="ts">
    const props = defineProps<{
        readonly Label:string
    }>()
</script>

<template>
    <button class="cursor-pointer transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
        {{ Label }}
    </button>
</template>