<script setup lang="ts">
    import { ref, computed } from 'vue'

    interface Magia {
        id: number
        nome: string
        nivel: number // 0 = Truque
        escola: string
        imageUrl: string
    }

    const escolasCores: Record<string, string> = {
    'Abjuração':     '#3B82F6',
    'Conjuração':    '#8B5CF6',
    'Adivinhação':   '#06B6D4',
    'Encantamento':  '#EC4899',
    'Evocação':      '#EF4444',
    'Ilusão':        '#A78BFA',
    'Necromancia':   '#10B981',
    'Transmutação':  '#F59E0B',
    }

    const magias = ref<Magia[]>([
    { id: 1, nome: 'Bola de Fogo',      nivel: 3, escola: 'Evocação',    imageUrl: 'https://worldbuilderblog.wordpress.com/wp-content/uploads/2014/07/screen-shot-2014-07-17-at-6-14-30-am.png' },
    { id: 2, nome: 'Míssil Mágico',     nivel: 1, escola: 'Evocação',    imageUrl: 'https://placehold.co/400x560/1e293b/ef4444?text=Míssil+Mágico' },
    { id: 3, nome: 'Invisibilidade',    nivel: 2, escola: 'Ilusão',      imageUrl: 'https://placehold.co/400x560/1e293b/a78bfa?text=Invisibilidade' },
    { id: 4, nome: 'Mão Arcana',        nivel: 5, escola: 'Evocação',    imageUrl: 'https://placehold.co/400x560/1e293b/ef4444?text=Mão+Arcana' },
    { id: 5, nome: 'Luz',               nivel: 0, escola: 'Evocação',    imageUrl: 'https://placehold.co/400x560/1e293b/ef4444?text=Luz' },
    { id: 6, nome: 'Sono',              nivel: 1, escola: 'Encantamento', imageUrl: 'https://placehold.co/400x560/1e293b/ec4899?text=Sono' },
    { id: 7, nome: 'Névoa Espessa',     nivel: 2, escola: 'Conjuração',  imageUrl: 'https://placehold.co/400x560/1e293b/8b5cf6?text=Névoa+Espessa' },
    { id: 8, nome: 'Dissipar Magia',    nivel: 3, escola: 'Abjuração',   imageUrl: 'https://placehold.co/400x560/1e293b/3b82f6?text=Dissipar+Magia' },
    { id: 8, nome: 'Dissipar Magia',    nivel: 4, escola: 'Abjuração',   imageUrl: 'https://placehold.co/400x560/1e293b/3b82f6?text=Dissipar+Magia' },
    { id: 8, nome: 'Dissipar Magia',    nivel: 7, escola: 'Abjuração',   imageUrl: 'https://placehold.co/400x560/1e293b/3b82f6?text=Dissipar+Magia' },
    ])

    const nivelSelecionado = ref<number | null>(null)

    const niveisDisponiveis = computed(() => {
    const set = new Set(magias.value.map(m => m.nivel))
    return Array.from(set).sort((a, b) => a - b)
    })

    const magiasFiltradas = computed(() =>
    nivelSelecionado.value === null
        ? magias.value
        : magias.value.filter(m => m.nivel === nivelSelecionado.value)
    )

    function labelNivel(n: number) {
    return n === 0 ? 'Truque' : `${n}º Círculo`
    }

    // Modal
    const magiaAberta = ref<Magia | null>(null)
    function abrirModal(m: Magia) { magiaAberta.value = m }
    function fecharModal() { magiaAberta.value = null }

    // Upload / adicionar magia
    const novaUrl   = ref('')
    const novoNome  = ref('')
    const novoNivel = ref(1)
    const novaEscola = ref('Evocação')
    const mostrarForm = ref(false)
    let proximoId = magias.value.length + 1

    function adicionarMagia() {
    if (!novaUrl.value.trim() || !novoNome.value.trim()) return
    magias.value.push({
        id: proximoId++,
        nome: novoNome.value.trim(),
        nivel: novoNivel.value,
        escola: novaEscola.value,
        imageUrl: novaUrl.value.trim(),
    })
    novaUrl.value = ''
    novoNome.value = ''
    novoNivel.value = 1
    novaEscola.value = 'Evocação'
    mostrarForm.value = false
    }

    function removerMagia(id: number) {
    magias.value = magias.value.filter(m => m.id !== id)
    if (magiaAberta.value?.id === id) fecharModal()
    }
</script>

