<template>
  <fragment>
    <div class="container card p-0">
      <div class="card-header d-flex">
        <div class="col-8">
          <h4>Monte aqui seu cardápio. O que está esperando?</h4>
        </div>
        <div class="col-4">dfasdfasdf</div>
      </div>
      <div class="card-body">
        <div class="content">
          <!--
        * titulo
        * sabor
        * valor
        -->
          <div class="row">
            <div class="col-lg-5">
              <div class="inputs">
                <label for="title" class="col-4">Titulo do pedido</label>
                <input type="text" v-model="form.title" id="title" class="col">
              </div>
            </div>
            <div class="col-lg-5 pl-0">
              <div class="inputs">
                <label for="taste" class="col-3">Sabor</label>
                <input type="text" v-model="form.taste" id="taste" class="col">
              </div>
            </div>
            <div class="col-lg-2 pl-0">
              <div class="inputs">
                <label for="amount" class="col-3">R$</label>
                <input type="text" v-model="form.amount" id="amount" class="col">
              </div>
            </div>
          </div>
          <!--
          * descrição
          -->
          <div class="row">
            <div class="col-lg-12">
              <div class="inputs flex-column align-content-start">
                <label for="description" class="pl-3">Descrição</label>
                <textarea v-model="form.description" id="description" rows="3" class="col-12"></textarea>
              </div>
            </div>
          </div>
          <!--
          * file
          -->
          <div class="row">
            <div class="col-lg-12">
              <div class="inputs">
                <input type="file" class="form-control">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <button type="button" class="button limpar">Limpar</button>
        <button type="button" class="button cadastra">Cadastrar</button>
      </div>
    </div>
  </fragment>
</template>

<script>
export default {
  name: "FormPedidos",
  data() {
    return {
      form: {
        title: '',
        taste: '',
        amount: '',
        description: ''
      }
    }
  }
};
</script>

<style lang="scss">
  @import "../styles/variables";

  $translateY: 20px;

  .container {
    position: relative;
    z-index: 100;
  }
  .main {
    position: relative;
    background: #fff;
    z-index: 100;
    box-shadow: 0 0 0 rgba(255,255,255,0.0),
    79px 71px 78px 2px rgba(255,255,255,1),
    -79px 71px 78px 2px rgba(255,255,255,1),
    0px 57px 78px 2px rgba(255,255,255,1);
  }

  .card {
    position: relative;
    background: $white;
    border-radius: 20px 20px 0px 0px;
    margin-top: -12rem;
    margin-bottom: 1rem;

    .card-header {
      padding-top: 18px;
      height: 83px;
      background: $yellow;
      color: $dark-red;
      border-radius: 20px 20px 0px 0px;

      h4 {
        font: Bold Italic 24px/29px Roboto;
        padding-left: 40px;
      }
    }

    .card-body {
      padding-left: 1rem;
      padding-right: 1rem;
      padding-bottom: 1.5rem;
      box-shadow: 0px 0px 30px rgba(116, 11, 11, 0), 0px 30px 30px rgba(116, 11, 11, 0.1), 0px 15px 30px rgba(116, 11, 11, 0.1);
      border-radius: 0px 0px 20px 20px;
      transform: translateY(-$translateY);
    }

    .card-footer {
      text-align: center;
      transform: translateY(-$translateY * 2);
    }
  }

  .inputs {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    min-height: 40px;
    margin-bottom: 1rem;
    background: $white;
    border: 1px solid $dark-red;
    border-radius: 10px;
    padding-right: 0.5rem;

    label {
      display: inline-block;
      vertical-align: middle;
      font-size: 14px;
      color: $dark-red;
      margin: 0;
      line-height: 2.2;
    }

    input,
    textarea {
      border: 1px solid transparent;
    }

    textarea {
      margin-bottom: .5rem;
    }
  }
</style>
