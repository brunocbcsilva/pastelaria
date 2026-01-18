<template>
	<div class="inputs">
		<label
				:for="index"
				:class="labelClass || 'col'"
		>
			{{ label }}
		</label>
		<input
				v-bind="$attrs"
				:value="value"
				:id="index"
				:class="inputClass || 'col'"
				@input="$emit('input', $event.target.value)"
		>
	</div>
</template>

<script setup>
defineOptions({ inheritAttrs: false });
const props = defineProps({
  label: String,
  index: [String, Number],
  labelClass: String,
  inputClass: String,
  value: [String, Number]
});
</script>

<style lang="scss">
@use "../styles/variables" as *;

	.inputs {
		display: flex;
		flex-wrap: wrap;
		align-content: center;
		min-height: 40px;
		margin-bottom: 1rem;
		background: $white;
		border: 1px solid $dark-red;
		border-radius: 10px;
		padding: .35rem .25rem;

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