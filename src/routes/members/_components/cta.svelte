<script>
	export let profile;
	export let isFollowing = false;

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';

	import { CTA } from '$elements';
	import { Standard as StandardButton } from '$elements/buttons';
	import { Standard as StandardLink } from '$elements/links';

	const dispatch = createEventDispatcher();

	$: handle = `@${profile.profileSlug}`;
</script>

<CTA>
	<h2
		class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900
    sm:text-4xl sm:leading-10"
	>
		Don't miss another opportunity to collaborate.
		<br />

		<span class="text-that-orange">Follow {handle} Today</span>
	</h2>

	<span slot="actionPrimary">
		{#if $session.isAuthenticated}
			<StandardButton class="h-3/4" on:click={() => dispatch('TOGGLE_FOLLOW')}>
				{#if isFollowing}Un-Follow{:else}Follow{/if}
				{handle}
			</StandardButton>
		{:else}
			<StandardLink class="h-3/4" href="/login/">Login and Follow Today</StandardLink>
		{/if}
	</span>
</CTA>
