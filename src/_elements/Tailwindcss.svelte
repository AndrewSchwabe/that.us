<style global>
	@import 'tailwindcss/base';
	@import 'tailwindcss/components';
	@import 'tailwindcss/utilities';

	:global(.strike) {
		text-decoration: line-through;
	}

	:global(.prose a) {
		text-decoration: none;
		color: #26529a;
	}

	:global(.prose a:hover) {
		color: #ffffff;
	}

	:global(.lineBreaks) {
		white-space: pre-line;
	}

	:global(.tag-form-input .svelte-tags-input-tag) {
		background: #252f3f;
	}

	:global(.sveltejs-forms .field.error input, .sveltejs-forms .field.error textarea) {
		--text-opacity: 1;
		border: 1px solid rgba(224, 36, 36, var(--text-opacity));
	}
	:global(.sveltejs-forms .field.error .message) {
		margin-top: 0.2rem;
		font-style: italic;
		--text-opacity: 1;
		color: rgba(224, 36, 36, var(--text-opacity));
	}

	:global(select) {
		/* for Firefox */
		-moz-appearance: none;
		/* for Safari, Chrome, Opera */
		-webkit-appearance: none;
	}
</style>
