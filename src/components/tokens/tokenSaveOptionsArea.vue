<script setup lang="ts">
    import type { optmizedDNDTokenFormat } from "@/types/Meta/Dungeons/optmizedType.ts" ;
    import TileStyledAnchor from "../buttons/anchors/TileStyledAnchor.vue"
    import { updateCharacterLocalStorageOnListValue, updateCharacterLocalStorageValues } from "@/services/Meta/characterList.service.ts";
    import { ref } from "vue";

    const alertModal = ref<boolean>(false);
    const props = defineProps<{
        editing_sheet:optmizedDNDTokenFormat
    }>()
    
    const saveEverything = ()=>{
        updateCharacterLocalStorageValues(props.editing_sheet)
        console.log("Saving at LS:"+props.editing_sheet.identification.id)
        updateCharacterLocalStorageOnListValue(props.editing_sheet)
        alert("Ficha Salva!")
    }
    
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet"> 

    
    <div class="w-full bg-slate-900 p-4 flex flex-row border-b-2 border-slate-800 items-center justify-end">
        <div class="w-1/2 flex  flex-row gap-2 items-center justify-start">
                    <h1 class="text-slate-300 text-2xl p-3 ">Alterações detectadas, deseja salvar?</h1>
        </div>
        <div class="w-1/2 flex  flex-row gap-2 items-center justify-end">
            <button 
            v-on:click="saveEverything"
            class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-green-600 px-6 py-2 border-green-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-save text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Salvar</label>
            </button>
            <button class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-folder text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Baixar</label>
            </button>
            <button class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-folder-open text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Carregar</label>
            </button>
        </div>
    </div>

    <!-- Modais -->
    <Transition name="modal-fade">
        <div
            v-if="alertModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="alertModal = false"
        >
        <div
            class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5"
        >
            <h1 class="">Personagem Salvo com Sucesso</h1>
            <button 
                v-on:click="alertModal=false"
                class="cursor-pointer transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                        Ok !
            </button>
        </div>
        </div>
    </Transition>
</template>

<style lang="css">
    .playwrite-gb-j {
        font-family: "Playwrite GB J", cursive;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
    }
</style>