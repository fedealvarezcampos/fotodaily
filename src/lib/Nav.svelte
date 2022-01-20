<script>
	import { onMount } from 'svelte';
	import { isAuthed, fetchNewsTrigger } from '../stores';
	import Modal from '$lib/Modal.svelte';
	import AuthForm from '$lib/AuthForm.svelte';

	let siteTitle = '📷 FOTODAILY';

	let showModal = false;
	let isMounted;

	onMount(() => (isMounted = true));

	const toggleModal = () => {
		showModal = !showModal;
	};

	const logOut = () => {
		localStorage.clear('user');
		isAuthed.set(false);
		fetchNewsTrigger.set('logout');
	};
</script>

<header>
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
	<p><a href="/">{siteTitle}</a></p>
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

		@media (max-width: 800px) {
			padding: 0 1rem;
		}

		p {
			&:nth-child(2) {
				position: relative;
				font-size: clamp(0.8rem, 4vw, 1.4rem);
			}

			a {
				color: var(--white);
			}
		}

		ul {
			display: flex;
			gap: 1rem;
			font-size: 1.1rem;
			list-style: none;

			@media (max-width: 800px) {
				gap: 0.5rem;
				font-size: 0.8rem;
			}
		}

		button {
			width: 4rem;

			@media (max-width: 800px) {
				width: 3rem;
			}
		}

		.btnContainer {
			width: 9rem;
			display: flex;
			place-content: flex-end;
			gap: 1rem;

			@media (max-width: 800px) {
				width: 7rem;
				/* place-content: unset; */
			}
		}
	}
</style>
