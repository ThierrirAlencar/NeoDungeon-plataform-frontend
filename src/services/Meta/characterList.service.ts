import { LOCAL_STORAGE_BOUND_KEYS } from "@/core/keys"
import type { local_storage_sheet_id_inteface } from "@/types/localStorage/sheet_id_interface"
import type { optmizedDNDTokenFormat } from "@/types/Meta/Dungeons/optmizedType"
import type { Character } from "@/types/Meta/undoneCharacterSheet"
import { rpgSystem } from "@/types/rpgSystemEnum"

//Obtem a lista de personagens do localstrorage
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

//Atualiza os valores do personagem que está sendo editado atualmente no LocalStorage
export function updateCharacterLocalStorageValues(data:optmizedDNDTokenFormat){
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)

    if(!doesLocalStorageIsOnUse){
        throw new Error("Nenhuma ficha salva no espaço de edição")
    }

    const _saved_sheet = localStorage.setItem(LS_KEY, JSON.stringify(data));
}

//Atualiza uma index específica da lista de personagens em localstorage
export function updateCharacterLocalStorageOnListValue(data:optmizedDNDTokenFormat){
    //Busca a chave que iremos usar no serviço
    const LS_LIST_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list;
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageListIsOnUse = localStorage.getItem(LS_LIST_KEY)
    if(!doesLocalStorageListIsOnUse){
        throw new Error("lista de personagens vazia ou não encontrada")
    }

    const _working_list = JSON.parse(doesLocalStorageListIsOnUse) as Array<optmizedDNDTokenFormat>;
    const _filtered_id = _working_list.findIndex(e=> e.identification.id == data.identification.id);
    _working_list[_filtered_id] == data;
}

//Obtem o personagem que está sendo editado no momento em LS
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

//Converte uma lista de fichas para uma lista de Perfis de personagem (Character)
export function convertOptmizedListToCompactList(data:Array<optmizedDNDTokenFormat>):Array<Character>{
    const _filtered_data:Array<Character> = data.map(e=>{
        return {
            name:e.character.character_name,
            system:e.identification.system || rpgSystem.DUNGEONS_AND_DRAGONS,
            description: e.public.description,
            classe:e.character.character_class.class,
            imageUrl:e.public.imageUrl,
            nivel:e.character.character_class.level,
            raca:e.character.character_race,
            id:e.identification.id
        }
    })

    return _filtered_data;
}

//Salva a lista atual em um JSON baixável
export function saveCurrentList():string{
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)


    if(!doesLocalStorageIsOnUse){
        throw new Error("Não foi possível obter a lista")
    }
    
    const _blob = new Blob([doesLocalStorageIsOnUse],{type:'application/json'});
    const _url = URL.createObjectURL(_blob);

    const a = document.createElement("a");
    const filename = `${new Date().toISOString}-neodungeon-sheetlist-format.json`;
    
    a.href = _url;
    a.download = filename

    a.click() //Forçar o click

    URL.revokeObjectURL(_url)

    return a.href;
}

//Remove uma index específica da lista de personagens em Local Storage
export function removeLocalStorageListItem(id:number){
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list
    
    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)

    if(!doesLocalStorageIsOnUse){
        throw new Error("Não foi possível obter lista de personagens")
    }

    const _list_:Array<optmizedDNDTokenFormat> = JSON.parse(doesLocalStorageIsOnUse) as Array<optmizedDNDTokenFormat>;

    const updatedList = _list_.filter((item) => item.identification.id !== id)

    if (updatedList.length === _list_.length) {
        throw new Error(`Nenhum personagem encontrado com o id ${id}`)
    }

    localStorage.setItem(LS_KEY, JSON.stringify(updatedList))

    return updatedList
}

//define a ficha de trabalho a partir do ID 
export function defineWorkingSheetById(id:number){
    //Busca a chave que iremos usar no serviço
    const LS_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_characters_list
    const LS_SHEET_KEY = LOCAL_STORAGE_BOUND_KEYS.meta_sheet_use; //Valor Guardado para edição

    //Checa se o espaço da chave está ocupado
    const doesLocalStorageIsOnUse = localStorage.getItem(LS_KEY)

    if(!doesLocalStorageIsOnUse){
        throw new Error("Não foi possível obter lista de personagens")
    }

    const _list_:Array<optmizedDNDTokenFormat> = JSON.parse(doesLocalStorageIsOnUse) as Array<optmizedDNDTokenFormat>;
    const _search_result = _list_.find(e=> e.identification.id == id); //Encontra o personagem que queremos usar

    if (!_search_result) {
        throw new Error(`Nenhum personagem encontrado com o id ${id}`)
    }

    //Armazena a nova ficha de trabalho;
    localStorage.setItem(LS_SHEET_KEY, JSON.stringify(_search_result));
}