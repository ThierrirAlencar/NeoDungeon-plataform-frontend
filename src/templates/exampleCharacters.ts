import { rpgSystem } from "@/types/rpgSystemEnum";
import { classesDnD5e, racasDnD5e } from "./dndData";
import type { Character } from "@/types/Meta/undoneCharacterSheet";

export const exampleCharacters:Array<Character> = [
    {
        name: 'Avarel Dremur',
        description: 'A cool Arackoga character',
        imageUrl: '../../../public/images/Dummy/dummy_necromancer.png',
        system: rpgSystem.DUNGEONS_AND_DRAGONS,
        classe: classesDnD5e[2],
        nivel: 5,
        raca: racasDnD5e[1],
        id:-1
    },
    {
        name: "Borun 'O Bom'",
        description: 'Um gordão engraçado',
        imageUrl: '../../../public/images/Dummy/dummy_rogue.png',
        system: rpgSystem.DUNGEONS_AND_DRAGONS,
        classe: classesDnD5e[1],
        nivel: 10,
        raca: racasDnD5e[2],
        id:-2
    },
    {
        name: 'Vikotr Voyer',
        description: 'O não ironicamente em pessoa',
        imageUrl: '../../../public/images/Dummy/dummy_mage.png',
        system: rpgSystem.PARANORMAL_ORDER,
        classe: classesDnD5e[3],
        nivel: 15,
        raca: racasDnD5e[3],
        id:-3
    },
    {
        name: 'Jason Collins',
        description: 'Um investigador nato que adora solucionar mistérios e também de beber as vezes',
        imageUrl: '../../../public/images/Dummy/dummy_basic.png',
        system: rpgSystem.PARANORMAL_ORDER,
        classe: classesDnD5e[6],
        nivel: 20,
        raca: racasDnD5e[3],
        id:-4
    },
]