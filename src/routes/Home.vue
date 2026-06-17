<script setup lang="ts">
  import Header from '../components/Permanent/Header.vue'
  import PosingCard from '../components/Cards/PosingCard.vue'
  import Slider from '@/components/other/slider.vue'
  import decorativeDivisor from '@/components/other/decorativeDivisor.vue'
  import { classesDnD5e } from '@/templates/dndData.ts'
  
  const features = [
    {
      icon: '⚔️',
      titulo: 'Atributos & Perícias',
      descricao: 'Todos os seis atributos com modificadores calculados automaticamente. Testes de Resistência e Perícias em um só lugar.',
    },
    {
      icon: '🛡️',
      titulo: 'Combate Completo',
      descricao: 'CA, Iniciativa, HP máximo, atual e temporário, Dados de Vida e Testes de Morte — tudo ao alcance de um clique.',
    },
    {
      icon: '📜',
      titulo: 'Personalidade & Histórico',
      descricao: 'Traços, Ideais, Vínculos e Fraquezas. Registre a história do seu personagem e evolua com ele.',
    },
    {
      icon: '📜',
      titulo: 'Registro de Sessões',
      descricao: 'Anote os Acontecimentos de cada sessão, NPCS, interações, documentos TUDO!!!!',
    },
    {
      icon: '📜',
      titulo: 'Whiteboard de casos',
      descricao: 'Resolva o mistério que o mestre criou em equipe com um quadro de investigação',
    },
    {
      icon: '📜',
      titulo: 'Comunidade Online',
      descricao: 'Veja as melhores builds para sua classe, os melhores itens, homebrews e tudo mais!',
    },
  ]

  const classes = classesDnD5e
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-white font-sans">
    <!-- ═══ HERO ═══ -->
    <section class="flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden" style="background-position: center;background-image: url(../../public/images/bg-banner-02.png);">
      <!-- Conteúdo hero -->
      <div class="z-10 w-full flex flex-col items-center text-center gap-2">
        <div class="flex w-3/4 justify-center items-center flex-wrap gap-6">
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-red-500 border-red-600/30 border-3 px-4 py-1 rounded-full">
            D&D 5ª Edição
          </span>
                
          <span class="text-xs font-bold tracking-[0.3em] uppercase text-orange-600 border-3 border-orange-600/30 px-4 py-1 rounded-full">
            Pokemon
          </span>

          <span class="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 border-3 border-slate-blue/30 px-4 py-1 rounded-full">
            Ordem Paranormal
          </span>

          <span class="text-xs font-bold tracking-[0.3em] uppercase text-green-600 border-3 border-green-600/30 px-4 py-1 rounded-full">
            Feiticeiros e Maldições
          </span>
        </div>

        <h1 class="text-6xl lg:text-7xl font-black leading-none tracking-tight"
          style="font-family: 'Georgia', serif;">
          Uma Plataforma Aprimorada<br />
          <span class="text-red-600">De Gestão de Fichas</span>
        </h1>

        <p class="text-lg text-slate-400 max-w-xl leading-relaxed">
          Crie e gerencie a ficha do seu personagem de RPG de forma completa.
          Una-se a uma comunidade de RPG, suplementos, Homebrews e Builds da comunidade. 
        </p>

        <div class="flex flex-row gap-4 mt-2 flex-wrap justify-center">
          <a href="/tokens"
            class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm tracking-wide">
            Criar Personagem
          </a>
          <a href="#como-funciona"
            class="border-3 border-blue-600 hover:border-blue-400 text-slate-300 hover:text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm tracking-wide">
            Ver como funciona
          </a>
        </div>

        <!-- Stats decorativos -->
        <div class="flex flex-row gap-8 mt-8 text-center">
          <div>
            <p class="text-3xl font-black text-white" style="font-family: Georgia, serif;">12</p>
            <p class="text-xs text-slate-500 uppercase tracking-wide mt-1">Classes</p>
          </div>
          <div class="w-px bg-slate-700" />
          <div>
            <p class="text-3xl font-black text-white" style="font-family: Georgia, serif;">9</p>
            <p class="text-xs text-slate-500 uppercase tracking-wide mt-1">Raças</p>
          </div>
          <div class="w-px bg-slate-700" />
          <div>
            <p class="text-3xl font-black text-white" style="font-family: Georgia, serif;">∞</p>
            <p class="text-xs text-slate-500 uppercase tracking-wide mt-1">Histórias</p>
          </div>
        </div>
      </div>

      <!-- Seta scroll -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-600">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>

    <!-- ═══ Informations ═══ -->
    <section id="info-section" class="py-24 px-6 bg-slate-950/30 dotBg">
      <div class="w-full flex justify-center items-center">
          <Slider></Slider>
      </div>
    </section>

    <!-- ═══ FEATURES ═══ -->
    <section id="como-funciona" class="py-24 px-6 dotBg bg-slate-950/30">
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">O que está incluído</p>
          <h2 class="text-4xl font-black" style="font-family: Georgia, serif;">
            Tudo que um aventureiro precisa
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="f in features"
            :key="f.titulo"
            class="bg-slate-900 border border-slate-800 hover:border-red-600/50 rounded-2xl p-6 flex flex-col gap-3 transition-colors group"
          >
            <span class="text-3xl">{{ f.icon }}</span>
            <h3 class="text-white font-bold text-lg group-hover:text-red-500 transition-colors">{{ f.titulo }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">{{ f.descricao }}</p>
          </div>
        </div>
      </div>
      
    </section>

    <decorativeDivisor></decorativeDivisor>

    <!-- ═══ CLASSES ═══ -->
    <section class="py-24 px-6">
      <div class="max-w-5xl mx-auto">

        <div class="text-center mb-16">
          <p class="text-red-600 text-xs font-bold tracking-[0.3em] uppercase mb-3">Escolha seu caminho</p>
          <h2 class="text-4xl font-black" style="font-family: Georgia, serif;">
            Qual será o seu personagem?
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div
            v-for="c in classes"
            :key="c.nome"
            class="bg-slate-900 border border-slate-800 hover:border-slate-600 rounded-xl p-4 flex flex-col items-center gap-2 cursor-pointer transition-all hover:-translate-y-1 group"
          >
            <span
              class="text-2xl font-black font-mono group-hover:scale-110 transition-transform"
              :style="{ color: c.cor }"
            >{{ c.dadoVida }}</span>
            <span class="text-slate-300 text-xs font-bold text-center">{{ c.nome }}</span>
          </div>
        </div>

        <p class="text-center text-slate-600 text-xs mt-6">+ todas as outras classes do Player's Handbook</p>
      </div>
    </section>

    <!-- ═══ CTA FINAL ═══ -->
    <section class="py-24 px-6">
      <div class="max-w-2/3 mx-auto">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center text-center gap-6 relative overflow-hidden">

          <!-- Detalhe de canto decorativo -->
          <div class="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-red-600/30 rounded-tl-3xl" />
          <div class="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-red-600/30 rounded-br-3xl" />

          <span class="text-4xl select-none">🎲</span>

          <h2 class="text-4xl font-black leading-tight" style="font-family: Georgia, serif;">
            Pronto para <span class="text-red-600">rolar os dados?</span>
          </h2>

          <p class="text-slate-400 leading-relaxed max-w-md">
            Crie seu herói agora. Escolha sua classe, sua raça, distribua seus atributos
            e escreva o primeiro capítulo da sua história.
          </p>

          <RouterLink to="/ficha"
            class="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black px-10 py-4 rounded-xl transition-colors text-base tracking-wide mt-2">
            Começar agora — é grátis
          </RouterLink>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
  @import url("../styles/patterns.css");

  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 40s linear infinite;
  }
</style>