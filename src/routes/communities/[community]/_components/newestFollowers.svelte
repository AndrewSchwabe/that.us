<script>
	export let followers = [];

	import { Avatars } from '$elements';
</script>

<section class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
	<div class="lg:grid lg:grid-cols-12 lg:gap-8 my-24">
		<div class="text-center md:max-w-2xl md:mx-auto lg:col-span-3">
			<h2
				class="my-2 text-3xl leading-8 font-extrabold tracking-tight
                text-gray-900 sm:text-4xl sm:leading-10"
			>
				Newest Followers
			</h2>
		</div>

		<div class="lg:col-start-4 lg:col-span-9">
			<div class="flex flex-col">
				<div class="my-8 lg:my-0">
					<Avatars attendees={followers} />
				</div>
			</div>
		</div>
	</div>
</section>
