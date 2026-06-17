import type { rpgSystem } from "../rpgSystemEnum";


export interface local_storage_sheet_id_inteface{
    id:number,
    systemSheet:rpgSystem,
    created_at?:Date
}