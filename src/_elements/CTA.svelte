<section class="py-12 lg:py-16 bg-thatBlue-100 bg-opacity-25">
	<div
		class="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 lg:flex
			lg:items-center lg:justify-between"
	>
		<h2
			class="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10"
		>
			<slot />
		</h2>
		<div class="mt-8 flex lg:flex-shrink-0 lg:mt-0 space-x-4">
			<div class="inline-flex">
				<slot name="actionPrimary" />
			</div>
			<div class="inline-flex">
				<slot name="actionSecondary" />
			</div>
		</div>
	</div>
</section>
