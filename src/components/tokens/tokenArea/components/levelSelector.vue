<script setup lang="ts">
    import { ref } from 'vue';

    const nivel = ref(1)
</script>

<template>
    <div class="flex flex-col gap-1 w-16">
        <label class="text-gray-400 text-xs font-bold uppercase tracking-wide">Nível</label>
        <input
        v-model="nivel"
        type="number"
        min="1"
        max="20"
        class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none text-center"
        />
    </div>
</template>
