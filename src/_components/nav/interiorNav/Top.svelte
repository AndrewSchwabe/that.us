<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import MobileNav from './Mobile.svelte';
	import LargeNav from './Large.svelte';

	const mobileVisible = writable(false);
	setContext('IS_Mobile_VIEW', mobileVisible);
</script>

<nav>
	<div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
		<div class="border-b border-thatBlue-400 border-opacity-25">
			<div class="flex items-center justify-between pb-6 px-4 sm:px-0">
				<LargeNav />

				<div class="-mr-2 flex lg:hidden">
					<!-- Mobile menu button -->
					<button
						class="inline-flex items-center justify-center p-2 rounded-md
							text-gray-300 hover:text-white hover:bg-that-blue
							focus:outline-none focus:text-white focus:bg-that-blue"
						on:click|preventDefault={() => mobileVisible.set(!$mobileVisible)}
					>
						<!-- Menu open: "hidden", Menu closed: "block" -->
						<svg class="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
						<!-- Menu open: "block", Menu closed: "hidden" -->
						<svg class="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	</div>
	<MobileNav />
</nav>
