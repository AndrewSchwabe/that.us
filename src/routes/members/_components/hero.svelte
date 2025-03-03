<script>
	export let member;
	export let isFollowing = false;

	import { session } from '$app/stores';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import dayjs from 'dayjs';

	import config from '$utils/config';

	import { Tag } from '$elements';
	import Header from '$elements/layouts/profile/_Header.svelte';
	import { Standard as StandardButton } from '$elements/buttons';
	import { SocialLink } from '$components/social';

	const dispatch = createEventDispatcher();

	const imageCrop = '?mask=ellipse&w=500&h=500&fit=crop';

	$: userProfileImage = member.profileImage
		? `${member.profileImage}${imageCrop}`
		: config.defaultProfileImage;
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="lg:grid lg:grid-cols-12 lg:gap-8 mb-24">
		<div class="max-w-2xl mx-auto flex flex-col items-center space-y-8 lg:col-span-3">
			<div>
				<img
					class="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
					src={userProfileImage}
					alt={`${member.firstName} ${member.lastName}`}
				/>
			</div>
			<div>
				<div class="flex justify-center space-x-2">
					{#each member.profileLinks as link}
						<SocialLink href={link.url} network={link.linkType} />
					{/each}
				</div>
			</div>
		</div>
		<div class="mt-12 lg:mt-0 lg:col-start-4 lg:col-span-9">
			<div class="flex flex-col space-y-8">
				<div class="flex items-center justify-between">
					<div>
						<Header subtitle="Member Spotlight">
							{`${member.firstName} ${member.lastName}`}
						</Header>
						<h3 class="font-bold tracking-tight text-gray-500">
							{`${member.jobTitle}, ${member.company}`}
						</h3>
						<h3 class="tracking-tight text-gray-500">
							Member Since
							{dayjs(member.createdAt).format('MMMM, YYYY')}
						</h3>
					</div>

					<div class="flex justify-end space-x-4">
						{#if $session.isAuthenticated}
							<StandardButton class="h-3/4" on:click={() => dispatch('TOGGLE_FOLLOW')}>
								{#if !isFollowing}Follow{:else}Un-Follow{/if}
							</StandardButton>
						{/if}
					</div>
				</div>

				<div class="leading-8 text-lg font-medium text-gray-900">
					<p class="prose prose-xl lineBreaks">{member.bio}</p>
				</div>

				<div class="flex flex-wrap justify-center items-center space-x-4">
					{#if member.interests}
						{#each member.interests as interest, i (i)}
							<div in:fade={{ delay: i * 100 }}>
								<Tag>{interest}</Tag>
							</div>
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
