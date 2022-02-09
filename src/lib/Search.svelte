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
	}

	input {
		width: 80%;
		margin: 0;
	}

	span:first-child {
		font-size: clamp(0.8rem, 3vw, 1.2rem);
	}
</style>
