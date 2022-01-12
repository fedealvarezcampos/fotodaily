<script>
	import axios from 'axios';
	import NewsItem from './NewsItem.svelte';

	const hostURL = import.meta.env.VITE_HOSTURL;

	let newsItems = [];
	let order = 'DESC';
	let error = null;

	$: fetcher = async () => {
		try {
			const res = await axios.get(`${hostURL}/api/newsitems?sort=date:${order}`);
			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		}
	};

	$: order && fetcher();

	const changeOrder = () => {
		order = order === 'DESC' ? 'ASC' : 'DESC';
	};
</script>

{#if error !== null}
	{error.message}
{:else if !newsItems.length}
	<span class="loader">Loading...</span>
{:else}
	<button on:click={changeOrder}>ORDER</button>
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
		flex-direction: column;
		gap: 1.8rem;
		list-style: none;
		width: clamp(20rem, 70vw, 42rem);
	}

	.loader {
		font-size: 1.8rem;
	}
</style>
