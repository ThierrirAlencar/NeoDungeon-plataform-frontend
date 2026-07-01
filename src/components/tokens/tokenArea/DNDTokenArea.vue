<script setup lang="ts">
import {
  type ClasseDnD5e,
  type SkillEntry,
} from '../../../types/Meta/Dungeons/dndTypes.ts'
import NumberAtributeCount from '../../buttons/inputs/numbers/NumberAtributeCount.vue'
import TokenInputText from '../../buttons/inputs/text/TokenInputText.vue'
import {
  atributosDnD5e,
  periciasDnD5e,
} from '../../../templates/dndData.ts'
import NumberPericiasCount from '../../buttons/inputs/numbers/NumberPericiasCount.vue'
import { ref, computed } from 'vue'
import ClassSelector from './components/classSelector.vue'

import RaceSelector from './components/raceSelector.vue'
import ForegoneSelector from './components/foregoneSelector.vue'
import LeaningSelector from './components/leaningSelector.vue'
import LevelSelector from './components/levelSelector.vue'
import PlayerNameSelector from './components/playerNameSelector.vue'
import ExperienceSelector from './components/experienceSelector.vue'
import CharacterNameSelector from './components/characterNameSelector.vue'
import CharacterImageSelector from './components/characterImageSelector.vue'

import TokenSaveOptionsArea from "../tokenSaveOptionsArea.vue"
import type { optmizedDNDTokenFormat } from '@/types/Meta/Dungeons/optmizedType.ts'
import {
  getCurrentEditingCharacter,
  updateCharacterLocalStorageValues
} from '@/services/Meta/characterList.service.ts'
import { calculateSkillCheckBonusString } from '@/services/Meta/DND/skills.service.ts'

//#region Definições de refs e valores 

const themeColour = 'text-red-600'

//carrega personagem selecionado
const loaded_sheet: optmizedDNDTokenFormat = getCurrentEditingCharacter() as optmizedDNDTokenFormat

const sheet_values = ref<optmizedDNDTokenFormat>(loaded_sheet) //Ficha que estamos usando para trabalho
const { pc, pe, pl, po, pp } = loaded_sheet.character.character_numeric_data.economy
const classeSelecionada = ref<ClasseDnD5e>(loaded_sheet.character.character_class.class || null) //Carrega com os valores que possuimos

//Verifica se houveram atualizações
const changes_made = ref<boolean>(loaded_sheet != sheet_values.value); //Se houver mudanças exibe barra de save

// Combate
const dadosVidaTotal = ref(1)
const dadosVidaGastos = ref(0)

// Morte
const sucessosMorte = ref([false, false, false])
const falhasMorte = ref([false, false, false])

// Inspiração
const inspiracao = ref(false)

// Bônus de proficiência calculado por nível
const bonusProficiencia = computed(() => {
  if (sheet_values.value.character.character_class.level <= 4) return 2
  if (sheet_values.value.character.character_class.level <= 8) return 3
  if (sheet_values.value.character.character_class.level <= 12) return 4
  if (sheet_values.value.character.character_class.level <= 16) return 5 
  //Atualiza a lista definindo o bonus de proficiencia
  return 6
})

// Testes de resistência cada atributo tem seu saving throw
const testesResistencia = ref([
  { nome: 'Força', abrev: 'FOR', proficiente: false, valor: 0 },
  { nome: 'Destreza', abrev: 'DES', proficiente: false, valor: 0 },
  { nome: 'Constituição', abrev: 'CON', proficiente: false, valor: 0 },
  { nome: 'Inteligência', abrev: 'INT', proficiente: false, valor: 0 },
  { nome: 'Sabedoria', abrev: 'SAB', proficiente: false, valor: 0 },
  { nome: 'Carisma', abrev: 'CAR', proficiente: false, valor: 0 },
])

