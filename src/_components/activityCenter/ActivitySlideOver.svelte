<script>
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate'; // todo we will need this when we really start to clear and add stuff to the list better.
	import Icon from 'svelte-awesome';
	import { externalLink } from '$components/svelte-awesome-icons';

	import { Activity } from '$elements/svgs';
	import SlideOver from '$elements/overlays/BasicSlideOver.svelte';

	import { messages } from '$stores/notificationCenter';

	function handleClear() {
		messages.set([]);
	}
</script>

<SlideOver title="Recent Activities" on:click on:clicked-outside>
	<div class="flex items-center justify-center space-x-2" slot="header">
		<span class="text-thatOrange-400">
			<Activity delay={750} />
		</span>
		<h2 class="text-lg leading-7 font-medium text-gray-900">Activity Center</h2>
	</div>

	<div>
		<ul class="grid grid-cols-1 gap-4">
			{#each $messages as m, i (i)}
				<li
					animate:flip
					in:fade={{ delay: i * 500, duration: 250 }}
					class="rounded-lg shadow-lg hover:bg-thatBlue-100
            hover:text-thatBlue-500"
				>
					<a href={m.url}>
						<div class="grid grid-cols-5 gap-4 cursor-pointer">
							<div class="col-span-4 p-4">
								<p>{m.message}</p>
							</div>
							<div class="flex flex-col items-center justify-center">
								<Icon data={externalLink} class="h-8 w-8" />
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<div slot="panelActions">
		<button
			type="button"
			class="py-2 px-4 border border-gray-300 rounded-md text-sm leading-5
        font-medium text-gray-700 hover:text-gray-500 focus:outline-none
        focus:border-blue-300 focus:ring-blue active:bg-gray-50
        active:text-gray-800 transition duration-150 ease-in-out"
			on:click={handleClear}
		>
			Clear
		</button>
	</div>
</SlideOver>
