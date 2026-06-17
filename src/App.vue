<script setup lang="ts">
  import { computed, ref, type Component } from 'vue';
  import Home from './routes/Home.vue';
  import NotFound from './routes/NotFound.vue';  
  import dungeons_sheet from "./routes/tokens/DNDSheet.vue"
  import Tokens from './routes/tokens/tokens.vue';
  import Header from './components/Permanent/Header.vue';
  import Footer from './components/Permanent/Footer.vue';
  import { routes } from './core/routes.ts';

  const currentPath = ref<string>(window.location.pathname);

  //Updates to check for change on routes
  setInterval(()=>{
    let _setstring = window.location.pathname
    currentPath.value = _setstring
  },1000);

  const currentView = computed(() => {
    console.log(currentPath.value)
    return routes[currentPath.value]?.component || NotFound
  })
  
</script>

<template>
    <Header></Header>
    <component :is="currentView"/>
    <Footer></Footer>
</template>

<style scoped></style>
