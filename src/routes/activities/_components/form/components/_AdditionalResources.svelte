<script context="module">
	import * as yup from 'yup';

	const schema = yup.object().shape({
		name: yup.string().trim().required('Please add a title for this resource.'),
		url: yup.string().url().required('Please add a url for this resource.'),
		description: yup.string().trim()
	});
</script>

<script>
	export let setField;
	export let initialData;

	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';
	import { Input, Form } from 'sveltejs-forms';

	import { Shell as ShellButton } from '$elements/buttons';

	let items =
		initialData?.supportingArtifacts?.map((i) => ({
			id: uuidv4(),
			name: i.name,
			url: i.url,
			description: i.description
		})) || [];

	$: addText = items.length > 0 ? 'Add Another' : 'Add';

	function isPopulated(str) {
		return str.length > 0;
	}

	function updateField() {
		setField(
			'supportingArtifacts',
			items.map((i) => ({
				name: i.name,
				url: i.url,
				description: i.description
			}))
		);
	}

	function handleSubmit({ detail: { values, resetForm } }) {
		const { name, url, description } = values;
		const item = {
			id: uuidv4(),
			name: name.trim(),
			url,
			description: description.trim()
		};

		items = [...items, item];

		updateField();

		resetForm();
		document.querySelector('#additionalResourcesNameInput').focus();
	}

	function removeItem(id) {
		items = items.filter((item) => item.id !== id);
		updateField();
	}

	function showBackground(i) {
		const result = i % 2;
		return result != 0;
	}

	onMount(() => {
		updateField();
	});
</script>

<div>
	<Form {schema} validateOnBlur={false} validateOnChange={false} on:submit={handleSubmit}>
		<div class="w-full space-y-4">
			<div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
				<div class="flex-grow">
					<Input
						name="name"
						type="text"
						id="additionalResourcesNameInput"
						spellcheck="true"
						placeholder="E.g. Title of this resource"
						class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
					/>
				</div>
				<div class="flex-grow">
					<Input
						name="url"
						type="url"
						placeholder="E.g. URL to resource"
						class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
					/>
				</div>
			</div>

			<div class="space-y-2">
				<div>
					<Input
						name="description"
						type="textarea"
						multiline={true}
						rows="3"
						spellcheck="true"
						placeholder="E.g. Brief description"
						class="form-input w-full sm:text-sm sm:leading-5 hover:border-gray-700"
					/>
				</div>

				<div class="flex justify-end">
					<ShellButton>
						<button class="w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium" type="submit">
							{addText}
						</button>
					</ShellButton>
				</div>
			</div>
		</div>
	</Form>

	<div>
		<ul class="flex flex-col">
			{#each items as item, i (item.id)}
				<li class="pt-4">
					<div class="flex space-x-4 items-center">
						<div class="flex-grow p-2 rounded-md" class:bg-gray-50={showBackground(i)}>
							<a open href={item.url}>
								<p>{item.name}</p>
								<p class="mt-1 text-sm text-gray-400">{item.description}</p>
							</a>
						</div>

						<div class="flex-none">
							<ShellButton>
								<button
									on:click={() => removeItem(item.id)}
									class="w-full px-8 md:px-10 py-1 text-sm leading-5 font-medium "
								>
									Remove
								</button>
							</ShellButton>
						</div>
					</div>
				</li>
			{/each}
		</ul>
	</div>
</div>
