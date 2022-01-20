<script>
	import { fetchOptions, activeButton } from '../stores';

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

<div class="sidebar">
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
		width: 16rem;

		border-right: 4px solid var(--red);

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

			button {
				width: 5.4rem;
			}

			span:first-child {
				font-size: 1.2rem;
			}
		}
	}

	.active {
		background-color: var(--pink);
	}
</style>
