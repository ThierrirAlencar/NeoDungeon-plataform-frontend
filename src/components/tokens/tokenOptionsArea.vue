<script setup lang="ts">
    import TileStyledAnchor from "../buttons/anchors/TileStyledAnchor.vue"
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet"> 

    <div class="w-full bg-slate-850 p-4 flex flex-row border-b-2 border-slate-800">
        <div class="w-1/2">
            <h1 class="text-white font-bold text-center text-4xl ">Ficha de Personagem <strong class="text-red-700 ">Dungeons and Dragons</strong></h1>
        </div>
        <div class="w-1/2 flex flex-row justify-center align-middle gap-4">
            <TileStyledAnchor title="Magias" url="/tokens/magias"></TileStyledAnchor>
            <TileStyledAnchor title="Transformações" url="/tokens/formas"></TileStyledAnchor>
            <TileStyledAnchor title="Anotações" url="/tokens/notas"></TileStyledAnchor>
            <TileStyledAnchor title="Geral" url="/tokens"></TileStyledAnchor>
            <TileStyledAnchor title="Dados" url="/tokens/dices"></TileStyledAnchor>
        </div>
    </div>
</template>

<style lang="css">
    .playwrite-gb-j {
    font-family: "Playwrite GB J", cursive;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
    }
</style>