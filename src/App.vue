<template>
<!-- eslint-disable -->
    <div id="app">
        <div id="parallax-target">
            <div class="blur-pastel" data-depth="0.2"></div>
        </div>

        <header-page></header-page>

        <form-pedidos></form-pedidos>

        <div v-show="menuList.length" class="container pb-3">
            <h4 class="text-center">Filtros</h4>
            <div class="row justify-content-center">
                <button type="button" class="button cadastra" @click="filtered = 'all'" :disabled="filtered == 'all'">Todos</button>
                <button type="button" class="button limpar mr-3 ml-3" @click="filtered = 'food'" :disabled="filtered == 'food'">Pasteis</button>
                <button type="button" class="button bebidas" @click="filtered = 'drink'" :disabled="filtered == 'drink'">Bebidas</button>
            </div>
        </div>

        <media-list v-if="filteredItem.length" :list="filteredItem"/>

        <div v-else class="container card-empty">Não há registros.</div>

        <!--<router-view/>-->
    </div>
</template>

<script>
/* eslint-disable */
    import HeaderPage from "./components/HeaderPage";
    import FormPedidos from "./components/FormPedidos";
    import MediaList from "./components/MediaList";

    import Parallax from "parallax-js"

    const filter = {
        all: list => list,
        food: list => {
            return list.filter( item => !item.drink )
        },
        drink: list => {
            return list.filter( item => item.drink )
        },
    }

    export default {
        name: "app",
        components: {
            HeaderPage,
            FormPedidos,
            MediaList,
        },
        data() {
            return {
                menuList: [],
                filtered: 'all'
            }
        },
        computed: {
            filteredItem() {
                return filter[this.filtered](this.menuList)
            }
        },
        mounted() {
            let parallaxTarget = document.getElementById('parallax-target');

            new Parallax(parallaxTarget);
            this.fetchMenuList();
        },
        methods: {
            async fetchMenuList() {
                let list = await this.$store.dispatch('storageFetch') || [];
                this.$store.commit('SET_MENU_LIST', {
                    list: list
                });

                await this.$store.dispatch('storageSave', {
                    obj: list
                });

                this.menuList = this.$store.state.menuList;
            }
        }
    };
</script>

<style lang="scss">
    @import "./styles/variables";
    @import "./styles/mixins";

    #parallax-target {
        display: none;

        @media(min-width: 1200px) {
            @include square(320px);
            @include location(absolute, 14%, 0%);
            display: block;
            z-index: 110;
            border-radius: 50%;
            overflow: hidden;
        }

        @media(min-width: 1400px) {
            @include square(400px);
            @include location(absolute, 6%, 0%);
        }

        @media(min-width: 1680px) {
            @include square(588px);
            @include location(absolute, 3%, 3%);
        }
    }

    .blur-pastel {
        width: 100%;
        height: 100%;
        background: transparent url('./assets/pastel-paralax.png') left top no-repeat;
        background-size: cover;
        filter: blur(5px);
    }

    .card-empty {
        background: $white;
        box-shadow: $panel-shadow;
        border: 1px solid rgba(0, 0, 0, .075);
        border-radius: 1.25rem;
        padding: 2rem 1rem;
        margin-top: 1rem;
        margin-bottom: 3.25rem;
        text-align: center;
        font-size: 26px;
        line-height: 32px;
    }
</style>