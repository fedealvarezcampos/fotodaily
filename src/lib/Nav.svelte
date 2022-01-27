<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAuthed, fetchNewsTrigger, resetTrigger } from '../stores';

	import Modal from '$lib/Modal.svelte';
	import AuthForm from '$lib/AuthForm.svelte';

	$: currentPath = $page.url.pathname;

	let showModal = false;

	const toggleModal = () => {
		showModal = !showModal;
	};

	const logOut = () => {
		localStorage.clear('user');
		isAuthed.set(false);
		resetTrigger.set('logout');
		fetchNewsTrigger.set('logout');
		currentPath !== '/' && goto('/');
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
	<a href="/"><img src="/images/logo.svg" alt="logo" /></a>
	<span class="btnContainer">
		{#if !$isAuthed}
			<button on:click|preventDefault={toggleModal}>LOG IN</button>
		{:else}
			<button on:click|preventDefault={logOut}>LOG OUT</button>
			<button on:click={() => goto('/bookmarks')}>YOUR NEWS</button>
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
		padding: 0 clamp(2.2rem, 2.6vw, 4rem);
		height: 6rem;
		place-items: center;
		justify-content: space-between;
		border-bottom: 6px solid var(--red);
		background-color: var(--black);
		font-weight: 700;
		z-index: 2;

		@media (max-width: 800px) {
			height: 5rem;
			padding: 0 0.8rem;
			gap: 1rem;
			border-bottom: 4px solid var(--red);
		}

		a {
			display: flex;
			place-content: center;
			justify-self: flex-start;
		}

		img {
			width: clamp(7rem, 34vw, 12rem);
		}

		ul {
			display: flex;
			gap: 1rem;
			font-size: 1.1rem;
			list-style: none;
			margin: 0;

			@media (max-width: 800px) {
				gap: 0.5rem;
				font-size: 0.6rem;
			}

			li {
				display: flex;
				place-content: center;
			}
		}

		button {
			width: 4rem;

			@media (max-width: 800px) {
				width: fit-content;
				font-size: 0.5rem;
				padding: 0.3rem 0.25rem;
			}
		}

		.btnContainer {
			width: 9rem;
			display: flex;
			place-content: flex-end;
			gap: 1rem;

			@media (max-width: 800px) {
				width: 4.8rem;
				gap: 0.6rem;
			}
		}
	}
</style>
