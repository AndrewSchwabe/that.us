<script>
	export let activities = [];

	import { fade } from 'svelte/transition';
	import lodash from 'lodash';

	import { FeaturedActivity, FeaturedActivityAdd } from '$elements/activities';
</script>

<section class="py-12 lg:py-16 bg-thatBlue-700">
	<div class="relative mx-auto px-4 max-w-screen-xl sm:px-6 lg:px-8">
		<div class="space-y-12">
			<div class="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
				<h2 class="text-3xl leading-9 font-extrabold text-white tracking-tight sm:text-4xl">
					Upcoming Activities
				</h2>
				<p class="text-xl leading-7 text-gray-300">
					Check out these activities currently on the schedule.
					<span class="pl:2 text-that-orange hover:text-thatOrange-500">
						<a href="/activities/"> View all of the upcoming activities. </a>
					</span>
				</p>
			</div>

			<ul class="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:grid-cols-3 lg:gap-8">
				{#if activities.length > 0}
					{#each activities as s (s.id)}
						<li in:fade>
							<FeaturedActivity {...lodash.pick(s, ['id', 'title', 'speakers', 'startTime'])} />
						</li>
					{/each}
				{/if}

				{#if activities.length < 6}
					<li class="h-full w-full" in:fade>
						<FeaturedActivityAdd />
					</li>
				{/if}
			</ul>

			<div class="flex justify-end">
				<!-- <button
					on:click={() => send('NEXT')}
					class="px-8 py-2 rounded-md shadow text-base leading-6
                    bg-that-blue  
                    text-white
                    hover:bg-thatBlue-400
                    focus:bg-thatBlue-400 
                    focus:text-white 
                    focus:outline-none
                    focus:ring-thatBlue-500 
                    focus:border-thatBlue-800 
                    transition duration-150 ease-in-out md:text-lg md:px-10"
				>
					<span>View Next</span>
				</button> -->

				<!-- {#if ['loadedAll'].some($state.matches)}
					<button
						on:click={() => send('REFRESH')}
						class="px-8 py-2 rounded-md shadow text-base leading-6
                      bg-that-blue  
                      text-white
                      hover:bg-thatBlue-400
                      focus:bg-thatBlue-400 
                      focus:text-white 
                      focus:outline-none
                      focus:ring-thatBlue-500 
                      focus:border-thatBlue-800 
                      transition duration-150 ease-in-out md:text-lg md:px-10"
					>
						<span>Refresh</span>
					</button>
				{/if} -->
			</div>
		</div>
	</div>
</section>
