<script>
	export let eventTicket;

	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	import { Standard as StandardButton } from '$elements/buttons';
	import { Check, Ban } from '$elements/svgs';

	const { send } = getContext('cart');

	function handleAddEventTicketClick(quantity = 1) {
		// const isBulkPurchase = quantity > 1 ? true : false;

		// send('ADD_ITEM', { ...eventTicket, isBulkPurchase, quantity });
		// goto('/orders/summary/');

		goto('/events/');
	}
</script>

<div class="mt-16">
	<div class="border-t text-white xl:flex xl:items-center xl:justify-between">
		<div class="py-8">
			<h1 class="text-4xl font-extrabold sm:text-5xl sm:tracking-tight">
				Additional ways to get involved.
			</h1>
			<!-- <p class="mt-5 text-xl">
        Includes every online event, every feature and even a discount to THAT
        Conference.
      </p> -->
		</div>
	</div>

	<div class="pb-12 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
		<div class="relative">
			<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div
					class="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0"
				>
					<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
						<div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
							<div>
								<h3
									class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-thatOrange-400 text-white"
									id="tier-standard"
								>
									Daily Usage
								</h3>
							</div>
							<div class="mt-4 flex items-baseline text-6xl font-extrabold">Free</div>
							<p class="mt-5 text-lg text-gray-500">THAT usage each and every day.</p>
						</div>
						<div
							class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6"
						>
							<ul class="space-y-4">
								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Join Activities</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Create Activities</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<Ban />
									</div>
									<p class="ml-3 text-base text-gray-700">Access to Monthly Event</p>
								</li>
							</ul>
							<StandardButton on:click={() => goto('/signup/')}>Create Your Account</StandardButton>
						</div>
					</div>

					<div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
						<div class="px-6 py-8 bg-white sm:p-10 sm:pb-6">
							<div>
								<h3
									class="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-thatOrange-400 text-white"
									id="tier-standard"
								>
									THAT Online Event Ticket
								</h3>
							</div>
							<div class="strike mt-4 flex items-baseline text-6xl font-extrabold">
								$15
								<span class="ml-1 text-2xl font-medium text-gray-500"> / each event </span>
							</div>
							<p class="mt-5 text-lg text-gray-500">Single Day Online Event Ticket</p>
						</div>
						<div
							class="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6"
						>
							<ul class="space-y-4">
								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Full Access All Day</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Create and Facilitate Activities</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Join Any Activity</p>
								</li>

								<li class="flex items-start">
									<div class="flex-shrink-0">
										<span class="text-green-500"><Check /></span>
									</div>
									<p class="ml-3 text-base text-gray-700">Helps Support Future Platform Growth</p>
								</li>
							</ul>
							<StandardButton on:click={() => handleAddEventTicketClick()}>
								Upcoming Events
							</StandardButton>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
