import type { DNDitemRarity } from "../enums"

export interface EquipmentType {
    id: string
    nome: string
    description: string
    imageUrl?: string
    rarity: DNDitemRarity
    atack?: string //dice and combo
}