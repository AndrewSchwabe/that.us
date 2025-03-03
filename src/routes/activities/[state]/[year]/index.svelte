<script context="module">
	export async function load({ stuff }) {
		return {
			props: {
				event: stuff.event
			}
		};
	}
</script>

<script>
	export let event;

	import { useMachine } from 'xstate-svelte';
	import SvelteInfiniteScroll from 'svelte-infinite-scroll';

	import seoMetaTags from '$utils/seo/metaTags';
	import { debug } from '$utils/config';

	import Seo from '$components/Seo.svelte';
	import CardLoader from '$components/CardLoader.svelte';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';
	import ActivityList from '$components/activities/List.svelte';

	import { Waiting } from '$elements';
	import { Chevron } from '$elements/svgs';

	import createMachine from '../../_machines/event';

	const { sessions } = event;
	let scrollThreshold = 1200;

	const { state, send } = useMachine(
		createMachine({
			items: sessions.sessions.filter((s) => s),
			cursor: sessions.cursor,
			eventSlug: event.slug
		}),
		{
			devTools: debug.xstate
		}
	);

	const metaTags = ((title = `${event.name} Activities - THAT`) => ({
		title,
		tags: seoMetaTags({
			title,
			description: `Activities for ${event.name}.`,
			openGraph: {
				type: 'website',
				url: `https://that.us/activities/${event.slug}`
			}
		})
	}))();

	function handleLoadMore() {
		send('NEXT');
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

<ScrollThreshold bind:scrollThreshold />

<div>
	{#if ['init'].some($state.matches)}
		<CardLoader />
	{:else}
		<ActivityList activities={$state.context.items} />

		<SvelteInfiniteScroll window threshold={scrollThreshold} on:loadMore={handleLoadMore} />
	{/if}

	{#if $state.context.items > 0}
		{#if ['loaded'].some($state.matches)}
			<div class="mt-12 text-gray-400 flex flex-col items-center">
				scroll for more <Chevron />
			</div>
		{/if}
	{/if}

	{#if ['loadingNext', 'loadedAll'].some($state.matches)}
		<div class="flex flex-grow justify-center py-12">
			<Waiting />
		</div>
	{/if}
</div>
