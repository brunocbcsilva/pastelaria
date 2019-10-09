/* eslint-disable */
<template>
    <div id="app">
        <div id="parallax-target">
            <div class="blur-pastel" data-depth="0.2"></div>
        </div>
        <header-page/>
        <form-pedidos/>

        <media-list :list="menuList" />
        <!--<router-view/>-->
    </div>
</template>

<script>
    import HeaderPage from "./components/HeaderPage";
    import FormPedidos from "./components/FormPedidos";
    import MediaList from "./components/MediaList";

    import Parallax from "parallax-js"

    export default {
        name: "app",
        components: {
            HeaderPage,
            FormPedidos,
            MediaList,
        },
        data() {
            return {
                menuList: []
            }
        },
        mounted() {
            let parallaxTarget = document.getElementById('parallax-target');
            let parallaxScene = new Parallax(parallaxTarget);
            this.$store.dispatch('initMenu');
            this.getMenuList();
        },
        methods: {
            getMenuList() {
                return (this.menuList = this.$store.state.menuList);
            }
        }
    };
</script>

<style lang="scss">
    @mixin square($value) {
        width: $value;
        height: $value;
    }

    @mixin location($pos: absolute, $top: 0, $left: 0) {
        position: $pos;
        top: $top;
        left: $left;
    }

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
</style>