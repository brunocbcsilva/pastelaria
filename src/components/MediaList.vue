<template>
	<transition-group name="card-item" tag="div" class="container">
		<div class="media row mb-4 card-item" v-for="(i, idx) in list" :key="idx">
			<header class="media-header d-flex" :class="{'drink': i.drink}">
				<div class="col-8 title">{{ i.title }}</div>
				<div class="col-4 amount d-flex justify-content-end">R$ {{ i.amount }}</div>
			</header>
			<div class="media-body">
				<div v-if="i.file != ''" class="media-image" :style="{ backgroundImage: 'url(' + i.file + ')' }"></div>
				<div v-else class="media-image"></div>
				<p><strong>Sabor:</strong> {{ i.taste }}</p>
				<p><strong>Descrição:</strong> {{ i.description }}</p>
			</div>
		</div>
	</transition-group>
</template>

<script>
    export default {
        name: "MediaList",
        props: {
            list: Array
        },
        data() {
          return {
              noImg: "../assets/no-image.png"
          }
        }
    };
</script>


<style scoped lang="scss">
	@import "../styles/variables";
	@import "../styles/mixins";

	.card-item {
		transition: all 0.5s;

	}
	.card-item-enter, .card-item-leave-to
		/* .card-item-leave-active for <2.1.8 */ {
		opacity: 0;
		transform: scale(0);
	}
	.card-item-enter-to {
		opacity: 1;
		transform: scale(1);
	}

	.card-item-leave-active {
		/*position: absolute;*/
	}

	.card-item-move {
		opacity: 1;
		transition: all 0.5s;
	}

	.media {
		position: relative;
		box-shadow: 0 0 30px rgba($white, .19);
		border-radius: 1.5rem;
		background: $white;
		padding-left: 4rem;

		.media-image {
			overflow: hidden;
			position: absolute;
			top: 0;
			left: 0;
			background: #f9f9f9 url("../assets/no-image.png") center center no-repeat;
			background-size: contain;
			border: 1px solid #f2f2f2;
			border-radius: 1rem;
			box-shadow: -10px 10px 30px 0px rgba(116, 11, 11, 0.1);
			@include square(180px);
			transform: translate(-4rem, -3rem);
		}

		.media-header {
			width: 100%;
			background: $red;
			border-radius: $card-header-radius;
			padding: 1.15rem 1rem 1.15rem 10rem;

			&.drink {
				background: #3dcaff;

				.title {
					color: $white;
				}
			}

			%font-header {
				letter-spacing: 0;
				font-size: 30px;
				line-height: 37px;
				font-weight: bold;
				font-style: italic;
			}

			.title {
				@extend %font-header;
				color: $yellow;
			}

			.amount {
				@extend %font-header;
				color: $white;
			}
		}

		.media-body {
			position: relative;
			width: 100%;
			box-shadow: $panel-shadow;
			border-radius: $card-body-radius;
			padding: 1.25rem 1rem 1.25rem 10rem;

			strong {
				font-style: italic;
			}

			p {
				letter-spacing: 0;
				font-size: 24px;
				line-height: 32px;
				color: $dark-red;
			}
		}
	}
</style>
