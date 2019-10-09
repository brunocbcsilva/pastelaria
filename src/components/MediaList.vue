<template>
	<div class="container pb-3">
		<div class="media row">
			<header class="media-header d-flex">
				<div class="col-8 title">{{ title }}</div>
				<div class="col-4 amount d-flex justify-content-end">R$ {{ amount }}</div>
			</header>
			<div class="media-body">
				<div v-if="file != ''" class="media-image" :style="{ backgroundImage: 'url(' + file + ')' }"></div>
				<div v-else class="media-image"></div>
				<p><strong>Sabor:</strong> {{ taste }}</p>
				<p><strong>Descrição:</strong> {{ description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        name: "MediaList",
        props: {
            title: String,
            amount: [String, Number],
            taste: String,
            description: String,
            file: String,
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
