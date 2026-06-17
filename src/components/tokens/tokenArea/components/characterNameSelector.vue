<script setup lang="ts">
    const themeColour = 'text-red-600'

    const props = defineProps<{
        label:string
    }>()

</script>

<template>
    <div class="flex flex-col gap-1 min-w-36">
        <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
        >Nome do <strong :class="themeColour">Personagem</strong></label
        >
        <input
        type="text"
        class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
        :value=props.label
        placeholder="Nome do Personagem"
        />
    </div>
</template>
