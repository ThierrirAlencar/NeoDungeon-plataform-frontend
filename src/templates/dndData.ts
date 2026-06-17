import type {
  AntecedenteDnD5e,
  AttributeTypes,
  ClasseDnD5e,
  dndSubClasses,
  EquipmentType,
  PericiasTypes,
  RacaDnD5e,
  TendenciaDnD5e,
} from '@/types/Meta/Dungeons/dndTypes'
import { DNDitemRarity } from '@/types/Meta/enums'

//Jsons Lists
import tendencies_data from './json/Dungeons/tendenciesDnd.json' with { type: 'json' }
import attributes_data from './json/Dungeons/attributesDnd.json' with { type: 'json' }
import skills_data from './json/Dungeons/skillsDnd.json' with { type: 'json' }
import class_data from './json/Dungeons/classesDnd.json' with { type: 'json' }
import foregone_data from './json/Dungeons/foregoneDnd.json' with { type: 'json' }
import race_data from './json/Dungeons/raceDnd.json' with { type: 'json' }

export const atributosDnD5e: Array<AttributeTypes> = attributes_data as Array<AttributeTypes>

export const periciasDnD5e: Array<PericiasTypes> = skills_data as Array<PericiasTypes>

export const classesDnD5e: Array<ClasseDnD5e> = class_data as Array<ClasseDnD5e>

export const antecedentesDnD5e: Array<AntecedenteDnD5e> = foregone_data as Array<AntecedenteDnD5e>

export const racasDnD5e: Array<RacaDnD5e> = race_data as Array<RacaDnD5e>

export const tendenciasDnD5e: Array<TendenciaDnD5e> = tendencies_data as Array<TendenciaDnD5e>

const equipamentosBaseDnD5e: EquipmentType[] = [
  {
    id: 'espada_longa',
    nome: 'Espada Longa',
    description: 'Uma arma versátil de uma ou duas mãos, predileta de guerreiros e paladinos.',
    rarity: DNDitemRarity.COMMON,
    atack: '1d8 cortante (ou 1d10 se usada com as duas mãos)',
  },
  {
    id: 'adaga',
    nome: 'Adaga',
    description:
      'Uma lâmina curta, leve e fácil de esconder, com a propriedade de ser arremessada.',
    rarity: DNDitemRarity.COMMON,
    atack: '1d4 perfurante - Acuidade, Leve, Arremesso (distância 6/18m)',
  },
  {
    id: 'machado_grande',
    nome: 'Machado Grande',
    description:
      'Uma arma pesada de duas mãos capaz de desferir golpes devastadores, muito comum entre bárbaros.',
    rarity: DNDitemRarity.COMMON,
    atack: '1d12 cortante - Pesada, Duas Mãos',
  },

  {
    id: 'arco_longo',
    nome: 'Arco Longo',
    description: 'Um arco alto que exige as duas mãos para disparar flechas a grandes distâncias.',
    rarity: DNDitemRarity.COMMON,
    atack: '1d8 perfurante - Munição (distância 45/180m), Pesada, Duas Mãos',
  },
  {
    id: 'gibao_peles',
    nome: 'Gibão de Peles',
    description:
      'Uma armadura média rústica feita de peles grossas. CA: 12 + Modificador de Destreza (máximo 2).',
    rarity: DNDitemRarity.COMMON,
  },
  {
    id: 'cota_malha',
    nome: 'Cota de Malha',
    description:
      'Armadura pesada tradicional feita de anéis de metal interligados. CA: 16. Exige Força 13 e dá desvantagem em Furtividade.',
    rarity: DNDitemRarity.COMMON,
  },
  {
    id: 'escudo',
    nome: 'Escudo',
    description:
      'Um escudo de madeira ou metal empunhado em uma das mãos. Concede +2 na CA do personagem.',
    rarity: DNDitemRarity.COMMON,
  },
  {
    id: 'ferramentas_ladrao',
    nome: 'Ferramentas de Ladrão',
    description:
      'Conjunto de gazuas, limas, espelhos e tesouras usados para arrombar fechaduras e desarmar armadilhas.',
    rarity: DNDitemRarity.COMMON,
  },
  {
    id: 'pocao_cura_comum',
    nome: 'Poção de Cura',
    description:
      'Um fluido vermelho mágico que brilha levemente. Beber a poção recupera pontos de vida.',
    rarity: DNDitemRarity.COMMON,
    atack: '2d4 + 2 de cura',
  },
]

const subclasses: Record<string, dndSubClasses> = {}
