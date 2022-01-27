<script>
	import { fade } from 'svelte/transition';
	import { afterNavigate } from '$app/navigation';
	import { sidebarOut } from '../stores';

	export const prerender = true;

	$: visible = $sidebarOut;

	// when navigating directly to page with no sidebar, check
	afterNavigate(({ from }) => !from && sidebarOut.set(true));
</script>

<svelte:head>
	<title>Fotodaily | About</title>
</svelte:head>

{#if visible}
	<div in:fade={{ duration: 150 }}>
		<p>
			<span> Just a photography related news aggregator.</span>
			<span>We fetch photo news every day from popular 📷 sites.</span>
			<span>Log in to like and save articles!</span>
			<span>Made with Svelte and Strapi CMS.</span>
		</p>
		<a href="/">Back to main</a>
	</div>
{/if}

<style lang="postcss">
	div {
		height: calc(100vh - 6rem);
		padding: 3rem;
		display: flex;
		place-content: center;
		flex-direction: column;
		gap: 2rem;
		font-size: clamp(1.1rem, 4vw, 1.3rem);

		@media (max-width: 800px) {
			height: 100%;
			margin-top: 10vh;
			padding: 2.4rem;
		}

		p {
			display: flex;
			flex-direction: column;

			gap: 1.2rem;

			span:last-child {
				justify-self: center;
				padding-top: 1.8rem;
				font-style: italic;
			}
		}
	}
</style>
