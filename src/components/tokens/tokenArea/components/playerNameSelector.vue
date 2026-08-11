<script setup lang="ts">
    const themeColour = 'text-red-600'

    const props = defineProps<{
        modelValue:string | undefined
    }>()

    defineEmits<{
        'update:modelValue': [value: string]
    }>()
</script>

<template>
    <div class="flex flex-col gap-1 min-w-28">
        <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
        >Nome do <strong :class="themeColour">Jogador</strong></label
        >
        <input
        type="text"
        :value=props.modelValue
        class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
        placeholder="Nome do usuário"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
