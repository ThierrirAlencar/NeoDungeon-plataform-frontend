<script setup lang="ts">

    import TokenArea from '@/components/tokens/tokenArea/DNDTokenArea.vue'
    import TokenOptionsArea from '@/components/tokens/tokenOptionsArea.vue'
    import TokenSaveOptionsArea from '@/components/tokens/tokenSaveOptionsArea.vue'
    import MagicArea from '@/components/tokens/tokenArea/DNDMagicsArea.vue'
    import NotFound from '../NotFound.vue';  
    import { computed, ref, type Component } from 'vue';
    
    const CurrentSubPage = ref<string>("Main")

    const SubPageDefinition: Record<string, Component> = {
        "Main":TokenArea,
        "Spells":MagicArea
    }

    const currentView = computed(() => {
        return SubPageDefinition[CurrentSubPage.value] || NotFound
    })

</script>

<template>
    <body class="bg-slate-950 flex flex-col justify-center items-center">
        <!-- Area de Opções : Aonde colocamos variabilidade entre menus -->
        <TokenOptionsArea></TokenOptionsArea>
        <component :is="currentView"/>
        <TokenSaveOptionsArea></TokenSaveOptionsArea>
    </body>
</template>