<template>
    <div class="min-h-screen bg-slate-950 text-white">
        <!-- ═══ TOPO ═══ -->
        <div class="max-w-7xl mx-auto px-6 pt-10 pb-4 flex flex-col gap-6">

        <!-- Título + botão adicionar -->
        <div class="flex items-end justify-between gap-4 flex-wrap">
            <div>
            <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">Grimório</p>
            <h1 class="text-4xl font-black leading-none" style="font-family: Georgia, serif;">
                Magias do <span class="text-red-600">Personagem</span>
            </h1>
            </div>
            <button
            @click="mostrarForm = !mostrarForm"
            class="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M8 2v12M2 8h12"/>
            </svg>
            Adicionar Magia
            </button>
        </div>

        <!-- Formulário de adição -->
        <Transition name="slide-down">
            <div v-if="mostrarForm" class="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex flex-wrap gap-3 items-end">
            <div class="flex flex-col gap-1 flex-1 min-w-40">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Nome da Magia</label>
                <input v-model="novoNome" type="text" placeholder="Bola de Fogo"
                class="text-white rounded-xl bg-slate-800 border border-slate-600 focus:border-red-600 outline-none p-2 text-sm" />
            </div>
            <div class="flex flex-col gap-1 min-w-36">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">URL da Imagem</label>
                <input v-model="novaUrl" type="url" placeholder="https://..."
                class="text-white rounded-xl bg-slate-800 border border-slate-600 focus:border-red-600 outline-none p-2 text-sm" />
            </div>
            <div class="flex flex-col gap-1 w-32">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Nível</label>
                <select v-model="novoNivel"
                class="text-white rounded-xl bg-slate-800 border border-slate-600 focus:border-red-600 outline-none p-2 text-sm">
                <option :value="0">Truque</option>
                <option v-for="n in 9" :key="n" :value="n">{{ n }}º Círculo</option>
                </select>
            </div>
            <div class="flex flex-col gap-1 w-36">
                <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Escola</label>
                <select v-model="novaEscola"
                class="text-white rounded-xl bg-slate-800 border border-slate-600 focus:border-red-600 outline-none p-2 text-sm">
                <option v-for="e in Object.keys(escolasCores)" :key="e" :value="e">{{ e }}</option>
                </select>
            </div>
            <button @click="adicionarMagia"
                class="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors h-fit">
                Salvar
            </button>
            <button @click="mostrarForm = false"
                class="border border-slate-600 hover:border-slate-400 text-slate-400 hover:text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors h-fit">
                Cancelar
            </button>
            </div>
        </Transition>

        <!-- ═══ FILTROS POR NÍVEL ═══ -->
        <div class="flex flex-row gap-2 flex-wrap">
            <button
            @click="nivelSelecionado = null"
            :class="[
                'px-4 py-1.5 rounded-lg text-sm font-bold transition-colors border',
                nivelSelecionado === null
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            ]"
            >Todos</button>
            <button
            v-for="n in niveisDisponiveis"
            :key="n"
            @click="nivelSelecionado = n"
            :class="[
                'px-4 py-1.5 rounded-lg text-sm font-bold transition-colors border',
                nivelSelecionado === n
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'
            ]"
            >{{ labelNivel(n) }}</button>
        </div>

        <!-- Contador -->
        <p class="text-slate-500 text-xs">
            {{ magiasFiltradas.length }} magia{{ magiasFiltradas.length !== 1 ? 's' : '' }}
            {{ nivelSelecionado !== null ? `— ${labelNivel(nivelSelecionado)}` : 'no total' }}
        </p>
        </div>

        <!-- ═══ GALERIA DE CARDS ═══ -->
        <div class="max-w-7xl mx-auto px-6 pb-16">
        <TransitionGroup
            name="grid-fade"
            tag="div"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
        >
            <div
            v-for="magia in magiasFiltradas"
            :key="magia.id"
            class="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 bg-slate-900 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40"
            @click="abrirModal(magia)"
            >
            <!-- Imagem da magia -->
            <div class="aspect-[5/7] overflow-hidden bg-slate-800">
                <img
                :src="magia.imageUrl"
                :alt="magia.nome"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <!-- Overlay inferior com informações -->
            <div class="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1"
                style="background: linear-gradient(to top, rgba(2,6,23,0.97) 60%, transparent);">

                <!-- Badge escola -->
                <span
                class="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded w-fit"
                :style="{
                    color: escolasCores[magia.escola] ?? '#94a3b8',
                    backgroundColor: (escolasCores[magia.escola] ?? '#94a3b8') + '22',
                    border: `1px solid ${(escolasCores[magia.escola] ?? '#94a3b8')}44`
                }"
                >{{ magia.escola }}</span>

                <p class="text-white font-bold text-sm leading-tight">{{ magia.nome }}</p>
                <p class="text-slate-400 text-xs">{{ labelNivel(magia.nivel) }}</p>
            </div>

            <!-- Botão remover (aparece no hover) -->
            <button
                @click.stop="removerMagia(magia.id)"
                class="absolute top-2 right-2 w-7 h-7 rounded-full bg-slate-950/80 border border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                title="Remover magia"
            >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 2l8 8M10 2l-8 8"/>
                </svg>
            </button>
            </div>
        </TransitionGroup>

        <!-- Estado vazio -->
        <div v-if="magiasFiltradas.length === 0"
            class="flex flex-col items-center justify-center py-32 gap-4 text-center">
            <span class="text-5xl select-none">📖</span>
            <p class="text-slate-400 font-bold text-lg">Nenhuma magia encontrada</p>
            <p class="text-slate-600 text-sm max-w-xs">
            {{ nivelSelecionado !== null ? 'Tente outro filtro de nível ou adicione magias deste círculo.' : 'Adicione sua primeira magia usando o botão acima.' }}
            </p>
        </div>
        </div>

        <!-- ═══ MODAL DE LEITURA ═══ -->
        <Transition name="modal-fade">
        <div
            v-if="magiaAberta"
            class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            @click.self="fecharModal"
        >
            <div class="relative bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row shadow-2xl max-w-4xl w-full">

            <!-- Imagem principal -->
            <div class="md:w-[380px] shrink-0 bg-slate-950 flex items-center justify-center overflow-hidden">
                <img
                :src="magiaAberta.imageUrl"
                :alt="magiaAberta.nome"
                class="w-full h-full object-contain max-h-[60vh] md:max-h-[92vh]"
                />
            </div>

            <!-- Painel de informações -->
            <div class="flex flex-col gap-4 p-6 flex-1 overflow-y-auto">

                <!-- Escola badge -->
                <span
                class="text-xs font-black uppercase tracking-widest px-2 py-1 rounded w-fit"
                :style="{
                    color: escolasCores[magiaAberta.escola] ?? '#94a3b8',
                    backgroundColor: (escolasCores[magiaAberta.escola] ?? '#94a3b8') + '22',
                    border: `1px solid ${(escolasCores[magiaAberta.escola] ?? '#94a3b8')}55`
                }"
                >{{ magiaAberta.escola }}</span>

                <div>
                <h2 class="text-3xl font-black leading-tight" style="font-family: Georgia, serif;">
                    {{ magiaAberta.nome }}
                </h2>
                <p class="text-slate-400 text-sm mt-1">{{ labelNivel(magiaAberta.nivel) }}</p>
                </div>

                <hr class="border-slate-700" />

                <p class="text-slate-400 text-sm leading-relaxed">
                Consulte a imagem ao lado para ver o texto completo da magia diretamente do livro.
                </p>

                <!-- Ações -->
                <div class="flex flex-col gap-2 mt-auto pt-4">
                <button
                    @click="removerMagia(magiaAberta!.id)"
                    class="border border-red-600/40 hover:border-red-600 text-red-500 hover:text-red-400 font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                >
                    Remover esta magia
                </button>
                <button
                    @click="fecharModal"
                    class="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-bold px-4 py-2 rounded-xl text-sm transition-colors"
                >
                    Fechar
                </button>
                </div>
            </div>

            <!-- Fechar no canto -->
            <button
                @click="fecharModal"
                class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 flex items-center justify-center transition-all"
            >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 2l10 10M12 2l-10 10"/>
                </svg>
            </button>
            </div>
        </div>
        </Transition>
    </div>
</template>

<style scoped>
    .slide-down-enter-active,
    .slide-down-leave-active {
    transition: all 0.25s ease;
    }
    .slide-down-enter-from,
    .slide-down-leave-to {
    opacity: 0;
    transform: translateY(-8px);
    }

    .modal-fade-enter-active,
    .modal-fade-leave-active {
    transition: opacity 0.2s ease;
    }
    .modal-fade-enter-from,
    .modal-fade-leave-to {
    opacity: 0;
    }

    .grid-fade-enter-active,
    .grid-fade-leave-active {
    transition: all 0.2s ease;
    }
    .grid-fade-enter-from,
    .grid-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
    }
    .grid-fade-move {
    transition: transform 0.2s ease;
    }
</style>