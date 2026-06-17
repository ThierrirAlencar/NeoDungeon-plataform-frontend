import type { DNDitemRarity } from '../enums'

export interface AttributeTypes {
  nome: String
  abrev: String
  descricao: String
  pericias: Array<String>
}

export interface PericiasTypes {
  id: string
  nome: string
  nomeIngles: string
  atributoBase: string
}

export type AtributoAbrev = 'FOR' | 'DES' | 'CON' | 'INT' | 'SAB' | 'CAR'

export type AtributoPrincipal = AtributoAbrev | 'FOR_OU_DES' | 'DES_SAB' | 'FOR_CAR'

export type DadoVida = 'd6' | 'd8' | 'd10' | 'd12'

export interface ClasseDnD5e {
  id: string
  nome: string
  nomeIngles: string
  dadoVida: DadoVida
  atributoPrincipal: AtributoPrincipal
}

export interface AntecedenteDnD5e {
  id: string
  nome: string
  nomeIngles: string
  periciasGanhas: string[]
}

export interface RacaDnD5e {
  id: string
  nome: string
  nomeIngles: string
  deslocamento: number
  bonusAtributos: Partial<Record<AtributoAbrev, number>>
  visaoNoEscuro: boolean
}

export type EixoEtico = 'Ordeiro' | 'Neutro' | 'Caótico'
export type EixoMoral = 'Bom' | 'Neutro' | 'Mau'
export type AbrevTendencia = 'OB' | 'NB' | 'CB' | 'ON' | 'N' | 'CN' | 'OM' | 'NM' | 'CM'

export interface TendenciaDnD5e {
  id: string
  nome: string
  nomeIngles: string
  abrev: AbrevTendencia
  eixoEtico: EixoEtico
  eixoMoral: EixoMoral
  descricao: string
}

export interface EquipmentType {
  id: string
  nome: string
  description: string
  imageUrl?: string
  rarity: DNDitemRarity
  atack?: string //dice and combo
}

export interface dndSubClasses {
  baseClass:RacaDnD5e,
  name:string,
  description:string,
  book_reference?:string //Página do livro (e qual livro)
}