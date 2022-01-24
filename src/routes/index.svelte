<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { hostURL } from '../host';
	import NewsList from '$lib/NewsList.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import { fetchOptions, fetchNewsTrigger, resetTrigger } from '../stores';

	$: filter = $fetchOptions.filter;

	let isMounted;

	let loading;
	let error = null;

	let page = $fetchOptions.page;
	let pageSize = 12;
	let newsItems = [];

	let newlyFetchedItems = [];

	onMount(() => (isMounted = true));

	const fetchNews = async () => {
		try {
			if (page === 1) {
				loading = true;
			}

			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			let res;

			if (token) {
				res = await axios.get(
					`${hostURL}/api/newsitems?sort=${filter}:DESC&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
					{
						headers: { Authorization: `Bearer ${token}` }
					}
				);
			} else {
				res = await axios.get(
					`${hostURL}/api/newsitems?sort=${filter}:DESC&pagination[page]=${page}&pagination[pageSize]=${pageSize}`
				);
			}

			newlyFetchedItems = res.data.data;
			newsItems = [...newsItems, ...newlyFetchedItems];
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	const fetchMore = () => {
		page++;
		fetchNews();
	};

	const resetItems = () => {
		newsItems = [];
		page = 1;
	};

	$: $resetTrigger && resetItems();
	$: isMounted && $fetchOptions && fetchNews();
	$: $fetchNewsTrigger && fetchNews();
</script>

<NewsList {newsItems} {loading} />
<InfiniteScroll
	window={true}
	threshold={100}
	on:loadMore={fetchMore}
	hasMore={newlyFetchedItems.length}
/>
