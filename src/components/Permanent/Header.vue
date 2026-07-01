<script setup lang="ts">
  import { computed, ref } from "vue";
  import TileStyledAnchor from "../buttons/anchors/TileStyledAnchor.vue"
  import BntCommon from "../buttons/bntCommon.vue";
  import { routes } from "@/core/routes.ts";

  const currentLabel = ref<string>("None");

  //Updates to check for change on routes
  setInterval(()=>{
    let _setstring = window.location.pathname
    currentLabel.value = routes[_setstring]?.areaLabel || "Seja bem vindo!"
  },100);

</script>

<template>
  <header class="bg-slate-800 flex justify-center items-center flex-row gap-0.5">
    <div class="w-1/3 flex justify-center items-center">
      <img src="../../../public/images/logo-character-01.png" style="width: 50px;"> 
      <h1 class="text-white p-8 text-2xl font-bold">{{ currentLabel }}</h1>
    </div>
    <div class="flex justify-center items-center flex-row gap-3 w-1/3">
      <TileStyledAnchor title="Home" url="/" />
      <TileStyledAnchor title="Fichas" url="/tokens" />
      <!-- <TileStyledAnchor title="Ferramentas" url="/tokens/dungeons" /> -->
      <TileStyledAnchor title="Comunidade" url="/community" />
    </div>
    <div class="flex justify-center items-center flex-row gap-3 w-1/3">
      <BntCommon Label="Login"></BntCommon>           
      <button class="cursor-pointer transition-all text-white bg-slate-900 px-6 py-2 border-slate-700 rounded-lg border-2 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">
          Sair
      </button>
    </div>
  </header>
</template>