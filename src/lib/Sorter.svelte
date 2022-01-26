<script>
	import { fetchOptions, resetTrigger, activeButton } from '../stores';

	const filterByDate = () => {
		if ($fetchOptions.filter !== 'date') {
			activeButton.set('new');
			resetTrigger.set('date');
			fetchOptions.set({ order: 'DESC', filter: 'date', page: 1 });
		}
	};

	const filterByLikes = () => {
		if ($fetchOptions.filter !== 'likes') {
			activeButton.set('popular');
			resetTrigger.set('likes');
			fetchOptions.set({ order: 'DESC', filter: 'likes', page: 1 });
		}
	};
</script>

<nav>
	<ul>
		<li>
			<span>SORTING BY</span>
			<button class:active={$activeButton === 'new'} on:click={filterByDate}>NEW</button>
			<button class:active={$activeButton === 'popular'} on:click={filterByLikes}> POPULAR </button>
		</li>
	</ul>
</nav>

<style lang="postcss">
	nav {
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
				gap: 0.5rem;
				flex-direction: row;
				place-content: flex-end;
			}

			button {
				width: 5.4rem;

				@media (max-width: 800px) {
					padding: 0.3rem 0.6rem;
					width: fit-content;
				}
			}

			span:first-child {
				font-size: clamp(0.8rem, 3vw, 1.2rem);
			}
		}

		.active {
			background-color: var(--pink);
		}
	}
</style>
