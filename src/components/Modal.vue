<template>
	<transition name="modal">
		<div class="modal-mask">
			<div class="modal-wrapper">
				<div class="modal-container">

					<div class="modal-header">
						<slot name="header">
							default header
						</slot>
					</div>

					<div class="modal-body">
						<slot name="body">
							default body
						</slot>
					</div>

					<div class="modal-footer">
						<slot name="footer">
							default footer
							<button class="modal-default-button" @click="$emit('close')">
								OK
							</button>
						</slot>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
    export default {
        name: "Modal",
    }
</script>

<style lang="scss">
	@import "../styles/variables";

	.modal-mask {
		position: fixed;
		z-index: 9900;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(255, 255, 255, .65);
		display: table;
		transition: opacity 256ms linear;
	}

	.modal-wrapper {
		display: table-cell;
		vertical-align: middle;
	}

	.modal-container {
		width: 50%;
		margin: 0px auto;
		padding: 1rem;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: $panel-shadow;
		transition: all .3s ease;
		font-family: Helvetica, Arial, sans-serif;
	}

	.modal-header h3 {
		margin-top: 0;
		color: #42b983;
	}

	.modal-body {
		margin: 20px 0;
	}

	.modal-default-button {
		float: right;
	}


	.modal-enter-active,
	.modal-leave-active {
		transition: all 256ms cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}

	.modal-enter,
	.modal-leave-to {
		transform: scale(1.1);
		opacity: 0;
	}
</style>