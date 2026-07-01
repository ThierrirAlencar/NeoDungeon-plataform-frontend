<script setup lang="ts">
    import TokenArea from '@/components/tokens/tokenArea/DNDTokenArea.vue'
    import TokenOptionsArea from '@/components/tokens/tokenOptionsArea.vue'
    import TokenSaveOptionsArea from '@/components/tokens/tokenSaveOptionsArea.vue'
    import MagicArea from '@/components/tokens/tokenArea/DNDMagicsArea.vue'
    import NotesArea from '@/components/tokens/tokenArea/DNDNotesArea.vue'
    import NotFound from '../NotFound.vue';  

    import { computed, ref, type Component } from 'vue';

    const CurrentSubPage = ref<string>("/home")

    const SubPageDefinition: Record<string, Component> = {
        "/home":TokenArea,
        "/spells":MagicArea,
        "/notes":NotesArea
    }

    const currentView = computed(() => {
        return SubPageDefinition[CurrentSubPage.value] || NotFound
    })

    const setCurrentSubPage = (str:string)=>{
        CurrentSubPage.value = String(str);
    }


</script>

<template>
    <body class="bg-slate-950 flex flex-col justify-center items-center">
    <!-- Area de Opções : Aonde colocamos variabilidade entre menus -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet"> 

    <div class="w-full bg-slate-850 p-4 flex flex-row border-b-2 border-slate-800">
        <div class="w-1/2">
            <h1 class="text-white font-bold text-center text-4xl ">Ficha de Personagem <strong class="text-red-700 ">Dungeons and Dragons</strong></h1>
        </div>
        <div class="w-1/2 flex flex-row justify-center align-middle gap-4">
            <button class="ui-btn bg-slate-700 shadow-xl shadow-slate-900 " v-on:click="()=>{
                setCurrentSubPage('/home')
            }">
                <span>Geral</span>
            </button>
            <button class="ui-btn bg-slate-700 shadow-xl shadow-slate-900 " v-on:click="()=>{
                setCurrentSubPage('/spells')
            }">
                <span>Magias</span>
            </button>
            <button class="ui-btn bg-slate-700 shadow-xl shadow-slate-900 " v-on:click="()=>{
                setCurrentSubPage('/notes')
            }">
                <span>Anotações</span>
            </button>
            <TileStyledAnchor title="Transformações" url="/tokens/formas"></TileStyledAnchor>
            <TileStyledAnchor title="Anotações" url="/tokens/notes"></TileStyledAnchor>
            <TileStyledAnchor title="Geral" url="/tokens"></TileStyledAnchor>
            <TileStyledAnchor title="Dados" url="/tokens/dices"></TileStyledAnchor>
        </div>
    </div>
        <component :is="currentView"/>
    </body>
</template>

