<script>
	import { fetchOrder } from '../stores';

	$: order = $fetchOrder;

	const changeOrder = () => {
		fetchOrder.set(order === 'DESC' ? 'ASC' : 'DESC');
	};
</script>

<div class="sidebar">
	<nav>
		<ul>
			<li>
				<span>VIEWING</span>
				<button on:click={changeOrder}>
					{order === 'ASC' ? 'OLDEST' : 'NEWEST'}
				</button>
				<button on:click={changeOrder}> MOST LIKED </button>
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
				max-width: 4.6rem;
			}

			span:first-child {
				font-size: 1.2rem;
			}
		}
	}
</style>
