<script>
	import { searchTerm } from '../stores';

	let searchValue;
</script>

<form action="/" on:submit|preventDefault={searchTerm.set(searchValue)}>
	<span>SEARCH</span>
	<input type="search" name="search" id="search" bind:value={searchValue} />
</form>

<style lang="postcss">
	form {
		display: flex;
		flex-direction: column;
		place-items: center;
		gap: 0.8rem;

		@media (max-width: 800px) {
			flex-direction: row;
			place-content: center;
			grid-row-start: 2;
			grid-column: 2 / 3;
		}
	}

	input {
		width: 80%;
		margin: 0;

		@media (max-width: 800px) {
			width: clamp(8rem, 50%, 30rem);
			padding: 0.2rem;
		}
	}

	span:first-child {
		font-size: clamp(0.8rem, 3vw, 1.2rem);
	}
</style>
