import Home from "@/routes/Home.vue"
import Tokens from '@/routes/tokens/tokens.vue'
import dungeons_sheet from "@/routes/tokens/DNDSheet.vue"
import type { Component } from "vue"
import type { applicationRoute } from "@/types/applicationRouteInterface"


export const routes: Record<string, applicationRoute> = {
    '/': {
        component:Home,
        url:"/",
        areaLabel:"Bem vindo ao NeoDungeon!"
    },
    '/tokens':{
        component:Tokens,
        url:"/tokens",
        areaLabel:"Sua lista de fichas carregadas!"
    },
    '/tokens/dungeons': {
        component:dungeons_sheet,
        url:"/tokens/dungeons",
        areaLabel:"Ficha de DND5.e!"
    },
}
