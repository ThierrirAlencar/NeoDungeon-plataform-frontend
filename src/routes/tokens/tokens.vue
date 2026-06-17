<script setup lang="ts">
  import CharacterSheetCard from '@/components/tokens/CharacterSheetCard.vue'
  import RaceSelector from '@/components/tokens/tokenArea/components/raceSelector.vue'
  import { getCharactersFromLocalStorageOptmizedList, convertOptmizedListToCompactList, updateCharacterLocalStorageValues } from '@/services/Meta/characterList.service'
  import { addOptmizedCharacterToCharactersList, buildDummySheetAtLocalStorage } from '@/services/Meta/DND/sheetBuilder.service'
  import { classesDnD5e, racasDnD5e } from '@/templates/dndData'
  import { exampleCharacters } from '@/templates/exampleCharacters'
  import type { Character } from '@/types/Meta/undoneCharacterSheet'
  import { rpgSystem } from '@/types/rpgSystemEnum'
  import { ref, computed, inject } from 'vue'


const _unProcessedList = getCharactersFromLocalStorageOptmizedList()

//Carrega a lista já existente no localStorage
const characters= ref<Character[]>(convertOptmizedListToCompactList(_unProcessedList))
characters.value = characters.value.concat(exampleCharacters)

// ref<Character[]>()

  const systemLabel: Record<rpgSystem, string> = {
    [rpgSystem.DUNGEONS_AND_DRAGONS]: 'D&D 5e',
    [rpgSystem.PARANORMAL_ORDER]: 'Ordem Paranormal',
  }

  const systemColor: Record<rpgSystem, string> = {
    [rpgSystem.DUNGEONS_AND_DRAGONS]: '#B91C1C',
    [rpgSystem.PARANORMAL_ORDER]: '#45556c',
  }

  const busca = ref('')
  const mostrarModal = ref(false)

  const personagensFiltrados = computed(() =>
    characters.value.filter(
      (c) =>
        c.name.toLowerCase().includes(busca.value.toLowerCase()) ||
        c.description?.toLowerCase().includes(busca.value.toLowerCase()),
    ),
  )

  // Novo personagem (Personagem vazio serve apenas para preencher valores)
  const novoPersonagem = ref<Character>({
    name: "",
    description: undefined,
    imageUrl: undefined,
    system: rpgSystem.DUNGEONS_AND_DRAGONS,
    classe: undefined,
    nivel: 1,
    raca: undefined,
  })

  //adiciona personagens a lista de personagens no localStorage
  function adicionarPersonagem() {
    //call service to store information
    try{
        //adiciona um dummy para a pool de personagens
        const builtIn = buildDummySheetAtLocalStorage(novoPersonagem.value)

        //adiciona o personagen criado a lista de personagens
        addOptmizedCharacterToCharactersList(builtIn)
    }catch(err){
      console.error(err);
    }

    //limpa a lista de personagens
    if (!novoPersonagem.value.name.trim()) return
      characters.value.push({ ...novoPersonagem.value })
      novoPersonagem.value = {
        name: '',
        description: '',
        imageUrl: '',
        system: rpgSystem.DUNGEONS_AND_DRAGONS,
        classe: undefined,
        nivel: 1,
        raca: undefined,
      }
    
    mostrarModal.value = false
  }

  //Adicionar função para remover do local storage também 
  function removerPersonagem(nome: string) {
    characters.value = characters.value.filter((c) => c.name !== nome)
  }

  // Iniciais para avatar placeholder (Usado quando a imagem não é informada)
  function iniciais(nome: string) {
    return nome
      .split(' ')
      .map((p) => p[0])
      .slice(0, 2)
      .join('')
      .toUpperCase()
  }




