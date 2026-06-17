import { LOCAL_STORAGE_BOUND_KEYS } from '@/core/keys'
import { rpgSystem } from '@/types/rpgSystemEnum'
import type { optmizedDNDTokenFormat } from '@/types/Meta/Dungeons/optmizedType'
import { useStorage } from '@vueuse/core'
import type { local_storage_sheet_id_inteface } from '@/types/localStorage/sheet_id_interface'
import type { Character } from '@/types/Meta/undoneCharacterSheet'
import { getCharactersFromLocalStorageOptmizedList } from '../characterList.service'

export function buildDummySheetAtLocalStorage(dummy_sent:Partial<Character>): optmizedDNDTokenFormat {
        const doesLocalStorageIsOnUse = localStorage.getItem(LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use)

        if (doesLocalStorageIsOnUse) {
        localStorage.removeItem(LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use)
        }

        //Checa se já existe um id em uso no localStorage (se já existir soma-se um, se não será 0)
        const doesLocalStorageIdIsOnUse = localStorage.getItem(LOCAL_STORAGE_BOUND_KEYS.meta_sheet_id)
        var sheet_id = 0
        if (doesLocalStorageIdIsOnUse) {
        const ls_id_content = JSON.parse(doesLocalStorageIdIsOnUse) as local_storage_sheet_id_inteface
        sheet_id = ls_id_content.id + 1 //Auto increment
        }

        //Builds a dummy sheet on the local storage
        //It uses the new Id generated
        const dummy_sheet: optmizedDNDTokenFormat = {
            identification: {
                id: sheet_id, //builds with the predefined character id
                owner_id: '',
                created_at: new Date(0),
                system: rpgSystem.DUNGEONS_AND_DRAGONS,
            },
            character: {
                character_name: dummy_sent?.name || "",
                character_class:{
                    class: dummy_sent.classe || {
                        id: '',
                        nome: '',
                        nomeIngles: '',
                        dadoVida: 'd6',
                        atributoPrincipal: 'FOR',
                    },
                    level: dummy_sent.nivel || 1,
                },
                character_race: dummy_sent.raca || {
                    id: '',
                    nome: '',
                    nomeIngles: '',
                    deslocamento: 0,
                    bonusAtributos: {},
                    visaoNoEscuro: false,
                },
                character_allegiance: {
                    id: '',
                    nome: '',
                    nomeIngles: '',
                    abrev: 'N',
                    eixoEtico: 'Neutro',
                    eixoMoral: 'Neutro',
                    descricao: '',
                },
                character_equipments: [],
                character_extensive_data: {},
                character_numeric_data: {
                    proficiency_bonus: 0,
                    armour_class: 0,
                    initiative: 0,
                    speed: 0,
                    lifepoints: {
                        max: 0,
                    },
                    death_dices: {
                        sucesses: 0,
                        fails: 0,
                    },
                    economy: {
                        pc: 0,
                        pp: 0,
                        pe: 0,
                        po: 0,
                        pl: 0,
                    },
                    perception: 0,
                    experience: 0,
                },
                character_attributes: {
                    FOR: 10,
                    DES: 10,
                    CON: 10,
                    INT: 10,
                    SAB: 10,
                    CAR: 10,
                },
                character_skills: {
                    accrobatics: { value: 10, trained: false },
                    arcanism: { value:10, trained: false },
                    acting: { value: 10, trained: false },
                    stealth: { value: 10, trained: false },
                    intimidation: { value: 10, trained: false },
                    investigation: { value: 10, trained: false },
                    nature: { value: 10, trained: false },
                    persuasion: { value: 10, trained: false },
                    religion: { value: 10, trained: false },
                    care_animals: { value: 10, trained: false },
                    atletism: { value: 10, trained: false },
                    deception: { value: 10, trained: false },
                    history: { value: 10, trained: false },
                    intuition: { value: 10, trained: false },
                    medicine: { value: 10, trained: false },
                    perception: { value: 10, trained: false },
                    Sleight_of_hand: { value: 10, trained: false },
                    survival: { value: 10, trained: false },
                },
            },
            public: {
                public: false,
                imageUrl:dummy_sent.imageUrl || ""
            },
            }

        localStorage.setItem(LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use, JSON.stringify(dummy_sheet))
        const _stored_dummy_sheet = localStorage.getItem(LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use)

        if (!_stored_dummy_sheet) {
            throw new Error('Could not build dummy sheet')
        }

        return JSON.parse(_stored_dummy_sheet) as optmizedDNDTokenFormat
}

export function addOptmizedCharacterToCharactersList(data:optmizedDNDTokenFormat){
    
    //recebe a lista der personagens
    const charactersList = getCharactersFromLocalStorageOptmizedList()
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list
    
    //adiciona o novo personagem
    charactersList.push(data);

    //Atualiza lista de personagens
    localStorage.setItem(LS_KEY,JSON.stringify(charactersList))    
}