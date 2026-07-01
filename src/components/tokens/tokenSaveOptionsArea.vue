<script setup lang="ts">
    import type { optmizedDNDTokenFormat } from "@/types/Meta/Dungeons/optmizedType.ts";
    import { saveSpecifiedList, updateCharacterLocalStorageOnListValue, updateCharacterLocalStorageValues } from "@/services/Meta/characterList.service.ts";
    import { ref } from "vue";

    const alertModal = ref<boolean>(false);
    const modal_save = ref<boolean>(false);
    const props = defineProps<{
        editing_sheet: optmizedDNDTokenFormat
    }>()

    const saveEverything = () => {
        updateCharacterLocalStorageValues(props.editing_sheet)
        console.log("Saving at LS:" + props.editing_sheet.identification.id)
        updateCharacterLocalStorageOnListValue(props.editing_sheet)
        alertModal.value = true;
    }

    const downloadSheet = () => {
        const pre_list = new Array<optmizedDNDTokenFormat>(props.editing_sheet)
        saveSpecifiedList(pre_list)
    }
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap"
        rel="stylesheet">

    <div class="w-full bg-slate-900 p-4 flex flex-row border-b-2 border-slate-800 items-center justify-end">
        <div class="w-1/2 flex  flex-row gap-2 items-center justify-start">
            <h1 class="text-slate-300 text-2xl p-3 ">Alterações detectadas, deseja salvar?</h1>
        </div>
        <div class="w-1/2 flex  flex-row gap-2 items-center justify-end">
            <button v-on:click="saveEverything"
                class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-green-600 px-6 py-2 border-green-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-save text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Salvar</label>
            </button>
            <button v-on:click="modal_save = true"
                class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-folder text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Baixar</label>
            </button>
            <button
                class="cursor-pointer p-2 text-center flex flex-center items-center gap-3 transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                <span class="pi cursor-pointer pi-folder-open text-2xl text-center font-extrabold"></span>
                <label class="cursor-pointer text-xl">Carregar</label>
            </button>
        </div>
    </div>

    <!-- Modais -->

    <!-- Modal de Salvamento com Sucesso -->
    <Transition name="modal-fade">
        <div v-if="alertModal"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="alertModal = false">
            <div
                class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5">
                <h1 class="text-white text-2xl">Personagem Salvo com Sucesso</h1>
                <button v-on:click="alertModal = false"
                    class="cursor-pointer transition-all text-white bg-slate-600 px-6 py-2 border-slate-700 rounded-lg border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
                    Ok !
                </button>
            </div>
        </div>
    </Transition>
    <!-- Modal Salvar Personagens -->
    <Transition name="modal-fade_save_characters">
        <div v-if="modal_save"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="modal_save = false">
            <div
                class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5">
                <!-- Header do modal_savel -->
                <div class="flex items-start justify-between">
                    <div>
                        <p class="text-green-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">Salvar</p>
                        <h2 class="text-2xl font-black text-white text-shadow-2xs text-shadow-slate-900" style="font-family: Georgia, serif">
                            Salvar Lista de Personagens
                        </h2>
                    </div>
                    <button @click="modal_save = false"
                        class="w-8 h-8 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all mt-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor"
                            stroke-width="2">
                            <path d="M1 1l10 10M11 1l-10 10" />
                        </svg>
                    </button>
                </div>

                <hr class="border-slate-800" />
                <p class="text-gray-400 text-xs font-bold tracking-[0.1em] uppercase mb-1">Você pode escolher salvar
                    online quando a API estiver pronta, enquanto isso salve localmente através de uma lista JSON que
                    pode ser carregada na plataforma</p>
                <!-- Ações -->
                <div class="flex gap-3 pt-1 flex-col">
                    <button @click="downloadSheet"
                        class="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2.5 rounded-xl gap-2 transition-colors">
                        <span class="pi pi-folder p-2 font-extrabold text-xl"></span>Salvar Localmente
                    </button>

                    <button @click="downloadSheet" :disabled="true"
                        class="flex-1 bg-green-600 disabled:bg-green-700 disabled:cursor-default hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-sm transition-colors">
                        <span class="pi pi-globe p-2 font-extrabold text-xl"></span> Salvar Online
                    </button>
                    <button @click="modal_save = false"
                        class="border border-slate-700 cursor-pointer hover:border-slate-500 text-slate-400 hover:text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                        Cancelar
                    </button>
                </div>
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