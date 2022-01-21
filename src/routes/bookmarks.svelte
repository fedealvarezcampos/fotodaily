<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { hostURL } from '../host';
	import NewsList from '$lib/NewsList.svelte';

	let isMounted;

	let loading;
	let newsItems = [];

	onMount(() => (isMounted = true));

	const fetchNews = async () => {
		try {
			loading = true;

			const token = JSON.parse(localStorage.getItem('user'))?.jwt;

			const res = await axios.get(`${hostURL}/api/newsitems/saved`, {
				headers: { Authorization: `Bearer ${token}` }
			});

			newsItems = res?.data.data;
		} catch (e) {
			error = e;
		} finally {
			loading = false;
		}
	};

	$: isMounted && fetchNews();
</script>

<NewsList {newsItems} {loading} />
