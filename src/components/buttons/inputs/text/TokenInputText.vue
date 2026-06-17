
<script setup lang="ts">
    interface tokenInput{
        label:string,
        exampleText?:string
    }

    const {exampleText, label} = defineProps<tokenInput>()
</script>

<template>
    <label class="font-bold m-1 text-white text-xl">{{ label }}</label>
    <textarea style="resize: none;" class="bg-slate-800 rounded-2xl w-3/4 shadow-2xl p-4 text-white" placeholder="exampleText">
        
    </textarea>
</template>