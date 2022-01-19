<script>
	import '../app.css';
	import axios from 'axios';
	import { hostURL } from '../host';
	import { onMount } from 'svelte';
	import { isAuthed } from '../stores';
	import Nav from '$lib/Nav.svelte';
	import Sidebar from '$lib/Sidebar.svelte';

	let isMounted;

	onMount(() => {
		isMounted = true;
	});

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
</script>

<Nav />

<div class="bodyContainer">
	<Sidebar />
	<main>
		<slot />
	</main>
</div>

<style lang="postcss">
	.bodyContainer {
		display: flex;
	}

	main {
		width: 100%;
		display: flex;
		flex-direction: column;
		place-content: center;
		place-items: center;
	}
</style>
