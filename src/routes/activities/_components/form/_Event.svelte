<script>
	export let activeEvents = [];
	export let events = [];

	export let isBackdoor = false;
	export let eventId;
	export let setField;

	import { createEventDispatcher, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { Input } from 'sveltejs-forms';
	import dayjs from 'dayjs';

	import eventsApi from '$dataSources/api.that.tech/events/queries';
	import { CheckFull } from '$elements/svgs';
	import config from '$utils/config';
	import EventNoAccess from './components/_EventNoAccess.svelte';

	const { canAddSession } = eventsApi();
	const dispatch = createEventDispatcher();

	$: eventSelected = eventId;

	function handleOnChange({ target }) {
		setField('eventId', target.value);
		let eventSelectedDetail = events.find((i) => i.id === eventSelected);
		window.history.replaceState(null, null, `?event=${target.value}`);
		dispatch('event-selected', eventSelectedDetail);
	}

	/* 
		todo... 
		maybe not the best but replicates what was working
		also still no url
	*/

	onMount(() => {
		let eventSelectedDetail = events.find((i) => i.id === eventSelected);
		dispatch('event-selected', eventSelectedDetail);
	});
</script>

<Input hidden name="eventId" value={eventSelected} />

<div in:fade class="px-4 sm:px-6 py-5 ">
	{#if isBackdoor}
		<ul class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
			<li class="col-span-1 shadow-sm rounded-md">
				<div class="transition duration-500 ease-in-out transform">
					<label for={activeEvents.backdoor.name} class="h-full flex">
						<div
							class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate"
						>
							<div class="flex-shrink-0">
								<img class="p-2 h-14 object-fit" alt="" src={activeEvents.backdoor.logo} />
							</div>

							<div class="flex-1 px-2 py-2 text-sm truncate">
								<p class="text-gray-900 font-bold">
									{activeEvents.backdoor.name}
								</p>

								<p class="text-gray-500">
									{dayjs(activeEvents.backdoor.startDate).format('dddd, MMMM D, YYYY')}
								</p>
							</div>

							<div class="flex-shrink-0 pr-4">
								<span
									class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center"
								>
									<CheckFull height="h-4" width="w-4" />
								</span>
							</div>
						</div>
					</label>
				</div>
			</li>
		</ul>
	{:else}
		<ul class="grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2">
			<li
				in:fade
				class="col-span-1 shadow-sm rounded-md transition duration-500 ease-in-out transform hover:scale-105 "
			>
				<input
					type="radio"
					id={activeEvents.daily.name}
					bind:group={eventSelected}
					value={activeEvents.daily.id}
					on:change={handleOnChange}
				/>

				<label for={activeEvents.daily.name} class="h-full flex">
					{#if activeEvents.daily.id !== eventSelected}
						<div
							class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-md truncate"
						>
							<div class="flex-1 px-4 py-2 text-sm truncate">
								<p class="text-gray-900 font-medium">
									{activeEvents.daily.name}
								</p>
								{#if activeEvents.daily.id !== config.eventId}
									<p class="text-gray-500">
										{dayjs(activeEvents.daily.startDate).format('dddd MMMM D, YYYY')}
									</p>
								{/if}
							</div>
						</div>
					{:else}
						<div
							class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate"
						>
							<div class="flex-1 px-4 py-2 text-sm truncate">
								<p class="text-gray-900 font-bold">
									{activeEvents.daily.name}
								</p>
								{#if activeEvents.daily.id !== config.eventId}
									<p class="text-gray-500">
										{dayjs(activeEvents.daily.startDate).format('dddd MMMM D, YYYY')}
									</p>
								{/if}
							</div>

							<div class="flex-shrink-0 pr-4">
								<span
									class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center"
								>
									<CheckFull height="h-4" width="w-4" />
								</span>
							</div>
						</div>
					{/if}
				</label>
			</li>

			<!-- divider -->

			<div class="col-span-1 sm:col-span-2 relative m-4">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
					<div class="w-full border-t border-gray-300" />
				</div>
				<div class="relative flex justify-center">
					<span class="uppercase tracking-wider px-2 bg-gray-100 rounded-md text-sm text-gray-500">
						Upcoming Online Events
					</span>
				</div>
			</div>

			<!-- end divider -->

			{#each activeEvents.online as event, i (i)}
				<li class="col-span-1 shadow-sm rounded-md">
					{#await canAddSession(event.id)}
						<div in:fade class="col-span-1 shadow-sm rounded-md">
							<div class="shadow-sm rounded-md bg-white p-4 w-full mx-auto">
								<div class="animate-pulse">
									<div class="flex-1 space-y-2">
										<div class="h-3 bg-gray-400 rounded w-1/2" />
										<div class="h-3 bg-gray-300 rounded w-3/4" />
									</div>
								</div>
							</div>
						</div>
					{:then accessResults}
						{#if accessResults}
							<div
								in:fade
								class={`transition duration-500 ease-in-out transform ${
									event.id !== eventSelected ? 'hover:scale-105' : ''
								}`}
							>
								<input
									type="radio"
									id={event.name}
									bind:group={eventSelected}
									value={event.id}
									on:change={handleOnChange}
								/>

								<label for={event.name} class="h-full flex">
									{#if event.id !== eventSelected}
										<div
											class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-md truncate cursor-pointer"
										>
											<div class="flex-shrink-0">
												<img class="p-2 h-14 object-fit" alt="" src={event.logo} />
											</div>

											<div class="flex-1 px-2 py-2 text-sm truncate">
												<p class="text-gray-900 font-medium">
													{event.name}
												</p>

												<p class="text-gray-500">
													{dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
												</p>
											</div>
										</div>
									{:else}
										<div
											class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate"
										>
											<div class="flex-shrink-0">
												<img class="p-2 h-14 object-fit" alt="" src={event.logo} />
											</div>

											<div class="flex-1 px-2 py-2 text-sm truncate">
												<p class="text-gray-900 font-bold">
													{event.name}
												</p>

												<p class="text-gray-500">
													{dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
												</p>
											</div>

											<div class="flex-shrink-0 pr-4">
												<span
													class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center"
												>
													<CheckFull height="h-4" width="w-4" />
												</span>
											</div>
										</div>
									{/if}
								</label>
							</div>
						{:else}
							<EventNoAccess {event} />
						{/if}
					{/await}
				</li>
			{/each}

			<!-- divider for Hybrid Events-->
			{#if activeEvents.hybrid.length > 0}
				<div class="col-span-1 sm:col-span-2 relative m-4">
					<div class="absolute inset-0 flex items-center" aria-hidden="true">
						<div class="w-full border-t border-gray-300" />
					</div>
					<div class="relative flex justify-center">
						<span
							class="uppercase tracking-wider px-2 bg-gray-100 rounded-md text-sm text-gray-500"
						>
							Upcoming Hybrid, In-Person Events
						</span>
					</div>
				</div>

				{#each activeEvents.hybrid as event, i (i)}
					<li in:fade={{ delay: i * 200 }} class="col-span-1 shadow-sm rounded-md">
						{#await canAddSession(event.id) then accessResults}
							{#if accessResults}
								<div class="transition duration-500 ease-in-out transform hover:scale-105">
									<input
										type="radio"
										id={event.name}
										bind:group={eventSelected}
										value={event.id}
										on:change={handleOnChange}
									/>

									<label for={event.name} class="h-full flex">
										{#if event.id !== eventSelected}
											<div
												class="flex-1 flex items-center justify-between border border-gray-200 bg-white hover:bg-gray-50 rounded-md truncate"
											>
												<div class="flex-shrink-0">
													<img class="p-2 h-14 object-fit" alt="" src={event.logo} />
												</div>

												<div class="flex-1 px-2 py-2 text-sm truncate">
													<p class="text-gray-900 font-medium">
														{event.name}
													</p>

													<p class="text-gray-500">
														{dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
													</p>
												</div>
											</div>
										{:else}
											<div
												class="flex-1 flex items-center justify-between border border-green-500 bg-green-100 rounded-md truncate"
											>
												<div class="flex-shrink-0">
													<img class="p-2 h-14 object-fit" alt="" src={event.logo} />
												</div>

												<div class="flex-1 px-2 py-2 text-sm truncate">
													<p class="text-gray-900 font-bold">
														{event.name}
													</p>

													<p class="text-gray-500">
														{dayjs(event.startDate).format('dddd, MMMM D, YYYY')}
													</p>
												</div>

												<div class="flex-shrink-0 pr-4">
													<span
														class="h-6 w-6 rounded-full bg-green-500 bg-opacity-60 flex items-center justify-center"
													>
														<CheckFull height="h-4" width="w-4" />
													</span>
												</div>
											</div>
										{/if}
									</label>
								</div>
							{:else}
								<EventNoAccess {event} />
							{/if}
						{/await}
					</li>
				{/each}
			{/if}
		</ul>
	{/if}
</div>

<style>
	input[type='radio'] {
		display: none;
	}
</style>
