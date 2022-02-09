<script>
	import { fly } from 'svelte/transition';
	import { sidebarOut } from '../stores';
	import Sorter from './Sorter.svelte';
	import Search from './Search.svelte';

	$: visible = $sidebarOut;
</script>

<div
	class="sidebar"
	transition:fly={{ duration: 200, x: -200 }}
	on:introstart={visible && sidebarOut.set(!$sidebarOut)}
	on:outroend={!visible && sidebarOut.set(!$sidebarOut)}
>
	<p transition:fly={{ duration: 200, y: -60 }}>Fresh photography news every day!</p>
	<Search />
	<Sorter />
</div>

<style lang="postcss">
	.sidebar {
		position: sticky;
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: 2rem;
		top: 6rem;
		padding: 3rem 1.2rem 3rem 1rem;
		height: calc(100vh - 6rem);
		width: 14rem;
		border-right: 15px double var(--black);
		background-color: var(--red);

		@media (max-width: 800px) {
			gap: 0.8rem;
			height: fit-content;
			width: 100vw;
			padding: 0.6rem 0.6rem 0.8rem 0.4rem;
			top: 5rem;
			flex-direction: row;
			place-content: space-between;
			border-right: unset;
			border-bottom: 8px double var(--black);
			z-index: 3;
		}

		p {
			padding: 1.1rem 1.3rem 1.15rem 1.1rem;
			font-size: 1.1rem;
			font-weight: 700;
			border-radius: 0 14px 0 0;
			border-left: 12px double var(--red);
			border-bottom: 12px double var(--red);
			background-color: var(--black);

			@media (max-width: 800px) {
				width: clamp(7rem, 34vw, 12rem);
				padding: 0.5rem;
				font-size: 0.6rem;
				border-radius: 0 10px 0 0;
				border-left: 10px double var(--red);
				border-bottom: unset;
			}
		}
	}
</style>
