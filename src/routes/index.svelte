<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { fetchOptions, fetchNewsTrigger } from '../stores';
	import { hostURL } from '../host';
	import NewsList from '$lib/NewsList.svelte';

	$: filter = $fetchOptions.filter;

	let isMounted;
	let error = null;

	let loading;

	let newsItems = [];

	onMount(() => (isMounted = true));

	const fetchNews = async () => {
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

<NewsList {newsItems} {loading} />
