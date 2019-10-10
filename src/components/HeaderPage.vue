<template>
  <header class="top-page container-fluid" id="header-page">
    <div class="logo"></div>
    <div class="double-pastel"></div>
  </header>
</template>

<script>
export default {
  name: "HeaderPage",
};
</script>

<style lang="scss">
  @import "../styles/_mixins.scss";

  .top-page {
    position: relative;
    background: transparent url("../assets/wave.svg") 0% 0% no-repeat;
    height: 100%;
    padding-top: 2rem;
    max-height: 380px;

    @media(min-width: 1200px) {
      height: 100%;
      padding-top: 61px;
      max-height: 546px;
    }
  }

  .logo {
    background:rgba(255,255,255,0) url("../assets/logo.svg") 0% 0% no-repeat padding-box;
    background-size: contain;
    width: 100%;
    max-width: 736px;
    height: 100%;

    @media(min-width: 1200px) {
      max-height: 263px;
      margin: 0 auto;
      transform: translateX(-8%);
      background:rgba(255,255,255,0) url("../assets/logo.svg") 0% 0% no-repeat padding-box;
    }
  }

  .double-pastel {
    display: none;

    @media (min-width: 1365px) {
      display: block;
      position: absolute;
      top: 38%;
      right: 7%;
      width: 393px - 50px;
      height: 316px - 50px;
      @include bg-retina("../assets/pasteis-img.png", "../assets/pasteis-img@2x.png");
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 5;
    }

    @media (min-width: 1440px) {
      top: 36%;
      right: 18%;
      width: 393px;
      height: 316px;
    }
  }
</style>
