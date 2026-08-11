
<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue';

    interface sliderItem{
        alt: string,
        url: string,
    }

    const currentIndex = ref<number>(0);
    const itemsList: Array<sliderItem> = [
        {
            alt: 'Exemplo 1',
            url: '/images/patchImages/patch-displayImage-01-v0.0.1.png',
        },
        {
            alt: 'Exemplo 2',
            url: '/images/patchImages/patch-displayImage-01-v0.0.2.png',
        }
    ];

    function next() {
        if (currentIndex.value < itemsList.length - 1) {
            currentIndex.value++;
        } else {
            currentIndex.value = 0;
        }
    }

    function prev() {
        if (currentIndex.value > 0) {
            currentIndex.value--;
        } else {
            currentIndex.value = itemsList.length - 1;
        }
    }

    let intervalId: number | undefined;
    onMounted(() => {
        intervalId = window.setInterval(next, 16000);
    });
    onUnmounted(() => {
        if (intervalId) window.clearInterval(intervalId);
    });

    function goTo(index: number) {
        currentIndex.value = index;
    }
</script>

<template>
    <div class="carousel w-2/3 h-full p-4 bg-slate-900 rounded-xl">
        <div class="viewport">
            <img :src="itemsList[currentIndex]?.url" :alt="itemsList[currentIndex]?.alt" class="slide" />
        </div>


        <div class="indicators flex flex-col justify-center items-center gap-6 gap-x-6 p-5 w-full">
            <div class="flex flex-row gap-2 p-2 w-full">
                <div class="w-1/3 flex justify-start">
                    <button class="nav nav-left text-white bg-slate-600 p-7" @click="prev" aria-label="Previous">‹</button>
                </div>
                <div class="flex flex-row gap-2 p-2 w-1/3 justify-center items-center">
                    <button
                        v-for="(it, i) in itemsList"
                        :key="i"
                        :class="['dot', { active: i === currentIndex } ]"
                        @click="goTo(i)"
                        :aria-label="`Go to slide ${i + 1}`"
                    ></button>
                </div>
                <div class="w-1/3 flex justify-end">
                    <button class="nav nav-right text-white bg-slate-600 border-b-4 border-slate-100 p-7" @click="next" aria-label="Next">›</button>
                </div>
            </div>    
        </div>
    </div>
</template>

<style scoped>
    .animation{
        transform: 1s ;
    }
    .carousel{
        position: relative;
        margin: 0 auto;
        display: flex;
        align-items: center;
        gap: 8px;
        animation: normal 2s;
    }
    .viewport{
    flex: 1 1 auto;
    overflow: hidden;
    display:flex;
    justify-content:center;
    align-items:center;
    }
    .slide{
    width: 100%;
    height: auto;
    object-fit: contain;
    border-radius: 6px;
    }
    .nav{
        border: none;
        font-size: 20px;
        cursor: pointer;
        border-radius: 4px;
    }
    .nav:active{ transform: scale(0.98)}
    .indicators{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 8px;
    display:flex;
    gap:8px;
    }
    .dot{
    width:15px;
    height:15px;
    border-radius:50%;
    background: rgba(255,255,255,0.5);
    border: none;
    cursor:pointer;
    }
    .dot.active{ background: white; }
</style>
