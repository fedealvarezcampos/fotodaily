<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { hostURL } from '../host';
	import NewsList from '$lib/NewsList.svelte';
	import { sidebarOut } from '../stores';

	let loading;
	let error;

	$: noSidebar = $sidebarOut;

	let isMounted;
	onMount(() => (isMounted = true));

	let newsItems = [];

	const fetchSavedNews = async () => {
		try {
			loading = true;

			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			const res = await axios.get(`${hostURL}/api/newsitems/saved`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			newsItems = res?.data.data;
		} catch (err) {
			error = err;
		} finally {
			loading = false;
		}
	};

	$: isMounted && fetchSavedNews();

	// when navigating directly to page with no sidebar, check
	afterNavigate(({ from }) => !from && sidebarOut.set(true));
</script>

<svelte:head>
	<title>Fotodaily | My saved articles</title>
</svelte:head>

{#if noSidebar}
	<div>
		<NewsList {newsItems} {loading} />
	</div>
{/if}

<style lang="postcss">
	div {
		display: flex;
		flex-direction: column;
		place-items: center;

		@media (max-width: 800px) {
			padding-top: 1.5rem;
		}
	}
</style>
