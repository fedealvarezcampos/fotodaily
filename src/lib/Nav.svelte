<script>
	import { onMount } from 'svelte';

	import Modal from '$lib/Modal.svelte';
	import AuthForm from '$lib/AuthForm.svelte';

	let siteTitle = 'FOTODAILY';
	let isMounted;
	let showModal;

	const toggleModal = () => {
		showModal = !showModal;
	};

	onMount(() => {
		isMounted = true;
	});

	const fixBody = (mode) => {
		document.body.style.overflow = mode;
	};

	$: if (showModal && isMounted) {
		fixBody('hidden');
	} else if (isMounted) {
		fixBody('');
	}
</script>

<header>
	<p>{siteTitle}</p>
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
	<button on:click|preventDefault={toggleModal}>LOG IN</button>
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
		border-bottom: 6px solid var(--red);
		background-color: var(--black);
		font-weight: 700;
		z-index: 3;

		p {
			&:first-child {
				margin-left: auto;
				font-size: 1.4rem;
			}
		}

		ul {
			display: flex;
			place-items: center;
			gap: 0.8rem;
			list-style: none;
		}

		button {
			margin-left: auto;
		}
	}
</style>
