
<script setup lang="ts">
    interface tokenInput{
        label:string,
        exampleText?:string 
    }

    const props = defineProps<{
        modelValue:string | undefined,
        label:string
    }>()

    defineEmits<{
        'update:modelValue': [value: string]
    }>()

</script>

<template>
    <label class="font-bold m-1 text-white text-xl">{{ label }}</label>
    <textarea 
        :value="props.modelValue"
        style="resize: none;" class="bg-slate-800 rounded-2xl w-3/4 shadow-2xl p-4 text-white" placeholder="exampleText"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >

    </textarea>
</template>