// Ataques
const ataques = ref([
  { nome: '', bonusAtaque: '', dano: '', tipoDano: '' },
  { nome: '', bonusAtaque: '', dano: '', tipoDano: '' },
  { nome: '', bonusAtaque: '', dano: '', tipoDano: '' },
])

// Moedas
const moedas = ref({
  PC: pc || 0, // Peças de Cobre
  PP: pp || 0, // Peças de Prata
  PE: pe || 0, // Peças de Electrum
  PO: po || 0, // Peças de Ouro
  PL: pl || 0, // Peças de Platina
})

// Equipamentos e outros textos
const equipamentos = ref('')
const outrasProficiencias = ref('')
const caracteristicasHabilidades = ref('')

//#endregion

//#region Protocolos, definições, tratamentos e cálculos de skills (Perícias)

const ensureSkillEntries = () => {
  const skills = sheet_values.value.character.character_skills as Record<string, SkillEntry> | undefined

  if (!skills) {
    sheet_values.value.character.character_skills = {} as typeof sheet_values.value.character.character_skills
  }

  const skillMap = sheet_values.value.character.character_skills as Record<string, SkillEntry>

  for (const skill of periciasDnD5e) {
    if (!skillMap[skill.nomeIngles]) {
      skillMap[skill.nomeIngles] = { value: 10, trained: false }
    }
  }
}

ensureSkillEntries()

const getSkillValue = (skillName: string) => {
  ensureSkillEntries()
  const skillMap = sheet_values.value.character.character_skills as Record<string, SkillEntry>
  if (!skillMap[skillName]) {
    skillMap[skillName] = { value: 10, trained: true }
  }
  return skillMap[skillName]
}

//Define o valor da skill
const setSkillValue = (skillName: string, skillEntry: SkillEntry) => {
  ensureSkillEntries()
  const skillMap = sheet_values.value.character.character_skills as Record<string, SkillEntry>
  if (!skillMap[skillName]) {
    skillMap[skillName] = { value: 10, trained: false }
  }
  skillMap[skillName] = skillEntry
}

//#endregion

//#region Protocolos, definições, tratamentos e cálculos de Atrributes (Atributos)

const ensureAttributeEntries = () => {
  const attributes = sheet_values.value.character.character_attributes as Record<string, number> | undefined

  if (!attributes) {
    sheet_values.value.character.character_attributes = {} as typeof sheet_values.value.character.character_attributes
  }

  const attributeMap = sheet_values.value.character.character_attributes as Record<string, number>

  for (const attribute of atributosDnD5e) {
    if (attributeMap[attribute.abrev] === undefined) {
      attributeMap[attribute.abrev] = 10
    }
  }
}

ensureAttributeEntries()

const getAttributeValue = (attributeName: string) => {
  ensureAttributeEntries()
  const attributeMap = sheet_values.value.character.character_attributes as Record<string, number>
  if (attributeMap[attributeName] === undefined) {
    attributeMap[attributeName] = 10
  }
  console.log(attributeMap[attributeName])
  return attributeMap[attributeName]
}

const setAttributeValue = (attributeName: string, value: number) => {
  ensureAttributeEntries()
  const attributeMap = sheet_values.value.character.character_attributes as Record<string, number>
  if (attributeMap[attributeName] === undefined) {
    attributeMap[attributeName] = 10
  }
  attributeMap[attributeName] = value
}
//#endregion

