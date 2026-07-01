import type { rpgSystem } from '../rpgSystemEnum'
import type { ClasseDnD5e, RacaDnD5e } from './Dungeons/dndTypes'

export interface Character {
  id:number,
  name: string
  description?: string
  imageUrl?: string
  system: rpgSystem
  classe?: ClasseDnD5e
  nivel?: number
  raca?: RacaDnD5e
}
