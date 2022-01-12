<script>
	import axios from 'axios';
	import { fetchOrder } from '../stores';
	import NewsItem from './NewsItem.svelte';

	const hostURL = import.meta.env.VITE_HOSTURL;

	$: order = $fetchOrder;
	let newsItems = [];
	let error = null;

	let loading;

	const fetcher = async () => {
		try {
			loading = true;

			const res = await axios.get(`${hostURL}/api/newsitems?sort=date:${order}`);
			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	$: order && fetcher();
</script>

{#if error !== null}
	{error.message}
{:else if loading}
	<span class="loader">Loading...</span>
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
		/* width: clamp(20rem, 70vw, 80rem); */
	}

	.loader {
		font-size: 1.8rem;
	}
</style>
