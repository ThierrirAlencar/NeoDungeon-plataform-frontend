import { rpgSystem } from "@/types/rpgSystemEnum"

export const systemLabel: Record<rpgSystem, string> = {
    [rpgSystem.DUNGEONS_AND_DRAGONS]: 'D&D 5e',
    [rpgSystem.PARANORMAL_ORDER]: 'Ordem Paranormal',
    [rpgSystem.SORCERES_AND_CURSES]: 'Feiticeiros e Maldições',
}

export const systemColor: Record<rpgSystem, string> = {
    [rpgSystem.DUNGEONS_AND_DRAGONS]: '#B91C1C',
    [rpgSystem.PARANORMAL_ORDER]: '#45556c',
    [rpgSystem.SORCERES_AND_CURSES]: '#10b981',
}

export const systemEditingUrl: Record<rpgSystem, string> = {
    [rpgSystem.DUNGEONS_AND_DRAGONS]: '/tokens/dungeons',
    [rpgSystem.PARANORMAL_ORDER]: '/tokens/ordem',
    [rpgSystem.SORCERES_AND_CURSES]: '/tokens/sorcerers',
}