<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { hostURL } from '../host';
	import NewsList from '$lib/NewsList.svelte';
	import { elementObserver } from '../helpers/observer';
	import { fetchOptions, fetchNewsTrigger, resetTrigger, searchTerm } from '../stores';

	$: filter = $fetchOptions.filter;

	let isMounted;

	let loading;
	let noResults = false;
	let error;

	let page = $fetchOptions.page;
	let pageSize = 12;

	let newsItems = [];
	let newlyFetchedItems = [];

	onMount(() => (isMounted = true));

	const fetchNews = async () => {
		try {
			if (page === 1) {
				loading = true;
				newsItems = [];
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
		} catch (err) {
			error = err;
		} finally {
			loading = false;
		}
	};

	const fetchSearched = async (searchValue) => {
		try {
			if (page === 1) {
				loading = true;
			}

			const res = await axios.get(
				`${hostURL}/api/newsitems?sort=date:DESC&pagination[page]=${page}&pagination[pageSize]=${pageSize}&filters[title][$containsi]=${searchValue}`
			);

			newlyFetchedItems = res.data.data;

			if (!newlyFetchedItems.length && page === 1) noResults = true;

			newsItems = [...newsItems, ...newlyFetchedItems];
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};

	const searchItems = () => {
		resetItems();

		fetchOptions.set({ order: 'DESC', filter: 'search', page: 1 });

		fetchSearched($searchTerm);
	};

	const fetchMoreNews = () => {
		if (newlyFetchedItems.length >= pageSize && !$searchTerm) {
			page++;
			fetchNews();
		} else if (newlyFetchedItems.length >= pageSize) {
			page++;
			fetchSearched($searchTerm);
		}
	};

	let elementRef = null;

	$: {
		if (elementRef) {
			elementObserver({ fetch: fetchMoreNews, element: elementRef });
		}
	}

	const resetItems = () => {
		newsItems = [];
		page = 1;
	};

	$: $resetTrigger && resetItems();
	$: isMounted && $fetchOptions && fetchNews();
	$: $fetchNewsTrigger && fetchNews();
	$: $searchTerm && searchItems();
</script>

<svelte:head>
	<title>Fotodaily | All your photography news!</title>
</svelte:head>

<NewsList {newsItems} {loading} />
{#if loading === false && newlyFetchedItems.length >= pageSize}
	<span class="observer" bind:this={elementRef}>Loading more...</span>
{/if}
{#if noResults}
	<span class="noResults">No results!</span>
{/if}

<style lang="postcss">
	.observer {
		font-size: 1.1rem;
		font-style: italic;
		margin-bottom: 3rem;
	}

	.noResults {
		font-size: 2rem;
	}
</style>
