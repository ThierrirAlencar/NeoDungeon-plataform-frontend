<script setup lang="ts">
    import TileStyledAnchor from "../buttons/anchors/TileStyledAnchor.vue"
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Playwrite+GB+J:ital,wght@0,100..400;1,100..400&display=swap" rel="stylesheet"> 

    <div class="w-full bg-slate-850 p-4 flex flex-row border-b-2 border-slate-800">
        <button class="text-white gap-6 cursor-pointer bg-slate-700 rounded-xl pr-6 pl-6 shadow-xl shadow-slate-900 p-2 flex justify-center items-center" >
            <span class="pi pi-save text-2xl text-center font-extrabold"></span>
            <label>Save</label>
        </button>
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