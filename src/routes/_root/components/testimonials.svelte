<script>
	import { session } from '$app/stores';
</script>

<section class="bg-white py-12 lg:py-16 mt-12">
	<div class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
		<svg
			class="hidden lg:block absolute right-full -top-3/4 transform
      translate-x-1/2 -translate-y-3/6"
			width="404"
			height="784"
			fill="none"
			viewBox="0 0 404 575"
		>
			<defs>
				<pattern
					id="56409614-3d62-4985-9a10-7ca758a8f4f0"
					x="0"
					y="0"
					width="20"
					height="20"
					patternUnits="userSpaceOnUse"
				>
					<rect x="0" y="0" width="4" height="4" class="text-thatBlue-100" fill="currentColor" />
				</pattern>
			</defs>
			<rect width="404" height="784" fill="url(#56409614-3d62-4985-9a10-7ca758a8f4f0)" />
		</svg>

		<div class="relative lg:flex lg:items-center">
			<div class="hidden lg:block lg:flex-shrink-0">
				<img
					class="lazyload h-64 w-64 rounded-full xl:h-80 xl:w-80"
					src="https://that.imgix.net/members/1dcd59be-4677-474d-8087-e0b74e8ab810.jpeg?mask=ellipse&w=500&h=500&fit=crop"
					alt="Clark Sell"
				/>
			</div>

			<div class="relative lg:ml-10">
				<svg
					class="absolute top-0 left-0 transform -translate-x-8 -translate-y-24
          h-36 w-36 text-thatBlue-200 opacity-50"
					stroke="currentColor"
					fill="none"
					viewBox="0 0 144 144"
				>
					<path
						stroke-width="2"
						d="M41.485 15C17.753 31.753 1 59.208 1 89.455c0 24.664 14.891 39.09
            32.109 39.09 16.287 0 28.386-13.03 28.386-28.387
            0-15.356-10.703-26.524-24.663-26.524-2.792 0-6.515.465-7.446.93
            2.327-15.821 17.218-34.435 32.11-43.742L41.485 15zm80.04 0c-23.268
            16.753-40.02 44.208-40.02 74.455 0 24.664 14.891 39.09 32.109 39.09
            15.822 0 28.386-13.03 28.386-28.387
            0-15.356-11.168-26.524-25.129-26.524-2.792 0-6.049.465-6.98.93
            2.327-15.821 16.753-34.435 31.644-43.742L121.525 15z"
					/>
				</svg>
				<blockquote class="relative">
					<div class="prose sm:text-lg md:text-xl text-gray-500">
						{#if !$session.isAuthenticated}
							<p>
								Our mission is simple, foster a community of geeks who want to help one another be
								awesome. THAT.us is a safe place for all of the geeks and geeklings from anywhere,
								to easily connect and support one another in achieving their best self, each and
								every day. Together we can accomplish amazing things and we all have a role in
								making our community the best it can be.
								<a class="text-thatOrange-400 hover:text-thatOrange-500" href="/signup/">
									Join us today!
								</a>
							</p>
						{:else if !$session.thatProfile?.isMember}
							<p>
								Our mission is simple, foster a community of geeks who want to help one another be
								awesome. We could create a free platform, but then you become the product. To that,
								we say no thank you; we're the product, not you. We're taking the approach of
								creating a monetization approach of helping us help you.
							</p>
							<p>
								Daily usage of THAT.us is free and allows anyone to create and join daily
								activities. Monthly events cost $15 per person. For access to all online events and
								other benefits, we've created THAT Membership. THAT Membership is $150 per year,
								gives you full access and even a discount on a THAT Conference ticket.
								<a class="text-thatOrange-400 hover:text-thatOrange-500" href="/membership/">
									Upgrade today.
								</a>
							</p>
						{/if}
					</div>
					<footer class="mt-8">
						<div class="flex">
							<div class="flex-shrink-0 lg:hidden">
								<img
									class="h-12 w-12 rounded-full"
									src="https://that.imgix.net/members/5ec3a772-104d-4f6c-a577-9ea30baea982.jpeg?mask=ellipse&w=500&h=500&fit=crop"
									alt="Clark Sell"
								/>
							</div>
							<div class="ml-4 lg:ml-0">
								<div class="text-base leading-6 font-medium text-that-blue">Clark Sell</div>
								<div class="text-base leading-6 font-medium text-gray-900">Founder, THAT</div>
							</div>
						</div>
					</footer>
				</blockquote>
			</div>
		</div>
	</div>
</section>
