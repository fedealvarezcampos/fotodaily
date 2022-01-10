<script>
	import NewsList from '$lib/NewsList.svelte';

	let title = 'mi puta casa.';

	const changeTitle = () => {
		title = 'mi otra puta casa.';
	};

	let email;
</script>

<NewsList />
