
<script setup lang="ts">
    import { ref } from 'vue';
    const xp = ref(0)
    
</script>
<template>
            
            <div class="flex flex-col gap-1 min-w-28">
            <label class="text-gray-400 text-xs font-bold uppercase tracking-wide"
                >Experiência (XP)</label
            >
            <input
                v-model="xp"
                type="number"
                min="0"
                class="text-white rounded-xl bg-slate-800 p-2 border border-slate-700 focus:border-red-600 outline-none"
            />
            </div>

</template>