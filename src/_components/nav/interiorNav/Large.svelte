<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import Icon from 'svelte-awesome';
	import { plus } from '$components/svelte-awesome-icons';

	import { Activity, Cart } from '$elements/svgs';
	import { hasNotifications } from '$stores/notificationCenter';

	import ActivitySlideOver from '../../activityCenter/ActivitySlideOver.svelte';
	import DesktopLink from './_DesktopLink.svelte';
	import UserProfile from '../_UserProfile.svelte';
	import { clickOutside } from '$elements/actions';

	let activityVisible;
	let helpVisible;

	function handleCloseActivityCenter(event) {
		activityVisible = !activityVisible;
	}

	const { state } = getContext('cart');

	$: cartItems = Object.keys($state.context.cart).length;
</script>

<div class="relative flex items-center">
	<div class="flex-shrink-0">
		<a href="/">
			<img class="h-10" src="/images/THAT-Full-Wide-White.svg" alt="THAT Logo" />
		</a>
	</div>

	<div class="hidden lg:block">
		<div class="ml-8 flex items-baseline">
			<a
				href="/events/"
				open
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Events</DesktopLink>
			</a>

			<a
				href="/activities/"
				open
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Activities</DesktopLink>
			</a>

			<a
				href="/members/"
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Members</DesktopLink>
			</a>

			<a
				href="/communities/"
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Communities</DesktopLink>
			</a>

			<a
				href="/partners/"
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Partners</DesktopLink>
			</a>

			<a
				href="/blog/"
				class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
          hover:text-white hover:bg-that-blue focus:outline-none
          focus:text-white focus:bg-that-blue"
			>
				<DesktopLink>Blog</DesktopLink>
			</a>

			<div>
				<button
					href="/help/"
					class="ml-1 px-3 py-2 rounded-md text-sm font-medium text-gray-300
            hover:text-white hover:bg-that-blue focus:outline-none
            focus:text-white focus:bg-that-blue"
					on:click|preventDefault={() => (helpVisible = !helpVisible)}
				>
					<DesktopLink>Help</DesktopLink>
				</button>
				{#if helpVisible}
					<div use:clickOutside on:click_outside={() => (helpVisible = false)}>
						<div class="absolute mt-2 ml-4 w-64 rounded-md shadow-lg z-50" in:fade>
							<div class="py-1 rounded-md bg-white ring-1 ring-black ring-opacity-5">
								<a href="/support/" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
									Getting Started
								</a>
								<a
									href="/support/what-is-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									What Is An Activity
								</a>
								<a
									href="/support/joining-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									How To Join An Activity
								</a>
								<a
									href="/support/creating-an-activity/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									How To Create An Activity
								</a>
								<a
									href="/support/staying-up-to-date/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									Staying Up To Date
								</a>
								<a
									href="/support/faq/"
									class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
								>
									FAQ
								</a>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<div class="hidden lg:block">
	<div class="ml-4 flex items-center justify-center md:ml-6">
		{#if $hasNotifications}
			<button
        class="max-w-xs h-10 w-10 rounded-full text-white duration-150 ease-in-out hover:bg-thatBlue-500"
				class:shadow-solid={activityVisible}
				class:bg-thatBlue-500={activityVisible}
				aria-label="Notifications"
				on:click|preventDefault={() => (activityVisible = !activityVisible)}
			>
				<div
					class="transition duration-500 ease-in-out transform hover:scale-105 flex justify-center"
				>
					<Activity />
				</div>
			</button>

			{#if activityVisible}
				<ActivitySlideOver
					on:click={handleCloseActivityCenter}
					on:clicked-outside={handleCloseActivityCenter}
				/>
			{/if}
		{/if}

		{#if true}
			<div class="relative inline-block">
				<div class="ml-4 p-1 rounded-full text-white hover:bg-thatBlue-500">
					<a href="/orders/summary/">
						<Cart />

						{#if cartItems > 0}
							<span class="animate-pulse absolute bottom-0 right-0 block">
								<span
									class="inline-flex items-center justify-center h-4 w-4 rounded-full bg-gray-500"
								>
									<span class="text-xs font-medium leading-none text-white">{cartItems}</span>
								</span>
							</span>
						{/if}
					</a>
				</div>
			</div>
		{/if}

		<div class="ml-4 p-1 rounded-full text-white hover:bg-thatBlue-500">
			<a href="/activities/create/">
				<Icon data={plus} class="h-8 w-8" />
			</a>
		</div>

		<div class="ml-4 rounded-full text-white hover:bg-thatBlue-500">
			<UserProfile />
		</div>
	</div>
</div>
