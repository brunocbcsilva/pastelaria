<template>
	<fragment>
		<div class="container card p-0">
			<header class="card-header d-flex">
				<div class="col-8">
					<h4>Monte aqui seu cardápio. O que está esperando?</h4>
				</div>
				<div class="col-4 d-flex justify-content-end">
					<div class="switch-box pr-3">
						<label for="default" class="label-l">Comida</label>
						<input
								id="default"
								class="switch-box-input"
								type="checkbox"
								v-model="form.drink"
						/>
						<label for="default" class="switch-box-slider"></label>
						<label for="default" class="label-r">Bebida</label>
					</div>
				</div>
			</header>
			<div class="card-body">
				<div class="content">
					<!--
							* titulo
							* sabor
							* valor
							-->
					<div class="row">
						<div class="col-lg-5">
							<inputs
									index="title"
									label="Titulo do pedido"
									label-class="col-auto"
									v-model="form.title"
									type="text"
									placeholder="Qual o titulo do seu pedido?"
									required
							/>
						</div>
						<div class="col-lg-5 pl-0">
							<inputs
									index="taste"
									label="Sabor"
									label-class="col-auto"
									v-model="form.taste"
									type="text"
									placeholder="Qual o sabor?"
									required
							/>
						</div>
						<div class="col-lg-2 pl-0">
							<div class="inputs">
								<label for="amount" class="col-auto">R$</label>
								<money
										v-model="form.amount"
										v-bind="moneyConfig"
										id="amount"
										class="col"
										required
								/>
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
								<textarea
										v-model="form.description"
										id="description"
										rows="3"
										class="col-12"
								>
								</textarea>
							</div>
						</div>
					</div>
					<!--
					* file
					-->
					<div class="row">
						<div class="col-lg-12">
							<div class="inputs">
								<input type="file" class="col" @change="onFileChange($event)">
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<button type="button" class="button limpar">Limpar</button>
				<button type="button" class="button cadastra" @click="create">Cadastrar</button>
			</footer>
		</div>
	</fragment>
</template>

<script>
    import Inputs from "./Inputs";
    import { Money } from 'v-money'

    export default {
        name: "FormPedidos",
        components: {
            Inputs,
	        Money
        },
        data() {
            return {
                form: {
                    drink: false,
                    title: 'Ajeita o PPT',
                    taste: 'Arrumar PPT com 1966 Slides',
                    amount: 39.99,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
	                file: '',
                },

                moneyConfig: {
                    decimal: ',',
                    thousands: '.',
                    prefix: '',
                    suffix: '',
                    precision: 2,
                    masked: false
                }
            }
        },
	    methods: {
            create() {
              this.$store.dispatch('addStorage', { form: this.form })
            },

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },

            createImage(file) {
                let image = new Image();
                let reader = new FileReader();
                let vm = this;

                reader.onload = (e) => {
                    vm.form.file = e.target.result;
                };
                reader.readAsDataURL(file);
            },

            removeImage: function () {
                this.form.file = '';
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
		box-shadow: 0 0 0 rgba(255, 255, 255, 0.0),
		79px 71px 78px 2px rgba(255, 255, 255, 1),
		-79px 71px 78px 2px rgba(255, 255, 255, 1),
		0px 57px 78px 2px rgba(255, 255, 255, 1);
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

	.switch-box {
		display: block;

		.switch-box-slider {
			position: relative;
			top: 8px;
			display: inline-block;
			height: 8px;
			width: 32px;
			background: $white;
			border-radius: 8px;
			cursor: pointer;
			transition: all 0.2s ease;

			&:after {
				position: absolute;
				left: -8px;
				top: -8px;
				display: block;
				width: 24px;
				height: 24px;
				border-radius: 50%;
				background: $red;
				box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
				content: '';
				transition: all 0.2s ease;
			}
		}

		.switch-box-input {
			display: none;

			&:checked ~ .switch-box-slider:after {
				left: 16px;
				background: #f5554e;
			}
		}
	}

	.label-l {
		margin-right:15px;
		margin-bottom: 0;
	}
	.label-r {
		margin-left:15px;
		margin-bottom: 0;
	}
</style>