//#region intervalo de preenchimento de dados
//Atualiza a cada 2 segundos a lista do localstorage
setInterval(() => {

  //Atualiza dados de morte 
  sheet_values.value.character.character_numeric_data.death_dices.fails = falhasMorte.value.filter(e => e == true).length;
  sheet_values.value.character.character_numeric_data.death_dices.sucesses = sucessosMorte.value.filter(e => e == true).length;

  //Atualiza lista de moedas;
  sheet_values.value.character.character_numeric_data.economy.pc = moedas.value.PC;
  sheet_values.value.character.character_numeric_data.economy.pe = moedas.value.PE;
  sheet_values.value.character.character_numeric_data.economy.pl = moedas.value.PL;
  sheet_values.value.character.character_numeric_data.economy.po = moedas.value.PO;
  sheet_values.value.character.character_numeric_data.economy.pp = moedas.value.PP;

  // //Atualizar lista gramática
  // if (sheet_values.value.character.character_extensive_data) {
  //   sheet_values.value.character.character_extensive_data.characteristicsAndHabilities = caracteristicasHabilidades.value;
  //   sheet_values.value.character.character_extensive_data.proficienciesAndLanguages = outrasProficiencias.value;
  // } else {
  //   sheet_values.value.character.character_extensive_data = {};//Opens an object
  // }

  changes_made.value = loaded_sheet != sheet_values.value; //Checa a cada 2 segundos se houveram mudanças
  //   updateCharacterLocalStorageOnListValue(loaded_sheet);

  //Atualiza lista de edição a cada 2 segundos
  try {
    updateCharacterLocalStorageValues(loaded_sheet)
  } catch (err) {
    console.error(err)
  }
}, 2000)

//#endregion

</script>

