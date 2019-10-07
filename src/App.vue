/* eslint-disable */
<template>
    <div id="app">
        <div class="blur-pastel"></div>
        <header-page />
        <form-pedidos />
        <!--<router-view/>-->
    </div>
</template>

<script>
    import HeaderPage from "./components/HeaderPage";
    import FormPedidos from "./components/FormPedidos";

    export default {
        name: "app",
        components: {
            HeaderPage,
            FormPedidos,
        }
    };
</script>

<style lang="scss">
    @import "./styles/_mixins.scss";

    .blur-pastel {
        display: none;

        @media( min-width: 1366px ) {
            display: block;
            position: absolute;
            top: 26%;
            left: 0;
            z-index: 110;
            width: 555px - 280px;
            height: 555px - 280px;
            background: transparent url('./assets/pastel-paralax.png');
            background-size: cover;
            opacity: 1;
            filter: blur(5px);
        }

        @media( min-width: 1680px ) {
            top: 8%;
            left: 3%;
            z-index: 110;
            width: 555px;
            height: 555px;
        }
    }
</style>