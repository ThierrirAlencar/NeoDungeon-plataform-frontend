import type { rpgSystem } from '@/types/rpgSystemEnum'
import type { ClasseDnD5e, EquipmentType, RacaDnD5e, TendenciaDnD5e } from './dndTypes'

/**
 * Optimized D&D 5e Character Token Format
 *
 * Represents a complete D&D 5e character sheet with all necessary information
 * for character identification, game mechanics, and public metadata.
 */
export interface optmizedDNDTokenFormat {
  identification: {
    id: number
    owner_id: string
    created_at: Date
    system: rpgSystem.DUNGEONS_AND_DRAGONS
  }
  character: {
    character_name: string
    character_class: {
      class: ClasseDnD5e
      level: number
    }
    character_race: RacaDnD5e
    character_allegiance: TendenciaDnD5e
    character_equipments: Array<EquipmentType>
    character_extensive_data: {
      traitsAndPersonality?: string
      ideals?: string
      weaknesses?: string
      bonds?: string
      characteristicsAndHabilities?: string
      proficienciesAndLanguages?: string
    }
    character_numeric_data: {
      proficiency_bonus: number
      armour_class: number
      initiative: number
      speed: number
      lifepoints: {
        max: number
        temporary?: number
        current?: number
      }
      death_dices: {
        sucesses: number
        fails: number
      }
      economy: {
        pc: number
        pp: number
        pe: number
        po: number
        pl: number
      }
      perception: number
      experience: number
      inspired: boolean
    }
    character_attributes: {
      FOR: number
      DES: number
      CON: number
      INT: number
      SAB: number
      CAR: number
    }
    character_skills: {
      accrobatics: {
        value: number
        trained: boolean
      }
      arcanism: {
        value: number
        trained: boolean
      }
      acting: {
        value: number
        trained: boolean
      }
      stealth: {
        value: number
        trained: boolean
      }
      intimidation: {
        value: number
        trained: boolean
      }
      investigation: {
        value: number
        trained: boolean
      }
      nature: {
        value: number
        trained: boolean
      }
      persuasion: {
        value: number
        trained: boolean
      }
      religion: {
        value: number
        trained: boolean
      }
      care_animals: {
        value: number
        trained: boolean
      }
      atletism: {
        value: number
        trained: boolean
      }
      deception: {
        value: number
        trained: boolean
      }
      history: {
        value: number
        trained: boolean
      }
      intuition: {
        value: number
        trained: boolean
      }
      medicine: {
        value: number
        trained: boolean
      }
      perception: {
        value: number
        trained: boolean
      }
      Sleight_of_hand: {
        value: number
        trained: boolean
      }
      survival: {
        value: number
        trained: boolean
      }
    }
  }
  public: {
    description?: string
    imageUrl?: string
    public: boolean
    ownerName?: string
  }
}