</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white">
    <!-- ═══ CABEÇALHO DA PÁGINA ═══ -->
    <div class="max-w-7xl mx-auto px-6 pt-10 pb-8">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <!-- Título -->
        <div>
          <!-- <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">Campanha</p> -->
          <h1 class="text-5xl font-black leading-none" style="font-family: Georgia, serif">
            Personagens
          </h1>
          <p class="text-slate-500 text-sm mt-2">
            {{ characters.length }} personagem{{ characters.length !== 1 ? 's' : '' }} criado{{
              characters.length !== 1 ? 's' : ''
            }}
          </p>
        </div>

        <!-- Busca + botão -->
        <div class="flex flex-row gap-3 items-center flex-wrap">
          <div class="relative">
            <svg
              class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="6" cy="6" r="4" />
              <path d="M10 10l3 3" />
            </svg>
            <input
              v-model="busca"
              type="text"
              placeholder="Buscar personagem..."
              class="text-white text-sm bg-slate-900 border border-slate-700 focus:border-red-600 outline-none rounded-xl pl-9 pr-4 py-2.5 w-52 transition-colors"
            />
          </div>
          <button
            @click="mostrarModal = true"
            class="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path d="M7 1v12M1 7h12" />
            </svg>
            Novo Personagem
          </button>
        </div>
      </div>

      <hr class="border-slate-800 mt-8" />
    </div>

    <!-- ═══ GRID DE PERSONAGENS ═══ -->
    <div class="max-w-7xl mx-auto px-6 pb-20">
      <!-- Estado vazio -->
      <div
        v-if="personagensFiltrados.length === 0"
        class="flex flex-col items-center justify-center py-32 gap-4 text-center"
      >
        <span class="text-5xl select-none">🧙</span>
        <p class="text-slate-400 font-bold text-lg">
          {{ busca ? 'Nenhum personagem encontrado' : 'Nenhum personagem ainda' }}
        </p>
        <p class="text-slate-600 text-sm max-w-xs">
          {{
            busca
              ? 'Tente outro nome ou descrição.'
              : 'Crie seu primeiro herói para começar a aventura.'
          }}
        </p>
        <button
          v-if="!busca"
          @click="mostrarModal = true"
          class="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
        >
          Criar personagem
        </button>
      </div>

      <!-- Cards -->
      <TransitionGroup
        name="card-fade"
        tag="div"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
      >
        <div
          v-for="c in personagensFiltrados"
          :key="c.name"
          class="group relative bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 flex flex-col"
        >
          <!-- Área de imagem / avatar -->
          <div
            class="relative h-44 bg-slate-800 overflow-hidden flex items-center justify-center shrink-0"
          >
            <!-- Imagem real se existir -->
            <img
              v-if="c.imageUrl && c.imageUrl !== 'string'"
              :src="c.imageUrl"
              :alt="c.name"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Placeholder com iniciais e fundo atmosférico -->
            <div v-else class="w-full h-full flex items-center justify-center relative">
              <!-- Grade decorativa de fundo -->
              <div
                class="absolute inset-0 opacity-5"
                style="
                  background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
                  background-size: 20px 20px;
                "
              />
              <!-- Borda vermelha sutil no topo -->
              <div
                class="absolute top-0 left-0 right-0 h-2 opacity-60"
                :style="{ backgroundColor: systemColor[c.system] }"
              />
              <!-- Avatar com iniciais -->
              <div
                class="w-20 h-20 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center z-10"
              >
                <span
                  class="text-2xl font-black text-slate-300"
                  style="font-family: Georgia, serif"
                >
                  {{ iniciais(c.name) }}
                </span>
              </div>
            </div>

            <!-- Badge de sistema no canto -->
            <span
              class="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
              :style="{
                color: systemColor[c.system],
                backgroundColor: systemColor[c.system] + '22',
                border: `1px solid ${systemColor[c.system]}44`,
              }"
              >{{ systemLabel[c.system] }}</span
            >

            <!-- Botão remover no hover -->
            <button
              @click.stop="removerPersonagem(c.name)"
              class="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-950/80 border border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
              title="Remover personagem"
            >
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 1l9 9M10 1l-9 9" />
              </svg>
            </button>
          </div>

          <!-- Corpo do card -->
          <div class="p-4 flex flex-col gap-2 flex-1">
            <!-- Nome -->
            <h2
              class="text-white font-black text-lg leading-tight group-hover:text-red-400 transition-colors"
              style="font-family: Georgia, serif"
            >
              {{ c.name }}
            </h2>

            <!-- Classe / Raça / Nível -->
            <div class="flex flex-wrap gap-x-3 gap-y-0.5">
              <span v-if="c.classe" class="text-slate-400 text-xs">
                {{ c.classe.nome }}
              </span>
              <span v-if="c.raca" class="text-slate-600 text-xs">·</span>
              <span v-if="c.raca" class="text-slate-400 text-xs">
                {{ c.raca.nome }}
              </span>
              <span v-if="c.nivel" class="text-slate-600 text-xs">·</span>
              <span v-if="c.nivel" class="text-red-600 text-xs font-bold">
                Nível {{ c.nivel }}
              </span>
            </div>

            <!-- Descrição -->
            <p class="text-slate-500 text-xs leading-relaxed line-clamp-2 mt-0.5">
              {{ c.description }}
            </p>

            <!-- Rodapé do card: botão abrir ficha -->
            <div class="mt-auto pt-3 border-t border-slate-800">
              <RouterLink
                :to="`/ficha/${c.name}`"
                class="flex items-center justify-between text-xs font-bold text-slate-400 hover:text-white transition-colors group/link"
              >
                <span>Abrir ficha</span>
                <svg
                  class="translate-x-0 group-hover/link:translate-x-1 transition-transform"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M2 7h10M7 2l5 5-5 5" />
                </svg>
              </RouterLink>
            </div>
          </div>
        </div>

        <!-- Card "adicionar" sempre no final -->
        <div
          key="__add__"
          @click="mostrarModal = true"
          class="border-2 border-dashed border-slate-800 hover:border-red-600/50 rounded-2xl h-72 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 hover:-translate-y-1 group"
        >
          <div
            class="w-12 h-12 rounded-full border-2 border-dashed border-slate-700 group-hover:border-red-600/50 flex items-center justify-center transition-colors"
          >
            <svg
              class="text-slate-600 group-hover:text-red-600 transition-colors"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M10 4v12M4 10h12" />
            </svg>
          </div>
          <span
            class="text-slate-600 group-hover:text-slate-400 text-sm font-bold transition-colors"
          >
            Novo personagem
          </span>
        </div>
      </TransitionGroup>
    </div>

    <!-- ═══ MODAL CRIAR PERSONAGEM ═══ -->
    <Transition name="modal-fade">
      <div
        v-if="mostrarModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        @click.self="mostrarModal = false"
      >
        <div
          class="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-full max-w-md shadow-2xl flex flex-col gap-5"
        >
          <!-- Header do modal -->
          <div class="flex items-start justify-between">
            <div>
              <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">Novo</p>
              <h2 class="text-2xl font-black" style="font-family: Georgia, serif">
                Criar Personagem
              </h2>
            </div>
            <button
              @click="mostrarModal = false"
              class="w-8 h-8 rounded-full border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all mt-1"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M1 1l10 10M11 1l-10 10" />
              </svg>
            </button>
          </div>

          <hr class="border-slate-800" />

          <!-- Campos -->
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs text-slate-400 font-bold uppercase tracking-wide"
                >Nome do Personagem <span class="text-red-600">*</span></label
              >
              <input
                v-model="novoPersonagem.name"
                type="text"
                placeholder="Avarel Dremur"
                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors"
              />
            </div>

            <div class="flex flex-row gap-3">
              <div class="flex flex-col gap-1.5 flex-1">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide"
                  >Classe</label
                >
                <input
                  v-model="novoPersonagem.classe"
                  type="text"
                  placeholder="Mago"
                  class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors"
                />
              </div>
              <!-- <div class="flex flex-col gap-1.5 flex-1">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Raça</label>
                <input
                  v-model="novoPersonagem.raca"
                  type="text"
                  placeholder="Elfo"
                  class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors"
                />
              </div> -->

              <RaceSelector v-model="novoPersonagem.raca"></RaceSelector>
              <div class="flex flex-col gap-1.5 w-20">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide"
                  >Nível</label
                >
                <input
                  v-model="novoPersonagem.nivel"
                  type="number"
                  min="1"
                  max="20"
                  class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors text-center"
                />
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs text-slate-400 font-bold uppercase tracking-wide"
                >Descrição</label
              >
              <textarea
                v-model="novoPersonagem.description"
                rows="2"
                placeholder="Uma breve descrição do personagem..."
                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors resize-none"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <label class="text-xs text-slate-400 font-bold uppercase tracking-wide"
                >URL da Imagem</label
              >
              <input
                v-model="novoPersonagem.imageUrl"
                type="url"
                placeholder="https://..."
                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors"
              />
            </div>
          </div>

          <!-- Ações -->
          <div class="flex gap-3 pt-1">
            <button
              @click="adicionarPersonagem"
              :disabled="!novoPersonagem.name.trim()"
              class="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-2.5 rounded-xl text-sm transition-colors"
            >
              Criar personagem
            </button>
            <button
              @click="mostrarModal = false"
              class="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
  .card-fade-enter-active,
  .card-fade-leave-active {
    transition: all 0.2s ease;
  }
  .card-fade-enter-from,
  .card-fade-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(4px);
  }
  .card-fade-move {
    transition: transform 0.2s ease;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
