<script>
	import axios from 'axios';
	import { hostURL } from '../host';
	import { onMount } from 'svelte';
	import { isAuthed } from '../stores';
	import Modal from '$lib/Modal.svelte';
	import AuthForm from '$lib/AuthForm.svelte';

	let siteTitle = '📷 FOTODAILY';
	let isMounted;
	let showModal = false;

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

	$: checkIfLogged = async () => {
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

	const logOut = () => {
		localStorage.clear('user');
		isAuthed.set(false);
	};

	$: isMounted && checkIfLogged();
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
	<span class="btnContainer">
		{#if !$isAuthed}
			<button on:click|preventDefault={toggleModal}>LOG IN</button>
		{:else}
			<button on:click|preventDefault={logOut}>LOG OUT</button>
			<button on:click|preventDefault={toggleModal}>YOUR NEWS</button>
		{/if}
	</span>
</header>
<Modal {showModal} on:click={toggleModal}>
	<AuthForm {toggleModal} />
</Modal>

<style lang="postcss">
	header {
		position: sticky;
		top: 0;
		display: flex;
		padding: 0 4rem;
		height: 6rem;
		place-items: center;
		justify-content: space-between;
		border-bottom: 6px solid var(--red);
		background-color: var(--black);
		font-weight: 700;
		z-index: 3;

		p {
			&:first-child {
				position: relative;
				/* margin-right: auto; */
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
		}

		.btnContainer {
			width: 9rem;
			display: flex;
			place-content: flex-end;
			gap: 1rem;
		}
	}
</style>
