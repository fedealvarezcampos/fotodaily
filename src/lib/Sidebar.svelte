<script>
	import { fetchOptions } from '../stores';

	$: order = $fetchOptions.order;

	let isOrderBtnActive = true;

	const changeOrder = () => {
		if (order === 'DESC') {
			fetchOptions.set({ order: 'ASC', filter: 'date' });
		} else {
			fetchOptions.set({ order: 'DESC', filter: 'date' });
		}
	};

	const filterByLikes = () => {
		isOrderBtnActive = false;
		fetchOptions.set({ order: 'DESC', filter: 'likes' });
	};
</script>

<div class="sidebar">
	<nav>
		<ul>
			<li>
				<span>SORTING BY</span>
				<button class={isOrderBtnActive && 'active'} on:click={changeOrder}>
					{order === 'ASC' ? 'OLDEST' : 'NEWEST'}
				</button>
				<button on:click={filterByLikes}>POPULAR</button>
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

				&:focus {
					background-color: var(--pink);
				}
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
