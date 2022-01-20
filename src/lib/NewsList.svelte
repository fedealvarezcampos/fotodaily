<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { fetchOptions, fetchNewsTrigger } from '../stores';
	import { hostURL } from '../host';
	import NewsItem from './NewsItem.svelte';
	import Loading from './Loading.svelte';

	$: filter = $fetchOptions.filter;

	let isMounted;
	let newsItems = [];
	let error = null;

	let loading;

	onMount(() => (isMounted = true));

	export const fetchNews = async () => {
		try {
			loading = true;

			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			let res;

			if (token) {
				res = await axios.get(`${hostURL}/api/newsitems?sort=${filter}:DESC`, {
					headers: { Authorization: `Bearer ${token}` }
				});
			} else {
				res = await axios.get(`${hostURL}/api/newsitems?sort=${filter}:DESC`);
			}

			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	$: isMounted && $fetchOptions && fetchNews();
	$: $fetchNewsTrigger && fetchNews();
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