<template>
  <div class="w-full bg-slate-950 p-8 flex flex-col gap-6">
    <!-- ═══ LINHA 1: Cabeçalho da Ficha ═══ -->
    <div class="flex flex-row gap-4 items-end flex-wrap">
      <!-- Upload de imagem -->
      <CharacterImageSelector></CharacterImageSelector>
      <!-- Campos de texto do cabeçalho -->
      <div class="flex flex-wrap gap-3 flex-1">
        <!-- Character Name Selector -->
        <CharacterNameSelector v-model="loaded_sheet.character.character_name"></CharacterNameSelector>
        <!-- Nome do Jogador -->
        <PlayerNameSelector v-model="loaded_sheet.public.ownerName"></PlayerNameSelector>
        <!-- Seletor de Classes -->
        <ClassSelector v-model="loaded_sheet.character.character_class.class"></ClassSelector>
        <!-- Seletor de Nìveis -->
        <LevelSelector v-model="loaded_sheet.character.character_class.level"></LevelSelector>
        <!-- Seletor de Raças -->
        <RaceSelector v-model="loaded_sheet.character.character_race"></RaceSelector>
        <!-- Seletor de Antecedentes -->
        <!-- Ainda não foi adicionado a ficha base -->
        <ForegoneSelector></ForegoneSelector>
        <!-- Seletor de Alinhamento -->
        <LeaningSelector v-model="loaded_sheet.character.character_allegiance"></LeaningSelector>
        <!-- Seletor de Experiência -->
        <ExperienceSelector v-model="loaded_sheet.character.character_numeric_data.experience"></ExperienceSelector>
      </div>
    </div>

    <hr class="border-slate-700" />

    <!-- ═══ LINHA 2: Atributos | Combate | Personalidade ═══ -->
    <div class="flex flex-row gap-4">
      <!-- COLUNA 1: Atributos + Proficiência + Inspiração + Percepção Passiva -->
      <div class="flex flex-col items-center gap-3 w-1/3">
        <!-- Inspiração + Bônus de Proficiência -->
        <div class="flex flex-row gap-3 w-full">
          <!-- Inspiração -->
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <input type="checkbox" v-model="sheet_values.character.character_numeric_data.inspired"
              class="w-5 h-5 accent-red-600 cursor-pointer" />

            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mt-1">Inspiração</label>
            <div class="flex flex-col m-2 gap-4 text-center bg-slate-600 rounded-xl p-4"> 
              <label class="text-white font-black text-center">
                Bonus de proficiencia:
              </label>
              <strong class="font-extrabold text-4xl text-white">
                + {{ bonusProficiencia }}
              </strong>
            </div>
            <!-- Sabedoria Passiva -->
            <div class="flex flex-row items-center gap-3 w-full bg-slate-800 border border-slate-600 rounded-xl p-3">
              <div class="flex flex-col items-center">
                <input type="number"
                  :value="calculateSkillCheckBonusString(
                    sheet_values.character.character_attributes.SAB,
                    sheet_values.character.character_numeric_data.proficiency_bonus,
                    sheet_values.character.character_skills.perception.trained
                  )"
                  class="text-white rounded-xl bg-slate-700 p-2 w-14 text-center border border-slate-600 focus:border-red-600 outline-none" />
              </div>
              <label class="text-gray-300 text-sm font-bold">Sabedoria Passiva <span
                  :class="themeColour">(Percepção)</span></label>
            </div>
          </div>
          <!-- Atributos (Lista) -->
          <!-- Bonus  --de proficiencia osDnD5e" key="atributo.abrev"> -->
          <ul class="flex flex-col gap-2">
            <li v-for="atributo in atributosDnD5e" :key="atributo.nome">
              <NumberAtributeCount :model-value="getAttributeValue(atributo.abrev)"
                @update:model-value="(value: number) => setAttributeValue(atributo.abrev, value)" :nome="atributo.nome"
                :abrev="atributo.abrev" :pericias="atributo.pericias" :descricao="atributo.descricao" />
            </li>
          </ul>
        </div>


        <hr class="w-full border-slate-700" />

        <!-- Testes de Resistência -->
        <div class="w-full bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Testes de Resistência
          </h3>
          <ul class="grid grid-cols-2 content-center items-center gap-1">
            <li v-for="tr in testesResistencia" :key="tr.abrev" class="flex items-center gap-2">
              <input type="checkbox" v-model="tr.proficiente" class="accent-red-600 cursor-pointer" />
              <span class="text-white text-sm w-6 text-right font-bold">{{ tr.valor >= 0 ? '+' : '' }}{{ tr.valor
                }}</span>
              <span class="text-gray-300 text-sm">{{ tr.nome }}</span>
            </li>
          </ul>
        </div>

        <hr class="w-full border-slate-700" />

        <!-- Perícias -->
        <ul class="grid text-white grid-cols-2 w-full">
          <li v-for="atributo in periciasDnD5e" :key="atributo.id">
            <NumberPericiasCount :model-value="getSkillValue(atributo.nomeIngles)"
              :related_atribute_bonus="getAttributeValue(atributo.atributoBase)"
              @update:model-value="(skillEntry: SkillEntry) => setSkillValue(atributo.nomeIngles, skillEntry)"
              :nome="atributo.nome" :atributo-base="atributo.atributoBase" :id="atributo.id"
              :proficiency_bonus="bonusProficiencia"
              :nome-ingles="atributo.nomeIngles" />
          </li>
        </ul>

        <hr class="w-full border-slate-700" />


      </div>

      <!-- COLUNA 2: Stats de combate + HP + Ataques + Equipamento -->
      <div class="flex flex-col gap-3 w-1/3">
        <!-- CA / Iniciativa / Deslocamento -->
        <div class="flex flex-row gap-2">
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <input v-model="sheet_values.character.character_numeric_data.armour_class" type="number"
              class="text-white text-2xl font-bold bg-transparent w-full text-center outline-none" />
            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mt-1">Classe de
              Armadura</label>
          </div>
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <input v-model="sheet_values.character.character_numeric_data.initiative" type="number"
              class="text-white text-2xl font-bold bg-transparent w-full text-center outline-none" />
            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mt-1">Iniciativa</label>
          </div>
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <input v-model="sheet_values.character.character_numeric_data.speed" type="number"
              class="text-white text-2xl font-bold bg-transparent w-full text-center outline-none" />
            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mt-1">Deslocamento
              (m)</label>
          </div>
        </div>

        <!-- HP -->
        <div class="flex flex-col bg-slate-800 border border-slate-600 rounded-xl p-3 gap-2">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center">
            Pontos de Vida
          </h3>
          <div class="flex flex-row gap-2">
            <div class="flex flex-col items-center flex-1">
              <input v-model="sheet_values.character.character_numeric_data.lifepoints.max" type="number"
                class="text-white text-xl font-bold bg-slate-700 rounded-lg w-full text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
              <label class="text-gray-400 text-xs mt-1">Máximo</label>
            </div>
            <div class="flex flex-col items-center flex-1">
              <input v-model="sheet_values.character.character_numeric_data.lifepoints.current" type="number"
                class="text-white text-xl font-bold bg-slate-700 rounded-lg w-full text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
              <label class="text-gray-400 text-xs mt-1">Atual</label>
            </div>
            <div class="flex flex-col items-center flex-1">
              <input v-model="sheet_values.character.character_numeric_data.lifepoints.temporary" type="number"
                class="text-white text-xl font-bold bg-slate-700 rounded-lg w-full text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
              <label class="text-gray-400 text-xs mt-1">Temporário</label>
            </div>
          </div>
        </div>

        <!-- Dados de Vida + Testes de Morte -->
        <div class="flex flex-row gap-2">
          <!-- Dados de Vida -->
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
              Dados de Vida
            </h3>
            <div class="flex flex-row gap-2 items-center">
              <div class="flex flex-col items-center">
                <input v-model="dadosVidaTotal" type="number"
                  class="text-white text-lg font-bold bg-slate-700 rounded-lg w-12 text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
                <label class="text-gray-400 text-xs mt-1">Total</label>
              </div>
              <span class="text-gray-500">/</span>
              <div class="flex flex-col items-center">
                <input v-model="dadosVidaGastos" type="number"
                  class="text-white text-lg font-bold bg-slate-700 rounded-lg w-12 text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
                <label class="text-gray-400 text-xs mt-1">Gastos</label>
              </div>
            </div>
            <span class="text-gray-400 text-xs mt-1">{{
              classeSelecionada ? classeSelecionada.dadoVida : '—'
              }}</span>
          </div>

          <!-- Testes de Morte -->
          <div class="flex flex-col items-center bg-slate-800 border border-slate-600 rounded-xl p-3 flex-1">
            <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
              Testes de Morte
            </h3>
            <div class="flex flex-row justify-between w-full mb-1">
              <span class="text-green-400 text-xs font-bold">Sucesso</span>
              <div class="flex gap-1">
                <input v-for="(_, i) in sucessosMorte" :key="i" type="checkbox" v-model="sucessosMorte[i]"
                  class="w-4 h-4 accent-green-500 cursor-pointer" />
              </div>
            </div>
            <div class="flex flex-row justify-between w-full">
              <span class="text-red-400 text-xs font-bold">Falha</span>
              <div class="flex gap-1">
                <input v-for="(_, i) in falhasMorte" :key="i" type="checkbox" v-model="falhasMorte[i]"
                  class="w-4 h-4 accent-red-600 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <hr class="border-slate-700" />

        <!-- Ataques e Magias -->
        <div class="bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Ataques e Magias
          </h3>
          <table class="w-full text-xs">
            <thead>
              <tr class="text-gray-400">
                <th class="text-left pb-1">Nome</th>
                <th class="text-center pb-1">Bônus</th>
                <th class="text-center pb-1">Dano/Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(ataque, i) in ataques" :key="i" class="border-t border-slate-700">
                <td class="py-1 pr-1">
                  <input v-model="ataque.nome" type="text" placeholder="—"
                    class="text-white bg-slate-700 rounded w-full p-1 border border-slate-600 focus:border-red-600 outline-none" />
                </td>
                <td class="py-1 px-1">
                  <input v-model="ataque.bonusAtaque" type="text" placeholder="+0"
                    class="text-white bg-slate-700 rounded w-full p-1 text-center border border-slate-600 focus:border-red-600 outline-none" />
                </td>
                <td class="py-1 pl-1">
                  <input v-model="ataque.dano" type="text" placeholder="1d6 / S"
                    class="text-white bg-slate-700 rounded w-full p-1 text-center border border-slate-600 focus:border-red-600 outline-none" />
                </td>
              </tr>
            </tbody>
          </table>
          <button @click="ataques.push({ nome: '', bonusAtaque: '', dano: '', tipoDano: '' })"
            class="mt-2 text-xs text-red-500 hover:text-red-400 font-bold w-full text-center cursor-pointer">
            + Adicionar Ataque
          </button>
        </div>

        <hr class="border-slate-700" />

        <!-- Moedas -->
        <div class="bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Moedas
          </h3>
          <div class="flex flex-row gap-2 flex-wrap justify-center">
            <div v-for="(valor, tipo) in moedas" :key="tipo" class="flex flex-col items-center">
              <input v-model="moedas[tipo]" type="number" min="0"
                class="text-white text-sm font-bold bg-slate-700 rounded-lg w-14 text-center p-1 border border-slate-600 focus:border-red-600 outline-none" />
              <label :class="[
                'text-xs font-bold mt-1',
                tipo === 'PO'
                  ? 'text-yellow-400'
                  : tipo === 'PP'
                    ? 'text-gray-300'
                    : tipo === 'PC'
                      ? 'text-orange-400'
                      : tipo === 'PL'
                        ? 'text-purple-400'
                        : 'text-blue-300',
              ]">{{ tipo }}</label>
            </div>
          </div>
        </div>

        <!-- Equipamentos -->
        <div class="bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Equipamentos
          </h3>
          <textarea v-model="equipamentos" rows="4"
            class="text-white bg-slate-700 rounded-lg w-full p-2 text-sm border border-slate-600 focus:border-red-600 outline-none resize-none"
            placeholder="Liste seus itens..."></textarea>
        </div>
      </div>

      <!-- COLUNA 3: Personalidade + Habilidades + Outras Proficiências -->
      <div class="flex flex-col gap-3 w-1/3">
        <tokenInputText v-model="sheet_values.character.character_extensive_data.traitsAndPersonality"
          label="Traços e Personalidade" />
        <tokenInputText v-model="sheet_values.character.character_extensive_data.ideals" label="Ideais" />
        <tokenInputText v-model="sheet_values.character.character_extensive_data.bonds" label="Vínculos" />
        <tokenInputText v-model="sheet_values.character.character_extensive_data.weaknesses" label="Fraquezas" />

        <hr class="border-slate-700" />

        <!-- Características e Habilidades de Classe/Raça -->
        <div class="bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Características e <strong :class="themeColour">Habilidades</strong>
          </h3>
          <textarea v-model="sheet_values.character.character_extensive_data.characteristicsAndHabilities" rows="6"
            class="text-white bg-slate-700 rounded-lg w-full p-2 text-sm border border-slate-600 focus:border-red-600 outline-none resize-none"
            placeholder="Habilidades de classe, raça, talento..."></textarea>
        </div>

        <!-- Outras Proficiências e Idiomas -->
        <div class="bg-slate-800 border border-slate-600 rounded-xl p-3">
          <h3 class="text-gray-400 text-xs font-bold uppercase tracking-wide text-center mb-2">
            Outras Proficiências <span class="text-gray-500">&</span>
            <strong :class="themeColour">Idiomas</strong>
          </h3>
          <textarea v-model="sheet_values.character.character_extensive_data.proficienciesAndLanguages" rows="5"
            class="text-white bg-slate-700 rounded-lg w-full p-2 text-sm border border-slate-600 focus:border-red-600 outline-none resize-none"
            placeholder="Idiomas, armas, armaduras, ferramentas..."></textarea>
        </div>
      </div>
    </div>
  </div>
  <TokenSaveOptionsArea v-if="changes_made" :editing_sheet="sheet_values"></TokenSaveOptionsArea>
</template>
