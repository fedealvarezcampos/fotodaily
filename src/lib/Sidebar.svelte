<script>
	import { fly } from 'svelte/transition';
	import { fetchOptions, activeButton, sidebarOut } from '../stores';

	$: visible = $sidebarOut;

	const filterByDate = () => {
		if ($fetchOptions.filter !== 'date') {
			activeButton.set('new');
			fetchOptions.set({ order: 'DESC', filter: 'date' });
		}
	};

	const filterByLikes = () => {
		if ($fetchOptions.filter !== 'likes') {
			activeButton.set('popular');
			fetchOptions.set({ order: 'DESC', filter: 'likes' });
		}
	};
</script>

<div
	class="sidebar"
	transition:fly={{ duration: 150, x: -200 }}
	on:introstart={visible && sidebarOut.set(!$sidebarOut)}
	on:outroend={!visible && sidebarOut.set(!$sidebarOut)}
>
	<nav>
		<ul>
			<li>
				<span>SORTING BY</span>
				<button class={$activeButton === 'new' && 'active'} on:click={filterByDate}>NEW</button>
				<button class={$activeButton === 'popular' && 'active'} on:click={filterByLikes}
					>POPULAR</button
				>
			</li>
		</ul>
	</nav>
</div>

<style lang="postcss">
	.sidebar {
		position: sticky;
		display: flex;
		flex-direction: column;
		place-items: center;
		top: 6rem;
		padding-top: 3rem;
		height: calc(100vh - 6rem);
		width: 14rem;
		border-right: 15px double var(--black);
		background-color: var(--red);

		@media (max-width: 800px) {
			height: fit-content;
			width: 100vw;
			padding: 0.6rem 0.6rem 0.8rem 0.6rem;
			top: 5rem;
			flex-direction: row;
			place-content: center;
			border-right: unset;
			border-bottom: 8px double var(--black);
			z-index: 3;
		}

		ul {
			margin: 0;
			padding: 0;
			list-style: none;
		}

		li {
			display: flex;
			flex-direction: column;
			place-items: center;
			gap: 0.8rem;

			@media (max-width: 800px) {
				flex-direction: row;
			}

			button {
				width: 5.4rem;

				@media (max-width: 800px) {
					padding: 0.3rem 0.6rem;
					width: fit-content;
				}
			}

			span:first-child {
				font-size: clamp(0.9rem, 3vw, 1.2rem);
			}
		}
	}

	.active {
		background-color: var(--pink);
	}
</style>
