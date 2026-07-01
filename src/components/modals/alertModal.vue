<script setup lang="ts">
    const props = defineProps<{
        label:string,
        trigger:boolean
    }>()
</script>

<template>
    <Transition name="modal-fade">
        <div
            v-if="trigger"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="trigger = false"
        >
        <div
            class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5"
        >
            <h1 class="">{{ label }}</h1>
            <button 
                v-on:click="trigger=false"
                class="cursor-pointer transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Ok !
            </button>
        </div>
        </div>
    </Transition>

</template>