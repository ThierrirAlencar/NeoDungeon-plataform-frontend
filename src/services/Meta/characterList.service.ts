import { LOCAL_STORAGE_BOUND_KEYS } from "@/core/keys"
import type { local_storage_sheet_id_inteface } from "@/types/localStorage/sheet_id_interface"
import type { optmizedDNDTokenFormat } from "@/types/Meta/Dungeons/optmizedType"
import type { Character } from "@/types/Meta/undoneCharacterSheet"
import { rpgSystem } from "@/types/rpgSystemEnum"

export function getCharactersFromLocalStorageOptmizedList():Array<optmizedDNDTokenFormat> {
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)


    if(!doesLocalStorageIsOnUse){
        localStorage.setItem(LS_KEY, "[]")
    }

    const _local_storage_data = localStorage.getItem(LS_KEY) as string; //Aqui nós temos certeza que isso é string

    const ValidateList:Array<optmizedDNDTokenFormat> = JSON.parse(_local_storage_data);

    return ValidateList
}

export function updateCharacterLocalStorageValues(data:optmizedDNDTokenFormat){
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)

    console.log(data)

    if(!doesLocalStorageIsOnUse){
        throw new Error("Nenhuma ficha salva no espaço de edição")
    }

    const _saved_sheet = localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function getCurrentEditingCharacter():any{
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)

    if(!doesLocalStorageIsOnUse){
        throw new Error("Theres no active character on Local Storage, searching for key: "+LS_KEY)
    }

    return JSON.parse(doesLocalStorageIsOnUse) //Temos certeza de que o tipo chegará aqui como string
}

export function convertOptmizedListToCompactList(data:Array<optmizedDNDTokenFormat>):Array<Character>{
    const _filtered_data:Array<Character> = data.map(e=>{
        return {
            name:e.character.character_name,
            system:e.identification.system || rpgSystem.DUNGEONS_AND_DRAGONS,
            description: e.public.description,
            classe:e.character.character_class.class,
            imageUrl:e.public.imageUrl,
            nivel:e.character.character_class.level,
            raca:e.character.character_race
        }
    })

    return _filtered_data;
}
