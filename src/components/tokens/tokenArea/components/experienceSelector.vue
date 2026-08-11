
<script setup lang="ts">
    import { ref } from 'vue';
    const props = defineProps<{
        modelValue:number
    }>()

    defineEmits<{
        'update:modelValue': [value: number]
    }>()
    
</script>
<template>
            
            <div class="flex flex-col gap-1 min-w-28">
            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
                >Experiência (XP)</label
            >
            <input
                :value=props.modelValue
                type="number"
                min="0"
                class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
                @input="$emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
            />
            </div>

</template>