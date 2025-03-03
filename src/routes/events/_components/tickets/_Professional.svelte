<script>
	export let event;

	import lodash from 'lodash';
	import { createEventDispatcher } from 'svelte';

	import { Standard as StandardButton, HighlightShell } from '$elements/buttons';

	import RowDetails from './_TBL-Row.svelte';
	import pricingBreakdown, { ticketBreakdown } from './pricingData';

	const { keyBy } = lodash;
	const dispatch = createEventDispatcher();

	const { products } = event;

	const eventTickets = keyBy(
		products.filter((t) => t.uiReference),
		(i) => i.uiReference
	);

	function handlePurchase(ref) {
		dispatch('purchase-hybrid-ticket', {
			eventId: event.id,
			ref
		});
	}
</script>

<div class="relative">
	<div class="max-w-2xl lg:max-w-7xl mx-auto">
		<div class="py-24 px-6">
			<h2
				class="pb-6 lg:pb-24 text-4xl sm:text-5xl leading-8 font-extrabold tracking-tight text-thatBlue-800"
			>
				Professional Campers
			</h2>

			<div class="flex items-center">
				<div class="hidden w-1/4 lg:flex justify-center">
					<img class="h-full w-full" src="/images/characters/sassy_with_badge.svg" alt />
				</div>

				<div class="lg:w-3/4 lg:pl-12">
					<p class="mt-12 prose-xl text-gray-500">
						As a Camper, you receive up to 4 days of 200 professional sessions across various
						technologies, platforms, and disciplines of all levels. You can also access over 10,000
						sq. ft. of open spaces to participate in more intimate discussions across all topics you
						and your fellow attendees generated. All sessions, including open spaces, are designed
						to build your road to level up your skills, career and take charge of
						<span class="font-bold">you</span>.
					</p>

					<p class="mt-12 prose-xl text-gray-500">
						Each day starts with an inspiring keynote, breakfast, and beverages. Then you’re off on
						your camping adventure to join in the many professional sessions, share your ideas and
						experiences in a welcoming open space, and/or learn how to solder in our Maker space.
						Lunch is served midday and a special social event wraps up each afternoon to encourage
						networking and continued learning.
					</p>
				</div>
			</div>
		</div>

		<!-- sm -> lg -->
		<div class="space-y-24 px-6 lg:hidden">
			<div>put a quick jump list here...</div>

			{#each ticketBreakdown as ticket}
				<section class="bg-white shadow-lg rounded-lg py-6 px-4">
					<div class="px-4 mb-8 w-full">
						<div class="flex items-center">
							<div class="w-3/4">
								<h2 class="text-3xl leading-6 font-bold text-gray-900">
									{eventTickets[ticket.uiReference].name}
								</h2>
								<p class="mt-4 prose-md text-gray-500">
									{eventTickets[ticket.uiReference].shortDescription}
								</p>
							</div>

							<div class="w-1/3 flex justify-center">
								<div class="mt-4 flex items-center">
									<span class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
										<span class="mt-2 mr-2 text-4xl font-medium">$</span>
										<span class="font-extrabold">
											{eventTickets[ticket.uiReference].price}
										</span>
									</span>
								</div>
							</div>
						</div>

						<div class="mt-6">
							<HighlightShell>
								<button
									on:click={() => handlePurchase(ticket.uiReference)}
									class="w-full px-8 md:px-10 py-2">Purchase</button
								>
							</HighlightShell>
						</div>
					</div>

					{#each ticket.includes as item}
						<div class="flex flex-col">
							<h2
								class="bg-gray-50 border-t border-gray-200 py-3 px-4 text-sm font-medium text-gray-900 text-left"
							>
								{item.title}
							</h2>
							{#each item.includes as i}
								<div class="divide-y divide-gray-200">
									<div class="border-t border-gray-200">
										<p class="py-5 px-4 text-sm font-normal text-gray-500 text-left">
											{i.title}
										</p>
									</div>
								</div>
							{/each}
						</div>
					{/each}

					<div class="mt-6">
						<div class="border-t border-gray-200 px-4 pt-5">
							<HighlightShell>
								<button
									on:click={() => handlePurchase(ticket.uiReference)}
									class="w-full px-8 md:px-10 py-2">Purchase</button
								>
							</HighlightShell>
						</div>
					</div>
				</section>
			{/each}
		</div>

		<!-- lg+ -->
		<div class="hidden lg:block bg-white shadow-lg rounded-lg py-16 sm:py-20 sm:px-6 lg:px-8 ">
			<table class="w-full h-px table-fixed">
				<caption class="sr-only">Pricing plan comparison</caption>

				<thead>
					<tr>
						<th class="pb-4 pl-6 pr-6 text-sm font-medium text-gray-900 text-left" scope="col">
							<span>Professional Tickets</span>
						</th>

						{#each ticketBreakdown as ticket}
							<th
								class="w-1/6 pb-4 px-6 text-lg align-top text-center leading-6 font-medium text-gray-900"
								scope="col">{eventTickets[ticket.uiReference].name}</th
							>
						{/each}
					</tr>
				</thead>

				<tbody class="border-t border-gray-200 divide-y divide-gray-200">
					<tr>
						<th
							class="py-8 pl-6 pr-6 align-top text-sm font-medium text-gray-900 text-left"
							scope="row">Pricing</th
						>

						{#each ticketBreakdown as ticket}
							<td class="h-full py-8 px-6 align-top">
								<div class="h-full flex flex-col ">
									<div class="mt-4 flex items-center">
										<span class="px-3 flex items-start text-6xl tracking-tight text-gray-900">
											<span class="mt-2 mr-2 text-4xl font-medium">$</span>
											<span class="font-extrabold">
												{eventTickets[ticket.uiReference].price}
											</span>
										</span>
									</div>

									<p class="flex-grow mt-4 text-sm text-gray-500">
										{eventTickets[ticket.uiReference].shortDescription}
									</p>

									<div class="mt-6">
										<StandardButton on:click={() => handlePurchase(ticket.uiReference)}>
											Purchase
										</StandardButton>
									</div>
								</div>
							</td>
						{/each}
					</tr>

					<!-- section start -->
					{#each pricingBreakdown as breakdown}
						<tr>
							<th
								class="py-3 pl-6 bg-gray-50 text-sm font-medium text-gray-900 text-left"
								colspan="6"
								scope="colgroup">{breakdown.title}</th
							>
						</tr>

						{#each breakdown.includes as item}
							<RowDetails title={item.title} included={item.isIncluded} />
						{/each}
					{/each}
				</tbody>

				<tfoot>
					<tr class="border-t border-gray-200">
						<th class="sr-only" scope="row">Choose your plan</th>

						<td class="pt-12 px-6">
							<StandardButton on:click={() => handlePurchase('WORKSHOPS')}>Purchase</StandardButton>
						</td>

						<td class="pt-12 px-6">
							<StandardButton on:click={() => handlePurchase('VIRTUAL_CAMPER')}
								>Purchase</StandardButton
							>
						</td>

						<td class="pt-12 px-6">
							<StandardButton on:click={() => handlePurchase('CAMPER_NO_FOOD')}
								>Purchase</StandardButton
							>
						</td>
						<td class="pt-12 px-6">
							<StandardButton on:click={() => handlePurchase('CAMPER')}>Purchase</StandardButton>
						</td>
						<td class="pt-12 px-6">
							<StandardButton on:click={() => handlePurchase('EVERYTHING_CAMPER')}>
								Purchase
							</StandardButton>
						</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</div>
