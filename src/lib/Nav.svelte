<script>
	import axios from 'axios';
	import { hostURL } from '../host';
	import { onMount } from 'svelte';
	import { isAuthed } from '../stores';
	import Modal from '$lib/Modal.svelte';
	import AuthForm from '$lib/AuthForm.svelte';

	let siteTitle = '📷 FOTODAILY';
	let isMounted;
	let showModal;

	onMount(() => {
		isMounted = true;
	});

	const toggleModal = () => {
		showModal = !showModal;
	};

	const fixBody = (mode) => {
		document.body.style.overflow = mode;
	};

	$: if (showModal && isMounted) {
		fixBody('hidden');
	} else if (isMounted) {
		fixBody('');
	}

	const checkStorage = async () => {
		try {
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

	$: isMounted && checkStorage();
</script>

<header>
	<p><a href="/">{siteTitle}</a></p>
	<nav>
		<ul>
			<li>
				<a href="/">HOME</a>
			</li>
			<li>
				<a href="/about">ABOUT</a>
			</li>
		</ul>
	</nav>
	{#if !$isAuthed}
		<button on:click|preventDefault={toggleModal}>LOG IN</button>
	{:else}
		<button on:click|preventDefault={toggleModal}>YOUR NEWS</button>
	{/if}
</header>
<Modal {showModal} on:click={toggleModal}>
	<AuthForm />
</Modal>

<style lang="postcss">
	header {
		position: sticky;
		top: 0;
		display: flex;
		padding: 0 4rem;
		height: 6rem;
		place-items: center;
		place-content: center;
		border-bottom: 6px solid var(--red);
		background-color: var(--black);
		font-weight: 700;
		z-index: 3;

		p {
			&:first-child {
				position: relative;
				margin-left: auto;
				font-size: 1.4rem;
			}

			a {
				color: var(--white);
			}
		}

		ul {
			display: flex;
			gap: 0.8rem;
			list-style: none;
		}

		button {
			width: 4rem;
			margin-left: auto;
		}
	}
</style>
