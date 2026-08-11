<script setup lang="ts">
    const props = defineProps<{
        modelValue:number
    }>()

    defineEmits<{
        'update:modelValue': [value: string]
    }>()
</script>

<template>
    <div class="flex flex-col gap-1 w-16">
        <label class="text-gray-400 text-xs font-bold uppercase tracking-wide">Nível</label>
        <input
            :value=props.modelValue
            type="number"
            min="1"
            max="20"
            class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none text-center"
            @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
    </div>
</template>
