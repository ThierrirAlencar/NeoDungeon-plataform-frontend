<script setup lang="ts">
    import { ref, computed } from 'vue'

    interface Anotacao {
        id: number
        titulo: string
        sessao: number // Número da sessão (Filtro principal)
        categoria: string // Ex: NPC, Lore, Combate, Missão
        resumo: string
        conteudoCompleto: string
        imageUrl?: string // Opcional, para anexar pistas/mapas
    }

    const categoriasCores: Record<string, string> = {
        'Lore':        '#3B82F6', // Azul
        'NPC':         '#8B5CF6', // Roxo
        'Missão':      '#F59E0B', // Âmbar
        'Combate':     '#EF4444', // Vermelho
        'Pista/Item':  '#10B981', // Esmeralda
        'Outros':      '#64748B', // Slate
    }

    const anotacoes = ref<Anotacao[]>([
        { 
            id: 1, 
            titulo: 'O Encontro na Taverna', 
            sessao: 1, 
            categoria: 'NPC', 
            resumo: 'Conhecemos Elidon, o bardo caolho que nos deu o mapa das Minas de Phandelver.',
            conteudoCompleto: 'Na taverna do Gato Caolho, fomos abordados por Elidon. Ele parecia nervoso e nos entregou um pergaminho antigo em troca de proteção contra capangas locais. O mapa revela uma entrada secreta pelas colinas do norte.',
            imageUrl: 'https://placehold.co/600x400/1e293b/8b5cf6?text=Elidon+o+Bardo'
        },
        { 
            id: 2, 
            titulo: 'Emboscada dos Goblins', 
            sessao: 1, 
            categoria: 'Combate', 
            resumo: 'Quatro goblins atacaram a carroça na Estrada Alta. Conseguimos interrogar um deles.',
            conteudoCompleto: 'O combate durou 3 turnos. O guerreiro segurou a linha de frente enquanto o mago finalizou dois com Mísseis Mágicos. O sobrevivente revelou que respondem a um chefe chamado Klarg, escondido em uma caverna próxima.',
            imageUrl: 'https://placehold.co/600x400/1e293b/ef4444?text=Emboscada+Goblin'
        },
        { 
            id: 3, 
            titulo: 'A Profecia de Alaundo', 
            sessao: 2, 
            categoria: 'Lore', 
            resumo: 'Inscrições rúnicas nas paredes do templo antigo mencionando o retorno do Dragão.',
            conteudoCompleto: 'Traduzimos as runas usando Compreender Idiomas. O texto diz: "Quando as três luas se alinharem no solstício, o devorador de cinzas despertará de seu túmulo de pedra." Precisamos investigar o calendário local.' 
        },
        { 
            id: 4, 
            titulo: 'Resgatar o Ferreiro', 
            sessao: 2, 
            categoria: 'Missão', 
            resumo: 'Gundren foi levado para o Castelo de Asa de Corvo. Objetivo prioritário.',
            conteudoCompleto: 'Encontramos as botas de Gundren perto do rio. As pegadas seguem para o noroeste em direção ao ninho dos orcs. Se ele morrer, não receberemos a recompensa pelas minas.' 
        },
        { 
            id: 5, 
            titulo: 'O Amuleto de Obsidiana', 
            sessao: 3, 
            categoria: 'Pista/Item', 
            resumo: 'Recuperado do corpo do xamã. Irradia uma leve aura de necromancia.',
            conteudoCompleto: 'Um amuleto negro frio ao toque. O mago identificou que ele absorve energia vital residual de criaturas caídas recentemente. Guardado no inventário do Ladino.',
            imageUrl: 'https://placehold.co/600x400/1e293b/10b981?text=Amuleto+Negro'
        }
    ])

    const sessaoSelecionada = ref<number | null>(null)

    // Computa as sessões existentes para gerar os botões de filtro automaticamente
    const sessoesDisponiveis = computed(() => {
        const set = new Set(anotacoes.value.map(a => a.sessao))
        return Array.from(set).sort((a, b) => a - b)
    })

    // Filtra as anotações pela sessão clicada
    const anotacoesFiltradas = computed(() =>
        sessaoSelecionada.value === null
            ? anotacoes.value
            : anotacoes.value.filter(a => a.sessao === sessaoSelecionada.value)
    )

    // Formata o texto do filtro de sessão
    function labelSessao(s: number) {
        return `Sessão ${s < 10 ? '0' : ''}${s}`
    }

    // Modal de Leitura de Anotação
    const anotacaoAberta = ref<Anotacao | null>(null)
    function abrirModal(a: Anotacao) { anotacaoAberta.value = a }
    function fecharModal() { anotacaoAberta.value = null }

    // Formulário para Nova Anotação
    const mostrarForm = ref(false)
    const novoTitulo = ref('')
    const novaSessao = ref(1)
    const novaCategoria = ref('Lore')
    const novoResumo = ref('')
    const novoConteudo = ref('')
    const novaUrl = ref('')
    let proximoId = anotacoes.value.length + 1

    function adicionarAnotacao() {
        if (!novoTitulo.value.trim() || !novoConteudo.value.trim()) return
        
        anotacoes.value.push({
            id: proximoId++,
            titulo: novoTitulo.value.trim(),
            sessao: novaSessao.value,
            categoria: novaCategoria.value,
            resumo: novoResumo.value.trim() || 'Sem resumo disponível.',
            conteudoCompleto: novoConteudo.value.trim(),
            imageUrl: novaUrl.value.trim() || undefined
        })

        // Reset do formulário
        novoTitulo.value = ''
        novoResumo.value = ''
        novoConteudo.value = ''
        novaUrl.value = ''
        mostrarForm.value = false
    }

    function removerAnotacao(id: number) {
        anotacoes.value = anotacoes.value.filter(a => a.id !== id)
        if (anotacaoAberta.value?.id === id) fecharModal()
    }

