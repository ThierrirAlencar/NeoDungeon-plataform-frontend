
<script setup lang="ts">
    import TileStyledAnchor from "../buttons/anchors/TileStyledAnchor.vue"
</script>

<template>
    <footer class="bg-slate-950 flex justify-center flex-col items-center gap-0.5 border-t p-2 border-slate-700">
        <div class="flex flex-row w-full">
            <div class="w-1/2 flex flex-col p-2 justify-start items-start">
                <p class="text-slate-600 text-xs">Produto Desenvolvido Pela Sytem91 todos os direitos de uso aos respectivos donos das propriedades intelectuais aqui mencionadas. O código é de uso livre para aqueles que quiserem contribuir</p>
                <a class="text-slate-600 text-xs mt-4" href="https://github.com/thierriralencar">@Thierrir Alencar</a>
                <div class="flex flex-row w-full justify-center items-center">
                    <a class="pi pi-github text-slate-600 text-2xl cursor-pointer p-3"></a>
                    <a class="pi pi-instagram text-slate-600 text-2xl cursor-pointer p-3"></a>
                    <a class="pi pi-twitter text-slate-600 text-2xl cursor-pointer p-3"></a>
                </div>
                <p class="text-slate-600 text-xs">
                todo o código aqui contido opera sobre a <a href="https://opensource.org/license/mit" class=" underline text-slate-400">licensa do MIT</a>
                </p>
            </div>
            <div class="flex justify-center p-2 items-center flex-col gap-3 w-1/2">
                <p class="text-slate-600 text-xs">
                    Dungeons & Dragons é uma marca registrada da Wizards of the Coast LLC.
                    <br>Ordem Paranormal é um produto da Jambô Editora e seus respectivos criadores, todos os direitos reservados.
                    <br>Para demais produtos não licensiados os determinados creditos a criadores e desenvolvedores de RPG de mesa serão mencionados em suas respectivas páginas.
                    <br>Este é um projeto de fã, sem fins comerciais ou lucrativos.
                </p>
                <hr>
                <div class="text-white text-xs flex flex-row gap-10">
                    <a href="https://jamboeditora.com.br/categoria/ordem-paranormal-2/">Compre Ordem Paranormal</a>
                    <a href="https://www.dungeonsanddragons.com/">Compre Dungeons And Dragons</a>
                </div>
            </div>
        </div>
        <hr>
        <p class="text-slate-600 mt-10 text-xs">neoDungeon is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</p>
    </footer>
</template>

