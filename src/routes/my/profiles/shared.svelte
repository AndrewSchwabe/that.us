<script context="module">
	import meQueryApi from '$dataSources/api.that.tech/me/queries';

	export async function load({ fetch }) {
		const { queryMeSharedProfile } = meQueryApi(fetch);

		let sharedProfile = await queryMeSharedProfile();
		return {
			props: {
				sharedProfile
			}
		};
	}
</script>

<script>
	export let sharedProfile;

	import { session } from '$app/stores';
	import lodash from 'lodash';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';
	import { Warning } from '$elements/svgs';

	import SharedProfileForm from './_components/sharedProfileForm.svelte';

	import meMutationsApi from '$dataSources/api.that.tech/me/mutations';

	const { isEmpty } = lodash;
	const { updateSharedProfile } = meMutationsApi();

	async function handleUpdate({ detail: { values, setSubmitting, resetForm } }) {
		setSubmitting(true);
		await updateSharedProfile(values);
		setSubmitting(false);
	}

	const metaTags = ((title = 'My Shared Profile - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: 'Create or update your shared THAT profile.',
			openGraph: {
				type: 'website',
				url: `https://that.us/my/profiles/shared/`
			},
			nofollow: true,
			noindex: true
		})
	}))();
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />

{#if !isEmpty($session.thatProfile)}
	<SharedProfileForm handleSubmit={handleUpdate} {sharedProfile} />
{:else}
	<div class="mt-8">
		<div class="flex items-center">
			<div class="mr-4">
				<Warning classes="h-12 w-12 text-red-500" />
			</div>

			<h2 class="prose-xl text-gray-500">
				Please complete your main profile before trying to create a shared one.
			</h2>
		</div>
	</div>
{/if}