</script>

<template>
    <div class="min-h-screen bg-slate-950 text-white font-sans selection:bg-red-600/30">
        <!-- ═══ TOPO DA PÁGINA ═══ -->
        <div class="max-w-7xl mx-auto px-6 pt-10 pb-4 flex flex-col gap-6">
            
            <div class="flex items-end justify-between gap-4 flex-wrap">
                <div>
                    <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-1">Diário de Campanha</p>
                    <h1 class="text-4xl font-black leading-none" style="font-family: Georgia, serif;">
                        Anotações de <span class="text-red-600">Sessão</span>
                    </h1>
                </div>
                <button
                    @click="mostrarForm = !mostrarForm"
                    class="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm shadow-lg shadow-red-900/20"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.5">
                        <path d="M8 2v12M2 8h12"/>
                    </svg>
                    Nova Anotação
                </button>
            </div>

            <!-- FORMULÁRIO EXPANSÍVEL (Adicionar Anotação) -->
            <Transition name="slide-down">
                <div v-if="mostrarForm" class="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col gap-4 shadow-xl">
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div class="flex flex-col gap-1 sm:col-span-2">
                            <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Título da Anotação</label>
                            <input v-model="novoTitulo" type="text" placeholder="Ex: Investigação no Castelo"
                                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors" />
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Sessão</label>
                            <input v-model.number="novaSessao" type="number" min="1"
                                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors" />
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="flex flex-col gap-1">
                            <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Categoria / Tag</label>
                            <select v-model="novaCategoria"
                                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors">
                                <option v-for="cat in Object.keys(categoriasCores)" :key="cat" :value="cat">{{ cat }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col gap-1">
                            <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">URL de Imagem, Mapa ou Pista (Opcional)</label>
                            <input v-model="novaUrl" type="url" placeholder="https://..."
                                class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors" />
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Resumo Rápido (Aparece no Card)</label>
                        <input v-model="novoResumo" type="text" placeholder="Resuma em poucas palavras para bater o olho no grid..."
                            class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors" />
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="text-xs text-slate-400 font-bold uppercase tracking-wide">Relato Completo</label>
                        <textarea v-model="novoConteudo" rows="4" placeholder="Descreva tudo o que aconteceu em detalhes..."
                            class="text-white rounded-xl bg-slate-800 border border-slate-700 focus:border-red-600 outline-none p-2.5 text-sm transition-colors resize-none"></textarea>
                    </div>

                    <div class="flex justify-end gap-2 pt-2 border-t border-slate-800">
                        <button @click="mostrarForm = false"
                            class="border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
                            Cancelar
                        </button>
                        <button @click="adicionarAnotacao"
                            class="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-xl text-sm transition-colors">
                            Salvar Relato
                        </button>
                    </div>
                </div>
            </Transition>

            <!-- ═══ FILTROS POR SESSÃO ═══ -->
            <div class="flex flex-row gap-2 flex-wrap items-center">
                <button
                    @click="sessaoSelecionada = null"
                    :class="[
                        'px-4 py-1.5 rounded-lg text-sm font-bold transition-colors border',
                        sessaoSelecionada === null
                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-900/20'
                        : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-900'
                    ]"
                >Todas as Sessões</button>
                <button
                    v-for="s in sessoesDisponiveis"
                    :key="s"
                    @click="sessaoSelecionada = s"
                    :class="[
                        'px-4 py-1.5 rounded-lg text-sm font-bold transition-colors border',
                        sessaoSelecionada === s
                        ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-900/20'
                        : 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-600 bg-slate-900'
                    ]"
                >{{ labelSessao(s) }}</button>
            </div>

            <!-- CONTADOR -->
            <p class="text-slate-500 text-xs tracking-wide">
                Exibindo {{ anotacoesFiltradas.length }} anotação{{ anotacoesFiltradas.length !== 1 ? 'es' : '' }}
                {{ sessaoSelecionada !== null ? `da ${labelSessao(sessaoSelecionada)}` : 'no diário inteiro' }}
            </p>
        </div>

        <!-- ═══ GRID DE ANOTAÇÕES (CARDS) ═══ -->
        <div class="max-w-7xl mx-auto px-6 pb-16">
            <TransitionGroup
                name="grid-fade"
                tag="div"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
                <div
                    v-for="anotacao in anotacoesFiltradas"
                    :key="anotacao.id"
                    class="group relative flex flex-col justify-between rounded-2xl border border-slate-900 hover:border-slate-700 bg-slate-900/50 p-5 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/60 min-h-[160px]"
                    @click="abrirModal(anotacao)"
                >
                    <div class="flex flex-col gap-2">
                        <!-- Header do Card: Tag + Sessão -->
                        <div class="flex items-center justify-between gap-2">
                            <span
                                class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded w-fit"
                                :style="{
                                    color: categoriasCores[anotacao.categoria] ?? '#64748b',
                                    backgroundColor: (categoriasCores[anotacao.categoria] ?? '#64748b') + '15',
                                    border: `1px solid ${(categoriasCores[anotacao.categoria] ?? '#64748b')}33`
                                }"
                            >{{ anotacao.categoria }}</span>
                            <span class="text-xs text-slate-500 font-bold font-mono">{{ labelSessao(anotacao.sessao) }}</span>
                        </div>

                        <!-- Título e Resumo -->
                        <h3 class="text-white font-bold text-base group-hover:text-red-500 transition-colors leading-tight pt-1">
                            {{ anotacao.titulo }}
                        </h3>
                        <p class="text-slate-400 text-xs line-clamp-3 leading-relaxed">
                            {{ anotacao.resumo }}
                        </p>
                    </div>

                    <!-- Rodapé do card indicando anexo ou dica -->
                    <div class="flex items-center justify-between pt-3 mt-4 border-t border-slate-800/60 text-[11px] text-slate-500 font-medium">
                        <span>Clique para ler mais</span>
                        <span v-if="anotacao.imageUrl" title="Possui imagem ou pista anexada">🖼️ Mídia</span>
                    </div>

                    <!-- Botão Deletar (Aparece no Hover) -->
                    <button
                        @click.stop="removerAnotacao(anotacao.id)"
                        class="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-500 hover:border-red-500/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg"
                        title="Remover anotação"
                    >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 2l8 8M10 2l-8 8"/>
                        </svg>
                    </button>
                </div>
            </TransitionGroup>

            <!-- ESTADO VAZIO -->
            <div v-if="anotacoesFiltradas.length === 0"
                class="flex flex-col items-center justify-center py-32 gap-4 text-center">
                <span class="text-5xl select-none">✒️</span>
                <p class="text-slate-400 font-bold text-lg">Nenhum registro encontrado</p>
                <p class="text-slate-600 text-sm max-w-xs">
                    {{ sessaoSelecionada !== null ? 'Nenhum registro inserido nesta sessão específica ainda.' : 'O diário de bordo está limpo. Comece a narrar os feitos do grupo!' }}
                </p>
            </div>
        </div>

        <!-- ═══ MODAL DE LEITURA COMPLETA ═══ -->
        <Transition name="modal-fade">
            <div
                v-if="anotacaoAberta"
                class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
                @click.self="fecharModal"
            >
                <div class="relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden max-h-[92vh] flex flex-col md:flex-row shadow-2xl max-w-4xl w-full">
                    
                    <!-- Imagem Anexada lateral (Apenas se existir) -->
                    <div v-if="anotacaoAberta.imageUrl" class="md:w-[380px] shrink-0 bg-slate-950 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-slate-800">
                        <img
                            :src="anotacaoAberta.imageUrl"
                            :alt="anotacaoAberta.titulo"
                            class="w-full h-full object-cover max-h-[40vh] md:max-h-[92vh]"
                        />
                    </div>

                    <!-- Corpo das informações -->
                    <div class="flex flex-col p-6 flex-1 overflow-y-auto max-h-[60vh] md:max-h-[92vh]">
                        <div class="flex items-center gap-3 mb-2">
                            <span
                                class="text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded w-fit"
                                :style="{
                                    color: categoriasCores[anotacaoAberta.categoria] ?? '#64748b',
                                    backgroundColor: (categoriasCores[anotacaoAberta.categoria] ?? '#64748b') + '22',
                                    border: `1px solid ${(categoriasCores[anotacaoAberta.categoria] ?? '#64748b')}55`
                                }"
                            >{{ anotacaoAberta.categoria }}</span>
                            <span class="text-sm font-mono text-slate-500 font-bold">{{ labelSessao(anotacaoAberta.sessao) }}</span>
                        </div>

                        <div class="mb-4">
                            <h2 class="text-3xl font-black leading-tight text-white" style="font-family: Georgia, serif;">
                                {{ anotacaoAberta.titulo }}
                            </h2>
                            <p class="text-red-500/90 italic text-xs mt-1 font-medium">« Resumo: {{ anotacaoAberta.resumo }} »</p>
                        </div>

                        <hr class="border-slate-800 mb-4" />

                        <!-- Conteúdo Principal Extenso -->
                        <div class="text-slate-300 text-sm leading-relaxed space-y-3 whitespace-pre-wrap font-serif">
                            {{ anotacaoAberta.conteudoCompleto }}
                        </div>

                        <!-- Botões de Ação Inferiores -->
                        <div class="flex gap-2 mt-8 pt-4 border-t border-slate-800/80">
                            <button
                                @click="removerAnotacao(anotacaoAberta!.id)"
                                class="border border-red-900/40 hover:border-red-600 text-red-500 hover:text-red-400 font-bold px-4 py-2 rounded-xl text-xs transition-colors"
                            >
                                Deletar Registro
                            </button>
                            <button
                                @click="fecharModal"
                                class="ml-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-6 py-2 rounded-xl text-xs transition-colors"
                            >
                                Fechar Leitura
                            </button>
                        </div>
                    </div>

                    <!-- Botão de X no canto para fechar rápido -->
                    <button
                        @click="fecharModal"
                        class="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-950/80 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all shadow-md"
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
    /* Animação de entrada do formulário */
    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: all 0.25s ease-out;
    }
    .slide-down-enter-from,
    .slide-down-leave-to {
        opacity: 0;
        transform: translateY(-10px);
    }

    /* Animação do Modal */
    .modal-fade-enter-active,
    .modal-fade-leave-active {
        transition: opacity 0.2s ease;
    }
    .modal-fade-enter-from,
    .modal-fade-leave-to {
        opacity: 0;
    }

    /* Animação dos Cards no Grid Filtros/Adições */
    .grid-fade-enter-active,
    .grid-fade-leave-active {
        transition: all 0.25s ease;
    }
    .grid-fade-enter-from,
    .grid-fade-leave-to {
        opacity: 0;
        transform: scale(0.96);
    }
    .grid-fade-move {
        transition: transform 0.2s ease;
    }
</style>