<script>
	import NewsItem from './NewsItem.svelte';
	import Loading from './Loading.svelte';

	export let loading;
	export let newsItems;
</script>

{#if loading}
	<Loading />
{:else}
	<ul class="newsList">
		{#each newsItems as newsItem}
			<NewsItem {newsItem} />
		{/each}
	</ul>
{/if}

<style lang="postcss">
	.newsList {
		padding: 0;
		margin: 3rem 0 3rem 0;
		display: flex;
		place-content: center;
		flex-wrap: wrap;
		gap: 1.8rem;
		list-style: none;
		max-width: 120rem;

		@media (max-width: 800px) {
			margin: 0;
		}
	}
</style>
