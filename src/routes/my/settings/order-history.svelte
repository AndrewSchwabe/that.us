<script context="module">
	import ordersApi from '$dataSources/api.that.tech/orders/queries';

	export async function load({ fetch }) {
		const { queryMyBulkAllocations } = ordersApi(fetch);

		const orders = await queryMyBulkAllocations();

		return {
			props: {
				orders
			}
		};
	}
</script>

<script>
	export let orders;

	import SvelteInfiniteScroll from 'svelte-infinite-scroll';
	import { useMachine } from 'xstate-svelte';
	import dayjs from 'dayjs';
	import isBetween from 'dayjs/plugin/isBetween.js';

	import seoMetaTags from '$utils/seo/metaTags';
	import Seo from '$components/Seo.svelte';

	import { Waiting } from '$elements';
	import { ChevronRight } from '$elements/svgs';
	import ScrollThreshold from '$components/ScrollThreshold.svelte';

	import { debug } from '$utils/config';
	import orderQueryApi from '$dataSources/api.that.tech/orders/queries';

	import createMachine from '../_machines/bulkAllocations';
	import TicketAllocation from './_components/ticketAllocation.svelte';

	dayjs.extend(isBetween);

	const { queryOrderReceiptUrl } = orderQueryApi();
	let scrollThreshold = 1200;

	const metaTags = ((title = 'My Order History - THAT') => ({
		title,
		tags: seoMetaTags({
			title,
			description: "You've worked hard to earn some awesome merit badges.",
			openGraph: {
				type: 'website',
				url: `https://that.us/my/settings/order-history/`
			},
			nofollow: true,
			noindex: true
		})
	}))();

	const { state, send } = useMachine(
		createMachine({ items: orders.orders, cursor: orders.cursor }),
		{
			devTools: debug.xstate
		}
	);

	function handleNext() {
		send('NEXT');
	}

	function handleReceiptRedirect(orderId) {
		return queryOrderReceiptUrl(orderId).then((r) => {
			window.open(r);
		});
	}

	function showBackground(i) {
		const result = i % 2;
		return result != 0;
	}
</script>

<Seo title={metaTags.title} tags={metaTags.tags} />
<ScrollThreshold bind:scrollThreshold />

<div>
	<header>
		<h2 class="text-xl leading-6 font-bold text-gray-900">Order History</h2>
	</header>

	<div class="mt-12">
		<ul class="flex flex-col space-y-6">
			{#each $state.context.items as o (o.id)}
				<li class="bg-white shadow overflow-hidden sm:rounded-md">
					<div class="divide-y divide-gray-200">
						<div>
							<button
								on:click={() => handleReceiptRedirect(o.id)}
								class="min-w-full block hover:bg-gray-200"
							>
								<div class="flex items-center space-x-12 px-4 py-4 sm:px-6">
									<div class="flex-grow">
										<div class="flex items-center justify-between">
											<div>
												<p class="text-lg font-medium text-gray-500">
													Order # {o.id}
												</p>
											</div>

											<div class="hidden md:block">
												<div>
													<p class="text-sm text-gray-900">
														Purchased on
														<time datetime="2020-01-07"
															>{dayjs(o.orderDate).format('dddd MMMM D, YYYY - h:mm A')}</time
														>
													</p>
													<p class="mt-2 flex items-center text-sm text-gray-500">
														<svg
															class="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 20 20"
															fill="currentColor"
															aria-hidden="true"
														>
															<path
																fill-rule="evenodd"
																d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
																clip-rule="evenodd"
															/>
														</svg>
														${parseFloat(o.total).toFixed(2)}
													</p>
												</div>
											</div>
										</div>
									</div>
									<div>
										<ChevronRight />
									</div>
								</div>
							</button>
						</div>

						<div>
							{#each o.orderAllocations as oa, i (oa.id)}
								<div class:bg-gray-50={showBackground(i)}>
									<TicketAllocation orderId={o.id} allocation={oa} />
								</div>
							{/each}
						</div>
					</div>
				</li>
				<SvelteInfiniteScroll window threshold={ScrollThreshold} on:loadMore={handleNext} />
			{/each}
		</ul>
	</div>

	{#if ['loadingNext', 'loadedAll'].some($state.matches)}
		<div class="flex flex-grow justify-center py-12">
			<Waiting />
		</div>
	{/if}
</div>
