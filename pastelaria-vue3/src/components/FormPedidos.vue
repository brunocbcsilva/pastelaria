<template>
  <div class="container card p-0">
			<header class="card-header d-flex" :class="{'drink': form.drink}">
				<div class="col-12 col-md-8">
					<h4>Monte aqui seu cardápio. O que está esperando?</h4>
				</div>
				<div class="col-md-4 d-none d-md-flex justify-content-end">
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
					<!-- bebida / food -->
					<div class="row pt-3 pb-3 d-md-none">
						<div class="col-12 d-flex justify-content-center">
							<div class="switch-box">
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
					</div>
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
								data-testid="input-title"
							/> 
						</div>

						<div class="col-lg-5 pl-lg-0">
							<inputs
								index="taste"
								label="Sabor"
								label-class="col-auto"
								v-model="form.taste"
								type="text"
								placeholder="Qual o sabor?"
								required
								data-testid="input-taste"
							/> 
						</div>

						<div class="col-lg-2 pl-lg-0">
							<div class="inputs">
								<label for="amount" class="col-auto">R$</label>
								<Money3Component
									v-model.number="form.amount"
									v-bind="moneyConfig"
									id="amount"
									class="col"
									required
									data-testid="input-amount"
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

			<footer class="card-footer container-fluid d-flex justify-content-center">
                <button type="button" class="button limpar" @click="resetForm">Limpar</button>
                <button type="button" class="button cadastra" @click="create" :disabled="submitDisabled">Cadastrar</button>
			</footer>
		</div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useMenuStore } from '../store/store';
import Inputs from './Inputs.vue';
import { Money3Component } from 'v-money3';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

const menuStore = useMenuStore();
const fileName = ref('Arraste sua imagem ou clique para localizar a pasta.');
const submitDisabled = ref(true);
const form = ref({
  drink: false,
  title: '',
  taste: '',
  amount: 0,
  description: '',
  file: '',
});
const moneyConfig = {
  decimal: ',',
  thousands: '.',
  prefix: '',
  suffix: '',
  precision: 2,
  masked: false
};

watch(form, (value) => {
  submitDisabled.value = !(value.title && value.taste && value.amount);
}, { deep: true });

function resetForm() {
  fileName.value = 'Arraste sua imagem ou clique para localizar a pasta.';
  submitDisabled.value = true;
  form.value = {
	drink: form.value.drink,
	title: '',
	taste: '',
	amount: 0,
	description: '',
	file: '',
  };
}

function onFileChange(e) {
  let files = e.target.files || e.dataTransfer.files;
  if (!files.length) return;
  fileName.value = files[0]["name"];
  createImage(files[0]);
}

function createImage(file) {
  let reader = new FileReader();
  reader.onload = (e) => {
	form.value.file = e.target.result;
  };
  reader.readAsDataURL(file);
}

function create() {
  menuStore.addMenuItem({ ...form.value });
  let type = form.value.drink ? "Bebida" : "Pastel";
  iziToast.success({ title: 'OK', message: `${type} cadastrado(a) com sucesso.` });
  resetForm();
}
defineExpose({ Money3Component });
</script>

<style lang="scss">
@use "../styles/variables" as *;

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
			padding-bottom: 14px;
			background: $yellow;
			color: $dark-red;
			border-radius: $card-header-radius;
			transition: all 500ms ease;

			@media (min-width: 768px) {
				height: 83px;
				padding-bottom: 0;
			}

			&.drink {
				background: $blue;
				color: $white;
			}

			h4 {
				font: Bold Italic 18px/22px Roboto;
				padding-left: 1rem;

				@media (min-width: 1200px) {
					font: Bold Italic 24px/29px Roboto;
					padding-left: 40px;
				}
			}
		}

		.card-body {
			padding-left: 1rem;
			padding-right: 1rem;
			padding-bottom: 1.5rem;
			box-shadow: $panel-shadow;
			border-radius: $card-body-radius;

			@media (min-width: 768px) {
				transform: translateY(-$translateY);
			}
		}

		.card-footer {
			text-align: center;
			transform: translateY(-$translateY);

			@media (min-width: 768px) {
				transform: translateY(-$translateY * 2);
			}

			.button {
				width: 50%;

				@media (min-width: 992px) {
					width: 200px;
				}
			}
		}
	}

	.switch-box {
		display: block;

		.switch-box-slider {
			position: relative;
			top: 8px;
			display: inline-block;
			height: 8px;
			width: 48px;
			background: #ddd;
			border-radius: 8px;
			cursor: pointer;
			transition: all 0.2s ease;

			@media(min-width: 768px) {
				height: 8px;
				width: 32px;
				background: $white;
			}

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

				@media(min-width: 992px) {

				}
			}
		}

		.switch-box-input {
			display: none;

			&:checked ~ .switch-box-slider:after {
				left: 26px;
				background: #f5554e;

				@media (min-width: 768px) {
					left: 16px;
				}
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
