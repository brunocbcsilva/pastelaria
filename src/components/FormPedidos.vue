<template>
<!-- eslint-disable -->
	<fragment>
		<div class="container card p-0">
			<header class="card-header d-flex" :class="{'drink': form.drink}">
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

			<section class="card-body">
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
										v-model.number="form.amount"
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
										v-model.trim="form.description"
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
								<div class="file-drop-area">
									<span class="fake-btn"></span>
									<span class="file-msg">{{ fileName }}</span>
									<input class="file-input" type="file" @change="onFileChange($event)">
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<footer class="card-footer">
				<button type="button" class="button limpar" @click="resetForm">Limpar</button>
				<button type="button" class="button cadastra" @click="create" :disabled="submitDisabled">Cadastrar</button>
			</footer>
		</div>
	</fragment>
</template>

<script>
/* eslint-disable */
    import Inputs from "./Inputs";
    import {Money} from "v-money";

    export default {
        name: "FormPedidos",
        components: {
            Inputs,
            Money
        },
        data() {
            return {
                fileName: 'Arraste sua imagem ou clique para localizar a pasta.',
				submitDisabled: true,
                form: {
                    drink: false,
                    title: '',
                    taste: '',
                    amount: 0,
                    description: '',
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
		watch: {
        	form: {
				handler: function(value) {
					if(value.title && value.taste && value.amount) {
						return ( this.submitDisabled = false);
					}
				},
				deep: true
			}
		},
        methods: {
            resetForm() {
                this.fileName = 'Arraste sua imagem ou clique para localizar a pasta.';
				this.submitDisabled = true;
                this.form = {
                    drink: this.form.drink,
                    title: '',
                    taste: '',
                    amount: 0,
                    description: '',
                    file: '',
                };
            },

            async create() {
                this.$store.commit('ADD_MENU_LIST', {
                    list: this.form
                });

                let type = this.form.drink ? "Bebida" : "Pastel";
                let create = await this.$store.dispatch('createItem');

                if(! create) {
                    this.$toast.error("Algo de errado aconteceu.", "Oh! Não");
                    return;
                }

                this.$toast.success(`${type} cadastrado(a) com sucesso.`, "OK");
                this.resetForm();
            },

            onFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;

                if (!files.length)
                    return;

                this.fileName = files[0]["name"];
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
			border-radius: $card-header-radius;
			transition: all 500ms ease;

			&.drink {
				background: $blue;
				color: $white;
			}

			h4 {
				font: Bold Italic 24px/29px Roboto;
				padding-left: 40px;
			}
		}

		.card-body {
			padding-left: 1rem;
			padding-right: 1rem;
			padding-bottom: 1.5rem;
			box-shadow: $panel-shadow;
			border-radius: $card-body-radius;
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
		margin-right: 15px;
		margin-bottom: 0;
	}

	.label-r {
		margin-left: 15px;
		margin-bottom: 0;
	}

	.file-drop-area {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		padding: 25px;
		border: 1px dashed rgba(0, 0, 255, 0);
		/*border-radius: 3px;
		transition: 0.2s;*/
		/*&.is-active {
			background-color: rgba(255, 255, 255, 0.05);
		}*/
	}

	.fake-btn {
		flex-shrink: 0;
		width: 48px;
		height: 48px;
		background: transparent url("../assets/upload-image.svg") center center;
	}

	.file-msg {
		font-size: 16px;
		font-weight: 400;
		line-height: 21px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: $dark-red;
	}

	.file-input {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
		cursor: pointer;
		opacity: 0;
		&:focus {
			outline: none;
		}
	}
</style>
