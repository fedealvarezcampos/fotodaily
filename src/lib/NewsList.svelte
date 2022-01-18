<script>
	import axios from 'axios';
	import { hostURL } from '../host';
	import { fetchOrder } from '../stores';

	import NewsItem from './NewsItem.svelte';
	import Loading from './Loading.svelte';

	$: order = $fetchOrder;
	let newsItems = [];
	let error = null;

	let loading;

	const fetchNews = async () => {
		try {
			loading = true;

			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			let res;

			if (token) {
				res = await axios.get(`${hostURL}/api/newsitems?sort=date:${order}`, {
					headers: { Authorization: `Bearer ${token}` }
				});
			} else {
				res = await axios.get(`${hostURL}/api/newsitems?sort=date:${order}`);
			}

			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	$: order && fetchNews();
</script>

{#if error !== null}
	{error.message}
{:else if loading}
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
	}
</style>
