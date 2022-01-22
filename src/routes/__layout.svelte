<script>
	import '../app.css';
	import axios from 'axios';
	import { onMount } from 'svelte';
	import { hostURL } from '../host';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { isAuthed } from '../stores';
	import Nav from '$lib/Nav.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	let isMounted;
	let logged;

	let token;

	onMount(() => {
		isMounted = true;
		if (localStorage.user) {
			token = JSON.parse(localStorage.user).jwt;
		}
	});

	$: currentPath = $page.url.pathname;

	const checkIfLogged = async () => {
		try {
			if (!localStorage.user) return;

			const storedUser = JSON.parse(localStorage.user);

			const { jwt } = storedUser;

			const { data, error } = await axios.get(`${hostURL}/api/users/me`, {
				headers: {
					Authorization: `Bearer ${jwt}`
				}
			});

			if (error) throw error;

			data?.confirmed && isAuthed.set(true);
		} catch (error) {
			localStorage.clear('user');
		}
	};

	$: isMounted && checkIfLogged();

	const redirect = () => currentPath === '/bookmarks' && goto('/');
	$: isMounted && !token && !$isAuthed && redirect();
</script>

<Nav />

<div class="bodyContainer">
	{#if currentPath === '/'}
		<Sidebar />
	{/if}

	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.bodyContainer {
		display: flex;

		@media (max-width: 800px) {
			flex-direction: column;
			gap: 1rem;
		}
	}

	main {
		width: 100%;
		min-height: calc(100vh - 6rem);
		display: flex;
		flex-direction: column;
		place-content: center;
		place-items: center;

		@media (max-width: 800px) {
			min-height: calc(100vh - 10rem);
		}
	}
</style>
